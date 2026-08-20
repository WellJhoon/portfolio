"use client";

import { useState, useEffect, useCallback } from "react";
import { Globe, Radio, Activity } from "lucide-react";
import { sound } from "@/lib/sound";
import { useLanguage } from "@/context/LanguageContext";
import { CountryRadarStat, VisitorPing } from "@/lib/visitors";
import WorldMapSVG from "@/components/WorldMapSVG";

async function detectClientLocation() {
  try {
    const geoRes = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    const geoData = await geoRes.json();
    if (geoData.country_code) {
      return { countryCode: geoData.country_code, city: geoData.city || "" };
    }
  } catch {}
  return { countryCode: "DO", city: "Santo Domingo" };
}

function getClientDeviceId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("radar_client_id");
  if (!id) {
    id = `dev_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem("radar_client_id", id);
  }
  return id;
}

export default function GlobalRadarMap() {
  const { language } = useLanguage();
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [countries, setCountries] = useState<CountryRadarStat[]>([]);
  const [recentPings, setRecentPings] = useState<VisitorPing[]>([]);
  const [hoveredCountry, setHoveredCountry] = useState<CountryRadarStat | null>(null);

  const fetchRadar = useCallback(async () => {
    try {
      const res = await fetch("/api/visitors");
      const data = await res.json();
      if (data.success) {
        setTotalVisitors(data.totalVisitors);
        setCountries(data.countries || []);
        setRecentPings(data.recentPings || []);
      }
    } catch {}
  }, []);

  const sendPing = useCallback(async () => {
    try {
      const loc = await detectClientLocation();
      const deviceId = getClientDeviceId();
      const res = await fetch("/api/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...loc, deviceId })
      });
      const data = await res.json();
      if (data.success) {
        setTotalVisitors(data.totalVisitors);
        setCountries(data.countries || []);
        setRecentPings(data.recentPings || []);
      }
    } catch {}
  }, []);

  useEffect(() => {
    sendPing();
    const interval = setInterval(() => {
      fetchRadar();
    }, 10000);
    return () => clearInterval(interval);
  }, [sendPing, fetchRadar]);

  return (
    <section id="radar" className="py-20 lg:py-28 relative bg-[var(--bg)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="font-mono-custom text-sm font-bold text-[var(--carmine)]">06.</span>
            <h2 className="font-mono-custom text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              {language === "es" ? "RADAR_GLOBAL_DE_VISITANTES" : "GLOBAL_VISITOR_RADAR"}
            </h2>
            <div className="hidden sm:block h-px w-24 bg-[var(--border)] ml-4" />
          </div>

          <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-sm bg-[var(--surface)] border border-[var(--border)] font-mono-custom text-xs">
            <div className="flex items-center gap-1.5 text-emerald-500 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>LIVE SATELLITE TELEMETRY</span>
            </div>
            <span className="text-[var(--text-subtle)]">|</span>
            <span className="text-[var(--text-primary)] font-bold">{totalVisitors} Pings</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 p-4 sm:p-6 rounded-sm bg-[#090b10] border-2 border-[var(--border-strong)] relative overflow-hidden shadow-2xl flex flex-col justify-between select-none">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono-custom text-[var(--text-muted)]">
              <div className="flex items-center gap-2 text-[var(--carmine)] font-bold">
                <Radio className="w-4 h-4 animate-pulse" />
                <span>MERCATOR RADAR SCANNER v4.2</span>
              </div>
              <span className="text-[10px] text-[var(--amber-glow)] font-bold">AST TELEMETRY FEED</span>
            </div>

            <div className="relative w-full aspect-[2/1] max-h-[420px] my-4 overflow-hidden rounded-xs bg-[#0c0f17] border border-white/5 flex items-center justify-center">
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(var(--carmine) 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--carmine)]/10 to-transparent w-full animate-marquee-infinite pointer-events-none opacity-40" />

              <WorldMapSVG />

              {countries.map((c) => (
                <div
                  key={c.countryCode}
                  style={{ left: `${c.x}%`, top: `${c.y}%` }}
                  onMouseEnter={() => {
                    sound.playHover();
                    setHoveredCountry(c);
                  }}
                  onMouseLeave={() => setHoveredCountry(null)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                >
                  <span className="absolute -inset-2 rounded-full bg-[var(--carmine)]/40 animate-ping" />
                  <span className="relative flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[var(--carmine)] border-2 border-white shadow-lg text-[8px] text-white font-bold">
                    {c.count}
                  </span>

                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-xs bg-black/90 border border-[var(--carmine)] text-[10px] text-white font-mono-custom whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-30">
                    <span className="mr-1">{c.flag}</span>
                    <span className="font-bold">{c.countryName}:</span> {c.count} {c.count === 1 ? "ping" : "pings"}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs font-mono-custom">
              <div className="flex items-center gap-2 text-[var(--text-muted)] text-[11px]">
                <Activity className="w-3.5 h-3.5 text-[var(--carmine)]" />
                <span>
                  {hoveredCountry
                    ? `${hoveredCountry.flag} ${hoveredCountry.countryName} · ${hoveredCountry.count} visitas`
                    : language === "es"
                    ? "Pasa el cursor sobre los pulsos del radar para inspeccionar"
                    : "Hover radar pings to inspect country telemetry"}
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-[var(--carmine)]/10 border border-[var(--carmine)]/40 text-[var(--text-primary)] text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{language === "es" ? "AUTO-REGISTRO ACTIVO" : "AUTO-LOGGING ACTIVE"}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between gap-4 p-5 rounded-sm bg-[var(--surface)] border border-[var(--border)] font-mono-custom text-xs shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
                <span className="font-bold text-[var(--text-primary)] uppercase text-xs">
                  {language === "es" ? "Top Regiones Activas" : "Top Active Regions"}
                </span>
                <Globe className="w-3.5 h-3.5 text-[var(--carmine)]" />
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {countries.map((c) => (
                  <div
                    key={c.countryCode}
                    className="flex items-center justify-between p-2 rounded-xs bg-[var(--surface-raised)] border border-[var(--border)]/60 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{c.flag}</span>
                      <span className="text-[var(--text-primary)] font-semibold">{c.countryName}</span>
                    </div>
                    <span className="font-mono-custom text-[11px] font-bold text-[var(--carmine)]">
                      {c.count} {c.count === 1 ? "visita" : "visitas"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-[var(--border)]">
              <span className="text-[10px] uppercase font-bold text-[var(--text-subtle)]">
                {language === "es" ? "Últimos Pings en Vivo" : "Recent Ping Stream"}
              </span>
              <div className="space-y-1 text-[11px] text-[var(--text-muted)] max-h-24 overflow-y-auto">
                {recentPings.map((p) => (
                  <div key={p.id} className="flex items-center justify-between gap-2">
                    <span className="truncate">
                      {p.flag} {p.city || p.countryName}
                    </span>
                    <span className="text-[10px] text-[var(--text-subtle)] shrink-0">
                      {new Date(p.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
