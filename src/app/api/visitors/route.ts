import { NextRequest, NextResponse } from "next/server";
import { getRadarStats, recordVisitor } from "@/lib/visitors";

export async function GET() {
  try {
    const stats = await getRadarStats();
    return NextResponse.json({ success: true, ...stats });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch radar stats" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let countryCode = req.headers.get("x-vercel-ip-country") || req.headers.get("cf-ipcountry") || "";
    let city = req.headers.get("x-vercel-ip-city") || "";
    const headerLat = req.headers.get("x-vercel-ip-latitude");
    const headerLng = req.headers.get("x-vercel-ip-longitude");
    let customLat = headerLat ? parseFloat(headerLat) : undefined;
    let customLng = headerLng ? parseFloat(headerLng) : undefined;

    try {
      const body = await req.json();
      if (body.countryCode) countryCode = body.countryCode;
      if (body.city) city = body.city;
      if (body.lat !== undefined) customLat = body.lat;
      if (body.lng !== undefined) customLng = body.lng;
    } catch {}

    if (!countryCode) {
      countryCode = "DO";
    }

    const visitorIp = req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || "local-client";
    const visitorKey = `${visitorIp}-${countryCode}-${city}`;

    const ping = await recordVisitor(countryCode, city, customLat, customLng, visitorKey);
    const updatedStats = await getRadarStats();
    return NextResponse.json({ success: true, ping, ...updatedStats });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to record ping" }, { status: 500 });
  }
}
