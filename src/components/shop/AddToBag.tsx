"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Locale } from "@/lib/config";
import type { Product } from "@/lib/products";
import { formatPrice, loc, findVariant } from "@/lib/products";
import { getDictionary } from "@/lib/dictionary";
import { useCart } from "@/lib/cart";
import { silk, springGentle, springSnappy } from "@/lib/motion";

export function AddToBag({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const t = getDictionary(locale);
  const add = useCart((s) => s.add);

  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id ?? ""
  );
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const variant = findVariant(product, selectedVariantId);
  const soldOut = !variant || variant.stock === 0;
  const hasMultipleVariants = product.variants.length > 1;

  // Modo pre-order: produto tem Stripe Payment Link configurado
  const isPreOrder = Boolean(product.stripePaymentUrl) && !soldOut;

  const handleAdd = () => {
    if (!variant || soldOut) return;
    add(product.slug, variant.id, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  // Botão base (compartilhado entre modos)
  const buttonBaseClasses =
    "flex-1 px-8 py-4 rounded-none text-[13px] tracking-[0.24em] uppercase font-medium transition-colors duration-500 overflow-hidden relative flex items-center justify-center text-center";

  return (
    <div className="flex flex-col gap-8">
      {/* Preço com layout morph quando muda variante */}
      <div className="flex items-baseline gap-4 h-[36px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={variant?.priceUSD ?? "empty"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: silk }}
            className="text-[26px] font-light text-ink tabular-nums"
          >
            {variant ? formatPrice(variant.priceUSD, locale) : "—"}
          </motion.span>
        </AnimatePresence>
        <AnimatePresence>
          {variant && variant.stock > 0 && variant.stock <= 3 && !isPreOrder && (
            <motion.span
              key={`low-${variant.id}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={springGentle}
              className="text-[11px] tracking-[0.2em] uppercase text-emerald"
            >
              {t.shop.lowStock.replace("{n}", String(variant.stock))}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Variant selector */}
      {hasMultipleVariants && (
        <div className="flex flex-col gap-3">
          <p className="text-[11px] tracking-[0.24em] uppercase text-ink/55">
            {product.category === "adornment"
              ? t.shop.selectSize
              : t.shop.selectVolume}
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => {
              const isSelected = v.id === selectedVariantId;
              const disabled = v.stock === 0;
              return (
                <motion.button
                  key={v.id}
                  onClick={() => setSelectedVariantId(v.id)}
                  disabled={disabled}
                  whileTap={disabled ? {} : { scale: 0.96 }}
                  transition={springSnappy}
                  className={`
                    relative px-5 py-3 text-[13px] tracking-[0.06em] font-light border transition-colors duration-300
                    ${
                      isSelected
                        ? "border-emerald text-sand"
                        : "border-line-strong text-ink hover:border-emerald"
                    }
                    ${
                      disabled
                        ? "opacity-30 cursor-not-allowed line-through"
                        : "cursor-pointer"
                    }
                  `}
                >
                  {isSelected && (
                    <motion.div
                      layoutId={`variant-bg-${product.slug}`}
                      className="absolute inset-0 bg-emerald -z-10"
                      transition={springGentle}
                    />
                  )}
                  <span className="relative z-10">{loc(v.label, locale)}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantidade + botão de compra */}
      <div className="flex gap-3">
        {/* Quantity stepper — só faz sentido no modo cart mockup */}
        {!isPreOrder && !soldOut && (
          <div className="flex items-center border border-line-strong">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-4 py-3 text-ink hover:text-emerald transition-colors"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="px-3 text-[15px] font-light tabular-nums min-w-[2ch] text-center">
              {quantity}
            </span>
            <button
              onClick={() =>
                setQuantity((q) =>
                  variant ? Math.min(variant.stock, q + 1) : q + 1
                )
              }
              className="px-4 py-3 text-ink hover:text-emerald transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        )}

        {/*
         * Renderização condicional do CTA:
         *  soldOut → botão desabilitado
         *  isPreOrder → link (motion.a) pro Stripe
         *  default → botão de adicionar ao cart Zustand
         */}
        {soldOut ? (
          <button
            disabled
            className={`${buttonBaseClasses} bg-ink/15 text-ink/40 cursor-not-allowed`}
          >
            {t.shop.soldOut}
          </button>
        ) : isPreOrder ? (
          <motion.a
            href={
              // Passa a variante escolhida via client_reference_id
              // → aparece no dashboard Stripe do pedido, facilita fulfillment
              // (crítico pro Colonna que tem 6 tamanhos com mesmo preço)
              product.stripePaymentUrl +
              (variant
                ? `?client_reference_id=${product.slug}-${variant.id}`
                : "")
            }
            whileTap={{ scale: 0.97 }}
            transition={springSnappy}
            className={`${buttonBaseClasses} bg-emerald text-sand hover:bg-emerald-hover flex-col gap-0.5 py-3`}
          >
            <span>{t.shop.preOrder}</span>
            <span className="text-[9px] tracking-[0.16em] opacity-70">
              {t.shop.shipsIn}
            </span>
          </motion.a>
        ) : (
          <motion.button
            onClick={handleAdd}
            disabled={justAdded}
            whileTap={{ scale: 0.97 }}
            transition={springSnappy}
            className={`${buttonBaseClasses} bg-emerald text-sand hover:bg-emerald-hover`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {justAdded ? (
                <motion.span
                  key="added"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={springGentle}
                  className="block"
                >
                  ✓{" "}
                  {t.shop.addToBag.split(" ")[0] === "Add"
                    ? "Added"
                    : "أُضيف"}
                </motion.span>
              ) : (
                <motion.span
                  key="default"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={springGentle}
                  className="block"
                >
                  {t.shop.addToBag}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </div>

      {/* Reservation note (só no modo pre-order) */}
      <AnimatePresence>
        {isPreOrder && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: silk }}
            className="text-[11px] leading-[1.6] text-ink/50 tracking-[0.02em] -mt-4"
          >
            {t.shop.reservationNote}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
