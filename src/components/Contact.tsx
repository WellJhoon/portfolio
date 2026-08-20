"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, Copy, Check, MapPin, Terminal, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function Contact() {
  const { content, language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(content.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative bg-[var(--surface-raised)]/40 border-t border-[var(--border)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-sm bg-[var(--surface)] border border-[var(--border-strong)] relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--border)]">
            <div className="flex items-center gap-2 font-mono-custom text-xs text-[var(--text-muted)]">
              <Terminal className="w-4 h-4 text-[var(--carmine)]" />
              <span>contact_terminal.sh</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--carmine)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--amber-glow)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]" />
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div className="space-y-2">
              <span className="font-mono-custom text-xs uppercase tracking-wider text-[var(--carmine)] font-semibold">
                {content.contact.subtitle}
              </span>
              <h2 className="font-mono-custom text-2xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
                {content.contact.heading}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              {content.contact.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${content.personal.email}&su=${encodeURIComponent(language === "es" ? "Propuesta de Proyecto / Contacto Profesional" : "Project Inquiry / Professional Contact")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-sm bg-[var(--carmine)] hover:bg-[var(--carmine-light)] text-white font-mono-custom text-sm font-bold transition-all group shadow-md"
              >
                <Mail className="w-4 h-4" />
                <span>{language === "es" ? "Redactar en Gmail" : "Compose in Gmail"}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-sm border border-[var(--border-strong)] bg-[var(--surface-raised)] hover:border-[var(--carmine)] text-[var(--text-primary)] font-mono-custom text-sm font-semibold transition-all group cursor-pointer"
                title="Copiar dirección de email"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-500">{language === "es" ? "Copiado!" : "Copied!"}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--carmine)]" />
                    <span>{content.personal.email}</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2.5">
                <a
                  href={content.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-3.5 rounded-sm border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--carmine)] text-[var(--text-primary)] font-mono-custom text-sm transition-all"
                >
                  <LinkedinIcon className="w-4 h-4 text-[var(--carmine)]" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                </a>

                <a
                  href={content.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-3.5 rounded-sm border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--carmine)] text-[var(--text-primary)] font-mono-custom text-sm transition-all"
                >
                  <GithubIcon className="w-4 h-4 text-[var(--carmine)]" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-4 font-mono-custom text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[var(--carmine)]" />
              <span>{content.personal.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[var(--text-primary)]">{content.contact.statusText}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
