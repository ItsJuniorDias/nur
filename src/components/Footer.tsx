import type { Locale } from "@/lib/config";
import { brand } from "@/lib/config";
import { getDictionary } from "@/lib/dictionary";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const wordmark = locale === "ar" ? brand.nameArabic : brand.name;
  const year = new Date().getFullYear();

  return (
    <footer className="py-16 md:py-20 border-t border-line">
      <div className="container-luxe flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <span
            className="text-[15px] tracking-[0.4em] text-ink font-light"
            style={{
              fontFamily:
                locale === "ar"
                  ? "var(--font-arabic-inject)"
                  : "var(--font-inter)",
            }}
          >
            {wordmark}
          </span>
          <span className="hidden md:block h-4 w-px bg-line-strong" />
          <span className="text-[12px] tracking-[0.16em] uppercase text-ink/55">
            {t.footer.tagline}
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-[12px] tracking-[0.12em] text-ink/55">
          <a
            href={`mailto:${brand.email}`}
            className="hover:text-emerald transition-colors duration-500"
          >
            {brand.email}
          </a>
          <span className="hidden md:block h-1 w-1 rounded-full bg-ink/28" />
          <span>{t.footer.based}</span>
        </div>

        <p className="text-[11px] tracking-[0.12em] uppercase text-ink/40">
          © {year} · {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
