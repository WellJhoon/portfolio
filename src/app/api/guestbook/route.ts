import { NextRequest, NextResponse } from "next/server";
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

    await sendTelegramNotification(entry.authorName, entry.authorSocial);

    return NextResponse.json({
      success: true,
      message: "Pixel art submitted for approval",
      entry
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
