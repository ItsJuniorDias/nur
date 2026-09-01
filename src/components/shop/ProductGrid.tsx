import type { Locale } from "@/lib/config";
import type { Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  locale,
}: {
  products: Product[];
  locale: Locale;
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 md:gap-x-8 md:gap-y-16">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} locale={locale} />
      ))}
    </div>
  );
}
