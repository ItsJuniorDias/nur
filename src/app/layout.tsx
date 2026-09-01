import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { brand, defaultLocale, siteUrl, type Locale } from "@/lib/config";
import { getDictionary } from "@/lib/dictionary";
import { PixelScripts } from "@/components/PixelScripts";
import { Nav } from "@/components/Nav";
import { CartDrawer } from "@/components/shop/CartDrawer";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#f0e6d6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata(): Promise<Metadata> {
  const store = await cookies();
  const locale = ((store.get("locale")?.value as Locale) ??
    defaultLocale) as Locale;
  const t = getDictionary(locale);

  return {
    title: t.meta.title,
    description: t.meta.description,
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      type: "website",
      locale: locale === "ar" ? "ar_AE" : "en_US",
      siteName: brand.name,
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: t.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: ["/images/og-image.jpg"],
    },
    alternates: {
      canonical: "/",
      languages: {
        en: "/",
        ar: "/",
      },
    },
    icons: {
      icon: "/icon.svg",
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await cookies();
  const locale = ((store.get("locale")?.value as Locale) ??
    defaultLocale) as Locale;
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&family=IBM+Plex+Sans+Arabic:wght@200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav locale={locale} />
        {children}
        <CartDrawer locale={locale} />
        <PixelScripts />
      </body>
    </html>
  );
}
