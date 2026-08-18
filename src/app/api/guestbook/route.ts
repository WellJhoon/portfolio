import { NextRequest, NextResponse } from "next/server";
import { getApprovedEntries, createEntry } from "@/lib/guestbook";

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

    return NextResponse.json({
      success: true,
      message: "Pixel art submitted for approval",
      entry
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
