import { cookies } from "next/headers";
import { defaultLocale, type Locale } from "@/lib/config";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Collections } from "@/components/Collections";
import { Ingredients } from "@/components/Ingredients";
import { Footer } from "@/components/Footer";

export default async function HomePage() {
  const store = await cookies();
  const locale = ((store.get("locale")?.value as Locale) ??
    defaultLocale) as Locale;

  return (
    <main>
      <Hero locale={locale} />
      <Manifesto locale={locale} />
      <Collections locale={locale} />
      <Ingredients locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}
