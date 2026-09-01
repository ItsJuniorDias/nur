import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { leadCapture } from "@/lib/config";

type Lead = {
  email: string;
  whatsapp?: string;
  locale?: string;
  createdAt: string;
  ip?: string;
  userAgent?: string;
};

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function saveLocal(lead: Lead) {
  const file = path.join(process.cwd(), "leads.json");
  let existing: Lead[] = [];
  try {
    const raw = await fs.readFile(file, "utf8");
    existing = JSON.parse(raw);
  } catch {
    // arquivo ainda não existe
  }
  existing.push(lead);
  await fs.writeFile(file, JSON.stringify(existing, null, 2), "utf8");
}

async function saveWebhook(lead: Lead) {
  if (!leadCapture.webhookUrl) throw new Error("LEAD_WEBHOOK_URL não definido");
  const res = await fetch(leadCapture.webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error(`Webhook falhou: ${res.status}`);
}

async function saveResend(lead: Lead) {
  if (!leadCapture.resendApiKey || !leadCapture.resendAudienceId) {
    throw new Error("RESEND_API_KEY / RESEND_AUDIENCE_ID não definidos");
  }
  const res = await fetch(
    `https://api.resend.com/audiences/${leadCapture.resendAudienceId}/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${leadCapture.resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: lead.email,
        unsubscribed: false,
      }),
    }
  );
  if (!res.ok && res.status !== 409) {
    throw new Error(`Resend falhou: ${res.status}`);
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      whatsapp?: string;
      locale?: string;
    };

    const email = String(body.email ?? "").trim().toLowerCase();
    const whatsapp = body.whatsapp ? String(body.whatsapp).trim() : undefined;

    if (!email || !EMAIL_RX.test(email)) {
      return NextResponse.json(
        { ok: false, error: "invalid_email" },
        { status: 400 }
      );
    }

    const lead: Lead = {
      email,
      whatsapp,
      locale: body.locale,
      createdAt: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") ?? undefined,
      userAgent: request.headers.get("user-agent") ?? undefined,
    };

    switch (leadCapture.mode) {
      case "webhook":
        await saveWebhook(lead);
        break;
      case "resend":
        await saveResend(lead);
        break;
      default:
        await saveLocal(lead);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] error:", err);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 }
    );
  }
}
