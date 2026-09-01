import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * Definição de todas as imagens que o site usa.
 * Mantida em UM lugar pra:
 *  - o script Python saber o que gerar (via export JSON)
 *  - safe zones e prompts ficarem versionados junto do código
 *  - trocar imagem = trocar arquivo em /public/images/
 *
 * O script `scripts/generate_images.py` lê estas mesmas
 * definições via `scripts/curation.py` (espelho manual —
 * mantenha os dois em sync se editar).
 */

export type SafeZone =
  | "center"
  | "bottom"
  | "top"
  | "left"
  | "right"
  | "full";

export type ImageId =
  | "hero-bg"
  | "manifesto-still-life"
  | "collection-fragrance"
  | "collection-skin"
  | "collection-adornment"
  | "ingredient-01"
  | "ingredient-02"
  | "ingredient-03"
  | "ingredient-04"
  | "og-image"
  // Product hero images
  | "product-fragrance-norte"
  | "product-fragrance-cerrado"
  | "product-fragrance-marulho"
  | "product-skin-cupuacu"
  | "product-skin-buriti"
  | "product-skin-mask"
  | "product-adornment-colonna"
  | "product-adornment-duna";

export type ImageDef = {
  id: ImageId;
  file: string; // caminho relativo a /public/
  width: number;
  height: number;
  safeZone: SafeZone;
  altEn: string;
  altAr: string;
};

export const images: Record<ImageId, ImageDef> = {
  "hero-bg": {
    id: "hero-bg",
    file: "/images/hero-bg.jpg",
    width: 2400,
    height: 1350,
    safeZone: "center",
    altEn: "Ambient sand-toned still life with soft mist and warm light",
    altAr: "طبيعة صامتة بلون رملي محيطي مع ضباب ناعم وضوء دافئ",
  },
  "manifesto-still-life": {
    id: "manifesto-still-life",
    file: "/images/manifesto-still-life.jpg",
    width: 1024,
    height: 1280,
    safeZone: "right",
    altEn: "Editorial still life of Brazilian raw material on natural linen",
    altAr: "طبيعة صامتة تحريرية لمادة برازيلية خام على كتّان طبيعي",
  },
  "collection-fragrance": {
    id: "collection-fragrance",
    file: "/images/collection-fragrance.jpg",
    width: 1024,
    height: 1280,
    safeZone: "bottom",
    altEn: "Amber unlabeled perfume bottle on raw linen",
    altAr: "قنينة عطر عنبرية بلا ملصق على كتّان خام",
  },
  "collection-skin": {
    id: "collection-skin",
    file: "/images/collection-skin.jpg",
    width: 1024,
    height: 1280,
    safeZone: "bottom",
    altEn: "Macro of a translucent balm on travertine",
    altAr: "لقطة قريبة لبلسم شفاف على حجر ترافرتين",
  },
  "collection-adornment": {
    id: "collection-adornment",
    file: "/images/collection-adornment.jpg",
    width: 1024,
    height: 1280,
    safeZone: "bottom",
    altEn: "Minimal architectural gold ring on light stone",
    altAr: "خاتم ذهبي معماري بسيط على حجر فاتح",
  },
  "ingredient-01": {
    id: "ingredient-01",
    file: "/images/ingredient-01.jpg",
    width: 1024,
    height: 1024,
    safeZone: "full",
    altEn: "Macro of Brazilian pau-brasil wood grain",
    altAr: "لقطة قريبة لحبيبات خشب باو-برازيل البرازيلي",
  },
  "ingredient-02": {
    id: "ingredient-02",
    file: "/images/ingredient-02.jpg",
    width: 1024,
    height: 1024,
    safeZone: "full",
    altEn: "Raw amber resin, close range",
    altAr: "راتنج عنبر خام، لقطة قريبة",
  },
  "ingredient-03": {
    id: "ingredient-03",
    file: "/images/ingredient-03.jpg",
    width: 1024,
    height: 1024,
    safeZone: "full",
    altEn: "Tropical flower petals resting on ivory paper",
    altAr: "بتلات زهرة استوائية تستقر على ورق عاجي",
  },
  "ingredient-04": {
    id: "ingredient-04",
    file: "/images/ingredient-04.jpg",
    width: 1024,
    height: 1024,
    safeZone: "full",
    altEn: "Rough quartz crystal on neutral background",
    altAr: "بلورة كوارتز خشنة على خلفية محايدة",
  },
  "og-image": {
    id: "og-image",
    file: "/images/og-image.jpg",
    width: 1200,
    height: 630,
    safeZone: "center",
    altEn: "NŪR — a modern atelier of scent, skin and adornment",
    altAr: "نور — دار معاصرة للعطر والعناية والحُلي",
  },
  // ─────────────── Product hero images ───────────────
  "product-fragrance-norte": {
    id: "product-fragrance-norte",
    file: "/images/product-fragrance-norte.jpg",
    width: 1024,
    height: 1280,
    safeZone: "full",
    altEn: "Norte — amber fragrance bottle",
    altAr: "نورتي — قنينة عطر عنبرية",
  },
  "product-fragrance-cerrado": {
    id: "product-fragrance-cerrado",
    file: "/images/product-fragrance-cerrado.jpg",
    width: 1024,
    height: 1280,
    safeZone: "full",
    altEn: "Cerrado — dry botanic fragrance bottle",
    altAr: "سيرادو — قنينة عطر نباتية جافة",
  },
  "product-fragrance-marulho": {
    id: "product-fragrance-marulho",
    file: "/images/product-fragrance-marulho.jpg",
    width: 1024,
    height: 1280,
    safeZone: "full",
    altEn: "Marulho — aquatic fragrance bottle",
    altAr: "مارولهو — قنينة عطر مائية",
  },
  "product-skin-cupuacu": {
    id: "product-skin-cupuacu",
    file: "/images/product-skin-cupuacu.jpg",
    width: 1024,
    height: 1280,
    safeZone: "full",
    altEn: "Cupuaçu balm — solid multi-use balm",
    altAr: "بلسم كوبواسو — بلسم صلب متعدد الاستخدامات",
  },
  "product-skin-buriti": {
    id: "product-skin-buriti",
    file: "/images/product-skin-buriti.jpg",
    width: 1024,
    height: 1280,
    safeZone: "full",
    altEn: "Buriti body oil — deep orange oil bottle",
    altAr: "زيت البوريتي — قنينة زيت برتقالية داكنة",
  },
  "product-skin-mask": {
    id: "product-skin-mask",
    file: "/images/product-skin-mask.jpg",
    width: 1024,
    height: 1280,
    safeZone: "full",
    altEn: "Pau-Brasil red clay mask jar",
    altAr: "علبة قناع طيني أحمر باو-برازيل",
  },
  "product-adornment-colonna": {
    id: "product-adornment-colonna",
    file: "/images/product-adornment-colonna.jpg",
    width: 1024,
    height: 1280,
    safeZone: "full",
    altEn: "Colonna — architectural gold signet ring",
    altAr: "كولونا — خاتم ذهبي معماري",
  },
  "product-adornment-duna": {
    id: "product-adornment-duna",
    file: "/images/product-adornment-duna.jpg",
    width: 1024,
    height: 1280,
    safeZone: "full",
    altEn: "Duna — brushed gold drop earrings pair",
    altAr: "دونا — زوج أقراط سقاطة من الذهب المصقول",
  },
};

type SafeImageProps = {
  id: ImageId;
  locale?: "en" | "ar";
  priority?: boolean;
  className?: string;
  sizes?: string;
  style?: CSSProperties;
  /** true = renderiza absolute (dentro de safe-zone container) */
  fill?: boolean;
};

/**
 * Renderiza uma imagem definida em `images` com next/image.
 * Se o arquivo real não existir ainda, o Next serve um 404 —
 * o `unoptimized` fallback garante que o site continue renderizando
 * durante desenvolvimento (o placeholder SVG entra pelo `onError`
 * nativo do <img>, mas next/image não expõe onError SSR;
 * placeholders SVG em /public/images/ evitam o 404 no primeiro dev).
 */
export function SafeImage({
  id,
  locale = "en",
  priority = false,
  className = "",
  sizes = "100vw",
  style,
  fill = false,
}: SafeImageProps) {
  const def = images[id];
  const alt = locale === "ar" ? def.altAr : def.altEn;

  if (fill) {
    return (
      <Image
        src={def.file}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`safe-zone-image ${className}`.trim()}
        style={style}
      />
    );
  }

  return (
    <Image
      src={def.file}
      alt={alt}
      width={def.width}
      height={def.height}
      priority={priority}
      sizes={sizes}
      className={className}
      style={style}
    />
  );
}
