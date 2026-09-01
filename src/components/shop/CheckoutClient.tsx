"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useMemo } from "react";
import type { Locale } from "@/lib/config";
import { useCart } from "@/lib/cart";
import {
  findProduct,
  findVariant,
  formatPrice,
  loc,
} from "@/lib/products";
import { getDictionary } from "@/lib/dictionary";
import { SafeImage } from "@/components/SafeImage";

export function CheckoutClient({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const router = useRouter();
  const { lines, clear } = useCart();
  const [submitting, setSubmitting] = useState(false);

  const enriched = useMemo(
    () =>
      lines
        .map((line) => {
          const product = findProduct(line.productSlug);
          const variant = product
            ? findVariant(product, line.variantId)
            : undefined;
          if (!product || !variant) return null;
          return { line, product, variant };
        })
        .filter((x): x is NonNullable<typeof x> => x !== null),
    [lines]
  );

  const subtotal = enriched.reduce(
    (sum, { line, variant }) => sum + variant.priceUSD * line.quantity,
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simula processamento
    await new Promise((r) => setTimeout(r, 1400));
    const orderNumber = `NUR-${Date.now().toString().slice(-8)}`;
    clear();
    router.push(`/checkout/thanks/${orderNumber}`);
  };

  if (enriched.length === 0) {
    return (
      <main className="min-h-screen pt-40 flex flex-col items-center justify-center gap-8 px-6">
        <p className="body-lg text-ink/60">{t.cart.empty}</p>
        <Link
          href="/atelier"
          className="text-[13px] tracking-[0.24em] uppercase text-emerald hover:text-emerald-hover"
        >
          {t.cart.browseAtelier}
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 md:pt-40 pb-24">
      <div className="container-luxe">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6">
          <Link
            href="/atelier"
            className="text-[12px] tracking-[0.2em] uppercase text-ink/50 hover:text-emerald transition-colors self-start"
          >
            {t.checkout.backToCart}
          </Link>
          <h1 className="display-xl">{t.checkout.heading}</h1>
        </div>

        {/* Mock notice */}
        <div className="mb-14 blur-pill-sand border-emerald/30 rounded-none px-6 py-4">
          <p className="text-[12px] tracking-[0.06em] text-emerald leading-relaxed">
            {t.checkout.mockNote}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-12 gap-10 md:gap-16 lg:gap-24"
        >
          {/* Left: Forms */}
          <div className="md:col-span-7 flex flex-col gap-14">
            {/* Contact */}
            <Section title={t.checkout.contactSection}>
              <Input label={t.checkout.emailLabel} type="email" required />
              <Input label={t.checkout.phone} type="tel" required />
            </Section>

            {/* Shipping */}
            <Section title={t.checkout.shippingSection}>
              <div className="grid grid-cols-2 gap-4">
                <Input label={t.checkout.firstName} required />
                <Input label={t.checkout.lastName} required />
              </div>
              <Input label={t.checkout.address1} required />
              <Input label={t.checkout.address2} />
              <div className="grid grid-cols-2 gap-4">
                <Input label={t.checkout.city} required />
                <Input label={t.checkout.postalCode} required />
              </div>
              <SelectInput
                label={t.checkout.country}
                options={[
                  "United Arab Emirates",
                  "Kuwait",
                  "Qatar",
                  "Saudi Arabia",
                  "Bahrain",
                  "Oman",
                ]}
              />
            </Section>

            {/* Payment */}
            <Section title={t.checkout.paymentSection}>
              <Input
                label={t.checkout.cardNumber}
                placeholder="4242 4242 4242 4242"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label={t.checkout.cardExpiry}
                  placeholder="12 / 28"
                  required
                />
                <Input label={t.checkout.cardCvc} placeholder="123" required />
              </div>
              <Input label={t.checkout.cardName} required />
            </Section>
          </div>

          {/* Right: Order summary */}
          <aside className="md:col-span-5 md:sticky md:top-32 md:self-start">
            <div className="bg-sand-soft/50 border border-line p-6 md:p-8 flex flex-col gap-6">
              <h2 className="eyebrow text-emerald">
                {t.checkout.orderSummary}
              </h2>

              <div className="flex flex-col gap-4">
                {enriched.map(({ line, product, variant }) => (
                  <div
                    key={`${line.productSlug}-${line.variantId}`}
                    className="flex gap-4"
                  >
                    <div className="relative w-16 h-20 flex-shrink-0 bg-sand overflow-hidden">
                      <SafeImage
                        id={product.imageId}
                        locale={locale}
                        fill
                        sizes="64px"
                      />
                      <span className="absolute -top-2 -right-2 min-w-[20px] h-[20px] px-1 rounded-full bg-emerald text-sand text-[11px] font-medium tabular-nums flex items-center justify-center">
                        {line.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] text-ink font-light truncate">
                        {loc(product.name, locale)}
                      </p>
                      <p className="text-[12px] text-ink/50">
                        {loc(variant.label, locale)}
                      </p>
                    </div>
                    <span className="text-[14px] font-light text-ink tabular-nums">
                      {formatPrice(variant.priceUSD * line.quantity, locale)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="hairline" />

              <div className="flex flex-col gap-2 text-[14px]">
                <div className="flex justify-between">
                  <span className="text-ink/60">{t.checkout.subtotal}</span>
                  <span className="text-ink font-light tabular-nums">
                    {formatPrice(subtotal, locale)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink/60">{t.checkout.shipping}</span>
                  <span className="text-emerald font-light">
                    {t.checkout.shippingFree}
                  </span>
                </div>
              </div>

              <div className="hairline" />

              <div className="flex items-baseline justify-between">
                <span className="text-[13px] tracking-[0.2em] uppercase text-ink">
                  {t.checkout.total}
                </span>
                <span className="text-[22px] font-light text-ink tabular-nums">
                  {formatPrice(subtotal, locale)}
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-emerald text-sand text-[13px] tracking-[0.24em] uppercase font-medium py-4 hover:bg-emerald-hover transition-colors disabled:opacity-60 disabled:cursor-wait"
              >
                {submitting ? t.checkout.placing : t.checkout.placeOrder}
              </button>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="eyebrow text-emerald pb-3 border-b border-line">
        {title}
      </h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

function Input({
  label,
  ...props
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] tracking-[0.16em] uppercase text-ink/60">
        {label}
      </span>
      <input
        {...props}
        className="w-full bg-transparent border-b border-line-strong focus:border-emerald text-[15px] text-ink placeholder:text-ink/25 py-3 outline-none transition-colors duration-300"
      />
    </label>
  );
}

function SelectInput({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] tracking-[0.16em] uppercase text-ink/60">
        {label}
      </span>
      <select
        required
        defaultValue=""
        className="w-full bg-transparent border-b border-line-strong focus:border-emerald text-[15px] text-ink py-3 outline-none transition-colors duration-300"
      >
        <option value="" disabled>
          —
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
