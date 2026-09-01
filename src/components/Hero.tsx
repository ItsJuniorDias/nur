import type { Locale } from "@/lib/config";
import { brand } from "@/lib/config";
import { getDictionary } from "@/lib/dictionary";
import { HeroClient } from "./HeroClient";

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const wordmark = locale === "ar" ? brand.nameArabic : brand.name;

  return (
    <HeroClient
      locale={locale}
      wordmark={wordmark}
      eyebrow={t.hero.eyebrow}
      tagline={t.hero.tagline}
      ctaScroll={t.hero.ctaScroll}
    />
  );
}
