"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/config";
import { getDictionary } from "@/lib/dictionary";
import { Reveal } from "./Reveal";

type Status = "idle" | "loading" | "success" | "error";

export function Signup({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, whatsapp, locale }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      // Track em pixels se disponíveis
      if (typeof window !== "undefined") {
        // @ts-expect-error - fbq is injected
        window.fbq?.("track", "Lead");
        // @ts-expect-error - ttq is injected
        window.ttq?.track?.("SubmitForm");
        // @ts-expect-error - snaptr is injected
        window.snaptr?.("track", "SIGN_UP");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="circle"
      className="emerald-section py-32 md:py-48 lg:py-56"
    >
      <div className="container-luxe max-w-3xl mx-auto text-center flex flex-col gap-10 md:gap-14">
        <Reveal as="p" className="eyebrow text-emerald-light">
          {t.signup.eyebrow}
        </Reveal>
        <Reveal as="h2" delay={1} className="display-xl">
          {t.signup.heading}
        </Reveal>
        <Reveal as="p" delay={2} className="body-lg text-sand/60 max-w-xl mx-auto">
          {t.signup.body}
        </Reveal>

        {status === "success" ? (
          <Reveal delay={3} className="mt-4 flex flex-col gap-4">
            <div className="hairline mx-auto max-w-md" />
            <h3 className="heading-lg text-emerald-light">
              {t.signup.successTitle}
            </h3>
            <p className="body-lg text-sand/60">{t.signup.successBody}</p>
          </Reveal>
        ) : (
          <Reveal
            as="section"
            delay={3}
            className="mt-4 flex flex-col gap-5 max-w-xl mx-auto w-full"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="sr-only" htmlFor="email">
                {t.signup.emailLabel}
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.signup.emailPlaceholder}
                disabled={status === "loading"}
                className="w-full bg-transparent border-b border-sand/25 focus:border-emerald-light text-sand placeholder:text-sand/30 text-lg py-4 px-1 outline-none transition-colors duration-500"
                dir="ltr"
              />

              <label className="sr-only" htmlFor="whatsapp">
                {t.signup.whatsappLabel}
              </label>
              <input
                id="whatsapp"
                type="tel"
                autoComplete="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder={t.signup.whatsappPlaceholder}
                disabled={status === "loading"}
                className="w-full bg-transparent border-b border-sand/25 focus:border-emerald-light text-sand placeholder:text-sand/30 text-lg py-4 px-1 outline-none transition-colors duration-500"
                dir="ltr"
              />

              <button
                type="submit"
                disabled={status === "loading" || !email}
                className="mt-6 inline-flex items-center justify-center gap-3 self-center px-10 py-4 rounded-full bg-sand text-emerald-deep text-[13px] tracking-[0.24em] uppercase font-medium transition-all duration-500 hover:bg-emerald-light hover:text-emerald-deep disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === "loading"
                  ? t.signup.submitting
                  : t.signup.submit}
              </button>
            </form>

            {status === "error" && (
              <p className="text-sm text-red-300/90">
                {t.signup.errorTitle} {t.signup.errorBody}
              </p>
            )}

            <p className="text-[11px] tracking-[0.08em] text-sand/40 leading-relaxed max-w-md mx-auto">
              {t.signup.consent}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
