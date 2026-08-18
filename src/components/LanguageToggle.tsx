"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center rounded-sm bg-[var(--surface)] border border-[var(--border)] p-0.5 font-mono-custom text-xs shadow-xs">
      <button
        type="button"
        onClick={() => setLanguage("es")}
        className={`px-2 py-1 rounded-[2px] font-bold transition-all ${
          language === "es"
            ? "bg-[var(--carmine)] text-white shadow-xs"
            : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
        }`}
        aria-label="Español"
      >
        ES
      </button>

      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 rounded-[2px] font-bold transition-all ${
          language === "en"
            ? "bg-[var(--carmine)] text-white shadow-xs"
            : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
