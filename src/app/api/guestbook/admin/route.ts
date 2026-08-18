import { NextRequest, NextResponse } from "next/server";
import { getAllEntries, updateEntryStatus } from "@/lib/guestbook";

const ADMIN_SECRET = process.env.ADMIN_PASSWORD || "jhon2026";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password, action, id, status } = body;

    if (password !== ADMIN_SECRET) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (action === "list") {
      const entries = await getAllEntries();
      return NextResponse.json({ success: true, entries });
    }

    if (action === "update" && id && status) {
      if (status !== "approved" && status !== "rejected") {
        return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 });
      }
      const updated = await updateEntryStatus(id, status);
      return NextResponse.json({ success: true, updated });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
