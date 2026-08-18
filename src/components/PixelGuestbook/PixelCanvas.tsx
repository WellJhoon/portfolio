"use client";

import { useState, useRef } from "react";
import { Paintbrush, Eraser, RotateCcw, Send, CheckCircle2, PaintBucket } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PALETTE = [
  "#000000",
  "#e11d48",
  "#f43f5e",
  "#38bdf8",
  "#0284c7",
  "#10b981",
  "#059669",
  "#f59e0b",
  "#eab308",
  "#a855f7",
  "#ffffff",
  "#64748b"
];

const DEFAULT_GRID = Array(256).fill("#000000");

interface PixelCanvasProps {
  onSuccess?: () => void;
}

export default function PixelCanvas({ onSuccess }: PixelCanvasProps) {
  const { language } = useLanguage();
  const [pixels, setPixels] = useState<string[]>(DEFAULT_GRID);
  const [selectedColor, setSelectedColor] = useState<string>("#e11d48");
  const [tool, setTool] = useState<"pencil" | "eraser" | "bucket">("pencil");
  const [authorName, setAuthorName] = useState("");
  const [authorSocial, setAuthorSocial] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isDrawingRef = useRef(false);

  const floodFill = (grid: string[], startIndex: number, targetColor: string, replacementColor: string) => {
    if (targetColor === replacementColor) return grid;
    const newGrid = [...grid];
    const queue: number[] = [startIndex];
    const visited = new Set<number>();

    while (queue.length > 0) {
      const idx = queue.pop()!;
      if (visited.has(idx)) continue;
      visited.add(idx);

      if (newGrid[idx] === targetColor) {
        newGrid[idx] = replacementColor;
        const row = Math.floor(idx / 16);
        const col = idx % 16;

        if (row > 0) queue.push((row - 1) * 16 + col);
        if (row < 15) queue.push((row + 1) * 16 + col);
        if (col > 0) queue.push(row * 16 + (col - 1));
        if (col < 15) queue.push(row * 16 + (col + 1));
      }
    }
    return newGrid;
  };

  const applyPixelColor = (index: number) => {
    if (tool === "bucket") {
      const targetColor = pixels[index];
      const replacementColor = selectedColor;
      setPixels(floodFill(pixels, index, targetColor, replacementColor));
      return;
    }

    const colorToApply = tool === "eraser" ? "#000000" : selectedColor;
    setPixels((prev) => {
      if (prev[index] === colorToApply) return prev;
      const next = [...prev];
      next[index] = colorToApply;
      return next;
    });
  };

  const handlePointerDown = (index: number) => {
    isDrawingRef.current = true;
    applyPixelColor(index);
  };

  const handlePointerEnter = (index: number) => {
    if (isDrawingRef.current && tool !== "bucket") {
      applyPixelColor(index);
    }
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
  };

  const clearCanvas = () => {
    setPixels(DEFAULT_GRID);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!authorName.trim()) {
      setErrorMsg(language === "es" ? "Por favor escribe tu nombre o alias" : "Please enter your name or alias");
      return;
    }

    const isCanvasEmpty = pixels.every((p) => p === "#000000");
    if (isCanvasEmpty) {
      setErrorMsg(language === "es" ? "El lienzo está vacío. ¡Haz tu dibujo!" : "Canvas is empty. Draw something!");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorName: authorName.trim(),
          authorSocial: authorSocial.trim() || undefined,
          pixels
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setPixels(DEFAULT_GRID);
        setAuthorName("");
        setAuthorSocial("");
        if (onSuccess) onSuccess();
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setErrorMsg(data.error || "Error al enviar");
      }
    } catch {
      setErrorMsg(language === "es" ? "Error de conexión" : "Connection error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="p-5 sm:p-7 rounded-sm bg-[var(--surface)] border border-[var(--border)] shadow-xl font-mono-custom space-y-6 select-none"
    >
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--carmine)]" />
          <span className="font-bold text-[var(--text-primary)]">
            {language === "es" ? "Lienzo 16x16 Pixel Art" : "16x16 Pixel Art Canvas"}
          </span>
        </div>
        <span className="text-[11px] text-[var(--text-muted)]">256 px</span>
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 justify-center">
        <div className="space-y-4 flex flex-col items-center">
          <div
            className="grid grid-cols-16 gap-[1px] p-2 bg-[#090b10] border-2 border-[var(--border-strong)] rounded-sm shadow-inner touch-none cursor-crosshair"
            style={{ width: "272px", height: "272px" }}
          >
            {pixels.map((color, index) => (
              <div
                key={index}
                onPointerDown={() => handlePointerDown(index)}
                onPointerEnter={() => handlePointerEnter(index)}
                style={{ backgroundColor: color }}
                className="w-4 h-4 rounded-[1px] hover:opacity-80 transition-opacity"
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => setTool("pencil")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-sm text-xs transition-all ${
                tool === "pencil"
                  ? "bg-[var(--carmine)] text-white font-bold"
                  : "bg-[var(--surface-raised)] text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Paintbrush className="w-3.5 h-3.5" />
              <span>{language === "es" ? "Lápiz" : "Pencil"}</span>
            </button>

            <button
              type="button"
              onClick={() => setTool("bucket")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-sm text-xs transition-all ${
                tool === "bucket"
                  ? "bg-[var(--carmine)] text-white font-bold"
                  : "bg-[var(--surface-raised)] text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--text-primary)]"
              }`}
            >
              <PaintBucket className="w-3.5 h-3.5" />
              <span>{language === "es" ? "Relleno" : "Bucket"}</span>
            </button>

            <button
              type="button"
              onClick={() => setTool("eraser")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-sm text-xs transition-all ${
                tool === "eraser"
                  ? "bg-[var(--carmine)] text-white font-bold"
                  : "bg-[var(--surface-raised)] text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Eraser className="w-3.5 h-3.5" />
              <span>{language === "es" ? "Borrador" : "Eraser"}</span>
            </button>

            <button
              type="button"
              onClick={clearCanvas}
              className="p-1.5 rounded-sm bg-[var(--surface-raised)] text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--carmine)] transition-all"
              title={language === "es" ? "Limpiar lienzo" : "Clear canvas"}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[260px]">
            {PALETTE.map((col) => (
              <button
                key={col}
                type="button"
                onClick={() => {
                  setSelectedColor(col);
                  if (tool === "eraser") setTool("pencil");
                }}
                style={{ backgroundColor: col }}
                className={`w-6 h-6 rounded-sm border transition-transform ${
                  selectedColor === col && tool !== "eraser"
                    ? "scale-110 border-white ring-2 ring-[var(--carmine)]"
                    : "border-black/40 hover:scale-105"
                }`}
              />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full lg:w-72 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">
                {language === "es" ? "Tu Nombre / Alias *" : "Your Name / Handle *"}
              </label>
              <input
                type="text"
                required
                maxLength={30}
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="ej. Alex Dev"
                className="w-full px-3 py-2 rounded-sm bg-[var(--bg)] border border-[var(--border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--carmine)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">
                {language === "es" ? "Enlace (GitHub / LinkedIn / X)" : "Link (GitHub / LinkedIn / X)"}
              </label>
              <input
                type="url"
                maxLength={100}
                value={authorSocial}
                onChange={(e) => setAuthorSocial(e.target.value)}
                placeholder="https://github.com/usuario"
                className="w-full px-3 py-2 rounded-sm bg-[var(--bg)] border border-[var(--border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--carmine)]"
              />
            </div>

            <div className="p-3 rounded-sm bg-[var(--surface-raised)] border border-[var(--border)] text-[11px] text-[var(--text-muted)] space-y-1">
              <span className="text-[var(--amber-glow)] font-bold">
                {language === "es" ? "ℹ Moderación previa" : "ℹ Prior moderation"}
              </span>
              <p>
                {language === "es"
                  ? "Tu firma será revisada antes de aparecer en la galería pública para evitar contenido indebido."
                  : "Your artwork will be reviewed before appearing on the public gallery."}
              </p>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-500 font-semibold">{errorMsg}</p>
            )}

            {submitted && (
              <div className="flex items-center gap-1.5 p-2 rounded-sm bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  {language === "es" ? "¡Arte enviado para aprobación!" : "Artwork submitted for review!"}
                </span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-sm bg-[var(--carmine)] hover:bg-[var(--carmine-light)] text-white text-xs font-bold transition-all shadow-md disabled:opacity-50 group"
          >
            <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            <span>
              {submitting
                ? language === "es" ? "Enviando..." : "Submitting..."
                : language === "es" ? "Firmar Libro de Visitas" : "Sign Guestbook"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
