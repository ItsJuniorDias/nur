import type { Locale } from "@/lib/config";
import { getDictionary } from "@/lib/dictionary";
import { Reveal } from "./Reveal";
import { SafeImage } from "./SafeImage";

export function Manifesto({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section
      id="manifesto"
      className="emerald-section py-32 md:py-48 lg:py-56 overflow-hidden"
    >
      <div className="container-luxe grid md:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-center">
        {/* Imagem — safe zone right = assunto à esquerda, área direita limpa */}
        <Reveal
          className="md:col-span-5 relative aspect-portrait w-full overflow-hidden bg-emerald-deep-soft"
        >
          <SafeImage
            id="manifesto-still-life"
            locale={locale}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          {/* Hairline flutuante estilo Apple */}
          <div className="absolute bottom-6 left-6 right-6 z-10 blur-overlay-emerald px-5 py-3 rounded-full">
            <p className="text-[11px] tracking-[0.28em] uppercase text-sand/85">
              {t.manifesto.imageCaption}
            </p>
          </div>
        </Reveal>

        {/* Texto */}
        <div className="md:col-span-7 flex flex-col gap-8 md:gap-12">
          <Reveal as="p" className="eyebrow text-emerald-light">
            {t.manifesto.eyebrow}
          </Reveal>

          <Reveal as="h2" delay={1} className="display-xl">
            {t.manifesto.heading}
          </Reveal>

          <Reveal
            delay={2}
            className="w-full h-px bg-sand/25"
          />

          <Reveal
            as="p"
            delay={3}
            className="body-lg text-sand/70 max-w-2xl"
          >
            {t.manifesto.body}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
