"""
Curadoria de imagens do site NŪR.

Este arquivo é o ESPELHO Python do dict `images` em
`src/components/SafeImage.tsx`. Mantenha os dois em sync
manualmente ao adicionar/remover imagens.

Cada item define:
    - id            : identificador único (bate com o TS)
    - target_size   : (width, height) do arquivo final salvo em /public/images
    - aspect_ratio  : ratio enviado pra Nano Banana 2 (1:1, 4:5, 16:9, etc)
    - api_quality   : "1K" | "2K" | "4K" — resolução gerada pelo modelo
                      (a gente redimensiona/crops depois via Pillow pro target)
    - safe_zone     : onde texto vai por cima — o prompt instrui o modelo
                      a manter a região OPOSTA livre do assunto
    - prompt        : prompt principal (inglês, Muse responde melhor)
    - negative      : coisas a evitar (adicionado ao prompt como "avoid ...")

Palette de referência que aparece em todos os prompts:
    sand      #f0e6d6   — creme quente
    ink       #14261f   — verde-tinta quase preto
    emerald   #10614a   — verde intenso
    Vibe alvo: Aesop / Le Labo / Byredo / Amouage — quiet luxury.
"""

from dataclasses import dataclass, field
from typing import Tuple


@dataclass
class ImageSpec:
    id: str
    target_size: Tuple[int, int]
    aspect_ratio: str            # "1:1" | "4:5" | "5:4" | "16:9" | "9:16" | "3:4" | "4:3" | "21:9"
    api_quality: str             # "1K" | "2K" | "4K"
    safe_zone: str               # center | bottom | top | left | right | full
    prompt: str
    negative: str = ""


# Direção estética compartilhada — anexada a TODO prompt
STYLE_BLOCK = (
    "Editorial luxury still-life photography, natural warm sand-tone palette "
    "(#f0e6d6 cream to #d8caae dune), deep ink accents (#14261f), extremely "
    "shallow depth of field, film grain, soft directional daylight from a "
    "single window source, minimalist composition in the style of Aesop and "
    "Byredo campaign imagery, no text, no logos, no watermarks, no props "
    "that look mass-produced."
)

GLOBAL_NEGATIVE = (
    "text, letters, typography, logos, watermarks, brand names, faces, "
    "people, hands unless specified, plastic, kitsch, saturated colors, "
    "harsh lighting, HDR, oversaturated, digital painting, illustration, 3D render, "
    "clip-art, stock-photo lighting"
)


CURATION: list[ImageSpec] = [
    # ─────────────────────────────────────────────────────────
    # HERO — background full-bleed, texto NŪR gigante no centro
    # ─────────────────────────────────────────────────────────
    ImageSpec(
        id="hero-bg",
        target_size=(2400, 1350),
        aspect_ratio="16:9",
        api_quality="4K",
        safe_zone="center",
        prompt=(
            f"{STYLE_BLOCK} "
            "A cinematic ambient still-life composition suggesting a perfumer's "
            "atelier at dawn: soft cream mist drifting across an out-of-focus "
            "amber apothecary bottle on the FAR LEFT and dried Amazonian branches "
            "on the FAR RIGHT. The MIDDLE 60 percent of the frame must be an "
            "empty, softly-lit expanse of pale cream haze — NO OBJECTS, NO TEXT, "
            "NO FOCAL POINTS — this negative space is where a wordmark will be "
            "typeset. Ultra-wide 16:9. Warm sand tones dominate, with a barely-"
            "perceptible emerald green undertone in the deepest shadows only."
        ),
    ),

    # ─────────────────────────────────────────────────────────
    # MANIFESTO — imagem à esquerda em split layout
    # ─────────────────────────────────────────────────────────
    ImageSpec(
        id="manifesto-still-life",
        target_size=(1024, 1280),
        aspect_ratio="3:4",
        api_quality="2K",
        safe_zone="right",
        prompt=(
            f"{STYLE_BLOCK} "
            "Editorial still-life: a raw cross-section of Brazilian pau-brasil "
            "hardwood resting on a folded piece of natural undyed linen. Portrait "
            "orientation 4:5. The wood is on the LEFT third of the frame, sharply "
            "in focus, showing dense red-orange grain. The RIGHT two-thirds of "
            "the frame is pure out-of-focus warm cream linen — an empty tactile "
            "surface. Dramatic single-source window light from top-left casting a "
            "long soft shadow rightward. No hands, no faces, no additional "
            "objects. Muted, contemplative, museum-object quality."
        ),
    ),

    # ─────────────────────────────────────────────────────────
    # COLLECTIONS × 3 — cards com info bar em blur no rodapé
    # (safe zone bottom = texto flutuante nos últimos 35%)
    # ─────────────────────────────────────────────────────────
    ImageSpec(
        id="collection-fragrance",
        target_size=(1024, 1280),
        aspect_ratio="3:4",
        api_quality="2K",
        safe_zone="bottom",
        prompt=(
            f"{STYLE_BLOCK} "
            "A single unlabeled apothecary-style amber glass perfume bottle "
            "standing UPRIGHT in the UPPER TWO-THIRDS of a portrait 4:5 frame, "
            "photographed from a slightly low angle against a seamless cream-"
            "sand backdrop. The bottle has a heavy shoulder and a natural cork "
            "or brushed-brass stopper. Golden-hour side light from the right "
            "creates a long soft shadow to the left. The BOTTOM THIRD of the "
            "frame is empty out-of-focus surface with a subtle vignette darker "
            "gradient — this area will host a floating text overlay, so keep it "
            "compositionally quiet."
        ),
    ),
    ImageSpec(
        id="collection-skin",
        target_size=(1024, 1280),
        aspect_ratio="3:4",
        api_quality="2K",
        safe_zone="bottom",
        prompt=(
            f"{STYLE_BLOCK} "
            "Extreme macro of a translucent honey-colored botanical balm just "
            "beginning to melt on a slab of pale travertine stone. Portrait 4:5. "
            "The balm sits in the UPPER TWO-THIRDS, catching a highlight ribbon "
            "from a single soft top light. Micro-texture of the stone visible. "
            "The BOTTOM THIRD is out-of-focus stone surface — negative space for "
            "a floating text overlay. Warm sand and honey tones with cool "
            "shadow undertones. Rendered like a natural-cosmetics editorial "
            "photograph from Kinfolk magazine."
        ),
    ),
    ImageSpec(
        id="collection-adornment",
        target_size=(1024, 1280),
        aspect_ratio="3:4",
        api_quality="2K",
        safe_zone="bottom",
        prompt=(
            f"{STYLE_BLOCK} "
            "A single architectural minimalist gold ring — a wide brushed 18-"
            "karat band with one clean geometric facet — resting flat on its "
            "side in the UPPER TWO-THIRDS of a portrait 4:5 frame on pale "
            "travertine or lime plaster surface. Warm directional light from "
            "the upper right creates a soft crescent shadow to the lower left. "
            "The BOTTOM THIRD is empty stone surface with slight vignetting — "
            "keep compositionally silent for text overlay. No other jewelry, no "
            "hands, no props."
        ),
    ),

    # ─────────────────────────────────────────────────────────
    # INGREDIENTS × 4 — macro shots quadrados, safe zone full
    # (legenda em blur pill no rodapé — muito discreta)
    # ─────────────────────────────────────────────────────────
    ImageSpec(
        id="ingredient-01",
        target_size=(1024, 1024),
        aspect_ratio="1:1",
        api_quality="1K",
        safe_zone="full",
        prompt=(
            f"{STYLE_BLOCK} "
            "Extreme macro photograph of the end-grain cross-section of Brazilian "
            "pau-brasil hardwood, filling the square frame edge to edge. Deep "
            "red-orange to burnt-sienna grain concentric rings. Soft raking "
            "light from the left reveals fine texture and pores. Very slight "
            "vignetting at the corners. No borders, no props, no scale objects."
        ),
    ),
    ImageSpec(
        id="ingredient-02",
        target_size=(1024, 1024),
        aspect_ratio="1:1",
        api_quality="1K",
        safe_zone="full",
        prompt=(
            f"{STYLE_BLOCK} "
            "Extreme macro of a raw chunk of amber tree resin — irregular "
            "honey-orange translucent shape with internal bubbles and one "
            "trapped fragment of dark bark — resting on undyed handmade paper. "
            "The resin fills roughly 70 percent of the square frame, centered. "
            "Backlight through the resin reveals warm internal glow. Studio "
            "still-life, museum specimen quality."
        ),
    ),
    ImageSpec(
        id="ingredient-03",
        target_size=(1024, 1024),
        aspect_ratio="1:1",
        api_quality="1K",
        safe_zone="full",
        prompt=(
            f"{STYLE_BLOCK} "
            "A few loose tropical yellow ipê tree blossoms scattered on a sheet "
            "of ivory rag paper. Square composition, top-down flat-lay. Petals "
            "are slightly wilted and translucent, some overlapping. Soft "
            "diffused overhead daylight, minimal shadows. Botanical archive "
            "aesthetic. No hands, no additional props."
        ),
    ),
    ImageSpec(
        id="ingredient-04",
        target_size=(1024, 1024),
        aspect_ratio="1:1",
        api_quality="1K",
        safe_zone="full",
        prompt=(
            f"{STYLE_BLOCK} "
            "A raw quartz crystal cluster — clear to milky-white points growing "
            "from a rough matrix — photographed on a neutral sand-cream fabric "
            "backdrop, square composition, the crystal filling roughly 60 "
            "percent of the frame. Cool crystalline highlights contrast with "
            "warm ambient environment light. Museum-collection specimen "
            "photograph. Sharp on the crystal, soft everywhere else."
        ),
    ),

    # ─────────────────────────────────────────────────────────
    # OG IMAGE — pra compartilhar em redes sociais
    # (o wordmark é overlay CSS, então prompt pede fundo limpo)
    # ─────────────────────────────────────────────────────────
    ImageSpec(
        id="og-image",
        target_size=(1200, 630),
        aspect_ratio="16:9",
        api_quality="2K",           # depois cropamos pro 1200x630
        safe_zone="center",
        prompt=(
            f"{STYLE_BLOCK} "
            "A cinematic wide horizontal composition: soft cream mist drifting "
            "across an amber apothecary perfume bottle on the FAR LEFT and a "
            "single tropical flower stem on the FAR RIGHT. The MIDDLE 60 percent "
            "of the frame is quiet, softly-lit warm cream haze with NO OBJECTS "
            "— reserved for a wordmark overlay. Warm sand-tone palette with "
            "barely-perceptible emerald undertone in the deepest shadows. "
            "Editorial luxury advertising quality."
        ),
    ),

    # ═════════════════════════════════════════════════════════
    # PRODUCT HERO IMAGES × 8
    # portrait 4:5 (mapeado como 3:4 no OpenRouter), safe zone full
    # cada produto = frasco/jar/joia centralizado, editorial packshot
    # ═════════════════════════════════════════════════════════

    # Fragrance × 3
    ImageSpec(
        id="product-fragrance-norte",
        target_size=(1024, 1280),
        aspect_ratio="3:4",
        api_quality="2K",
        safe_zone="full",
        prompt=(
            f"{STYLE_BLOCK} "
            "Portrait product packshot: a single unlabeled apothecary-style amber "
            "glass perfume bottle with a heavy shoulder and a cork stopper wrapped "
            "in a raw brass band, standing centered on a seamless warm cream-sand "
            "backdrop. Photographed head-on at a slightly low angle. Deep amber "
            "liquid visible through the glass, catching a golden-hour highlight "
            "from the right. Long soft shadow cast to the left. Very shallow depth "
            "of field. The bottle fills about 60 percent of the frame vertically. "
            "Aesop / Byredo product photography reference."
        ),
    ),
    ImageSpec(
        id="product-fragrance-cerrado",
        target_size=(1024, 1280),
        aspect_ratio="3:4",
        api_quality="2K",
        safe_zone="full",
        prompt=(
            f"{STYLE_BLOCK} "
            "Portrait product packshot: a single unlabeled short cylindrical clear-"
            "glass oil parfum bottle with a pale honey-colored oil inside and a "
            "natural beech-wood dropper cap (NOT a spray, NOT a pump), standing "
            "centered on a warm cream backdrop dusted with a few loose dried ipê "
            "flower petals in the foreground blur. Photographed head-on. Cool "
            "morning light from the left with a soft shadow to the right. Very "
            "shallow depth of field. Bottle occupies about 55 percent of the frame "
            "vertically. Apothecary oil-parfum aesthetic, close to Le Labo oil "
            "editions."
        ),
    ),
    ImageSpec(
        id="product-fragrance-marulho",
        target_size=(1024, 1280),
        aspect_ratio="3:4",
        api_quality="2K",
        safe_zone="full",
        prompt=(
            f"{STYLE_BLOCK} "
            "Portrait product packshot: a single unlabeled short wide bell-shaped "
            "clear-glass perfume bottle containing a pale aqua-tinted liquid, "
            "topped with a heavy natural cork stopper, sitting centered on a "
            "surface of pale-gray sea salt crystals. Warm-cool tonal contrast. "
            "Soft directional daylight from top-right. Shallow depth of field. "
            "The bottle occupies about 50 percent of the frame vertically, sea "
            "salt visible in the foreground and background blur. Meditative, "
            "still, museum-object quality."
        ),
    ),

    # Skin × 3
    ImageSpec(
        id="product-skin-cupuacu",
        target_size=(1024, 1280),
        aspect_ratio="3:4",
        api_quality="2K",
        safe_zone="full",
        prompt=(
            f"{STYLE_BLOCK} "
            "Portrait product packshot: a small round matte-cream ceramic jar with "
            "a wooden lid slightly ajar, revealing a dense honey-cream solid balm "
            "inside. The jar sits centered on a slab of pale travertine stone. "
            "Warm side light from the right, soft shadow to the left. Very shallow "
            "depth of field. Jar occupies about 45 percent of the frame vertically. "
            "Clean, apothecary, editorial cosmetics photography."
        ),
    ),
    ImageSpec(
        id="product-skin-buriti",
        target_size=(1024, 1280),
        aspect_ratio="3:4",
        api_quality="2K",
        safe_zone="full",
        prompt=(
            f"{STYLE_BLOCK} "
            "Portrait product packshot: a tall slender frosted-glass dropper "
            "bottle filled with a deep-orange botanical oil, with a natural wood "
            "dropper cap, standing centered on a warm cream linen surface. Back-"
            "light through the bottle makes the orange oil glow. Photographed "
            "head-on. Long soft shadow to the left. Very shallow depth of field. "
            "Bottle occupies about 60 percent of the frame vertically."
        ),
    ),
    ImageSpec(
        id="product-skin-mask",
        target_size=(1024, 1280),
        aspect_ratio="3:4",
        api_quality="2K",
        safe_zone="full",
        prompt=(
            f"{STYLE_BLOCK} "
            "Portrait product packshot: a matte-terracotta round ceramic jar "
            "containing a fine red clay powder — the powder visible with the lid "
            "resting beside the jar, and a wooden mixing spoon leaning against "
            "it. Everything sits centered on a raw undyed linen cloth. Soft "
            "diffused overhead light. Very shallow depth of field. The composition "
            "occupies about 55 percent of the frame vertically. Ceremonial, "
            "earthy, ritual object aesthetic."
        ),
    ),

    # Adornment × 2
    ImageSpec(
        id="product-adornment-colonna",
        target_size=(1024, 1280),
        aspect_ratio="3:4",
        api_quality="2K",
        safe_zone="full",
        prompt=(
            f"{STYLE_BLOCK} "
            "Portrait product packshot: a single architectural minimalist gold "
            "ring — a wide brushed 18-karat band with one clean geometric facet — "
            "standing on its edge, centered on a slab of pale travertine stone. "
            "Warm directional light from the upper right creates a crescent shadow "
            "to the lower left. Very shallow depth of field. The ring occupies "
            "about 35 percent of the frame, generous negative space around it. "
            "Museum-object jewelry photography, no hands, no props."
        ),
    ),
    ImageSpec(
        id="product-adornment-duna",
        target_size=(1024, 1280),
        aspect_ratio="3:4",
        api_quality="2K",
        safe_zone="full",
        prompt=(
            f"{STYLE_BLOCK} "
            "Portrait product packshot: a pair of small architectural drop "
            "earrings in brushed 18-karat yellow gold, arranged side-by-side and "
            "slightly overlapping, centered on a pale travertine surface. Warm "
            "single-source light from the right. Long soft shadow to the left. "
            "Very shallow depth of field. The pair occupies about 40 percent of "
            "the frame width, generous negative space above and below. Editorial "
            "jewelry photography, no hands, no props."
        ),
    ),
]


def by_id(image_id: str) -> ImageSpec:
    """Retorna a spec de uma imagem por id, ou levanta KeyError."""
    for spec in CURATION:
        if spec.id == image_id:
            return spec
    raise KeyError(f"Imagem '{image_id}' não está em CURATION")


def all_ids() -> list[str]:
    return [s.id for s in CURATION]
