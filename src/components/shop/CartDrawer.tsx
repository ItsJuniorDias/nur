"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { Locale } from "@/lib/config";
import { useCart } from "@/lib/cart";
import { findProduct, findVariant, formatPrice, loc } from "@/lib/products";
import { getDictionary } from "@/lib/dictionary";
import { SafeImage } from "@/components/SafeImage";
import { silk, springFirm, springGentle, durMedium } from "@/lib/motion";

export function CartDrawer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { lines, isOpen, close, setQuantity, remove } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const enrichedLines = lines
    .map((line) => {
      const product = findProduct(line.productSlug);
      const variant = product ? findVariant(product, line.variantId) : undefined;
      if (!product || !variant) return null;
      return { line, product, variant };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const subtotal = enrichedLines.reduce(
    (sum, { line, variant }) => sum + variant.priceUSD * line.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: durMedium, ease: silk }}
            className="fixed inset-0 z-[60] bg-emerald-deep/40"
            onClick={close}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label={t.cart.title}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={springFirm}
            className="fixed top-0 right-0 z-[70] h-full w-full sm:max-w-[440px] bg-sand shadow-2xl flex flex-col"
          >
            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springGentle, delay: 0.15 }}
              className="flex items-center justify-between px-6 md:px-8 py-6 border-b border-line"
            >
              <h2 className="text-[13px] tracking-[0.28em] uppercase text-ink font-medium">
                {t.cart.title}
              </h2>
              <button
                onClick={close}
                className="text-ink/60 hover:text-emerald transition-colors text-2xl leading-none"
                aria-label={t.cart.close}
              >
                ×
              </button>
            </motion.header>

            {/* Empty state */}
            {enrichedLines.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springGentle, delay: 0.25 }}
                className="flex-1 flex flex-col items-center justify-center gap-6 px-8 text-center"
              >
                <p className="text-[13px] tracking-[0.24em] uppercase text-ink/40">
                  {t.cart.empty}
                </p>
                <Link
                  href="/atelier"
                  onClick={close}
                  className="text-[13px] tracking-[0.16em] uppercase text-emerald hover:text-emerald-hover transition-colors"
                >
                  {t.cart.browseAtelier}
                </Link>
              </motion.div>
            )}

            {enrichedLines.length > 0 && (
              <>
                {/* Line items */}
                <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 flex flex-col gap-6">
                  <AnimatePresence initial={true} mode="popLayout">
                    {enrichedLines.map(({ line, product, variant }, i) => (
                      <motion.div
                        key={`${line.productSlug}-${line.variantId}`}
                        layout
                        initial={{ opacity: 0, x: 24 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: { ...springGentle, delay: 0.2 + i * 0.06 },
                        }}
                        exit={{
                          opacity: 0,
                          x: 40,
                          transition: { duration: 0.28, ease: silk },
                        }}
                        className="flex gap-4"
                      >
                        <Link
                          href={`/atelier/${product.slug}`}
                          onClick={close}
                          className="relative w-20 h-24 flex-shrink-0 bg-sand-soft overflow-hidden"
                        >
                          <SafeImage
                            id={product.imageId}
                            locale={locale}
                            fill
                            sizes="80px"
                          />
                        </Link>

                        <div className="flex-1 flex flex-col gap-1 min-w-0">
                          <Link
                            href={`/atelier/${product.slug}`}
                            onClick={close}
                            className="text-[15px] text-ink font-light truncate hover:text-emerald transition-colors"
                          >
                            {loc(product.name, locale)}
                          </Link>
                          <p className="text-[12px] text-ink/50 tracking-[0.04em]">
                            {loc(variant.label, locale)}
                          </p>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-line">
                              <button
                                onClick={() =>
                                  setQuantity(
                                    line.productSlug,
                                    line.variantId,
                                    line.quantity - 1
                                  )
                                }
                                className="px-2.5 py-1 text-ink/70 hover:text-emerald transition-colors text-sm"
                                aria-label="Decrease"
                              >
                                −
                              </button>
                              <span className="px-2 text-[13px] font-light tabular-nums min-w-[2ch] text-center">
                                {line.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  setQuantity(
                                    line.productSlug,
                                    line.variantId,
                                    line.quantity + 1
                                  )
                                }
                                disabled={line.quantity >= variant.stock}
                                className="px-2.5 py-1 text-ink/70 hover:text-emerald transition-colors text-sm disabled:opacity-30"
                                aria-label="Increase"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() =>
                                remove(line.productSlug, line.variantId)
                              }
                              className="text-[11px] tracking-[0.12em] uppercase text-ink/40 hover:text-emerald transition-colors"
                            >
                              {t.cart.remove}
                            </button>
                          </div>
                        </div>

                        <motion.div
                          layout
                          className="flex-shrink-0 text-right"
                        >
                          <span className="text-[15px] font-light text-ink tabular-nums">
                            {formatPrice(variant.priceUSD * line.quantity, locale)}
                          </span>
                        </motion.div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <motion.footer
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { ...springGentle, delay: 0.3 },
                  }}
                  className="px-6 md:px-8 py-6 border-t border-line flex flex-col gap-5"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-[13px] tracking-[0.16em] uppercase text-ink/70">
                      {t.cart.subtotal}
                    </span>
                    <motion.span
                      key={subtotal}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, ease: silk }}
                      className="text-[18px] font-light text-ink tabular-nums"
                    >
                      {formatPrice(subtotal, locale)}
                    </motion.span>
                  </div>
                  <p className="text-[11px] tracking-[0.08em] text-ink/45 leading-relaxed">
                    {t.cart.shippingNote}
                  </p>
                  <Link
                    href="/checkout"
                    onClick={close}
                    className="w-full bg-emerald text-sand text-[13px] tracking-[0.24em] uppercase font-medium py-4 text-center hover:bg-emerald-hover transition-colors duration-500"
                  >
                    {t.cart.checkout}
                  </Link>
                </motion.footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
