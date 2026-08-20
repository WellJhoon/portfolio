"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal, Download, Sparkles, Volume2, Moon, Sun, ArrowRight, ShieldCheck, Gamepad2, X, Globe, Briefcase, Code2, FolderGit2, GraduationCap, Mail, Copy, ExternalLink } from "lucide-react";
import { sound } from "@/lib/sound";
import { useLanguage } from "@/context/LanguageContext";

interface CommandItem {
  id: string;
  label: string;
  category: string;
  icon: typeof Terminal;
  action: () => void;
}

export default function CommandPalette() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => {
          if (!prev) sound.playOpen();
          return !prev;
        });
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [open]);

  const commands: CommandItem[] = [
    {
      id: "hero",
      label: language === "es" ? "00. Inicio / Telemetría Principal" : "00. Home / Main Telemetry",
      category: language === "es" ? "Navegación" : "Navigation",
      icon: Terminal,
      action: () => {
        window.location.hash = "#hero";
        setOpen(false);
      }
    },
    {
      id: "experience",
      label: language === "es" ? "01. Experiencia Laboral (Hacienda / CardNET / Arium)" : "01. Work Experience (Hacienda / CardNET / Arium)",
      category: language === "es" ? "Navegación" : "Navigation",
      icon: Briefcase,
      action: () => {
        window.location.hash = "#experience";
        setOpen(false);
      }
    },
    {
      id: "skills",
      label: language === "es" ? "02. Habilidades & Stack (.NET / Java / Angular / Cypress)" : "02. Skills & Stack (.NET / Java / Angular / Cypress)",
      category: language === "es" ? "Navegación" : "Navigation",
      icon: Code2,
      action: () => {
        window.location.hash = "#skills";
        setOpen(false);
      }
    },
    {
      id: "projects",
      label: language === "es" ? "03. Proyectos & Simuladores de Código" : "03. Projects & Code Simulators",
      category: language === "es" ? "Navegación" : "Navigation",
      icon: FolderGit2,
      action: () => {
        window.location.hash = "#projects";
        setOpen(false);
      }
    },
    {
      id: "game",
      label: language === "es" ? "04. Modo Arcade (Tech Ninja Canvas)" : "04. Arcade Mode (Tech Ninja Canvas)",
      category: language === "es" ? "Navegación" : "Navigation",
      icon: Gamepad2,
      action: () => {
        window.location.hash = "#game-mode";
        setOpen(false);
      }
    },
    {
      id: "radar",
      label: language === "es" ? "05. Radar Global de Visitantes (Telemetría Satelital)" : "05. Global Visitor Radar (Satellite Telemetry)",
      category: language === "es" ? "Navegación" : "Navigation",
      icon: Globe,
      action: () => {
        window.location.hash = "#radar";
        setOpen(false);
      }
    },
    {
      id: "guestbook",
      label: language === "es" ? "06. Libro de Visitas Pixel Art (16x16)" : "06. Pixel Art Guestbook (16x16)",
      category: language === "es" ? "Navegación" : "Navigation",
      icon: Sparkles,
      action: () => {
        window.location.hash = "#guestbook";
        setOpen(false);
      }
    },
    {
      id: "education",
      label: language === "es" ? "07. Educación & Certificaciones Oficiales" : "07. Education & Official Certifications",
      category: language === "es" ? "Navegación" : "Navigation",
      icon: GraduationCap,
      action: () => {
        window.location.hash = "#education";
        setOpen(false);
      }
    },
    {
      id: "contact",
      label: language === "es" ? "08. Contacto Directo & Redes" : "08. Direct Contact & Socials",
      category: language === "es" ? "Navegación" : "Navigation",
      icon: Mail,
      action: () => {
        window.location.hash = "#contact";
        setOpen(false);
      }
    },
    {
      id: "download-cv",
      label: language === "es" ? "Descargar CV Oficial (PDF)" : "Download Official CV (PDF)",
      category: language === "es" ? "Acciones" : "Actions",
      icon: Download,
      action: () => {
        const link = document.createElement("a");
        link.href = "/jhon-medina-cv.pdf";
        link.download = "Jhon_Medina_CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        sound.playSuccess();
        setOpen(false);
      }
    },
    {
      id: "compose-email",
      label: language === "es" ? "Redactar Mensaje en Gmail" : "Compose Message in Gmail",
      category: language === "es" ? "Acciones" : "Actions",
      icon: Mail,
      action: () => {
        window.open(
          `https://mail.google.com/mail/?view=cm&fs=1&to=jhon437699@gmail.com&su=${encodeURIComponent("Propuesta de Proyecto / Contacto Profesional")}`,
          "_blank"
        );
        setOpen(false);
      }
    },
    {
      id: "copy-email",
      label: language === "es" ? "Copiar Email al Portapapeles" : "Copy Email to Clipboard",
      category: language === "es" ? "Acciones" : "Actions",
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText("jhon437699@gmail.com");
        sound.playSuccess();
        setOpen(false);
      }
    },
    {
      id: "open-github",
      label: language === "es" ? "Abrir Perfil de GitHub (WellJhoon)" : "Open GitHub Profile (WellJhoon)",
      category: language === "es" ? "Enlaces" : "Links",
      icon: ExternalLink,
      action: () => {
        window.open("https://github.com/WellJhoon", "_blank");
        setOpen(false);
      }
    },
    {
      id: "open-linkedin",
      label: language === "es" ? "Abrir Perfil de LinkedIn (Jhon Medina)" : "Open LinkedIn Profile (Jhon Medina)",
      category: language === "es" ? "Enlaces" : "Links",
      icon: ExternalLink,
      action: () => {
        window.open("https://www.linkedin.com/in/jhon-medina-well", "_blank");
        setOpen(false);
      }
    },
    {
      id: "toggle-sound",
      label: language === "es" ? "Alternar Audio Táctil UI" : "Toggle UI Tactile Audio",
      category: language === "es" ? "Sistema" : "System",
      icon: Volume2,
      action: () => {
        sound.toggleMute();
        sound.playClick();
        setOpen(false);
      }
    }
  ];

  const filteredCommands = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    sound.playHover();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
      e.preventDefault();
      sound.playClick();
      filteredCommands[selectedIndex].action();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-start justify-center pt-20 sm:pt-28 px-4 font-mono-custom animate-fadeIn select-none">
      <div
        data-cy="command-palette-modal"
        className="w-full max-w-xl bg-[var(--surface)] border-2 border-[var(--carmine)] rounded-sm shadow-2xl overflow-hidden flex flex-col"
        onKeyDown={handleKeyDownList}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-[var(--surface-raised)] border-b border-[var(--border)] text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[var(--carmine)]" />
            <span className="font-bold text-[var(--text-primary)]">SYSTEM COMMAND HUD</span>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="p-1 hover:text-[var(--carmine)] text-[var(--text-muted)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 border-b border-[var(--border)] flex items-center gap-2 bg-[var(--bg)]">
          <span className="text-[var(--carmine)] font-bold text-sm">&gt;</span>
          <input
            ref={inputRef}
            data-cy="command-palette-input"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={language === "es" ? "Escribe un comando o busca una sección..." : "Type a command or search section..."}
            className="w-full bg-transparent border-none text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none placeholder:text-[var(--text-subtle)]"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] rounded-xs bg-[var(--surface-raised)] border border-[var(--border)] text-[var(--text-muted)]">
            ESC
          </kbd>
        </div>

        <div className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <p className="text-xs text-[var(--text-muted)] p-4 text-center">
              {language === "es" ? "No se encontraron comandos." : "No matching commands."}
            </p>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  data-cy={`command-item-${cmd.id}`}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    cmd.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-sm text-xs transition-all ${
                    isSelected
                      ? "bg-[var(--carmine)] text-white font-bold shadow-xs"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cmd.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] uppercase ${isSelected ? "text-white/80" : "text-[var(--text-subtle)]"}`}>
                      {cmd.category}
                    </span>
                    <ArrowRight className={`w-3 h-3 ${isSelected ? "translate-x-0.5" : "opacity-0"}`} />
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="px-3 py-2 bg-[var(--surface-raised)] border-t border-[var(--border)] flex items-center justify-between text-[10px] text-[var(--text-subtle)]">
          <span>[↑↓] Navegar · [ENTER] Ejecutar</span>
          <span>Ctrl + K</span>
        </div>
      </div>
    </div>
  );
}
