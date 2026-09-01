"use client";

import { useTransition } from "react";
import type { Locale } from "@/lib/config";

/**
 * Toggle EN ↔ AR. Salva cookie e recarrega pra SSR aplicar dir/lang/fonte correta.
 */
export function LanguageToggle({ current }: { current: Locale }) {
  const [isPending, startTransition] = useTransition();
  const next: Locale = current === "en" ? "ar" : "en";

  const swap = () => {
    startTransition(() => {
      // Cookie 1 ano, path root, SameSite Lax
      document.cookie = `locale=${next}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
      window.location.reload();
    });
  };

  return (
    <button
      type="button"
      onClick={swap}
      disabled={isPending}
      aria-label={
        current === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"
      }
      className="group flex items-center gap-2 text-[13px] tracking-[0.12em] uppercase text-ink/75 transition-colors duration-500 hover:text-emerald disabled:opacity-50"
    >
      <span
        className={current === "en" ? "text-ink" : ""}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        EN
      </span>
      <span className="text-ink/35">/</span>
      <span
        className={current === "ar" ? "text-ink" : ""}
        style={{ fontFamily: "var(--font-arabic-inject)" }}
      >
        عربي
      </span>
    </button>
  );
}
