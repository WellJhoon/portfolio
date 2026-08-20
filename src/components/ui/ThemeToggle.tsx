"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-sm border border-[var(--border)] bg-[var(--surface)] opacity-50" />
    );
  }

  return (
    <button
      type="button"
      data-cy="theme-toggle-btn"
      onClick={toggleTheme}
      className="flex items-center justify-center w-8 h-8 rounded-sm border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--carmine)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo Claro" : "Modo Oscuro"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[var(--amber-glow)]" />
      ) : (
        <Moon className="w-4 h-4 text-[var(--carmine)]" />
      )}
    </button>
  );
}
