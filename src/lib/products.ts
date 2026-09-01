import type { Locale } from "./config";
import type { ImageId } from "@/components/SafeImage";

export type ProductCategory = "fragrance" | "skin" | "adornment";

export type ProductVariant = {
  id: string;
  label: { en: string; ar: string };
  priceUSD: number;
  stock: number; // fake stock; 0 = sold out
};

export type Product = {
  slug: string;
  category: ProductCategory;
  imageId: ImageId; // hero image
  featured?: boolean;
  soldOut?: boolean; // override — quando queremos mostrar o estado UI
  /**
   * Se preenchido, o produto vira pre-order:
   * botão "Add to bag" é substituído por "Pre-order · Ships in 4-6 weeks"
   * que redireciona direto pro Stripe Payment Link (fora do cart mockup).
   *
   * Quando NULL → produto continua no fluxo cart Zustand + /checkout mockup.
   */
  stripePaymentUrl?: string;
  name: { en: string; ar: string };
  tagline: { en: string; ar: string };
  description: { en: string; ar: string };
  variants: ProductVariant[];
  // notas / ingredientes / material — depende da categoria
  attributes: {
    // fragrance & skin
    notes?: { en: string; ar: string }[]; // olfactory notes
    ingredients?: { en: string; ar: string }[];
    origin?: { en: string; ar: string };
    // adornment
    material?: { en: string; ar: string };
    weight?: string;
    made_in?: { en: string; ar: string };
  };
};

/**
 * Formata preço em USD.
 * Se um dia trocar pra AED/BRL, muda aqui.
 */
export function formatPrice(cents: number, locale: Locale = "en"): string {
  const value = cents;
  const bcp47 = locale === "ar" ? "ar-AE" : "en-US";
  return new Intl.NumberFormat(bcp47, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Localiza uma string bilíngue.
 */
export function loc<T extends { en: string; ar: string }>(
  field: T,
  locale: Locale
): string {
  return locale === "ar" ? field.ar : field.en;
}

// ═════════════════════════════════════════════════════════════
// CATALOG — 8 SKUs
// ═════════════════════════════════════════════════════════════

export const products: Product[] = [
  // ─── FRAGRANCE ─────────────────────────────────────────────
  {
    slug: "norte",
    category: "fragrance",
    imageId: "product-fragrance-norte",
    featured: true,
    stripePaymentUrl: "https://buy.stripe.com/fZufZjbpZ36taae9xk5sA06",
    name: { en: "Norte", ar: "نورتي" },
    tagline: {
      en: "The signature. Amber, oud, Amazonian rosewood.",
      ar: "التوقيع. عنبر، عود، خشب الورد الأمازوني.",
    },
    description: {
      en: "A slow oil parfum. Wild-harvested Amazonian rosewood and Omani oud, held in a base of Brazil nut oil. Applied by dropper at the pulse — close, warm, and lasting for twelve hours. No alcohol. Halal-compatible.",
      ar: "عطر زيتي بطيء. خشب الورد الأمازوني البري والعود العماني، محمولان في قاعدة من زيت جوز البرازيل. يُوضع بالقطارة على النبض — قريب، دافئ، ويدوم اثنتي عشرة ساعة. خالٍ من الكحول. متوافق مع الحلال.",
    },
    // 15ml removido temporariamente — precisa Payment Link próprio (mesmo preço = mesmo link não serve, Stripe fixa preço no link)
    variants: [
      { id: "30ml", label: { en: "30 ml", ar: "٣٠ مل" }, priceUSD: 285, stock: 8 },
    ],
    attributes: {
      notes: [
        { en: "Bergamot · Pink pepper", ar: "برغموت · فلفل وردي" },
        { en: "Omani oud · Rosewood", ar: "عود عماني · خشب الورد" },
        { en: "Labdanum · Vetiver · Amber", ar: "لبدانوم · نجيل الهند · عنبر" },
      ],
      origin: { en: "São Paulo · Slow-blended in small batches", ar: "ساو باولو · مُمزوج ببطء في دفعات صغيرة" },
    },
  },
  {
    slug: "cerrado",
    category: "fragrance",
    imageId: "product-fragrance-cerrado",
    stripePaymentUrl: "https://buy.stripe.com/eVqdRb9hRcH36Y210O5sA05",
    name: { en: "Cerrado", ar: "سيرادو" },
    tagline: {
      en: "Dry heat. Ipê blossom, cedar, coriander.",
      ar: "حرارة جافة. زهر الإيبي، الأرز، الكزبرة.",
    },
    description: {
      en: "A dry oil composition inspired by the Brazilian savannah at midday. Coriander and pink pepper meet the honeyed sweetness of ipê blossom, held in a light base of buriti oil. Linear, close to the skin, present for ten hours. No alcohol. Halal-compatible.",
      ar: "تركيبة زيتية جافة مستوحاة من السافانا البرازيلية في منتصف النهار. تلتقي الكزبرة والفلفل الوردي بحلاوة زهر الإيبي، محمولة في قاعدة خفيفة من زيت البوريتي. خطية، قريبة من البشرة، حاضرة لعشر ساعات. خالٍ من الكحول. متوافق مع الحلال.",
    },
    // 15ml removido temporariamente — precisa Payment Link próprio
    variants: [
      { id: "30ml", label: { en: "30 ml", ar: "٣٠ مل" }, priceUSD: 245, stock: 10 },
    ],
    attributes: {
      notes: [
        { en: "Coriander · Pink pepper · Petitgrain", ar: "كزبرة · فلفل وردي · بيتيتغرين" },
        { en: "Ipê blossom · Immortelle", ar: "زهر الإيبي · إمورتيل" },
        { en: "Brazilian cedar · Dry musk", ar: "أرز برازيلي · مسك جاف" },
      ],
      origin: { en: "São Paulo · Slow-blended in small batches", ar: "ساو باولو · مُمزوج ببطء في دفعات صغيرة" },
    },
  },
  {
    slug: "marulho",
    category: "fragrance",
    imageId: "product-fragrance-marulho",
    stripePaymentUrl: "https://buy.stripe.com/28E5kF0LlbCZ0zE8tg5sA08",
    name: { en: "Marulho", ar: "مارولهو" },
    tagline: {
      en: "The sound of the sea. Salt, palo santo, sea moss.",
      ar: "صوت البحر. ملح، بالو سانتو، طحلب البحر.",
    },
    description: {
      en: "An attar-style oil concentrate built around Peruvian palo santo and Brazilian sea salt tincture. Applied by glass stick at the wrist. Cool, meditative, closer to a memory than a scent. Limited to 300 numbered bottles. No alcohol. Halal-compatible.",
      ar: "مركّز زيتي على طريقة العطر التقليدي، مبني على البالو سانتو البيروفي وصبغة ملح البحر البرازيلي. يُوضع بعصا زجاجية على المعصم. بارد، تأملي، أقرب إلى ذكرى منه إلى عطر. محدود بـ ٣٠٠ زجاجة مرقمة. خالٍ من الكحول. متوافق مع الحلال.",
    },
    variants: [
      { id: "12ml", label: { en: "12 ml · attar", ar: "١٢ مل · عطر" }, priceUSD: 195, stock: 42 },
    ],
    attributes: {
      notes: [
        { en: "Sea salt · Green mandarin · Aldehydes", ar: "ملح البحر · يوسفي أخضر · ألدهيدات" },
        { en: "Palo santo · Sea moss", ar: "بالو سانتو · طحلب البحر" },
        { en: "Ambergris · White musk", ar: "عنبر · مسك أبيض" },
      ],
      origin: { en: "São Paulo · 300 numbered pieces", ar: "ساو باولو · ٣٠٠ قطعة مرقمة" },
    },
  },
  // ─── SKIN ──────────────────────────────────────────────────
  {
    slug: "cupuacu",
    category: "skin",
    imageId: "product-skin-cupuacu",
    featured: true,
    stripePaymentUrl: "https://buy.stripe.com/8x29AVgKjcH3equ7pc5sA07",
    name: { en: "Bálsamo · Cupuaçu", ar: "بلسم · كوبواسو" },
    tagline: {
      en: "Solid facial balm with Amazonian cupuaçu butter.",
      ar: "بلسم وجه صلب بزبدة الكوبواسو الأمازونية.",
    },
    description: {
      en: "A dense multi-use balm built on wild-harvested cupuaçu butter — three times the hydration capacity of shea. Softens on contact with skin. For dry areas, lips, cuticles, hair ends.",
      ar: "بلسم كثيف متعدد الاستخدامات مبني على زبدة الكوبواسو البرية — ثلاثة أضعاف قدرة الترطيب مقارنة بالشيا. يذوب عند ملامسة البشرة. للمناطق الجافة والشفاه والأظافر وأطراف الشعر.",
    },
    variants: [
      { id: "50ml", label: { en: "50 ml", ar: "٥٠ مل" }, priceUSD: 95, stock: 24 },
    ],
    attributes: {
      ingredients: [
        { en: "Cupuaçu (Theobroma grandiflorum) butter", ar: "زبدة كوبواسو" },
        { en: "Brazil nut oil", ar: "زيت جوز البرازيل" },
        { en: "Beeswax · Vitamin E", ar: "شمع النحل · فيتامين هـ" },
      ],
      origin: { en: "Cerrado, Brazil · Cold-pressed", ar: "سيرادو، البرازيل · معصور على البارد" },
    },
  },
  {
    slug: "buriti",
    category: "skin",
    imageId: "product-skin-buriti",
    stripePaymentUrl: "https://buy.stripe.com/fZu3cxeCb9uR1DI9xk5sA03",
    name: { en: "Óleo · Buriti", ar: "زيت · بوريتي" },
    tagline: {
      en: "Body oil with buriti + Amazonian copaíba.",
      ar: "زيت للجسم مع البوريتي وكوبايبا الأمازونية.",
    },
    description: {
      en: "A deep-orange body oil built on buriti — the highest natural source of pro-vitamin A on the planet. Fast-absorbing, faintly resinous, non-greasy. Apply to damp skin after shower.",
      ar: "زيت جسم برتقالي عميق مبني على البوريتي — أعلى مصدر طبيعي لفيتامين أ على هذا الكوكب. سريع الامتصاص، راتنجي خفيف، غير دهني. يوضع على البشرة الرطبة بعد الاستحمام.",
    },
    // 200ml removido temporariamente — precisa Payment Link próprio
    variants: [
      { id: "100ml", label: { en: "100 ml", ar: "١٠٠ مل" }, priceUSD: 85, stock: 18 },
    ],
    attributes: {
      ingredients: [
        { en: "Buriti (Mauritia flexuosa) oil", ar: "زيت البوريتي" },
        { en: "Copaíba balsam", ar: "بلسم الكوبايبا" },
        { en: "Sweet almond oil · Vitamin E", ar: "زيت اللوز الحلو · فيتامين هـ" },
      ],
      origin: { en: "Amazonas · Wild-harvested", ar: "أمازوناس · حصاد بري" },
    },
  },
  {
    slug: "pau-brasil-mask",
    category: "skin",
    imageId: "product-skin-mask",
    stripePaymentUrl: "https://buy.stripe.com/5kQ5kFgKj22p2HMbFs5sA02",
    name: { en: "Máscara · Pau-Brasil", ar: "قناع · باو-برازيل" },
    tagline: {
      en: "Ceremonial red clay mask.",
      ar: "قناع طيني أحمر احتفالي.",
    },
    description: {
      en: "A weekly detox mask built on iron-rich red clay from Bahia — the same terroir that pau-brasil grows in. Mix with water to a paste. Draws impurities, leaves skin soft. Not for daily use.",
      ar: "قناع أسبوعي للتخلص من السموم مبني على الطين الأحمر الغني بالحديد من باهيا — نفس الأرض التي ينمو فيها باو-برازيل. يُخلط بالماء ليصبح عجينة. يسحب الشوائب، ويترك البشرة ناعمة. ليس للاستخدام اليومي.",
    },
    variants: [
      { id: "75g", label: { en: "75 g", ar: "٧٥ جم" }, priceUSD: 75, stock: 30 },
    ],
    attributes: {
      ingredients: [
        { en: "Kaolin red clay · Illite", ar: "طين كاولين أحمر · إيليت" },
        { en: "Powdered pau-brasil bark", ar: "لحاء باو-برازيل مسحوق" },
        { en: "White sage · Iron oxide", ar: "مريمية بيضاء · أكسيد الحديد" },
      ],
      origin: { en: "Bahia · Small-batch", ar: "باهيا · دفعات صغيرة" },
    },
  },
  // ─── ADORNMENT ─────────────────────────────────────────────
  {
    slug: "colonna",
    category: "adornment",
    imageId: "product-adornment-colonna",
    featured: true,
    stripePaymentUrl: "https://buy.stripe.com/aFaeVffGf22pgyC5h45sA01",
    name: { en: "Colonna", ar: "كولونا" },
    tagline: {
      en: "Architectural signet band. Recycled 18k gold.",
      ar: "خاتم معماري. ذهب معاد تدويره عيار ١٨.",
    },
    description: {
      en: "A single wide band with one clean geometric facet, cast in recycled 18-karat yellow gold. Made by hand in São Paulo by a third-generation goldsmith. Each ring is finished to the wearer's size — allow four weeks.",
      ar: "خاتم واسع بواجهة هندسية نظيفة واحدة، مصبوب من ذهب أصفر معاد تدويره عيار ١٨. مصنوع يدوياً في ساو باولو على يد صائغ من الجيل الثالث. كل خاتم مُجهز بمقاس مرتديه — يُسمح بأربعة أسابيع.",
    },
    variants: [
      { id: "size-5", label: { en: "US 5", ar: "٥ US" }, priceUSD: 890, stock: 3 },
      { id: "size-6", label: { en: "US 6", ar: "٦ US" }, priceUSD: 890, stock: 3 },
      { id: "size-7", label: { en: "US 7", ar: "٧ US" }, priceUSD: 890, stock: 3 },
      { id: "size-8", label: { en: "US 8", ar: "٨ US" }, priceUSD: 890, stock: 3 },
      { id: "size-9", label: { en: "US 9", ar: "٩ US" }, priceUSD: 890, stock: 3 },
      { id: "size-10", label: { en: "US 10", ar: "١٠ US" }, priceUSD: 890, stock: 3 },
    ],
    attributes: {
      material: { en: "Recycled 18k yellow gold", ar: "ذهب أصفر معاد تدويره عيار ١٨" },
      weight: "6.4 g",
      made_in: { en: "São Paulo · By hand", ar: "ساو باولو · بالأيدي" },
    },
  },
  {
    slug: "duna",
    category: "adornment",
    imageId: "product-adornment-duna",
    stripePaymentUrl: "https://buy.stripe.com/9B628t1PpcH396afVI5sA00",
    name: { en: "Duna", ar: "دونا" },
    tagline: {
      en: "Drop earrings in brushed 18k gold.",
      ar: "أقراط سقاطة من الذهب المصقول عيار ١٨.",
    },
    description: {
      en: "A pair of small architectural drops in brushed recycled 18-karat gold. Weighted to sit close to the earlobe. Post fastening. Sold as a pair.",
      ar: "زوج من القطرات المعمارية الصغيرة من الذهب المعاد تدويره المصقول عيار ١٨. موزونة لتستقر قريبة من شحمة الأذن. تثبيت بمسمار. تُباع كزوج.",
    },
    variants: [
      { id: "pair", label: { en: "Pair", ar: "زوج" }, priceUSD: 520, stock: 6 },
    ],
    attributes: {
      material: { en: "Recycled 18k yellow gold · Brushed finish", ar: "ذهب أصفر معاد تدويره عيار ١٨ · تشطيب مصقول" },
      weight: "3.2 g / pair",
      made_in: { en: "São Paulo · By hand", ar: "ساو باولو · بالأيدي" },
    },
  },
];

// ═════════════════════════════════════════════════════════════
// Helpers
// ═════════════════════════════════════════════════════════════

export function findProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function findVariant(product: Product, variantId: string): ProductVariant | undefined {
  return product.variants.find((v) => v.id === variantId);
}

export function isSoldOut(product: Product): boolean {
  if (product.soldOut) return true;
  return product.variants.every((v) => v.stock === 0);
}
