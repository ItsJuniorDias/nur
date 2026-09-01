# NŪR · Scripts de geração de imagens

Gera todas as imagens do site chamando **Flux.2 Klein 4B** (Black Forest Labs) via **OpenRouter**.

Preço aproximado: **$0.014-0.02 por imagem** (varia com resolução). **~$0.60 pra rodar tudo** (10 imagens × 3 variantes).

## Setup

1. Vai em [openrouter.ai/keys](https://openrouter.ai/keys), loga (Google/GitHub), clica **Create Key**. Formato: `sk-or-v1-...`.
2. Confirma que tem créditos em [openrouter.ai/credits](https://openrouter.ai/credits) — o mínimo pra recarregar é $5.
3. Instala deps e configura o `.env`:

```bash
cd scripts
pip3 install -r requirements.txt
cp .env.example .env
# abre .env e cola tua OPENROUTER_API_KEY
```

## Uso

### Gerar todas as imagens (3 variantes cada)

```bash
python3 generate_images.py
```

Salva em `../public/images/`:
- `hero-bg.jpg` (variante 1 — a que o site usa por default)
- `hero-bg.v2.jpg`
- `hero-bg.v3.jpg`
- ... e assim por diante pras 10 imagens.

O OpenRouter retorna o **custo real** de cada geração no response — aparece no log ao lado do "salva".

### Regerar UMA imagem só

```bash
python3 generate_images.py --only hero-bg
python3 generate_images.py --only collection-fragrance,collection-skin
```

### Ver o que seria gerado sem chamar a API

```bash
python3 generate_images.py --dry-run
```

### Listar todos os IDs com dimensões e aspect ratio

```bash
python3 generate_images.py --list
```

### Escolher outra variante como definitiva

Depois de olhar os `.v2.jpg` e `.v3.jpg`, se preferir a v2 do hero:

```bash
python3 generate_images.py --pick hero-bg=2
```

Renomeia `hero-bg.v2.jpg` → `hero-bg.jpg` (backup do anterior é salvo como `.v1.backup.jpg`).

### Mudar quantas variantes gerar

```bash
python3 generate_images.py --variants 5
```

### Trocar de modelo

Se Flux Klein 4B decepcionar na qualidade, sobe pra Flex ou Pro no `.env`:

```env
OR_MODEL=black-forest-labs/flux.2-flex   # ~$0.05/img
OR_MODEL=black-forest-labs/flux.2-pro    # ~$0.08/img
OR_MODEL=google/gemini-2.5-flash-image   # Nano Banana 1, ~$0.04/img
```

O script continua funcionando sem mudar nada — só o custo estimado no header muda. O OpenRouter continua retornando o custo real por chamada.

## Ativar as imagens reais no site

Enquanto você não tiver rodado o script, o site serve os placeholders SVG que estão em `public/images/*.svg`.

Depois de rodar e ficar satisfeito, adiciona ao `.env.local` da RAIZ do projeto Next.js (não em `/scripts`):

```env
NEXT_PUBLIC_IMAGES_READY=true
```

Reinicia o `npm run dev` — o `SafeImage` vai passar a servir `.jpg` em vez de `.svg`.

## Como funciona a curadoria

Toda a lista de imagens + prompts + safe zones + tamanhos + aspect ratios vive em **`curation.py`**.

Cada entrada `ImageSpec` tem:
- `id` — bate com o dict `images` em `src/components/SafeImage.tsx`
- `target_size` — dimensão final do arquivo salvo (o Pillow faz resize+crop se a API retornar tamanho diferente)
- `aspect_ratio` — ratio enviado à API: `"1:1"`, `"3:4"`, `"4:3"`, `"16:9"`, `"9:16"`
- `api_quality` — `"1K"`, `"2K"` ou `"4K"` (nome do parâmetro OpenRouter é `resolution`)
- `safe_zone` — onde o site vai colocar texto por cima
- `prompt` — instruções, incluindo diretiva pra manter a área da safe zone limpa
- `negative` — coisas específicas a evitar (opcional; há um global no topo do arquivo)

Pra mudar direção estética de todas as imagens de uma vez, edita o `STYLE_BLOCK` no topo do arquivo — anexado a TODO prompt.

## Adicionar imagem nova

1. Adiciona entrada em `SafeImage.tsx` (dict `images` no TS)
2. Adiciona entrada equivalente em `curation.py` com prompt e config
3. Adiciona placeholder SVG em `public/images/<id>.svg`
4. Roda `python3 generate_images.py --only <id>`
5. Usa `<SafeImage id="<id>" ... />` no componente

## Sobre Flux.2 Klein 4B

Modelo da **Black Forest Labs** (mesma turma do Stable Diffusion original), lançado em janeiro/2026 sob licença Apache 2.0. É o modelo mais rápido da família Flux.2 — 4B parâmetros, sub-segundo por geração, otimizado pra volume/preço.

Qualidade fica atrás do Flux.2 Pro/Max mas é excelente pra still-life editorial (que é exatamente nosso caso). Se você achar que precisa de mais detalhamento em uma imagem específica, roda **só ela** com um modelo maior:

```bash
OR_MODEL=black-forest-labs/flux.2-pro python3 generate_images.py --only hero-bg
```

## Sobre OpenRouter

Gateway unificado — você paga tudo com créditos deles em vez de ter conta em cada provider. Formato de request é OpenAI-compatible (`/v1/images/generations`), então esse mesmo script funciona com qualquer image model no catálogo (Flux, Gemini, Recraft, Seedream, GPT-Image, etc) só mudando `OR_MODEL`.

Headers `HTTP-Referer` e `X-Title` são opcionais mas fazem tuas gerações aparecerem organizadas no dashboard do OpenRouter — o script já preenche com "NUR Atelier".
