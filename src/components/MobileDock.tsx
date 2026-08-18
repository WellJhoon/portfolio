"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Briefcase, FolderGit2, Gamepad2, Palette, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function MobileDock() {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState("hero");

  const dockItems = [
    { id: "hero", icon: Home, label: language === "es" ? "Inicio" : "Home" },
    { id: "experience", icon: Briefcase, label: language === "es" ? "Exp" : "Exp" },
    { id: "projects", icon: FolderGit2, label: language === "es" ? "Proyectos" : "Projects" },
    { id: "game-mode", icon: Gamepad2, label: "Arcade" },
    { id: "guestbook", icon: Palette, label: language === "es" ? "Firma" : "Draw" },
    { id: "contact", icon: Send, label: language === "es" ? "Contacto" : "Contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of dockItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dockItems]);

  const handleItemClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none lg:hidden">
      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full bg-[#0a0e17]/90 backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      >
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleItemClick(item.id)}
              className="relative flex flex-col items-center justify-center w-12 h-12 rounded-full text-[10px] font-mono-custom focus:outline-none"
            >
              {isActive && (
                <motion.div
                  layoutId="activeDockPill"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-[var(--carmine)] shadow-[0_0_15px_rgba(225,29,72,0.5)] pointer-events-none"
                />
              )}

              <motion.div
                whileTap={{ scale: 0.8 }}
                className={`relative z-10 flex flex-col items-center justify-center pointer-events-none ${
                  isActive ? "text-white" : "text-[var(--text-muted)]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[9px] mt-0.5 font-bold tracking-tight">
                  {item.label}
                </span>
              </motion.div>
            </button>
          );
        })}
      </motion.nav>
    </div>
  );
}
