/**
 * Brand + integration config.
 * Troca variáveis abaixo pra rebranding rápido ou pra plugar pixels/analytics.
 */

export const brand = {
  name: "NŪR",
  nameArabic: "نور",
  domain: "nur-atelier.com", // troca quando comprar
  email: "hello@nur-atelier.com",
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
