"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { ExternalLink, Sparkles, UserCheck } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { useLanguage } from "@/context/LanguageContext";
import { PixelArtEntry } from "@/lib/guestbook";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

function PixelArtThumbnail({ pixels, size = 104 }: { pixels: string[]; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, 16, 16);
    for (let i = 0; i < 256; i++) {
      const x = i % 16;
      const y = Math.floor(i / 16);
      ctx.fillStyle = pixels[i] || "#000000";
      ctx.fillRect(x, y, 1, 1);
    }
  }, [pixels]);

  return (
    <canvas
      ref={canvasRef}
      width={16}
      height={16}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        imageRendering: "pixelated"
      }}
      className="rounded-xs border border-[var(--border-strong)] block bg-[var(--surface-raised)] shadow-inner"
    />
  );
}

export default function PixelGallery() {
  const { language } = useLanguage();
  const [entries, setEntries] = useState<PixelArtEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = useCallback(async () => {
    try {
      const res = await fetch("/api/guestbook");
      const data = await res.json();
      if (data.success && Array.isArray(data.entries)) {
        setEntries(data.entries);
      }
    } catch {} finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();

    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const channel = supabase
        .channel("guestbook_realtime_public")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "guestbook"
          },
          () => {
            fetchEntries();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }

    const interval = setInterval(fetchEntries, 10000);
    return () => clearInterval(interval);
  }, [fetchEntries]);

  return (
    <div className="space-y-6 font-mono-custom">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--amber-glow)]" />
          <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
            {language === "es" ? "Galería de Firmas Aprobadas" : "Approved Guestbook Signatures"}
          </h3>
        </div>
        <span className="px-2 py-0.5 rounded-sm bg-[var(--surface-raised)] border border-[var(--border)] text-xs text-[var(--text-muted)] font-bold">
          {entries.length} {language === "es" ? "obras" : "artworks"}
        </span>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-[var(--text-muted)]">
          <span>{language === "es" ? "Cargando galería..." : "Loading gallery..."}</span>
        </div>
      ) : entries.length === 0 ? (
        <div className="p-8 rounded-sm bg-[var(--surface)] border border-[var(--border)] text-center space-y-2">
          <p className="text-sm text-[var(--text-primary)] font-bold">
            {language === "es" ? "Aún no hay firmas aprobadas" : "No approved signatures yet"}
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            {language === "es" ? "¡Sé el primero en dibujar una firma en el lienzo!" : "Be the first to draw a pixel art signature!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="p-3 rounded-sm bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--carmine)]/70 transition-all flex flex-col items-center space-y-2.5 group shadow-sm"
            >
              <PixelArtThumbnail pixels={entry.pixels} size={104} />

              <div className="w-full text-center space-y-1 pt-1 border-t border-[var(--border)]/60">
                <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-[var(--text-primary)] truncate">
                  <UserCheck className="w-3 h-3 text-[var(--carmine)] shrink-0" />
                  <span className="truncate">{entry.authorName}</span>
                </div>

                {entry.authorSocial ? (
                  <a
                    href={entry.authorSocial.startsWith("http") ? entry.authorSocial : `https://${entry.authorSocial}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] text-[var(--carmine)] hover:underline truncate max-w-full"
                  >
                    <span>perfil</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                ) : (
                  <span className="text-[10px] text-[var(--text-subtle)]">
                    {new Date(entry.createdAt).toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
                      month: "short",
                      day: "numeric"
                    })}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
