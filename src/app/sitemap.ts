import type { MetadataRoute } from "next";
import { brand } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${brand.domain}`;
  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: `${base}/`,
          ar: `${base}/`,
        },
      },
    },
  ];
}
