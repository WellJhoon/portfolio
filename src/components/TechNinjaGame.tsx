"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Play, RotateCcw, Volume2, VolumeX, Download, Trophy, Flame, Heart, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface SliceParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
}

interface HalfPiece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  color: string;
  side: "left" | "right";
  angle: number;
  vRot: number;
  radius: number;
}

interface TechOrb {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  text: string;
  color: string;
  isBug: boolean;
  angle: number;
  vRot: number;
  sliced: boolean;
}

interface TrailPoint {
  x: number;
  y: number;
  time: number;
}

const REQUIRED_STACK = [
  { id: "angular", text: "Angular", color: "#e11d48" },
  { id: "java", text: "Java", color: "#f59e0b" },
  { id: "dotnet", text: ".NET", color: "#8b5cf6" },
  { id: "cypress", text: "Cypress", color: "#10b981" },
  { id: "typescript", text: "TypeScript", color: "#38bdf8" },
  { id: "nextjs", text: "Next.js", color: "#f8fafc" },
  { id: "spring", text: "Spring", color: "#22c55e" }
];

const BUG_ITEMS = [
  { text: "BUG 500", color: "#ef4444", isBug: true },
  { text: "NULL PTR", color: "#dc2626", isBug: true }
];

export default function TechNinjaGame() {
  const { language } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover" | "won">("idle");
  const [collectedStack, setCollectedStack] = useState<string[]>([]);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const audioCtxRef = useRef<AudioContext | null>(null);

  const orbsRef = useRef<TechOrb[]>([]);
  const halvesRef = useRef<HalfPiece[]>([]);
  const particlesRef = useRef<SliceParticle[]>([]);
  const trailRef = useRef<TrailPoint[]>([]);

  const isTouchingRef = useRef(false);
  const lastTouchRef = useRef<{ x: number; y: number } | null>(null);
  const spawnTimerRef = useRef(0);
  const collectedStackRef = useRef<Set<string>>(new Set());
  const livesRef = useRef(3);
  const gameStateRef = useRef<"idle" | "playing" | "gameover" | "won">("idle");

  const playSound = useCallback(
    (freq: number, type: OscillatorType = "sine", duration = 0.1, slideTo?: number) => {
      if (!soundEnabled || typeof window === "undefined") return;
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (AudioContextClass) audioCtxRef.current = new AudioContextClass();
        }
        const ctx = audioCtxRef.current;
        if (!ctx) return;
        if (ctx.state === "suspended") ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        if (slideTo) {
          osc.frequency.exponentialRampToValueAtTime(slideTo, ctx.currentTime + duration);
        }

        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch {}
    },
    [soundEnabled]
  );

  const triggerDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = "/jhon-medina-cv.pdf";
    link.download = "Jhon_Medina_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const lineIntersectsCircle = (x1: number, y1: number, x2: number, y2: number, cx: number, cy: number, r: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    if (len === 0) return Math.hypot(x1 - cx, y1 - cy) <= r;

    const u = ((cx - x1) * dx + (cy - y1) * dy) / (len * len);
    const clampedU = Math.max(0, Math.min(1, u));
    const closestX = x1 + clampedU * dx;
    const closestY = y1 + clampedU * dy;
    return Math.hypot(cx - closestX, cy - closestY) <= r;
  };

  const sliceOrb = (orb: TechOrb) => {
    if (orb.sliced) return;
    orb.sliced = true;

    if (orb.isBug) {
      playSound(120, "sawtooth", 0.35, 60);
      livesRef.current -= 1;
      setLives(livesRef.current);
      setCombo(0);

      for (let i = 0; i < 20; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = Math.random() * 6 + 2;
        particlesRef.current.push({
          x: orb.x,
          y: orb.y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          size: Math.random() * 4 + 2,
          color: "#ef4444",
          alpha: 1,
          life: 30
        });
      }

      if (livesRef.current <= 0) {
        gameStateRef.current = "gameover";
        setGameState("gameover");
      }
      return;
    }

    playSound(600, "triangle", 0.15, 950);
    setCombo((prev) => prev + 1);

    const matchingTech = REQUIRED_STACK.find((t) => t.text === orb.text);
    if (matchingTech) {
      collectedStackRef.current.add(matchingTech.id);
      setCollectedStack(Array.from(collectedStackRef.current));
    }

    halvesRef.current.push(
      {
        x: orb.x - 6,
        y: orb.y,
        vx: orb.vx - (Math.random() * 3 + 2),
        vy: orb.vy - 1,
        text: orb.text.slice(0, Math.ceil(orb.text.length / 2)),
        color: orb.color,
        side: "left",
        angle: orb.angle,
        vRot: -0.1,
        radius: orb.radius * 0.9
      },
      {
        x: orb.x + 6,
        y: orb.y,
        vx: orb.vx + (Math.random() * 3 + 2),
        vy: orb.vy - 1,
        text: orb.text.slice(Math.ceil(orb.text.length / 2)),
        color: orb.color,
        side: "right",
        angle: orb.angle,
        vRot: 0.1,
        radius: orb.radius * 0.9
      }
    );

    for (let i = 0; i < 14; i++) {
      const ang = Math.random() * Math.PI * 2;
      const spd = Math.random() * 5 + 1;
      particlesRef.current.push({
        x: orb.x,
        y: orb.y,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        size: Math.random() * 3 + 2,
        color: orb.color,
        alpha: 1,
        life: 25
      });
    }

    if (collectedStackRef.current.size >= REQUIRED_STACK.length) {
      gameStateRef.current = "won";
      setGameState("won");
      playSound(523, "square", 0.15);
      setTimeout(() => playSound(659, "square", 0.15), 150);
      setTimeout(() => playSound(784, "square", 0.35), 300);
      setTimeout(() => triggerDownload(), 600);
    }
  };

  const handlePointerSlice = (x: number, y: number) => {
    if (gameStateRef.current !== "playing") return;

    trailRef.current.push({ x, y, time: performance.now() });

    if (lastTouchRef.current) {
      const p1 = lastTouchRef.current;
      const p2 = { x, y };

      for (const orb of orbsRef.current) {
        if (!orb.sliced && lineIntersectsCircle(p1.x, p1.y, p2.x, p2.y, orb.x, orb.y, orb.radius)) {
          sliceOrb(orb);
        }
      }
    }
    lastTouchRef.current = { x, y };
  };

  const startGame = () => {
    orbsRef.current = [];
    halvesRef.current = [];
    particlesRef.current = [];
    trailRef.current = [];
    collectedStackRef.current.clear();
    livesRef.current = 3;
    spawnTimerRef.current = 75;

    setCollectedStack([]);
    setLives(3);
    setCombo(0);
    gameStateRef.current = "playing";
    setGameState("playing");
    playSound(440, "sine", 0.1, 880);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width || canvas.offsetWidth || 360;
      canvas.height = rect.height || canvas.offsetHeight || 440;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const loop = () => {
      const W = canvas.width || 360;
      const H = canvas.height || 440;

      ctx.clearRect(0, 0, W, H);

      const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
      ctx.fillStyle = isDark ? "#0c0d12" : "#f7f5f0";
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = isDark ? "rgba(225, 29, 72, 0.08)" : "rgba(190, 18, 60, 0.08)";
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      if (gameStateRef.current === "playing") {
        spawnTimerRef.current += 1;
        if (spawnTimerRef.current > 105) {
          spawnTimerRef.current = 0;
          const count = Math.random() < 0.5 ? 1 : Math.random() < 0.85 ? 2 : 3;
          const minLaunch = Math.sqrt(2 * 0.075 * (H * 0.70 + 40));

          for (let k = 0; k < count; k++) {
            const isBugSpawn = Math.random() < 0.18;
            const template = isBugSpawn
              ? BUG_ITEMS[Math.floor(Math.random() * BUG_ITEMS.length)]
              : REQUIRED_STACK[Math.floor(Math.random() * REQUIRED_STACK.length)];

            const spawnX = Math.random() * Math.max(W - 160, 100) + 50;
            const targetX = W / 2 + (Math.random() - 0.5) * (W * 0.3);
            const vx = (targetX - spawnX) * 0.008;
            const vy = -(minLaunch + Math.random() * 1.2);

            orbsRef.current.push({
              id: Math.random().toString(),
              x: spawnX + (k - (count - 1) / 2) * 40,
              y: H + 35,
              vx,
              vy,
              radius: 42,
              text: template.text,
              color: template.color,
              isBug: "isBug" in template ? Boolean(template.isBug) : false,
              angle: 0,
              vRot: (Math.random() - 0.5) * 0.012,
              sliced: false
            });
          }
        }
      }

      for (let i = orbsRef.current.length - 1; i >= 0; i--) {
        const orb = orbsRef.current[i];
        const effectiveGravity = Math.abs(orb.vy) < 1.5 ? 0.035 : 0.065;
        orb.x += orb.vx;
        orb.y += orb.vy;
        orb.vy += effectiveGravity;
        orb.angle += orb.vRot;

        if (orb.y > H + 50 && orb.vy > 0) {
          if (!orb.sliced && !orb.isBug && gameStateRef.current === "playing") {
            livesRef.current -= 1;
            setLives(livesRef.current);
            setCombo(0);
            playSound(160, "sawtooth", 0.15);
            if (livesRef.current <= 0) {
              gameStateRef.current = "gameover";
              setGameState("gameover");
            }
          }
          orbsRef.current.splice(i, 1);
          continue;
        }

        if (!orb.sliced) {
          ctx.save();
          ctx.translate(orb.x, orb.y);
          ctx.rotate(orb.angle);

          ctx.shadowBlur = 12;
          ctx.shadowColor = orb.color;

          ctx.fillStyle = orb.isBug ? (isDark ? "#2a0808" : "#fee2e2") : (isDark ? "#131b2e" : "#ffffff");
          ctx.strokeStyle = orb.color;
          ctx.lineWidth = 2.5;

          ctx.beginPath();
          ctx.arc(0, 0, orb.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.shadowBlur = 0;
          ctx.fillStyle = orb.isBug ? (isDark ? "#fca5a5" : "#be123c") : (isDark ? "#ffffff" : "#1c1917");
          ctx.font = "bold 11px monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(orb.text, 0, 0);

          ctx.restore();
        }
      }

      for (let i = halvesRef.current.length - 1; i >= 0; i--) {
        const h = halvesRef.current[i];
        h.x += h.vx;
        h.y += h.vy;
        h.vy += 0.2;
        h.angle += h.vRot;

        if (h.y > H + 60) {
          halvesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(h.x, h.y);
        ctx.rotate(h.angle);

        ctx.fillStyle = isDark ? "#131b2e" : "#ffffff";
        ctx.strokeStyle = h.color;
        ctx.lineWidth = 2;

        ctx.beginPath();
        if (h.side === "left") {
          ctx.arc(0, 0, h.radius, Math.PI * 0.5, Math.PI * 1.5);
        } else {
          ctx.arc(0, 0, h.radius, Math.PI * 1.5, Math.PI * 0.5);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isDark ? "#ffffff" : "#1c1917";
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(h.text, h.side === "left" ? -6 : 6, 0);

        ctx.restore();
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 1 / p.life;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.globalAlpha = 1;
      }

      const now = performance.now();
      trailRef.current = trailRef.current.filter((pt) => now - pt.time < 160);

      if (trailRef.current.length > 1) {
        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#e11d48";
        ctx.strokeStyle = "#f43f5e";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let i = 1; i < trailRef.current.length; i++) {
          const pt1 = trailRef.current[i - 1];
          const pt2 = trailRef.current[i];
          const ratio = (now - pt2.time) / 160;
          ctx.lineWidth = Math.max(1.5, (1 - ratio) * 7);
          ctx.globalAlpha = Math.max(0.1, 1 - ratio);

          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.stroke();
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const getCanvasCoords = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      if (e.touches.length === 0) return null;
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handlePointerDown = (e: React.TouchEvent | React.MouseEvent) => {
    isTouchingRef.current = true;
    const coords = getCanvasCoords(e);
    if (coords) {
      lastTouchRef.current = coords;
      handlePointerSlice(coords.x, coords.y);
    }
  };

  const handlePointerMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isTouchingRef.current) return;
    const coords = getCanvasCoords(e);
    if (coords) {
      handlePointerSlice(coords.x, coords.y);
    }
  };

  const handlePointerUp = () => {
    isTouchingRef.current = false;
    lastTouchRef.current = null;
  };

  return (
    <div className="w-full select-none font-mono-custom">
      <div className="flex flex-col gap-2 p-3 bg-[var(--surface-raised)] border-b border-[var(--border)] text-xs text-[var(--text-muted)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[var(--carmine)]" />
              <span className="font-bold text-[var(--text-primary)]">
                Stack: {collectedStack.length}/{REQUIRED_STACK.length}
              </span>
            </div>

            <div className="flex items-center gap-0.5">
              {[1, 2, 3].map((heart) => (
                <Heart
                  key={heart}
                  className={`w-3.5 h-3.5 ${
                    heart <= lives ? "text-rose-500 fill-rose-500" : "text-[var(--text-subtle)]"
                  }`}
                />
              ))}
            </div>

            {combo > 2 && (
              <span className="text-[10px] text-[var(--amber-glow)] font-bold animate-pulse">
                x{combo} Combo!
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1 rounded-sm border border-[var(--border)] hover:border-[var(--carmine)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              aria-label="Sonido"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[var(--amber-glow)]" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={triggerDownload}
              className="flex items-center gap-1 px-2.5 py-1 rounded-sm bg-[var(--carmine)] hover:bg-[var(--carmine-light)] text-white text-[11px] font-bold"
              title="Descargar CV"
            >
              <Download className="w-3 h-3" />
              <span>CV</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-[var(--border)]/60">
          {REQUIRED_STACK.map((tech) => {
            const isSliced = collectedStack.includes(tech.id);
            return (
              <span
                key={tech.id}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold border transition-all ${
                  isSliced
                    ? "bg-emerald-500/15 border-emerald-500 text-emerald-400 shadow-xs"
                    : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-subtle)] opacity-60"
                }`}
              >
                {isSliced && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />}
                <span>{tech.text}</span>
              </span>
            );
          })}
        </div>
      </div>

      <div
        className={`relative w-full aspect-[4/5] max-h-[460px] bg-[var(--bg)] overflow-hidden transition-colors duration-300 ${
          gameState === "playing" ? "touch-none cursor-crosshair" : "touch-pan-y cursor-default"
        }`}
        onMouseDown={gameState === "playing" ? handlePointerDown : undefined}
        onMouseMove={gameState === "playing" ? handlePointerMove : undefined}
        onMouseUp={gameState === "playing" ? handlePointerUp : undefined}
        onTouchStart={gameState === "playing" ? handlePointerDown : undefined}
        onTouchMove={gameState === "playing" ? handlePointerMove : undefined}
        onTouchEnd={gameState === "playing" ? handlePointerUp : undefined}
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {gameState === "idle" && (
          <div className="absolute inset-0 bg-[var(--surface)]/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-4">
            <Flame className="w-12 h-12 text-[var(--carmine)] animate-pulse" />
            <div className="space-y-1">
              <h3 className="font-pixel-custom text-4xl text-[var(--text-primary)] uppercase tracking-wider">
                Tech Ninja
              </h3>
              <p className="text-xs text-[var(--text-muted)] max-w-xs leading-relaxed">
                {language === "es"
                  ? "¡Corta cada una de las 7 tecnologías de mi Stack para desbloquear y descargar mi CV en PDF!"
                  : "Slice all 7 technologies from my Stack to unlock and download my CV!"}
              </p>
            </div>
            <button
              type="button"
              onClick={startGame}
              className="flex items-center gap-2 px-6 py-3 rounded-sm bg-[var(--carmine)] hover:bg-[var(--carmine-light)] text-white text-xs font-bold transition-all shadow-lg"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{language === "es" ? "Jugar Ahora" : "Play Now"}</span>
            </button>
          </div>
        )}

        {gameState === "gameover" && (
          <div className="absolute inset-0 bg-[var(--surface)]/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-4 z-20">
            <span className="font-pixel-custom text-5xl text-rose-500 font-bold tracking-wider">
              GAME OVER
            </span>
            <p className="text-xs text-[var(--text-muted)]">
              {language === "es"
                ? `Desbloqueaste ${collectedStack.length} de ${REQUIRED_STACK.length} tecnologías del stack.`
                : `Unlocked ${collectedStack.length} of ${REQUIRED_STACK.length} stack technologies.`}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={startGame}
                className="flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[var(--carmine)] text-white text-xs font-bold transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === "es" ? "Reintentar" : "Retry"}</span>
              </button>
              <button
                type="button"
                onClick={triggerDownload}
                className="flex items-center gap-1.5 px-4 py-2 rounded-sm border border-[var(--border)] text-[var(--text-primary)] text-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CV</span>
              </button>
            </div>
          </div>
        )}

        {gameState === "won" && (
          <div className="absolute inset-0 bg-[var(--surface)]/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-4 z-20">
            <Trophy className="w-12 h-12 text-[var(--amber-glow)] animate-bounce" />
            <div className="space-y-1">
              <span className="font-pixel-custom text-4xl text-emerald-500 font-bold tracking-wider">
                {language === "es" ? "¡STACK DOMINADO!" : "STACK MASTERED!"}
              </span>
              <p className="text-xs text-emerald-400 font-bold">
                {language === "es" ? "✓ Descargando CV de Jhon Medina en PDF..." : "✓ Downloading Jhon Medina's CV in PDF..."}
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={triggerDownload}
                className="flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[var(--carmine)] text-white text-xs font-bold shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>{language === "es" ? "Descargar CV Nuevamente" : "Download CV Again"}</span>
              </button>
              <button
                type="button"
                onClick={startGame}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-sm border border-[var(--border)] text-xs text-[var(--text-muted)]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === "es" ? "Jugar de nuevo" : "Play Again"}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="px-3 py-2 bg-[var(--surface-raised)] border-t border-[var(--border)] text-center text-[10px] text-[var(--text-muted)]">
        <span>{language === "es" ? "👆 Corta las 7 tecnologías con el dedo o ratón para ganar" : "👆 Slice all 7 technologies to win"}</span>
      </div>
    </div>
  );
}
