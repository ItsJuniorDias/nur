import { cookies } from "next/headers";
import { defaultLocale, type Locale } from "@/lib/config";
import { CheckoutClient } from "@/components/shop/CheckoutClient";

export const metadata = {
  title: "Checkout · NŪR",
};

export default async function CheckoutPage() {
  const store = await cookies();
  const locale = ((store.get("locale")?.value as Locale) ??
    defaultLocale) as Locale;

  return <CheckoutClient locale={locale} />;
}
