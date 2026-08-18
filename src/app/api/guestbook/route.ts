import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getApprovedEntries, createEntry } from "@/lib/guestbook";

async function sendTelegramNotification(authorName: string, authorSocial?: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jhon-medina.vercel.app";
  const text = `🎨 *Nueva Firma de Pixel Art*\n\n👤 *Autor:* ${authorName}\n🔗 *Perfil:* ${authorSocial || "No especificado"}\n\n👉 [Abrir Panel de Moderación](${siteUrl}/admin)`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown"
      })
    });
  } catch {}
}

async function sendEmailNotification(authorName: string, authorSocial?: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const resend = new Resend(apiKey);
  const toEmail = process.env.NOTIFICATION_EMAIL || "jhon437699@gmail.com";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jhon-medina.vercel.app";

  try {
    await resend.emails.send({
      from: "Pixel Guestbook <onboarding@resend.dev>",
      to: [toEmail],
      subject: `🎨 Nueva Firma de Pixel Art - ${authorName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #090b10; color: #f8fafc; padding: 28px; border-radius: 8px; max-width: 500px; margin: 0 auto; border: 1px solid #1e293b;">
          <h2 style="color: #e11d48; margin-top: 0; font-size: 20px;">🎨 Nueva Firma en el Libro de Visitas</h2>
          <p style="margin: 8px 0; color: #94a3b8; font-size: 14px;">Un visitante acaba de enviar un pixel art en tu portafolio.</p>
          <div style="background: #111827; padding: 16px; border-radius: 6px; margin: 18px 0; border: 1px solid #374151;">
            <p style="margin: 4px 0; font-size: 14px;"><strong>Autor:</strong> <span style="color: #38bdf8;">${authorName}</span></p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Perfil:</strong> ${authorSocial ? `<a href="${authorSocial}" style="color: #e11d48;">${authorSocial}</a>` : "No especificado"}</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <a href="${siteUrl}/admin" style="display: block; background: #e11d48; color: #ffffff; padding: 12px 18px; text-align: center; text-decoration: none; font-weight: bold; border-radius: 6px; font-size: 14px; margin-top: 20px;">
            👉 Abrir Panel de Moderación para Aprobar
          </a>
        </div>
      `
    });
  } catch {}
}

export async function GET() {
  try {
    const entries = await getApprovedEntries();
    return NextResponse.json({ success: true, entries });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { authorName, authorSocial, pixels } = body;

    if (!authorName || typeof authorName !== "string" || !authorName.trim()) {
      return NextResponse.json({ success: false, error: "Author name is required" }, { status: 400 });
    }

    if (!Array.isArray(pixels) || pixels.length !== 256) {
      return NextResponse.json({ success: false, error: "Pixels must be a 16x16 array (256 items)" }, { status: 400 });
    }

    const entry = await createEntry({
      authorName: authorName.trim(),
      authorSocial: authorSocial?.trim(),
      pixels
    });

    await Promise.allSettled([
      sendTelegramNotification(entry.authorName, entry.authorSocial),
      sendEmailNotification(entry.authorName, entry.authorSocial)
    ]);

    return NextResponse.json({
      success: true,
      message: "Pixel art submitted for approval",
      entry
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
