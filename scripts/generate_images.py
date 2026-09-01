#!/usr/bin/env python3
"""
NŪR — gerador de imagens via OpenRouter + Flux.2 Klein 4B.

Uso:
    # Gerar TODAS as imagens definidas em curation.py (3 variantes cada)
    python3 generate_images.py

    # Gerar só UMA imagem específica
    python3 generate_images.py --only hero-bg

    # Gerar múltiplas por id (separadas por vírgula)
    python3 generate_images.py --only collection-fragrance,collection-skin

    # Mudar quantas variantes gera por imagem
    python3 generate_images.py --variants 5

    # Dry-run (mostra prompts sem chamar API)
    python3 generate_images.py --dry-run

    # Escolher variante como definitiva (renomeia hero-bg.v2.jpg → hero-bg.jpg)
    python3 generate_images.py --pick hero-bg=2

Config via variáveis de ambiente (.env na mesma pasta ou exportadas):
    OPENROUTER_API_KEY  — sua chave em https://openrouter.ai/keys (obrigatório)
    OR_MODEL            — model slug (default: black-forest-labs/flux.2-klein-4b)
                          alternativas mais caras/melhores:
                            black-forest-labs/flux.2-flex
                            black-forest-labs/flux.2-pro
    OR_BASE_URL         — endpoint (default: https://openrouter.ai/api/v1)
    NUR_OUTPUT_DIR      — pasta destino (default: ../public/images)

Requisitos:
    pip3 install -r requirements.txt

Custo estimado (Flux.2 Klein 4B): ~$0.014-0.02/imagem × variantes × ids.
Rodar tudo (10 imagens × 3 variantes) ≈ ~$0.60.
"""

from __future__ import annotations

import argparse
import base64
import os
import sys
import time
from io import BytesIO
from pathlib import Path
from typing import Iterable

try:
    from openai import OpenAI
except ImportError:
    print("✗ falta o SDK openai — rode: pip3 install -r requirements.txt")
    sys.exit(1)

try:
    from PIL import Image
except ImportError:
    print("✗ falta Pillow — rode: pip3 install -r requirements.txt")
    sys.exit(1)

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass  # dotenv é opcional

from curation import CURATION, ImageSpec, by_id, GLOBAL_NEGATIVE


# ═════════════════════════════════════════════════════════════
# Config
# ═════════════════════════════════════════════════════════════

API_KEY  = os.getenv("OPENROUTER_API_KEY", "")
BASE_URL = os.getenv("OR_BASE_URL", "https://openrouter.ai/api/v1")
MODEL_ID = os.getenv("OR_MODEL", "black-forest-labs/flux.2-klein-4b")

# Headers opcionais que o OpenRouter usa pra rankings + billing analytics
OR_REFERRER = os.getenv("OR_REFERRER", "https://nur-atelier.local")
OR_TITLE    = os.getenv("OR_TITLE", "NUR Atelier - image curation")

SCRIPT_DIR = Path(__file__).resolve().parent
DEFAULT_OUT = SCRIPT_DIR.parent / "public" / "images"
OUTPUT_DIR = Path(os.getenv("NUR_OUTPUT_DIR", str(DEFAULT_OUT))).resolve()

DEFAULT_VARIANTS = 3

# Estimativas de preço por imagem (só pra exibição no header)
PRICE_ESTIMATES = {
    "black-forest-labs/flux.2-klein-4b": 0.02,   # tier baixo, varia com resolução
    "black-forest-labs/flux.2-klein-9b": 0.025,
    "black-forest-labs/flux.2-flex":     0.05,
    "black-forest-labs/flux.2-pro":      0.08,
    "google/gemini-2.5-flash-image":     0.04,   # via OpenRouter
    "google/gemini-3-flash-image-preview": 0.065,
}


# ═════════════════════════════════════════════════════════════
# Helpers
# ═════════════════════════════════════════════════════════════

def die(msg: str, code: int = 1) -> None:
    print(f"✗ {msg}")
    sys.exit(code)


def info(msg: str) -> None:
    print(f"  {msg}")


def ok(msg: str) -> None:
    print(f"✓ {msg}")


def full_prompt(spec: ImageSpec) -> str:
    """Prompt final enviado ao modelo — inclui negative embutido como diretiva."""
    if spec.negative:
        neg = f"{GLOBAL_NEGATIVE}, {spec.negative}"
    else:
        neg = GLOBAL_NEGATIVE
    return f"{spec.prompt}\n\nAvoid: {neg}"


def variant_path(spec: ImageSpec, variant: int) -> Path:
    """
    variant=1 → nome final (ex: hero-bg.jpg — o que o site aponta)
    variant>1 → sufixo (ex: hero-bg.v2.jpg)
    """
    if variant == 1:
        return OUTPUT_DIR / f"{spec.id}.jpg"
    return OUTPUT_DIR / f"{spec.id}.v{variant}.jpg"


# ═════════════════════════════════════════════════════════════
# Geração
# ═════════════════════════════════════════════════════════════

def generate_one(
    client: "OpenAI | None",
    spec: ImageSpec,
    variants: int,
    dry_run: bool,
) -> int:
    """Gera todas as variantes de UMA imagem. Retorna quantas foram salvas."""
    tgt_w, tgt_h = spec.target_size
    prompt = full_prompt(spec)

    print(
        f"\n─── {spec.id} · {tgt_w}×{tgt_h} · "
        f"{spec.aspect_ratio} @ {spec.api_quality} · safe={spec.safe_zone} ───"
    )
    print(f"    prompt: {spec.prompt[:110]}…")

    if dry_run:
        info(f"[dry-run] {variants} variante(s) seriam geradas")
        return 0

    assert client is not None

    saved = 0
    for v in range(1, variants + 1):
        out_path = variant_path(spec, v)
        info(f"variante {v}/{variants} → {out_path.name}")

        try:
            # OpenRouter aceita aspect_ratio e resolution via extra_body
            # (não são params padrão do OpenAI SDK)
            resp = client.images.generate(
                model=MODEL_ID,
                prompt=prompt,
                n=1,
                extra_body={
                    "aspect_ratio": spec.aspect_ratio,
                    "resolution": spec.api_quality,
                },
            )
        except Exception as e:  # noqa: BLE001
            print(f"    ✗ falha na chamada API: {e}")
            print(f"    → confira OPENROUTER_API_KEY em https://openrouter.ai/keys")
            print(f"    → confira créditos em https://openrouter.ai/credits")
            continue

        raw = _extract_image_bytes(resp)
        if raw is None:
            print(f"    ✗ resposta sem imagem — provider não retornou b64_json")
            continue

        # Post-processing: redimensiona/crop pro target_size exato
        try:
            img = Image.open(BytesIO(raw)).convert("RGB")
            if img.size != (tgt_w, tgt_h):
                img = _resize_and_crop(img, tgt_w, tgt_h)
            img.save(out_path, "JPEG", quality=88, optimize=True, progressive=True)
            saved += 1
            cost = _get_cost_from_response(resp)
            cost_str = f", ~${cost:.4f}" if cost else ""
            ok(f"salva ({out_path.stat().st_size // 1024} KB{cost_str})")
        except Exception as e:  # noqa: BLE001
            print(f"    ✗ falha ao processar imagem: {e}")

        # Rate limiting leve
        if v < variants:
            time.sleep(0.3)

    return saved


def _extract_image_bytes(resp) -> "bytes | None":
    """
    OpenRouter retorna imagens em `resp.data[0].b64_json` (formato OpenAI).
    Alguns provedores retornam url em vez de b64_json — a gente tenta os dois.
    """
    if not hasattr(resp, "data") or not resp.data:
        return None

    first = resp.data[0]

    # Caminho 1: b64_json direto
    b64 = getattr(first, "b64_json", None)
    if b64:
        return base64.b64decode(b64)

    # Caminho 2: url (baixa e retorna bytes)
    url = getattr(first, "url", None)
    if url:
        try:
            import urllib.request
            return urllib.request.urlopen(url).read()  # noqa: S310
        except Exception as e:  # noqa: BLE001
            print(f"    ✗ falha ao baixar url: {e}")
            return None

    return None


def _get_cost_from_response(resp) -> "float | None":
    """OpenRouter inclui custo real em resp.usage.cost quando disponível."""
    try:
        usage = getattr(resp, "usage", None)
        if usage is None:
            return None
        cost = getattr(usage, "cost", None)
        if cost is None and isinstance(usage, dict):
            cost = usage.get("cost")
        return float(cost) if cost is not None else None
    except Exception:  # noqa: BLE001
        return None


def _resize_and_crop(img: Image.Image, tgt_w: int, tgt_h: int) -> Image.Image:
    """Redimensiona mantendo aspect ratio (cover) e crop centralizado."""
    src_w, src_h = img.size
    src_ratio = src_w / src_h
    tgt_ratio = tgt_w / tgt_h

    if src_ratio > tgt_ratio:
        new_h = tgt_h
        new_w = int(src_ratio * new_h)
    else:
        new_w = tgt_w
        new_h = int(new_w / src_ratio)

    img = img.resize((new_w, new_h), Image.LANCZOS)

    left = (new_w - tgt_w) // 2
    top = (new_h - tgt_h) // 2
    return img.crop((left, top, left + tgt_w, top + tgt_h))


# ═════════════════════════════════════════════════════════════
# Comandos auxiliares
# ═════════════════════════════════════════════════════════════

def cmd_pick(pairs: Iterable[str]) -> None:
    """Renomeia variante escolhida pro nome final."""
    for pair in pairs:
        if "=" not in pair:
            die(f"formato inválido: {pair} (esperado id=N)")
        image_id, num = pair.split("=", 1)
        try:
            n = int(num)
        except ValueError:
            die(f"variante inválida em {pair}")

        try:
            spec = by_id(image_id)
        except KeyError:
            die(f"id desconhecido: {image_id}")

        variant_file = variant_path(spec, n)
        final_file = OUTPUT_DIR / f"{spec.id}.jpg"

        if not variant_file.exists():
            die(f"variante não existe: {variant_file}")

        if final_file.exists() and final_file != variant_file:
            backup = OUTPUT_DIR / f"{spec.id}.v1.backup.jpg"
            final_file.rename(backup)
            info(f"backup: {final_file.name} → {backup.name}")

        variant_file.rename(final_file)
        ok(f"{variant_file.name} → {final_file.name}")


# ═════════════════════════════════════════════════════════════
# Main
# ═════════════════════════════════════════════════════════════

def main() -> None:
    p = argparse.ArgumentParser(
        description="Gera imagens do site NŪR via OpenRouter + Flux.2 Klein 4B.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    p.add_argument("--only", help="Ids separados por vírgula. Default: todos.")
    p.add_argument(
        "--variants", type=int, default=DEFAULT_VARIANTS,
        help=f"Quantas variantes por imagem (default: {DEFAULT_VARIANTS})",
    )
    p.add_argument("--dry-run", action="store_true", help="Não chama API — só mostra o que faria")
    p.add_argument("--pick", nargs="+", metavar="id=N", help="Escolhe variante como definitiva")
    p.add_argument("--list", action="store_true", help="Lista ids disponíveis e sai")

    args = p.parse_args()

    if args.list:
        print("Imagens definidas em curation.py:\n")
        for s in CURATION:
            print(
                f"  {s.id:26s}  {s.target_size[0]:>4}×{s.target_size[1]:<4}  "
                f"{s.aspect_ratio:<5}  {s.api_quality}  safe={s.safe_zone}"
            )
        return

    if args.pick:
        cmd_pick(args.pick)
        return

    if not args.dry_run and not API_KEY:
        die("OPENROUTER_API_KEY não definida — cria .env a partir de .env.example")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    if args.only:
        wanted = [x.strip() for x in args.only.split(",")]
        try:
            specs = [by_id(w) for w in wanted]
        except KeyError as e:
            die(str(e))
    else:
        specs = CURATION

    price = PRICE_ESTIMATES.get(MODEL_ID, 0.02)
    total_calls = len(specs) * args.variants
    estimated = total_calls * price

    print(f"═════════════════════════════════════════════")
    print(f"NŪR image generator · OpenRouter")
    print(f"  model      : {MODEL_ID}")
    print(f"  endpoint   : {BASE_URL}")
    print(f"  output     : {OUTPUT_DIR}")
    print(f"  imagens    : {len(specs)}")
    print(f"  variantes  : {args.variants} cada")
    print(f"  total      : {total_calls} chamadas (~${estimated:.2f} estimado)")
    print(f"═════════════════════════════════════════════")

    if args.dry_run:
        print("\n[DRY-RUN] nenhuma chamada será feita\n")

    client = None
    if not args.dry_run:
        client = OpenAI(
            api_key=API_KEY,
            base_url=BASE_URL,
            default_headers={
                "HTTP-Referer": OR_REFERRER,
                "X-Title": OR_TITLE,
            },
        )

    total_saved = 0
    for spec in specs:
        total_saved += generate_one(client, spec, args.variants, args.dry_run)

    print(f"\n═════════════════════════════════════════════")
    print(f"✓ {total_saved} arquivo(s) salvos em {OUTPUT_DIR}")
    print(f"═════════════════════════════════════════════")

    if total_saved > 0:
        print("\nPróximos passos:")
        print("  1. Abre /public/images/ e revisa as variantes")
        print("  2. Se preferir outra: python3 generate_images.py --pick <id>=<num>")
        print("  3. Adiciona ao .env.local do site:  NEXT_PUBLIC_IMAGES_READY=true")
        print("  4. Reinicia o dev server — o site vai passar a servir os .jpg reais")


if __name__ == "__main__":
    main()
