import { cookies } from "next/headers";
import Link from "next/link";
import { defaultLocale, type Locale } from "@/lib/config";
import { getDictionary } from "@/lib/dictionary";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Thank you · NŪR",
  robots: { index: false, follow: false },
};

export default async function ThanksPage({
  params,
}: {
  params: Promise<{ order: string }>;
}) {
  const { order } = await params;
  const store = await cookies();
  const locale = ((store.get("locale")?.value as Locale) ??
    defaultLocale) as Locale;
  const t = getDictionary(locale);

  return (
    <main className="min-h-screen flex flex-col">
      <section className="flex-1 flex items-center justify-center pt-32 pb-24 px-6">
        <div className="max-w-lg w-full flex flex-col items-center gap-10 text-center">
          {/* Sparkle svg icon */}
          <Reveal>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-emerald"
            >
              <path d="M24 8 L24 40 M8 24 L40 24 M14 14 L34 34 M34 14 L14 34" />
              <circle cx="24" cy="24" r="3" fill="currentColor" />
            </svg>
          </Reveal>

          <Reveal delay={1} as="h1" className="display-xl">
            {t.confirmation.heading}
          </Reveal>

          <Reveal delay={2} as="p" className="body-lg text-ink/70 max-w-md">
            {t.confirmation.body}
          </Reveal>

          <Reveal delay={2}>
            <div className="hairline w-24" />
          </Reveal>

          <Reveal delay={3} className="flex flex-col gap-2">
            <p className="text-[11px] tracking-[0.24em] uppercase text-ink/50">
              {t.confirmation.orderNumber}
            </p>
            <p className="text-[18px] font-light text-ink tabular-nums tracking-[0.08em]">
              {order}
            </p>
          </Reveal>

          <Reveal delay={4} className="flex flex-col items-center gap-6 mt-6">
            <Link
              href="/atelier"
              className="text-[13px] tracking-[0.24em] uppercase text-emerald hover:text-emerald-hover transition-colors"
            >
              {t.confirmation.continueShopping}
            </Link>
            <p className="text-[12px] text-ink/45">
              {t.confirmation.supportNote}
            </p>
          </Reveal>
        </div>
      </section>

      <Footer locale={locale} />
    </main>
  );
}
