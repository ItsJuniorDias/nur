import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import type { Metadata } from "next";
import { defaultLocale, brand, type Locale } from "@/lib/config";
import { getDictionary } from "@/lib/dictionary";
import {
  findProduct,
  loc,
  products,
  productsByCategory,
} from "@/lib/products";
import { SafeImage, images } from "@/components/SafeImage";
import { AddToBag } from "@/components/shop/AddToBag";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) return {};

  const store = await cookies();
  const locale = ((store.get("locale")?.value as Locale) ??
    defaultLocale) as Locale;

  const name = loc(product.name, locale);
  const tagline = loc(product.tagline, locale);
  const description = loc(product.description, locale);
  const image = images[product.imageId];

  // Title format: "Norte — a slow oil parfum · NŪR"
  const title = `${name} — ${tagline.replace(/\.$/, "")} · ${brand.name}`;
  // Description: primeiros 155 chars da descrição real do produto (limite SEO)
  const metaDesc =
    description.length > 155
      ? description.slice(0, 152).trimEnd() + "…"
      : description;

  return {
    title,
    description: metaDesc,
    openGraph: {
      title,
      description: metaDesc,
      type: "website",
      siteName: brand.name,
      images: [
        {
          url: image.file,
          width: image.width,
          height: image.height,
          alt: locale === "ar" ? image.altAr : image.altEn,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: metaDesc,
      images: [image.file],
    },
    alternates: {
      canonical: `/atelier/${product.slug}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();

  const store = await cookies();
  const locale = ((store.get("locale")?.value as Locale) ??
    defaultLocale) as Locale;
  const t = getDictionary(locale);

  const others = productsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Breadcrumb / back */}
      <div className="container-luxe pt-32 md:pt-40 pb-6">
        <Link
          href="/atelier"
          className="text-[12px] tracking-[0.2em] uppercase text-ink/50 hover:text-emerald transition-colors"
        >
          ← {t.shop.backToAtelier}
        </Link>
      </div>

      {/* Product hero */}
      <section className="pb-24 md:pb-32">
        <div className="container-luxe grid md:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-start">
          {/* Image */}
          <Reveal className="md:col-span-7 md:sticky md:top-32">
            <div className="relative aspect-portrait bg-sand-soft overflow-hidden">
              <SafeImage
                id={product.imageId}
                locale={locale}
                priority
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
              />
              {product.soldOut && (
                <div className="absolute top-6 right-6 z-10 blur-pill-emerald px-4 py-2 rounded-full">
                  <span className="text-[10px] tracking-[0.24em] uppercase text-sand/95">
                    {t.shop.soldOut}
                  </span>
                </div>
              )}
            </div>
          </Reveal>

          {/* Info */}
          <div className="md:col-span-5 flex flex-col gap-10">
            <Reveal as="div" className="flex flex-col gap-4">
              <p className="eyebrow text-emerald">
                {t.shop[`filter${product.category.charAt(0).toUpperCase() +
                  product.category.slice(1)}` as
                  | "filterFragrance"
                  | "filterSkin"
                  | "filterAdornment"]}
              </p>
              <h1 className="heading-lg text-ink">
                {loc(product.name, locale)}
              </h1>
              <p className="body-lg text-ink/70">
                {loc(product.tagline, locale)}
              </p>
            </Reveal>

            <Reveal delay={1}>
              <div className="hairline" />
            </Reveal>

            {/* Add to bag (client component) */}
            <Reveal delay={2}>
              <AddToBag product={product} locale={locale} />
            </Reveal>

            <Reveal delay={3}>
              <div className="hairline" />
            </Reveal>

            {/* Description */}
            <Reveal delay={3} className="flex flex-col gap-4">
              <p className="text-[11px] tracking-[0.24em] uppercase text-ink/55">
                {t.shop.productDetails}
              </p>
              <p className="text-[15px] leading-[1.7] text-ink/80 font-light">
                {loc(product.description, locale)}
              </p>
            </Reveal>

            {/* Attributes */}
            <Reveal delay={4} className="flex flex-col gap-6">
              {product.attributes.notes && (
                <AttrBlock
                  label={t.shop.olfactoryNotes}
                  items={product.attributes.notes.map((n) => loc(n, locale))}
                />
              )}
              {product.attributes.ingredients && (
                <AttrBlock
                  label={t.shop.ingredients}
                  items={product.attributes.ingredients.map((i) =>
                    loc(i, locale)
                  )}
                />
              )}
              {product.attributes.origin && (
                <AttrLine
                  label={t.shop.origin}
                  value={loc(product.attributes.origin, locale)}
                />
              )}
              {product.attributes.material && (
                <AttrLine
                  label={t.shop.material}
                  value={loc(product.attributes.material, locale)}
                />
              )}
              {product.attributes.weight && (
                <AttrLine label={t.shop.weight} value={product.attributes.weight} />
              )}
              {product.attributes.made_in && (
                <AttrLine
                  label={t.shop.madeIn}
                  value={loc(product.attributes.made_in, locale)}
                />
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Other pieces */}
      {others.length > 0 && (
        <section className="py-24 md:py-32 border-t border-line">
          <div className="container-luxe">
            <Reveal as="h2" className="heading-lg text-ink mb-14 md:mb-20 text-center">
              {t.shop.otherPieces}
            </Reveal>
            <ProductGrid products={others} locale={locale} />
          </div>
        </section>
      )}

      <Footer locale={locale} />
    </main>
  );
}

function AttrBlock({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] tracking-[0.24em] uppercase text-ink/55">
        {label}
      </p>
      <ul className="flex flex-col gap-1">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-[14px] text-ink/75 font-light leading-relaxed"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AttrLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 pb-3 border-b border-line/60">
      <span className="text-[11px] tracking-[0.24em] uppercase text-ink/55">
        {label}
      </span>
      <span className="text-[14px] text-ink/85 font-light text-right">
        {value}
      </span>
    </div>
  );
}
