"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { Copy, Check, ArrowDownRight, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % portfolioData.personal.roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-60" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[var(--surface)] border border-[var(--border)] font-mono-custom text-xs text-[var(--text-muted)] mb-6 shadow-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--carmine)] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--amber-glow)] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)] inline-block" />
          </div>
          <span className="text-[var(--text-subtle)]">|</span>
          <span className="text-[var(--text-primary)]">~/jhon-medina</span>
          <span className="text-[var(--text-subtle)]">-</span>
          <span className="text-[var(--carmine)]">zsh</span>
        </div>

        <div className="space-y-4 mb-8">
          <p className="font-mono-custom text-sm sm:text-base text-[var(--text-muted)] flex items-center gap-2">
            <span className="text-[var(--carmine)]">&gt;</span>
            <span>Hello, I&apos;m</span>
          </p>

          <h1 className="font-pixel-custom text-6xl sm:text-8xl lg:text-9xl tracking-tight text-[var(--text-primary)] uppercase select-none leading-none">
            {portfolioData.personal.tagline}
          </h1>

          <div className="flex items-center gap-2 font-mono-custom text-lg sm:text-2xl text-[var(--text-muted)]">
            <span>I&apos;m a</span>
            <span className="text-[var(--carmine)] font-semibold">
              {portfolioData.personal.roles[currentRoleIndex]}
            </span>
            <span className="inline-block w-2.5 h-6 bg-[var(--carmine)] cursor-blink" />
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-[var(--carmine)]/50 via-[var(--border)] to-transparent my-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-10">
          <div className="space-y-3 p-6 rounded-sm bg-[var(--surface)] border border-[var(--border)]">
            <div className="flex items-center gap-2 font-mono-custom text-xs uppercase tracking-wider text-[var(--carmine)] font-semibold">
              <Terminal className="w-3.5 h-3.5" />
              <span>ABOUT ME</span>
            </div>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              {portfolioData.personal.aboutMe}
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-sm bg-[var(--surface)] border border-[var(--border)]">
            <div className="flex items-center gap-2 font-mono-custom text-xs uppercase tracking-wider text-[var(--amber-glow)] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[var(--amber-glow)] animate-pulse" />
              <span>CURRENT FOCUS / EN CURSO</span>
            </div>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              {portfolioData.personal.rightNow}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="#projects"
            className="flex items-center gap-2 px-6 py-3 rounded-sm bg-[var(--carmine)] hover:bg-[var(--carmine-light)] text-white font-mono-custom text-sm font-semibold transition-all group shadow-md"
          >
            <span>View my projects</span>
            <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </Link>

          <Link
            href="#experience"
            className="flex items-center gap-2 px-6 py-3 rounded-sm border border-[var(--border-strong)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] hover:border-[var(--carmine)] text-[var(--text-primary)] font-mono-custom text-sm transition-all group"
          >
            <span>View Experience</span>
            <ArrowDownRight className="w-4 h-4 text-[var(--carmine)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex items-center gap-2 px-4 py-3 rounded-sm border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] text-[var(--text-muted)] hover:text-[var(--text-primary)] font-mono-custom text-sm transition-all"
              title="Copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-sm border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--carmine)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>

            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-sm border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--carmine)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
