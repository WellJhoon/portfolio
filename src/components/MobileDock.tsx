"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Briefcase, FolderGit2, Gamepad2, Palette, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function MobileDock() {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState("hero");

  const dockItems = [
    { id: "hero", icon: Home, label: language === "es" ? "Inicio" : "Home", href: "#hero" },
    { id: "experience", icon: Briefcase, label: language === "es" ? "Exp" : "Exp", href: "#experience" },
    { id: "projects", icon: FolderGit2, label: language === "es" ? "Proyectos" : "Projects", href: "#projects" },
    { id: "game-mode", icon: Gamepad2, label: "Arcade", href: "#game-mode" },
    { id: "guestbook", icon: Palette, label: language === "es" ? "Firma" : "Draw", href: "#guestbook" },
    { id: "contact", icon: Send, label: language === "es" ? "Contacto" : "Contact", href: "#contact" }
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

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none lg:hidden">
      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full bg-[#0a0e17]/85 dark:bg-[#0a0e17]/85 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      >
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActiveSection(item.id)}
              className="relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-colors text-[10px] font-mono-custom"
            >
              {isActive && (
                <motion.div
                  layoutId="activeDockPill"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-[var(--carmine)] shadow-[0_0_15px_rgba(225,29,72,0.5)]"
                />
              )}

              <motion.div
                whileTap={{ scale: 0.8 }}
                className={`relative z-10 flex flex-col items-center justify-center ${
                  isActive ? "text-white" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[9px] mt-0.5 font-bold tracking-tight">
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}
