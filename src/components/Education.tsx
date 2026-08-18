"use client";

import { portfolioData } from "@/data/portfolio";
import { GraduationCap, Award, Calendar, CheckCircle2 } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono-custom text-sm font-bold text-[var(--carmine)]">05.</span>
          <h2 className="font-mono-custom text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            EDUCATION_&_CERTIFICATIONS
          </h2>
          <div className="h-px flex-1 bg-[var(--border)] ml-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 font-mono-custom text-xs font-bold text-[var(--carmine)] uppercase tracking-wider pb-2 border-b border-[var(--border)]">
              <GraduationCap className="w-4 h-4" />
              <span>FORMACIÓN ACADÉMICA</span>
            </div>

            {portfolioData.education.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-sm bg-[var(--surface)] border border-[var(--border)] space-y-3 shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--carmine)]" />
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-mono-custom text-base font-bold text-[var(--text-primary)]">
                    {edu.institution}
                  </h3>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[var(--surface-raised)] border border-[var(--border)] font-mono-custom text-xs text-[var(--text-muted)]">
                  <Calendar className="w-3.5 h-3.5 text-[var(--carmine)]" />
                  <span>{edu.period}</span>
                </div>
                <p className="font-mono-custom text-sm text-[var(--carmine)] font-semibold">
                  {edu.degree}
                </p>
                {edu.details && (
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {edu.details}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <div className="flex items-center gap-2 font-mono-custom text-xs font-bold text-[var(--carmine)] uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>CERTIFICACIONES PROFESIONALES & ESTÁNDARES</span>
              </div>
              <span className="font-mono-custom text-xs text-[var(--text-muted)]">
                {portfolioData.certifications.length} Verificadas
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {portfolioData.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-sm bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--carmine)]/50 transition-all flex flex-col justify-between gap-2 group shadow-sm"
                >
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-mono-custom text-xs sm:text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--carmine)] transition-colors leading-snug">
                        {cert.title}
                      </h4>
                    </div>
                    <p className="text-[11px] font-mono-custom text-[var(--text-muted)]">
                      {cert.issuer}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]/60 text-[11px] font-mono-custom">
                    <span className="flex items-center gap-1 text-emerald-500">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Certified</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-sm bg-[var(--surface-raised)] border border-[var(--border)] text-[var(--text-primary)] font-bold">
                      {cert.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
