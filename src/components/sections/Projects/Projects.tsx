"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ExternalLink, FolderGit2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ProjectSimulator from "./ProjectSimulator";

export default function Projects() {
  const { content } = useLanguage();
  const [filter, setFilter] = useState<string>("all");

  const filteredProjects = content.projects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "frontend") return p.category === "frontend" || p.category === "fullstack";
    if (filter === "backend") return p.category === "backend";
    if (filter === "qa") return p.category === "qa";
    return true;
  });

  return (
    <section id="projects" data-cy="projects-section" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="font-mono-custom text-sm font-bold text-[var(--carmine)]">04.</span>
            <h2 className="font-mono-custom text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              {content.projectsTitle}
            </h2>
            <div className="hidden sm:block h-px w-24 bg-[var(--border)] ml-4" />
          </div>

          <div className="flex flex-wrap gap-2 font-mono-custom text-xs">
            {content.projectFilters.map((c) => (
              <button
                key={c.key}
                data-cy={`project-filter-${c.key}`}
                type="button"
                onClick={() => setFilter(c.key)}
                className={`px-3 py-1.5 rounded-sm transition-all ${
                  filter === c.key
                    ? "bg-[var(--carmine)] text-white font-semibold shadow-sm"
                    : "bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border)]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <SpotlightCard
              key={project.id}
              data-cy={`project-card-${project.id}`}
              className="p-6 flex flex-col justify-between group shadow-sm hover:border-[var(--carmine)]/60"
            >
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between gap-2">
                  <div className="p-2 rounded-sm bg-[var(--surface-raised)] border border-[var(--border)] text-[var(--carmine)]">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1"
                        aria-label="View Source on GitHub"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1"
                        aria-label="View Live Site"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  <span className="font-mono-custom text-[11px] uppercase tracking-wider text-[var(--carmine)] font-semibold">
                    {project.category}
                  </span>
                  <h3 className="font-mono-custom text-base sm:text-lg font-bold text-[var(--text-primary)] mt-1 group-hover:text-[var(--carmine-light)] transition-colors">
                    {project.title}
                  </h3>
                </div>

                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-[var(--border)]/60">
                  {project.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                      <span className="text-[var(--carmine)] font-bold">›</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <ProjectSimulator projectId={project.id} />
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border)]">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-sm bg-[var(--surface-raised)] border border-[var(--border)] font-mono-custom text-[11px] text-[var(--text-muted)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
