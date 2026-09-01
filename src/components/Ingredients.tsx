import type { Locale } from "@/lib/config";
import { getDictionary } from "@/lib/dictionary";
import { IngredientsClient } from "./IngredientsClient";
import type { ImageId } from "./SafeImage";

export function Ingredients({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const items: Array<{
    imageId: ImageId;
    name: string;
    origin: string;
  }> = [
    {
      imageId: "ingredient-01",
      name: t.ingredients.items[0].name,
      origin: t.ingredients.items[0].origin,
    },
    {
      imageId: "ingredient-02",
      name: t.ingredients.items[1].name,
      origin: t.ingredients.items[1].origin,
    },
    {
      imageId: "ingredient-03",
      name: t.ingredients.items[2].name,
      origin: t.ingredients.items[2].origin,
    },
    {
      imageId: "ingredient-04",
      name: t.ingredients.items[3].name,
      origin: t.ingredients.items[3].origin,
    },
  ];

  return (
    <IngredientsClient
      locale={locale}
      eyebrow={t.ingredients.eyebrow}
      heading={t.ingredients.heading}
      body={t.ingredients.body}
      items={items}
    />
  );
}
