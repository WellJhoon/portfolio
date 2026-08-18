"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ExternalLink } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { number: "01", label: "About", href: "#about" },
    { number: "02", label: "Experience", href: "#experience" },
    { number: "03", label: "Skills", href: "#skills" },
    { number: "04", label: "Projects", href: "#projects" },
    { number: "05", label: "Contact", href: "#contact" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="#hero"
          className="flex items-center gap-2 group font-mono-custom text-sm font-semibold tracking-tight text-[var(--text-primary)] hover:text-[var(--carmine-light)] transition-colors"
        >
          <span className="text-[var(--carmine)] font-bold">$</span>
          <span>jhon_medina</span>
          <span className="inline-block w-2 h-4 bg-[var(--carmine)] cursor-blink" />
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-8 font-mono-custom text-xs">
          <nav className="flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors py-1 group"
              >
                <span className="text-[var(--carmine)] opacity-70 group-hover:opacity-100 transition-opacity">
                  {link.number}
                </span>
                <span className="group-hover:translate-x-0.5 transition-transform">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 pl-4 border-l border-[var(--border)]">
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

        <div className="flex items-center gap-2 md:hidden">
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
        <div className="md:hidden bg-[var(--surface)] border-b border-[var(--border)] px-4 pt-2 pb-6 space-y-3 font-mono-custom text-sm">
          {navLinks.map((link) => (
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
