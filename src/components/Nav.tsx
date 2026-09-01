import Link from "next/link";
import type { Locale } from "@/lib/config";
import { brand } from "@/lib/config";
import { getDictionary } from "@/lib/dictionary";
import { LanguageToggle } from "./LanguageToggle";
import { CartToggle } from "./shop/CartToggle";

export function Nav({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const wordmark = locale === "ar" ? brand.nameArabic : brand.name;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 blur-nav-sand">
      <div className="container-luxe flex items-center justify-between py-4 md:py-5">
        <Link
          href="/"
          className="text-[15px] tracking-[0.4em] font-light text-ink hover:text-emerald transition-colors duration-500"
          aria-label={brand.name}
        >
          {wordmark}
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <Link
            href="/#manifesto"
            className="text-[13px] tracking-[0.16em] uppercase text-ink/75 hover:text-ink transition-colors duration-500"
          >
            {t.nav.story}
          </Link>
          <Link
            href="/#ingredients"
            className="text-[13px] tracking-[0.16em] uppercase text-ink/75 hover:text-ink transition-colors duration-500"
          >
            {t.nav.ingredients}
          </Link>
          <Link
            href="/atelier"
            className="text-[13px] tracking-[0.16em] uppercase text-emerald hover:text-emerald-hover transition-colors duration-500"
          >
            {t.nav.collections}
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          <LanguageToggle current={locale} />
          <CartToggle label={t.nav.cart} />
        </div>
      </div>
      <div className="hairline" />
    </header>
  );
}
