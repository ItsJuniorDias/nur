/**
 * Brand + integration config.
 * Troca variáveis abaixo pra rebranding rápido ou pra plugar pixels/analytics.
 */

/**
 * Resolve URL canônico do site.
 * Ordem de precedência:
 *   1. NEXT_PUBLIC_SITE_URL (setado manualmente — usa quando tem domínio próprio)
 *   2. VERCEL_URL (injetado automaticamente pelo Vercel em deploys)
 *   3. localhost:3000 (dev)
 * Retorna sempre com https:// e SEM trailing slash.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export const brand = {
  name: "NŪR",
  nameArabic: "نور",
  domain: siteUrl.replace(/^https?:\/\//, ""), // derivado do siteUrl
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@nur-atelier.com",
  instagram: "@nur.atelier",
  whatsapp: "+9715XXXXXXXX", // WhatsApp Business dos EAU quando abrir
  launchDate: "2026-11-01T00:00:00+04:00", // Gulf Standard Time
} as const;

/**
 * Pixel IDs - pluga os teus quando criar as contas de ads.
 * Deixa string vazia pra desabilitar carregamento.
 */
export const pixels = {
  meta: "", // ex: "1234567890123456"
  tiktok: "", // ex: "CXXXXXXXXXXXXXXXXXXXX"
  snapchat: "", // ex: "12345678-1234-1234-1234-123456789012"
  googleAnalytics: "", // ex: "G-XXXXXXXXXX"
} as const;

/**
 * Endpoint de captura de leads.
 * Opções:
 *   - "local"   → salva em leads.json (default, dev)
 *   - "webhook" → POST pra webhookUrl (Zapier/Make/n8n/Google Apps Script)
 *   - "resend"  → adiciona em audiência do Resend (precisa RESEND_API_KEY + RESEND_AUDIENCE_ID)
 */
export const leadCapture = {
  mode: (process.env.LEAD_MODE ?? "local") as "local" | "webhook" | "resend",
  webhookUrl: process.env.LEAD_WEBHOOK_URL ?? "",
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  resendAudienceId: process.env.RESEND_AUDIENCE_ID ?? "",
} as const;

export type Locale = "en" | "ar";
export const defaultLocale: Locale = "en";
export const locales: readonly Locale[] = ["en", "ar"] as const;
