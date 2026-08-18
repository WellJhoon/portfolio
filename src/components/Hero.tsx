"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Copy, Check, ArrowDownRight, Terminal, Download, Gamepad2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { content } = useLanguage();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const currentRole = content.personal.roles[roleIndex % content.personal.roles.length];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedText !== currentRole) {
      timer = setTimeout(() => setDisplayedText(currentRole.slice(0, displayedText.length + 1)), 70);
    } else if (!isDeleting && displayedText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayedText !== "") {
      timer = setTimeout(() => setDisplayedText(currentRole.slice(0, displayedText.length - 1)), 40);
    } else {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % content.personal.roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, content.personal.roles]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(content.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="flex flex-col justify-between px-4 sm:px-6 lg:px-8 pt-20"
      style={{ minHeight: "calc(100vh - 0px)", maxWidth: "80rem", margin: "0 auto" }}
    >
      <div className="flex flex-col gap-4 flex-1 justify-center py-6">

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[var(--surface)] border border-[var(--border)] font-mono-custom text-xs text-[var(--text-muted)] w-fit shadow-xs">
          <Terminal className="w-3.5 h-3.5 text-[var(--carmine)]" />
          <span>zsh — 80x24</span>
          <span className="text-[var(--text-subtle)]">|</span>
          <span className="text-emerald-500 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            {content.personal.status}
          </span>
        </div>

        <div>
          <h1
            className="font-pixel-custom uppercase leading-[0.9] select-none tracking-wide"
            style={{ fontSize: "clamp(4.5rem, 14vw, 11rem)" }}
          >
            <span className="text-[var(--text-primary)] block">{content.hero.headingPart1}</span>
            <span className="text-[var(--carmine)] block">{content.hero.headingPart2}</span>
          </h1>

          <div className="mt-3 h-7 flex items-center font-mono-custom text-sm sm:text-lg text-[var(--text-muted)]">
            <span className="text-[var(--carmine)] font-bold mr-2">&gt;</span>
            <span className="text-[var(--text-primary)] font-semibold">{displayedText}</span>
            <span className="inline-block w-2 h-4 bg-[var(--carmine)] cursor-blink ml-1" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-5 border-t border-[var(--border)]">
          <div className="space-y-1.5">
            <span className="font-mono-custom text-[11px] uppercase tracking-wider text-[var(--carmine)] font-semibold">
              // 01. ABOUT ME
            </span>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-4">
              {content.personal.aboutMe}
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="font-mono-custom text-[11px] uppercase tracking-wider text-[var(--amber-glow)] font-semibold">
              // 02. CURRENT FOCUS
            </span>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-4">
              {content.personal.rightNow}
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="font-mono-custom text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold">
              // 03. STACK
            </span>
            <div className="flex flex-wrap gap-1.5">
              {["Angular 18", "Next.js 16", "Java", ".NET", "Cypress", "TypeScript"].map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 rounded-sm bg-[var(--surface)] border border-[var(--border)] font-mono-custom text-[11px] text-[var(--text-muted)] hover:border-[var(--carmine)]/60 hover:text-[var(--text-primary)] transition-colors"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="#projects"
            className="flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[var(--carmine)] hover:bg-[var(--carmine-light)] text-white font-mono-custom text-sm font-semibold transition-all group shadow-md"
          >
            <span>{content.hero.viewProjects}</span>
            <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </Link>

          <a
            href="/jhon-medina-cv.pdf"
            download="Jhon_Medina_CV.pdf"
            className="flex items-center gap-2 px-5 py-2.5 rounded-sm border border-[var(--carmine)] bg-[var(--carmine)]/10 hover:bg-[var(--carmine)] hover:text-white text-[var(--text-primary)] font-mono-custom text-sm font-semibold transition-all group"
          >
            <Download className="w-4 h-4 text-[var(--carmine)] group-hover:text-white transition-colors" />
            <span>{content.hero.downloadCv}</span>
          </a>

          <Link
            href="#game-mode"
            className="flex items-center gap-2 px-4 py-2.5 rounded-sm border border-[var(--border-strong)] bg-[var(--surface)] hover:border-[var(--amber-glow)] text-[var(--text-primary)] font-mono-custom text-sm transition-all group"
          >
            <Gamepad2 className="w-4 h-4 text-[var(--amber-glow)] group-hover:rotate-12 transition-transform" />
            <span>{content.hero.gameMode}</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex items-center gap-2 px-4 py-2.5 rounded-sm border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] text-[var(--text-muted)] hover:text-[var(--text-primary)] font-mono-custom text-sm transition-all"
              title="Copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500">{content.hero.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{content.hero.copyEmail}</span>
                </>
              )}
            </button>

            <a
              href={content.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-sm border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--carmine)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>

            <a
              href={content.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-sm border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--carmine)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>

      <div className="flex items-center justify-between py-4 border-t border-[var(--border)] font-mono-custom text-[11px] text-[var(--text-subtle)]">
        <span>jhon437699@gmail.com · Santo Domingo, DR</span>
        <span className="hidden sm:block">↓ scroll to explore</span>
      </div>

    </section>
  );
}
