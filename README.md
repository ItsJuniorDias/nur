# NŪR — Atelier Landing

Landing "coming soon" bilíngue (EN/AR com suporte RTL nativo) construída em Next.js 15 + React 19 + Tailwind v4.

**Estética Apple-like** com paleta **Sand & Emerald** (Aesop / Le Labo vibe): tipografia gigante com weight leve, muito espaço, seções full-bleed alternando sand/emerald-deep, backdrop-blur em nav e overlays sobre imagens, fade-in ao scroll, ken-burns sutil em hero.

---

## Setup

```bash
npm install
npm run dev
```

Abre em [http://localhost:3000](http://localhost:3000).

## Build de produção

```bash
npm run build
npm run start
```

---

## Estrutura

```
nur-atelier/
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── src/
│   ├── app/
│   │   ├── layout.tsx          # root, fontes, SEO
│   │   ├── page.tsx            # landing
│   │   ├── globals.css         # design tokens + blur system + safe zones
│   │   ├── icon.svg            # favicon
│   │   ├── sitemap.ts
│   │   └── api/subscribe/      # captura de leads
│   ├── components/
│   │   ├── Nav.tsx             # sticky com blur-nav-sand
│   │   ├── Hero.tsx            # bg image + ken-burns + safe-zone center
│   │   ├── Manifesto.tsx       # split image/texto + blur caption
│   │   ├── Collections.tsx     # 3 cards com imagem + blur bar bottom
│   │   ├── Ingredients.tsx     # 4 macro shots + blur legenda (NOVO)
│   │   ├── Signup.tsx
│   │   ├── Footer.tsx
│   │   ├── LanguageToggle.tsx
│   │   ├── Reveal.tsx
│   │   ├── PixelScripts.tsx
│   │   └── SafeImage.tsx       # wrapper de imagens com safe zones (NOVO)
│   └── lib/
│       ├── config.ts           # brand + integrações
│       └── dictionary.ts       # copy bilíngue EN/AR
├── public/
│   ├── images/                 # placeholders SVG + JPGs quando gerados
│   └── robots.txt
└── scripts/                    # geração de imagens via Meta Muse Image
    ├── generate_images.py
    ├── curation.py
    ├── requirements.txt
    ├── .env.example
    └── README.md
```

---

## Sistema de imagens

Todas as imagens que o site usa estão declaradas em **`src/components/SafeImage.tsx`** no dict `images`. Cada uma tem:

- `id` — identificador único
- `file` — caminho em `/public/images/*.jpg`
- `width`/`height` — dimensões
- `safeZone` — onde texto vai por cima (`center`, `bottom`, `top`, `left`, `right`, `full`)
- `altEn` / `altAr` — alt bilíngue

O componente `<SafeImage id="hero-bg" locale={locale} fill />` cuida de tudo.

### Placeholders SVG

Enquanto você não rodou o gerador de imagens, o site serve os **SVG placeholders** em `public/images/*.svg`. Eles mostram:

- Nome da imagem
- Dimensões
- Guia visual da safe zone

Isso permite desenvolver o layout antes das imagens reais estarem prontas.

### Gerar imagens reais

Ver `scripts/README.md` — usa Meta Muse Image API a $0.01/imagem. Após gerar:

```env
# .env.local (na raiz do projeto Next.js)
NEXT_PUBLIC_IMAGES_READY=true
```

O `SafeImage` passa a apontar pros `.jpg` reais em vez dos `.svg`.

---

## Sistema de blur (Apple-like)

Classes utilitárias em `globals.css`:

| Classe | Uso |
|---|---|
| `blur-nav-sand` | Nav sticky em background sand |
| `blur-nav-emerald` | Nav sticky em background escuro |
| `blur-overlay-sand` | Bar/card flutuante em section sand |
| `blur-overlay-emerald` | Bar/card flutuante sobre imagem escura |
| `blur-pill-sand` | Badge/pill pequeno (ex: "coming soon") sand |
| `blur-pill-emerald` | Badge/pill pequeno sobre imagem |
| `blur-glass` | Card glass visionOS-like (blur intenso) |

Todas com `backdrop-filter` + fallback pra browsers sem suporte.

---

## Sistema de safe zones

Ver comentário em `globals.css` — CSS puro, sem JS:

```html
<div class="safe-zone safe-zone-overlay-bottom aspect-portrait">
  <img class="safe-zone-image" src="..." />
  <div class="safe-zone-content justify-end">
    Texto aqui na região "safe" (bottom)
  </div>
</div>
```

Overlays disponíveis:
- `safe-zone-overlay-bottom` — escurece o rodapé pra texto branco
- `safe-zone-overlay-center` — clareia o miolo pra texto escuro
- `safe-zone-overlay-full` — clareia tudo (leve)

Aspect ratios prontos: `aspect-hero`, `aspect-portrait`, `aspect-square-luxe`, `aspect-landscape`, `aspect-og`.

---

## Configuração

Tudo em **`src/lib/config.ts`**:

```ts
export const brand = { name, nameArabic, domain, email, whatsapp, launchDate };
export const pixels = { meta: "", tiktok: "", snapchat: "", googleAnalytics: "" };
export const leadCapture = { mode: "local" | "webhook" | "resend", ... };
```

Cola o Pixel ID nos campos de `pixels` — carregamento é automático + tracking de `Lead`/`SubmitForm`/`SIGN_UP` no submit do form.

Env vars suportadas:

```env
NEXT_PUBLIC_IMAGES_READY=true    # ativa .jpg em vez de .svg placeholder
LEAD_MODE=webhook                # local | webhook | resend
LEAD_WEBHOOK_URL=https://...     # se mode=webhook
RESEND_API_KEY=re_...            # se mode=resend
RESEND_AUDIENCE_ID=...           # se mode=resend
```

---

## Deploy grátis no Cloudflare Pages

Cloudflare tem edge em Dubai, Kuwait, Riade — latência ótima pro Golfo.

1. Push repo pra GitHub
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git
3. Framework preset: **Next.js**
4. Env vars: adiciona as listadas acima
5. Deploy

Alternativas: Vercel (deploy automático), Netlify.

---

## Trocar paleta

Todos os design tokens em `src/app/globals.css`, bloco `@theme`. Trocar cor lá atualiza tudo (Tailwind gera classes `bg-sand`, `text-emerald` etc automaticamente).

Paleta atual — **Sand & Emerald**:
- `--color-sand: #f0e6d6` (fundo primário)
- `--color-ink: #14261f` (texto primário)
- `--color-emerald: #10614a` (accent)
- `--color-emerald-deep: #0a1a14` (seções invertidas)

## Trocar tipografia

Em `src/app/layout.tsx` — troca as `<link>` tags do Google Fonts pra outra família. Ou usa `next/font/google` pra self-hosting otimizado.

## Copy bilíngue

Tudo em `src/lib/dictionary.ts`. TypeScript type-safe — se adicionar campo em EN, o compilador cobra em AR.
