import { cookies } from "next/headers";
import Link from "next/link";
import { defaultLocale, type Locale } from "@/lib/config";
import { getDictionary } from "@/lib/dictionary";
import { products, type ProductCategory } from "@/lib/products";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

type SearchParams = { cat?: string };

export default async function AtelierPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const store = await cookies();
  const locale = ((store.get("locale")?.value as Locale) ??
    defaultLocale) as Locale;
  const t = getDictionary(locale);
  const params = await searchParams;

  const activeCategory =
    params.cat && ["fragrance", "skin", "adornment"].includes(params.cat)
      ? (params.cat as ProductCategory)
      : null;

  const filtered = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  const filters = [
    { key: null, label: t.shop.filterAll },
    { key: "fragrance" as const, label: t.shop.filterFragrance },
    { key: "skin" as const, label: t.shop.filterSkin },
    { key: "adornment" as const, label: t.shop.filterAdornment },
  ];

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="pt-40 md:pt-48 pb-16 md:pb-20">
        <div className="container-luxe">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-end">
            <div className="md:col-span-8 flex flex-col gap-6">
              <Reveal as="p" className="eyebrow text-emerald">
                {t.collections.eyebrow}
              </Reveal>
              <Reveal as="h1" delay={1} className="display-xl">
                {t.shop.heading}
              </Reveal>
              <Reveal
                as="p"
                delay={2}
                className="body-lg text-ink/70 max-w-xl"
              >
                {t.shop.subheading}
              </Reveal>
            </div>
          </div>

          {/* Filtros */}
          <Reveal delay={3} className="flex flex-wrap gap-1 mt-14 md:mt-20 border-b border-line">
            {filters.map((f) => {
              const isActive =
                (f.key === null && activeCategory === null) ||
                f.key === activeCategory;
              const href = f.key ? `/atelier?cat=${f.key}` : "/atelier";
              return (
                <Link
                  key={String(f.key)}
                  href={href}
                  className={`
                    px-5 py-3 text-[12px] tracking-[0.24em] uppercase font-medium transition-colors duration-500
                    border-b-2 -mb-px
                    ${isActive
                      ? "text-emerald border-emerald"
                      : "text-ink/50 border-transparent hover:text-ink"}
                  `}
                >
                  {f.label}
                </Link>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-32 md:pb-48">
        <div className="container-luxe">
          {filtered.length === 0 ? (
            <p className="text-center text-ink/50 body-lg py-20">
              {t.shop.empty}
            </p>
          ) : (
            <ProductGrid products={filtered} locale={locale} />
          )}
        </div>
      </section>

      <Footer locale={locale} />
    </main>
  );
}
