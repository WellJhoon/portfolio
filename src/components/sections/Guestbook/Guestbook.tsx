"use client";

import { useState } from "react";
import { Palette, Terminal, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import PixelCanvas from "./PixelCanvas";
import PixelGallery from "./PixelGallery";

export default function Guestbook() {
  const { language } = useLanguage();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDrawSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <section id="guestbook" className="py-20 lg:py-28 scroll-mt-20 relative bg-[var(--surface-raised)]/40 border-t border-[var(--border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-3">
            <span className="font-mono-custom text-sm font-bold text-[var(--carmine)]">07.</span>
            <div>
              <h2 className="font-mono-custom text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                {language === "es" ? "Libro de Visitas Pixel Art" : "Pixel Art Guestbook"}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-mono-custom mt-1">
                {language === "es"
                  ? "Deja tu firma o arte en 16x16. Tras aprobación, se publicará en la galería."
                  : "Leave your 16x16 pixel signature. Once approved, it will appear in the gallery."}
              </p>
            </div>
          </div>

          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[var(--surface)] border border-[var(--border)] font-mono-custom text-[11px] text-[var(--text-muted)] hover:text-[var(--carmine)] hover:border-[var(--carmine)]/50 transition-all self-start sm:self-auto"
            title="Panel de moderación"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[var(--amber-glow)]" />
            <span>{language === "es" ? "Modo Moderador" : "Mod Panel"}</span>
          </Link>
        </div>

        <div className="space-y-12">
          <PixelCanvas onSuccess={handleDrawSuccess} />
          <PixelGallery key={refreshKey} />
        </div>

      </div>
    </section>
  );
}
