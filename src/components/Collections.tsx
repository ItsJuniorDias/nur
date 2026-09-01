import Link from "next/link";
import type { Locale } from "@/lib/config";
import { getDictionary } from "@/lib/dictionary";
import type { ProductCategory } from "@/lib/products";
import { Reveal } from "./Reveal";
import { SafeImage } from "./SafeImage";
import type { ImageId } from "./SafeImage";

export function Collections({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const items: Array<{
    key: string;
    category: ProductCategory;
    imageId: ImageId;
    name: string;
    description: string;
  }> = [
    {
      key: "01",
      category: "fragrance",
      imageId: "collection-fragrance",
      name: t.collections.fragrance.name,
      description: t.collections.fragrance.description,
    },
    {
      key: "02",
      category: "skin",
      imageId: "collection-skin",
      name: t.collections.skin.name,
      description: t.collections.skin.description,
    },
    {
      key: "03",
      category: "adornment",
      imageId: "collection-adornment",
      name: t.collections.adornment.name,
      description: t.collections.adornment.description,
    },
  ];

  return (
    <section id="atelier" className="py-32 md:py-48 lg:py-56">
      <div className="container-luxe">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 mb-20 md:mb-28">
          <Reveal as="p" className="eyebrow text-emerald md:col-span-3 md:pt-3">
            {t.collections.eyebrow}
          </Reveal>
          <div className="md:col-span-9 flex flex-col gap-8">
            <Reveal as="h2" delay={1} className="display-xl">
              {t.collections.heading}
            </Reveal>
            <Reveal
              as="p"
              delay={2}
              className="body-lg text-ink/75 max-w-2xl"
            >
              {t.collections.subheading}
            </Reveal>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, i) => (
            <Reveal
              key={item.key}
              delay={((i + 1) as 1 | 2 | 3)}
            >
              <Link
                href={`/atelier?cat=${item.category}`}
                className="group flex flex-col gap-6"
                aria-label={`${item.name} — ${t.collections.exploreAtelier}`}
              >
                {/* Image card com safe zone bottom */}
                <div className="safe-zone safe-zone-overlay-bottom aspect-portrait bg-sand-soft rounded-none overflow-hidden">
                  <SafeImage
                    id={item.imageId}
                    locale={locale}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                  />

                  {/* Badge "coming soon" flutuante top-right em blur pill */}
                  <div className="absolute top-5 right-5 z-10 blur-pill-emerald px-3 py-1.5 rounded-full">
                    <span className="text-[10px] tracking-[0.24em] uppercase text-sand/90">
                      {t.collections.launchTag}
                    </span>
                  </div>

                  {/* Info bar flutuante bottom em blur — reage ao hover */}
                  <div className="absolute bottom-5 left-5 right-5 z-10 blur-overlay-emerald px-5 py-4 rounded-2xl flex items-center justify-between gap-4 transition-all duration-500 group-hover:bottom-6">
                    <span className="text-emerald-light text-[12px] tracking-[0.28em]">
                      {item.key}
                    </span>
                    <span className="text-sand/90 text-[13px] tracking-[0.16em] uppercase">
                      {item.name}
                    </span>
                  </div>
                </div>

                {/* Descrição abaixo da imagem */}
                <div className="flex flex-col gap-4 px-1">
                  <p className="text-[15px] leading-[1.6] text-ink/75 font-light">
                    {item.description}
                  </p>
                  <div className="hairline group-hover:bg-emerald/40 transition-colors duration-700" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* CTA pro atelier completo */}
        <Reveal delay={4} className="flex justify-center mt-20 md:mt-28">
          <Link
            href="/atelier"
            className="group inline-flex items-center gap-4 text-[13px] tracking-[0.24em] uppercase text-emerald hover:text-emerald-hover transition-colors duration-500"
          >
            <span>{t.collections.exploreAtelier}</span>
            <span
              aria-hidden
              className="block w-8 h-px bg-current transition-all duration-500 group-hover:w-14"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
