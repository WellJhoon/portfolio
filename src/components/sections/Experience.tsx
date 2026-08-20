"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Calendar, MapPin, Building2, CheckCircle2 } from "lucide-react";

export default function Experience() {
  const { content, language } = useLanguage();

  return (
    <section id="experience" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono-custom text-sm font-bold text-[var(--carmine)]">02.</span>
          <h2 className="font-mono-custom text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            {content.experiencesTitle}
          </h2>
          <div className="h-px flex-1 bg-[var(--border)] ml-4" />
        </div>

        <div className="space-y-8">
          {content.experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-6 sm:p-8 rounded-sm bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-all relative overflow-hidden group shadow-sm"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--border)] group-hover:bg-[var(--carmine)] transition-colors" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-mono-custom text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                      {exp.role}
                    </h3>
                    {exp.isCurrent && (
                      <span className="px-2 py-0.5 rounded-sm bg-[var(--carmine)]/15 border border-[var(--carmine)]/40 text-[var(--carmine)] font-mono-custom text-[11px] font-semibold">
                        {language === "es" ? "ACTUALIDAD" : "PRESENT"}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono-custom text-[var(--text-muted)]">
                    <span className="flex items-center gap-1.5 text-[var(--text-primary)] font-semibold">
                      <Building2 className="w-3.5 h-3.5 text-[var(--carmine)]" />
                      {exp.company}
                    </span>
                    <span className="text-[var(--text-subtle)]">|</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--text-subtle)]" />
                      {exp.location}
                    </span>
                    <span className="text-[var(--text-subtle)]">|</span>
                    <span>{exp.sector}</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[var(--surface-raised)] border border-[var(--border)] font-mono-custom text-xs text-[var(--text-muted)] self-start lg:self-auto">
                  <Calendar className="w-3.5 h-3.5 text-[var(--carmine)]" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-6 text-sm text-[var(--text-muted)] leading-relaxed">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[var(--carmine)] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border)]/70">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-sm bg-[var(--surface-raised)] border border-[var(--border)] font-mono-custom text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
