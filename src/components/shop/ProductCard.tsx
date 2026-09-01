"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Locale } from "@/lib/config";
import type { Product } from "@/lib/products";
import { formatPrice, isSoldOut, loc } from "@/lib/products";
import { getDictionary } from "@/lib/dictionary";
import { SafeImage } from "@/components/SafeImage";
import { silk, springGentle } from "@/lib/motion";

export function ProductCard({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const t = getDictionary(locale);
  const soldOut = isSoldOut(product);
  const lowestPrice = Math.min(...product.variants.map((v) => v.priceUSD));

  return (
    <Link
      href={`/atelier/${product.slug}`}
      className="group flex flex-col gap-5"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={springGentle}
        className="relative aspect-portrait bg-sand-soft overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 1.4, ease: silk }}
        >
          <SafeImage
            id={product.imageId}
            locale={locale}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </motion.div>

        {soldOut && (
          <div className="absolute top-5 right-5 z-10 blur-pill-emerald px-3 py-1.5 rounded-full">
            <span className="text-[10px] tracking-[0.24em] uppercase text-sand/90">
              {t.shop.soldOut}
            </span>
          </div>
        )}

        {product.featured && !soldOut && (
          <div className="absolute top-5 right-5 z-10 blur-pill-sand px-3 py-1.5 rounded-full">
            <span className="text-[10px] tracking-[0.24em] uppercase text-emerald">
              {t.shop.featured}
            </span>
          </div>
        )}
      </motion.div>

      <div className="flex flex-col gap-2 px-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-[17px] tracking-[0.02em] font-light text-ink group-hover:text-emerald transition-colors duration-500">
            {loc(product.name, locale)}
          </h3>
          <span className="text-[15px] font-light text-ink/70 tabular-nums whitespace-nowrap">
            {formatPrice(lowestPrice, locale)}
          </span>
        </div>
        <p className="text-[13px] leading-[1.5] text-ink/60 font-light line-clamp-2">
          {loc(product.tagline, locale)}
        </p>
      </div>
    </Link>
  );
}
