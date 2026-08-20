"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const { content } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-8 bg-[var(--bg)] border-t border-[var(--border)] font-mono-custom text-xs text-[var(--text-muted)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[var(--carmine)] font-bold">&gt;</span>
          <span className="text-[var(--text-primary)]">{content.personal.name}</span>
          <span className="text-[var(--text-subtle)]">·</span>
          <span>{content.footer.roleTitle}</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-[var(--surface)] border border-[var(--border)] text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span className="text-emerald-500 font-semibold">System: Operational</span>
          </div>
          <span className="text-[var(--text-subtle)] hidden md:inline">Next.js 16 + TypeScript + Tailwind</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1 cursor-pointer"
            aria-label="Volver arriba"
          >
            <span>{content.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5 text-[var(--carmine)]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
