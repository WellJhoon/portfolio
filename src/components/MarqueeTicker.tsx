"use client";

import { portfolioData } from "@/data/portfolio";

export default function MarqueeTicker() {
  const items = [...portfolioData.marquee, ...portfolioData.marquee];

  return (
    <div className="w-full border-y border-[var(--border)] bg-[var(--surface-raised)]/70 py-3 overflow-hidden select-none transition-colors duration-300">
      <div className="animate-marquee-infinite flex items-center gap-6 font-mono-custom text-xs tracking-wider text-[var(--text-muted)]">
        {items.map((tech, index) => (
          <div key={`${tech}-${index}`} className="flex items-center gap-6 shrink-0">
            <span className="text-[var(--carmine)] font-bold">●</span>
            <span className="hover:text-[var(--text-primary)] transition-colors">{tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
