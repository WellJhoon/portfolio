import { createClient } from "@supabase/supabase-js";

export interface VisitorPing {
  id: string;
  countryCode: string;
  countryName: string;
  city?: string;
  flag: string;
  lat: number;
  lng: number;
  x: number;
  y: number;
  timestamp: string;
}

export interface CountryRadarStat {
  countryCode: string;
  countryName: string;
  flag: string;
  count: number;
  x: number;
  y: number;
}

export interface RadarData {
  totalVisitors: number;
  countries: CountryRadarStat[];
  recentPings: VisitorPing[];
}

export const COUNTRY_COORDINATES: Record<string, { name: string; flag: string; lat: number; lng: number; x: number; y: number }> = {
  DO: { name: "Dominican Republic", flag: "🇩🇴", lat: 18.7357, lng: -70.1627, x: 30.5, y: 46.0 },
  US: { name: "United States", flag: "🇺🇸", lat: 37.0902, lng: -95.7129, x: 23.4, y: 33.0 },
  ES: { name: "Spain", flag: "🇪🇸", lat: 40.4637, lng: -3.7492, x: 49.0, y: 30.7 },
  CO: { name: "Colombia", flag: "🇨🇴", lat: 4.5709, lng: -74.2973, x: 29.4, y: 55.9 },
  MX: { name: "Mexico", flag: "🇲🇽", lat: 23.6345, lng: -102.5528, x: 21.5, y: 42.5 },
  CA: { name: "Canada", flag: "🇨🇦", lat: 56.1304, lng: -106.3468, x: 20.5, y: 19.6 },
  GB: { name: "United Kingdom", flag: "🇬🇧", lat: 55.3781, lng: -3.4360, x: 49.0, y: 20.2 },
  DE: { name: "Germany", flag: "🇩🇪", lat: 51.1657, lng: 10.4515, x: 52.9, y: 23.1 },
  FR: { name: "France", flag: "🇫🇷", lat: 46.2276, lng: 2.2137, x: 50.6, y: 26.6 },
  BR: { name: "Brazil", flag: "🇧🇷", lat: -14.235, lng: -51.9253, x: 35.6, y: 69.2 },
  AR: { name: "Argentina", flag: "🇦🇷", lat: -38.4161, lng: -63.6167, x: 32.3, y: 86.2 },
  CL: { name: "Chile", flag: "🇨🇱", lat: -35.6751, lng: -71.543, x: 30.1, y: 84.3 },
  PE: { name: "Peru", flag: "🇵🇪", lat: -9.19, lng: -75.0152, x: 29.2, y: 65.6 },
  CR: { name: "Costa Rica", flag: "🇨🇷", lat: 9.7489, lng: -83.7534, x: 26.7, y: 52.3 },
  PR: { name: "Puerto Rico", flag: "🇵🇷", lat: 18.2208, lng: -66.5901, x: 31.5, y: 46.3 },
  IN: { name: "India", flag: "🇮🇳", lat: 20.5937, lng: 78.9629, x: 71.9, y: 44.7 },
  JP: { name: "Japan", flag: "🇯🇵", lat: 36.2048, lng: 138.2529, x: 88.4, y: 33.7 },
  NL: { name: "Netherlands", flag: "🇳🇱", lat: 52.1326, lng: 5.2913, x: 51.5, y: 22.4 }
};

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !key) return null;
  return createClient(url, key);
}

let inMemoryPings: VisitorPing[] = [];
const seenVisitorKeys = new Set<string>();

export function projectCoordinates(lat: number, lng: number): { x: number; y: number } {
  const x = Math.max(2, Math.min(98, ((lng + 180) / 360) * 100));
  const clampedLat = Math.max(-58, Math.min(84, lat));
  const y = Math.max(4, Math.min(96, ((84 - clampedLat) / 142) * 100));
  return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
}

export async function recordVisitor(code: string, city?: string, customLat?: number, customLng?: number, visitorKey?: string): Promise<VisitorPing> {
  const countryCode = (code || "DO").toUpperCase();
  const info = COUNTRY_COORDINATES[countryCode] || {
    name: countryCode,
    flag: "🌐",
    lat: 18.7357,
    lng: -70.1627,
    x: 30.5,
    y: 46.0
  };

  const lat = customLat !== undefined && !isNaN(customLat) ? customLat : info.lat;
  const lng = customLng !== undefined && !isNaN(customLng) ? customLng : info.lng;
  const coords = customLat !== undefined && customLng !== undefined ? projectCoordinates(lat, lng) : { x: info.x, y: info.y };

  const ping: VisitorPing = {
    id: `ping-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    countryCode,
    countryName: info.name,
    city: city || info.name,
    flag: info.flag,
    lat,
    lng,
    x: coords.x,
    y: coords.y,
    timestamp: new Date().toISOString()
  };

  if (visitorKey && seenVisitorKeys.has(visitorKey) && inMemoryPings.length > 0) {
    const existing = inMemoryPings.find((p) => p.city === city || p.countryCode === countryCode);
    if (existing) return existing;
  }

  if (visitorKey) {
    seenVisitorKeys.add(visitorKey);
  }

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from("visitor_pings").insert([
        {
          id: ping.id,
          country_code: ping.countryCode,
          country_name: ping.countryName,
          city: ping.city,
          flag: ping.flag,
          lat: ping.lat,
          lng: ping.lng,
          x: ping.x,
          y: ping.y,
          created_at: ping.timestamp
        }
      ]);
    } catch {}
  }

  inMemoryPings.unshift(ping);
  if (inMemoryPings.length > 50) {
    inMemoryPings = inMemoryPings.slice(0, 50);
  }

  return ping;
}

export async function getRadarStats(): Promise<RadarData> {
  const supabase = getSupabaseClient();
  let pings = inMemoryPings;

  if (supabase) {
    try {
      const { data } = await supabase
        .from("visitor_pings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(60);

      if (data && data.length > 0) {
        pings = data.map((d) => ({
          id: d.id,
          countryCode: d.country_code,
          countryName: d.country_name,
          city: d.city,
          flag: d.flag,
          lat: d.lat,
          lng: d.lng,
          x: d.x,
          y: d.y,
          timestamp: d.created_at
        }));
      }
    } catch {}
  }

  const countryCountMap: Record<string, { count: number; info: (typeof COUNTRY_COORDINATES)[string] }> = {};

  for (const p of pings) {
    const code = p.countryCode;
    const info = COUNTRY_COORDINATES[code] || {
      name: p.countryName,
      flag: p.flag,
      lat: p.lat,
      lng: p.lng,
      x: p.x,
      y: p.y
    };

    if (!countryCountMap[code]) {
      countryCountMap[code] = { count: 0, info };
    }
    countryCountMap[code].count += 1;
  }

  const countries: CountryRadarStat[] = Object.entries(countryCountMap)
    .map(([code, item]) => ({
      countryCode: code,
      countryName: item.info.name,
      flag: item.info.flag,
      count: item.count,
      x: item.info.x,
      y: item.info.y
    }))
    .sort((a, b) => b.count - a.count);

  return {
    totalVisitors: pings.length,
    countries,
    recentPings: pings.slice(0, 8)
  };
}
