"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ExternalLink } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageToggle from "@/components/ui/LanguageToggle";
import SoundToggle from "@/components/ui/SoundToggle";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { content } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const desktopLinks = [
    { number: "01", label: content.nav.experience, href: "#experience" },
    { number: "02", label: content.nav.skills, href: "#skills" },
    { number: "03", label: content.nav.projects, href: "#projects" },
    { number: "04", label: content.nav.contact, href: "#contact" }
  ];

  const allNavLinks = [
    { number: "01", label: content.nav.about, href: "#hero" },
    { number: "02", label: content.nav.experience, href: "#experience" },
    { number: "03", label: content.nav.skills, href: "#skills" },
    { number: "04", label: content.nav.projects, href: "#projects" },
    { number: "05", label: content.nav.gameMode, href: "#game-mode" },
    { number: "06", label: content.nav.guestbook, href: "#guestbook" },
    { number: "07", label: content.nav.education, href: "#education" },
    { number: "08", label: content.nav.contact, href: "#contact" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)] transition-colors duration-300">
      <div
        className="absolute top-0 left-0 h-[2px] bg-[var(--carmine)] transition-all duration-75 z-50"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link
          href="#hero"
          className="flex items-center gap-2 group font-mono-custom text-sm font-semibold tracking-tight text-[var(--text-primary)] hover:text-[var(--carmine-light)] transition-colors shrink-0"
        >
          <span className="text-[var(--carmine)] font-bold">$</span>
          <span>jhon_medina</span>
          <span className="inline-block w-2 h-4 bg-[var(--carmine)] cursor-blink" />
        </Link>

        <div className="hidden lg:flex items-center gap-8 font-mono-custom text-xs">
          <nav className="flex items-center gap-6">
            {desktopLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors py-1 group"
              >
                <span className="text-[var(--carmine)] opacity-70 group-hover:opacity-100 transition-opacity text-[10px]">
                  {link.number}
                </span>
                <span className="group-hover:translate-x-0.5 transition-transform">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
            }}
            className="flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[var(--surface-raised)] border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--carmine)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
            title="Command Palette (Ctrl + K)"
          >
            <span className="text-[11px]">Cmds</span>
            <kbd className="px-1 py-0.2 text-[9px] rounded-xs bg-[var(--bg)] border border-[var(--border)] font-bold text-[var(--text-subtle)]">
              Ctrl+K
            </kbd>
          </button>

          <div className="flex items-center gap-2.5 pl-4 border-l border-[var(--border)]">
            <SoundToggle />
            <LanguageToggle />
            <ThemeToggle />
            <a
              href="https://github.com/WellJhoon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-[var(--border-strong)] bg-[var(--surface)] hover:bg-[var(--carmine)] hover:border-[var(--carmine)] hover:text-white text-[var(--text-primary)] transition-all"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <SoundToggle />
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[var(--surface)] border-b border-[var(--border)] px-4 pt-2 pb-6 space-y-2.5 font-mono-custom text-sm">
          {allNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] px-3 rounded-sm transition-colors"
            >
              <span className="text-[var(--carmine)]">{link.number}</span>
              <span>{link.label}</span>
            </Link>
          ))}
          <div className="pt-2 border-t border-[var(--border)]">
            <a
              href="https://github.com/WellJhoon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-sm border border-[var(--carmine)] bg-[var(--carmine)]/10 text-[var(--text-primary)] hover:bg-[var(--carmine)] hover:text-white transition-colors"
            >
              <span>GitHub Profile</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
