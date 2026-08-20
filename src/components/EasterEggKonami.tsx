"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal, X, ShieldAlert, Sparkles } from "lucide-react";
import { sound } from "@/lib/sound";
import { useLanguage } from "@/context/LanguageContext";

const KONAMI_SEQUENCE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a"
];

export default function EasterEggKonami() {
  const { language } = useLanguage();
  const [active, setActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputBufferRef = useRef<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && active) {
        setActive(false);
        return;
      }

      inputBufferRef.current.push(e.key.toLowerCase());
      if (inputBufferRef.current.length > KONAMI_SEQUENCE.length) {
        inputBufferRef.current.shift();
      }

      const match = KONAMI_SEQUENCE.every(
        (key, idx) => key === inputBufferRef.current[idx]
      );

      if (match) {
        setActive(true);
        sound.playSuccess();
        inputBufferRef.current = [];
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "010101JHONDOTNETANGULARJAVASPRINGCYPRESSPCI-DSS<>{}[]/*+=-_~#";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const render = () => {
      ctx.fillStyle = "rgba(12, 13, 18, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#e11d48";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 font-mono-custom select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      <div className="relative z-10 w-full max-w-lg bg-[#0c0d12]/95 border-2 border-[var(--carmine)] rounded-sm p-6 shadow-2xl text-center space-y-4 backdrop-blur-md animate-fadeIn">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--carmine)]/40 text-xs">
          <div className="flex items-center gap-2 text-[var(--carmine)] font-bold">
            <ShieldAlert className="w-4 h-4" />
            <span>ROOT_PRIVILEGES_GRANTED</span>
          </div>
          <button
            type="button"
            onClick={() => setActive(false)}
            className="p-1 text-[var(--text-muted)] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="font-pixel-custom text-4xl text-[var(--carmine)] uppercase tracking-wider">
            KONAMI OVERRIDE ACTIVE
          </h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            {language === "es"
              ? "Has desbloqueado el modo de depuración avanzado de Jhon Medina. Arquitectura distribuida, pruebas E2E deterministas y sistemas de alta disponibilidad."
              : "You have unlocked Jhon Medina's advanced debug telemetry. Distributed architecture, deterministic E2E testing & high availability."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--border)] rounded-xs text-[11px] text-left space-y-1 text-[var(--text-muted)] font-mono-custom">
          <div><span className="text-[var(--carmine)] font-bold">&gt;</span> Kernel: Linux / Enterprise Web API</div>
          <div><span className="text-[var(--carmine)] font-bold">&gt;</span> Compliance: PCI-DSS v4 Verified</div>
          <div><span className="text-[var(--carmine)] font-bold">&gt;</span> Status: All systems green</div>
        </div>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActive(false);
          }}
          className="w-full py-2.5 rounded-sm bg-[var(--carmine)] hover:bg-[var(--carmine-light)] text-white text-xs font-bold transition-all shadow-md"
        >
          {language === "es" ? "Cerrar Modo Debug [ESC]" : "Exit Debug Mode [ESC]"}
        </button>
      </div>
    </div>
  );
}
