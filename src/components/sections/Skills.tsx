"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Code2, Layout, Server, Database, ShieldCheck } from "lucide-react";

const CORE_SKILLS = [
  "Angular 18+",
  "Next.js (App Router)",
  "TypeScript",
  "C# (.NET)",
  "Java",
  "Spring Boot",
  "ASP.NET Core Web API",
  "Cypress (E2E)",
  "Clean Architecture",
  "SQL Server"
];

export default function Skills() {
  const { content } = useLanguage();

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Code2 className="w-4 h-4 text-[var(--carmine)]" />;
      case 1:
        return <Layout className="w-4 h-4 text-[var(--carmine)]" />;
      case 2:
        return <Server className="w-4 h-4 text-[var(--carmine)]" />;
      case 3:
        return <Database className="w-4 h-4 text-[var(--carmine)]" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-[var(--carmine)]" />;
    }
  };

  return (
    <section id="skills" className="py-20 lg:py-28 relative bg-[var(--surface-raised)]/30 border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono-custom text-sm font-bold text-[var(--carmine)]">03.</span>
          <h2 className="font-mono-custom text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            {content.skillsTitle}
          </h2>
          <div className="h-px flex-1 bg-[var(--border)] ml-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.skillCategories.map((category, idx) => (
            <div
              key={category.category}
              className="p-6 rounded-sm bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-all space-y-4 shadow-sm"
            >
              <div className="flex items-center gap-2.5 pb-3 border-b border-[var(--border)]">
                {getCategoryIcon(idx)}
                <h3 className="font-mono-custom text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
                  {category.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => {
                  const isCore = CORE_SKILLS.includes(skill.name);
                  return (
                    <span
                      key={skill.name}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-mono-custom text-xs transition-all ${
                        isCore
                          ? "bg-[var(--carmine)]/10 border border-[var(--carmine)]/50 text-[var(--text-primary)] font-semibold shadow-2xs"
                          : "bg-[var(--surface-raised)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--carmine)]/40"
                      }`}
                    >
                      {isCore && <span className="w-1.5 h-1.5 rounded-full bg-[var(--carmine)] shrink-0" />}
                      <span>{skill.name}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
