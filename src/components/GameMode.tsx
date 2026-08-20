"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Download, Play, RotateCcw, Volume2, VolumeX, Shuffle, Trophy, Gamepad2, ArrowLeft, ArrowRight, ArrowUp, Swords } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import TechNinjaGame from "@/components/TechNinjaGame";

interface Player {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  grounded: boolean;
}

interface Platform {
  x: number;
  y: number;
  w: number;
  h: number;
  type?: "ground" | "brick";
}

interface Coin {
  x: number;
  y: number;
  label: string;
  color: string;
  collected: boolean;
}

interface Obstacle {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface LevelConfig {
  id: string;
  name: string;
  badge: string;
  accentColor: string;
  goalX: number;
  platforms: Platform[];
  obstacles: Obstacle[];
  coins: Omit<Coin, "collected">[];
}

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 380;
const GRAVITY = 0.40;
const JUMP_FORCE = -9.8;
const SPEED = 3.6;

const LEVELS: LevelConfig[] = [
  {
    id: "cardnet",
    name: "CardNET Fintech Highway",
    badge: "STAGE 01 · FINTECH & E2E",
    accentColor: "#e11d48",
    goalX: 2200,
    platforms: [
      { x: 0, y: 320, w: 650, h: 60, type: "ground" },
      { x: 260, y: 260, w: 120, h: 20, type: "brick" },
      { x: 500, y: 220, w: 140, h: 20, type: "brick" },
      { x: 740, y: 320, w: 550, h: 60, type: "ground" },
      { x: 940, y: 250, w: 130, h: 20, type: "brick" },
      { x: 1180, y: 210, w: 130, h: 20, type: "brick" },
      { x: 1380, y: 320, w: 900, h: 60, type: "ground" },
      { x: 1650, y: 260, w: 130, h: 20, type: "brick" },
      { x: 1900, y: 220, w: 130, h: 20, type: "brick" }
    ],
    obstacles: [
      { x: 440, y: 300, w: 26, h: 20 },
      { x: 1080, y: 300, w: 26, h: 20 },
      { x: 1600, y: 300, w: 26, h: 20 }
    ],
    coins: [
      { x: 320, y: 230, label: "ANGULAR 18", color: "#e11d48" },
      { x: 570, y: 190, label: "TYPESCRIPT", color: "#38bdf8" },
      { x: 1000, y: 220, label: "CYPRESS", color: "#10b981" },
      { x: 1240, y: 180, label: "PCI-DSS", color: "#a855f7" },
      { x: 1960, y: 190, label: "AZURE DEVOPS", color: "#f59e0b" }
    ]
  },
  {
    id: "hacienda",
    name: "Ministerio Hacienda Enterprise Cloud",
    badge: "STAGE 02 · JAVA & SERVICES",
    accentColor: "#f59e0b",
    goalX: 2200,
    platforms: [
      { x: 0, y: 320, w: 500, h: 60, type: "ground" },
      { x: 300, y: 250, w: 140, h: 20, type: "brick" },
      { x: 560, y: 320, w: 450, h: 60, type: "ground" },
      { x: 700, y: 240, w: 120, h: 20, type: "brick" },
      { x: 920, y: 200, w: 140, h: 20, type: "brick" },
      { x: 1120, y: 320, w: 480, h: 60, type: "ground" },
      { x: 1300, y: 240, w: 130, h: 20, type: "brick" },
      { x: 1540, y: 200, w: 130, h: 20, type: "brick" },
      { x: 1720, y: 320, w: 600, h: 60, type: "ground" }
    ],
    obstacles: [
      { x: 420, y: 300, w: 26, h: 20 },
      { x: 860, y: 300, w: 26, h: 20 },
      { x: 1460, y: 300, w: 26, h: 20 },
      { x: 1920, y: 300, w: 26, h: 20 }
    ],
    coins: [
      { x: 370, y: 220, label: "JAVA", color: "#f59e0b" },
      { x: 760, y: 210, label: "SPRING BOOT", color: "#10b981" },
      { x: 990, y: 170, label: "JASPER", color: "#e11d48" },
      { x: 1360, y: 210, label: "SQL SERVER", color: "#38bdf8" },
      { x: 1600, y: 170, label: "GITLAB", color: "#f97316" }
    ]
  },
  {
    id: "ai_architect",
    name: "Agentic AI & Clean Architecture Lab",
    badge: "STAGE 03 · AGENTS & ARCH",
    accentColor: "#38bdf8",
    goalX: 2200,
    platforms: [
      { x: 0, y: 320, w: 580, h: 60, type: "ground" },
      { x: 220, y: 260, w: 130, h: 20, type: "brick" },
      { x: 440, y: 210, w: 130, h: 20, type: "brick" },
      { x: 680, y: 320, w: 600, h: 60, type: "ground" },
      { x: 880, y: 240, w: 140, h: 20, type: "brick" },
      { x: 1140, y: 190, w: 130, h: 20, type: "brick" },
      { x: 1380, y: 320, w: 900, h: 60, type: "ground" },
      { x: 1600, y: 240, w: 140, h: 20, type: "brick" },
      { x: 1860, y: 200, w: 140, h: 20, type: "brick" }
    ],
    obstacles: [
      { x: 480, y: 300, w: 26, h: 20 },
      { x: 1040, y: 300, w: 26, h: 20 },
      { x: 1750, y: 300, w: 26, h: 20 }
    ],
    coins: [
      { x: 280, y: 230, label: "CLAUDE AI", color: "#a855f7" },
      { x: 500, y: 180, label: "MULTI-AGENT", color: "#38bdf8" },
      { x: 950, y: 210, label: "NEXT.JS", color: "#f5f0ea" },
      { x: 1200, y: 160, label: ".NET CORE", color: "#3b82f6" },
      { x: 1930, y: 170, label: "CLEAN ARCH", color: "#10b981" }
    ]
  }
];

export default function GameMode() {
  const { content, language } = useLanguage();
  const [gameModeType, setGameModeType] = useState<"ninja" | "platformer">("ninja");
  const [gameState, setGameState] = useState<"idle" | "playing" | "won" | "gameover">("idle");
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [coinsCollected, setCoinsCollected] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const activeLevel = LEVELS[currentLevelIndex];

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keysRef = useRef<{ left: boolean; right: boolean; jump: boolean }>({
    left: false,
    right: false,
    jump: false
  });

  const playerRef = useRef<Player>({
    x: 60,
    y: 250,
    vx: 0,
    vy: 0,
    width: 28,
    height: 36,
    grounded: false
  });

  const coinsRef = useRef<Coin[]>(activeLevel.coins.map((c) => ({ ...c, collected: false })));
  const cameraXRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  const currentLevelIndexRef = useRef(currentLevelIndex);
  currentLevelIndexRef.current = currentLevelIndex;
  const gameStateRef = useRef(gameState);
  gameStateRef.current = gameState;

  const audioCtxRef = useRef<AudioContext | null>(null);
  const isGameOverRef = useRef(false);
  const isWonRef = useRef(false);
  const lastTimeRef = useRef(performance.now());

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playSound = useCallback((freq: number, type: OscillatorType = "square", duration = 0.08) => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {}
  }, [soundEnabled, getAudioContext]);

  const triggerDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = "/jhon-medina-cv.pdf";
    link.download = "Jhon_Medina_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const startGame = () => {
    isGameOverRef.current = false;
    isWonRef.current = false;
    keysRef.current = { left: false, right: false, jump: false };
    lastTimeRef.current = performance.now();

    const randomIdx = Math.floor(Math.random() * LEVELS.length);
    setCurrentLevelIndex(randomIdx);
    currentLevelIndexRef.current = randomIdx;
    const selectedLevel = LEVELS[randomIdx];

    playerRef.current = {
      x: 60,
      y: 250,
      vx: 0,
      vy: 0,
      width: 28,
      height: 36,
      grounded: false
    };
    coinsRef.current = selectedLevel.coins.map((c) => ({ ...c, collected: false }));
    cameraXRef.current = 0;
    setCoinsCollected(0);
    setGameState("playing");
    gameStateRef.current = "playing";
    playSound(440, "triangle", 0.15);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", " ", "w", "a", "d", "W", "A", "D"].includes(e.key)) {
        if (gameStateRef.current === "playing") {
          e.preventDefault();
        }
      }

      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        keysRef.current.left = true;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        keysRef.current.right = true;
      }
      if (e.key === "ArrowUp" || e.key === " " || e.key === "w" || e.key === "W") {
        keysRef.current.jump = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        keysRef.current.left = false;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        keysRef.current.right = false;
      }
      if (e.key === "ArrowUp" || e.key === " " || e.key === "w" || e.key === "W") {
        keysRef.current.jump = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let localAnimId: number;
    lastTimeRef.current = performance.now();

    const renderLoop = (currentTime: number) => {
      const p = playerRef.current;
      const level = LEVELS[currentLevelIndexRef.current];
      const curState = gameStateRef.current;

      const elapsed = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;
      const dt = Math.min(elapsed / 16.666, 1.6);

      const isDarkMode = typeof document !== "undefined" && document.documentElement.classList.contains("dark");

      if (curState === "playing" && !isGameOverRef.current && !isWonRef.current) {
        if (keysRef.current.left) {
          p.vx = -SPEED;
        } else if (keysRef.current.right) {
          p.vx = SPEED;
        } else {
          p.vx = 0;
        }

        if (keysRef.current.jump && p.grounded) {
          p.vy = JUMP_FORCE;
          p.grounded = false;
          playSound(580, "square", 0.08);
        }

        p.vy += GRAVITY * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        if (p.x < 0) p.x = 0;

        p.grounded = false;
        for (const plat of level.platforms) {
          if (
            p.x + p.width > plat.x &&
            p.x < plat.x + plat.w &&
            p.y + p.height >= plat.y &&
            p.y + p.height <= plat.y + 14 &&
            p.vy >= 0
          ) {
            p.grounded = true;
            p.vy = 0;
            p.y = plat.y - p.height;
          }
        }

        if (p.y > CANVAS_HEIGHT + 60) {
          isGameOverRef.current = true;
          setGameState("gameover");
          playSound(140, "sawtooth", 0.25);
        }

        for (const obs of level.obstacles) {
          if (
            p.x + p.width > obs.x + 4 &&
            p.x < obs.x + obs.w - 4 &&
            p.y + p.height > obs.y + 4 &&
            p.y < obs.y + obs.h
          ) {
            isGameOverRef.current = true;
            setGameState("gameover");
            playSound(140, "sawtooth", 0.25);
          }
        }

        coinsRef.current.forEach((coin) => {
          if (!coin.collected) {
            const dist = Math.hypot(p.x + p.width / 2 - coin.x, p.y + p.height / 2 - coin.y);
            if (dist < 26) {
              coin.collected = true;
              setCoinsCollected((prev) => {
                const updated = prev + 1;
                playSound(600 + updated * 80, "sine", 0.12);
                return updated;
              });
            }
          }
        });

        if (p.x >= level.goalX) {
          isWonRef.current = true;
          setGameState("won");
          playSound(880, "triangle", 0.4);
          setTimeout(() => {
            triggerDownload();
          }, 300);
        }

        const targetCamX = p.x - CANVAS_WIDTH / 3;
        cameraXRef.current += (targetCamX - cameraXRef.current) * 0.1;
        if (cameraXRef.current < 0) cameraXRef.current = 0;
        if (cameraXRef.current > 2400 - CANVAS_WIDTH) {
          cameraXRef.current = 2400 - CANVAS_WIDTH;
        }
      }

      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      const camX = Math.floor(cameraXRef.current);
      const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
      if (isDarkMode) {
        grad.addColorStop(0, "#0c0d12");
        grad.addColorStop(1, "#13161f");
      } else {
        grad.addColorStop(0, "#f7f5f0");
        grad.addColorStop(1, "#ede8df");
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.save();
      ctx.translate(-camX, 0);

      level.platforms.forEach((plat) => {
        const px = Math.round(plat.x);
        const py = Math.round(plat.y);
        if (plat.type === "ground") {
          ctx.fillStyle = isDarkMode ? "#141822" : "#ffffff";
          ctx.fillRect(px, py, plat.w, plat.h);
          ctx.fillStyle = level.accentColor;
          ctx.fillRect(px, py, plat.w, 3);
          ctx.strokeStyle = isDarkMode ? "#252e42" : "#ded5c8";
          ctx.strokeRect(px, py, plat.w, plat.h);
        } else {
          ctx.fillStyle = isDarkMode ? "#1b2130" : "#ede8df";
          ctx.fillRect(px, py, plat.w, plat.h);
          ctx.fillStyle = isDarkMode ? "#38bdf8" : "#be123c";
          ctx.fillRect(px, py, plat.w, 3);
          ctx.strokeStyle = isDarkMode ? "#303c54" : "#ded5c8";
          ctx.strokeRect(px, py, plat.w, plat.h);
        }
      });

      level.obstacles.forEach((obs) => {
        const ox = Math.round(obs.x);
        const oy = Math.round(obs.y);
        ctx.fillStyle = "#e11d48";
        ctx.beginPath();
        ctx.moveTo(ox, oy + obs.h);
        ctx.lineTo(ox + obs.w / 2, oy);
        ctx.lineTo(ox + obs.w, oy + obs.h);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 8px monospace";
        ctx.fillText("BUG", ox + 4, oy + obs.h - 4);
      });

      coinsRef.current.forEach((coin) => {
        if (!coin.collected) {
          const bounce = Math.sin(Date.now() / 200) * 3;
          const cx = Math.round(coin.x);
          const cy = Math.round(coin.y + bounce);
          ctx.save();
          ctx.fillStyle = coin.color;
          ctx.beginPath();
          ctx.arc(cx, cy, 11, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = isDarkMode ? "#ffffff" : "#1c1917";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 8px monospace";
          ctx.textAlign = "center";
          ctx.fillText(coin.label.slice(0, 3), cx, cy + 3);

          ctx.fillStyle = isDarkMode ? "#f5f0ea" : "#1c1917";
          ctx.font = "bold 9px monospace";
          ctx.fillText(`[${coin.label}]`, cx, cy - 14);
          ctx.restore();
        }
      });

      const gx = Math.round(level.goalX);
      ctx.fillStyle = "#f59e0b";
      ctx.fillRect(gx + 10, 140, 5, 180);

      ctx.fillStyle = level.accentColor;
      ctx.beginPath();
      ctx.moveTo(gx + 15, 140);
      ctx.lineTo(gx + 65, 160);
      ctx.lineTo(gx + 15, 180);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 9px monospace";
      ctx.fillText("CV FLAG", gx + 18, 163);

      ctx.fillStyle = isDarkMode ? "#1e2535" : "#ffffff";
      ctx.fillRect(gx - 10, 300, 46, 20);
      ctx.strokeStyle = "#f59e0b";
      ctx.strokeRect(gx - 10, 300, 46, 20);
      ctx.fillStyle = isDarkMode ? "#f59e0b" : "#b45309";
      ctx.font = "bold 10px monospace";
      ctx.fillText("GOAL", gx - 2, 314);

      const px = Math.round(p.x);
      const py = Math.round(p.y);
      ctx.fillStyle = "#e11d48";
      ctx.fillRect(px, py + 8, p.width, p.height - 8);

      ctx.fillStyle = isDarkMode ? "#f5f0ea" : "#1c1917";
      ctx.fillRect(px + 4, py, p.width - 8, 10);

      ctx.fillStyle = isDarkMode ? "#121620" : "#ffffff";
      ctx.fillRect(px + (p.vx >= 0 ? 14 : 6), py + 4, 4, 4);

      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(px - 2, py + 12, 4, 10);
      ctx.fillRect(px + p.width - 2, py + 12, 4, 10);

      ctx.restore();

      localAnimId = requestAnimationFrame(renderLoop);
    };

    localAnimId = requestAnimationFrame(renderLoop);
    animFrameRef.current = localAnimId;

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [playSound, triggerDownload, gameModeType]);

  const setTouchKey = (key: "left" | "right" | "jump", state: boolean) => {
    keysRef.current[key] = state;
  };

  return (
    <section id="game-mode" className="py-20 lg:py-28 relative bg-[var(--surface-raised)]/30 border-y border-[var(--border)] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono-custom text-sm font-bold text-[var(--carmine)]">05.</span>
            <h2 className="font-mono-custom text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              {language === "es" ? "MODO_ARCADE_INTERACTIVO" : "INTERACTIVE_ARCADE_MODE"}
            </h2>
            <div className="hidden sm:block h-px w-16 bg-[var(--border)] ml-2" />
          </div>

          <div className="flex items-center gap-2 bg-[var(--surface)] p-1.5 rounded-sm border-2 border-[var(--border-strong)] font-mono-custom shadow-sm">
            <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] px-2 hidden lg:inline">
              {language === "es" ? "🎮 2 JUEGOS DISPONIBLES:" : "🎮 2 ARCADE GAMES:"}
            </span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setGameModeType("ninja");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer ${
                gameModeType === "ninja"
                  ? "bg-[var(--carmine)] text-white shadow-md scale-102"
                  : "bg-[var(--surface-raised)] text-[var(--text-primary)] hover:border-[var(--carmine)]"
              }`}
            >
              <Swords className="w-3.5 h-3.5" />
              <span>1. Tech Ninja</span>
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setGameModeType("platformer");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer ${
                gameModeType === "platformer"
                  ? "bg-[var(--carmine)] text-white shadow-md scale-102"
                  : "bg-[var(--surface-raised)] text-[var(--text-primary)] hover:border-[var(--carmine)]"
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>2. Super Jhon Platformer</span>
            </button>
          </div>
        </div>

        <div className="rounded-sm bg-[var(--surface)] border-2 border-[var(--border-strong)] shadow-2xl overflow-hidden font-mono-custom transition-colors duration-300">
          
          <div className="px-4 sm:px-6 py-3.5 bg-[var(--surface-raised)] border-b border-[var(--border)] flex flex-wrap items-center justify-between gap-3 select-none">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#e11d48] inline-block shadow-xs" />
                <span className="w-3 h-3 rounded-full bg-[#f59e0b] inline-block shadow-xs" />
                <span className="w-3 h-3 rounded-full bg-[#10b981] inline-block shadow-xs" />
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[var(--carmine)] font-bold">jhon@fedora:</span>
                <span className="text-[var(--text-primary)] truncate">
                  {gameModeType === "ninja" ? "~/arcade/tech-ninja" : "~/arcade/super-jhon-bros"}
                </span>
                {gameModeType === "platformer" && (
                  <span className="hidden sm:inline px-2 py-0.5 rounded-sm bg-[var(--surface)] border border-[var(--border)] text-[11px] font-semibold text-[var(--amber-glow)]">
                    {activeLevel.badge}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {gameModeType === "platformer" && (
                <>
                  <button
                    type="button"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="hidden sm:inline-flex p-1.5 rounded-sm border border-[var(--border)] hover:border-[var(--carmine)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all"
                    aria-label={soundEnabled ? "Silenciar" : "Activar sonido"}
                    title="Sonido"
                  >
                    {soundEnabled ? <Volume2 className="w-4 h-4 text-[var(--amber-glow)]" /> : <VolumeX className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={triggerDownload}
                    className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[var(--carmine)] hover:bg-[var(--carmine-light)] text-white text-xs font-semibold transition-all shadow-xs group"
                    title="Descargar CV directamente sin jugar"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{content.game.downloadDirect}</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {gameModeType === "ninja" ? (
            <TechNinjaGame />
          ) : (
            <>
              <div className="relative w-full bg-[var(--bg)] flex items-center justify-center p-2 sm:p-4 transition-colors duration-300">
                <div className="relative w-full aspect-[16/8] max-w-[900px] border-2 border-[var(--border)] rounded-sm overflow-hidden bg-[var(--bg)] shadow-inner">
                  <canvas
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="w-full h-full block"
                  />

                  {gameState === "idle" && (
                    <div className="absolute inset-0 bg-[var(--surface)]/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-4">
                      <Gamepad2 className="w-12 h-12 text-[var(--carmine)] animate-pulse" />
                      <div className="space-y-1">
                        <h3 className="font-pixel-custom text-4xl sm:text-5xl text-[var(--text-primary)] tracking-wider uppercase">
                          {content.game.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md">
                          {content.game.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={startGame}
                          className="flex items-center gap-2 px-6 py-3 rounded-sm bg-[var(--carmine)] hover:bg-[var(--carmine-light)] text-white text-sm font-bold transition-all shadow-lg group cursor-pointer"
                        >
                          <Shuffle className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                          <span>{content.game.playRandom}</span>
                        </button>
                        <button
                          type="button"
                          onClick={triggerDownload}
                          className="flex items-center gap-2 px-4 py-3 rounded-sm border border-[var(--border)] hover:border-[var(--amber-glow)] text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xs transition-all cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{content.game.downloadBypass}</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-[var(--text-subtle)]">
                        {content.game.controlsText}
                      </p>
                    </div>
                  )}

                  {gameState === "gameover" && (
                    <div className="absolute inset-0 bg-[var(--surface)]/95 flex flex-col items-center justify-center p-6 text-center space-y-3 z-30">
                      <span className="font-pixel-custom text-5xl text-rose-500 font-bold tracking-wider">
                        {content.game.gameOver}
                      </span>
                      <p className="text-xs text-[var(--text-muted)]">
                        {activeLevel.name}
                      </p>
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={startGame}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[var(--carmine)] hover:bg-[var(--carmine-light)] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{content.game.retry}</span>
                        </button>
                        <button
                          type="button"
                          onClick={triggerDownload}
                          className="flex items-center gap-1.5 px-4 py-2.5 rounded-sm border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xs transition-all cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{content.hero.downloadCv}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {gameState === "won" && (
                    <div className="absolute inset-0 bg-[var(--surface)]/95 flex flex-col items-center justify-center p-6 text-center space-y-4 z-30">
                      <Trophy className="w-14 h-14 text-[var(--amber-glow)] animate-bounce" />
                      <div className="space-y-1">
                        <span className="font-pixel-custom text-5xl text-emerald-500 font-bold tracking-wider">
                          {content.game.stageClear}
                        </span>
                        <p className="text-xs text-[var(--text-muted)]">
                          {content.game.levelLabel}: <span className="text-[var(--text-primary)] font-bold">{activeLevel.name}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={triggerDownload}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[var(--carmine)] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          <span>{content.hero.downloadCv}</span>
                        </button>
                        <button
                          type="button"
                          onClick={startGame}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-sm border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xs transition-all cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{content.game.nextLevel}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-4 sm:px-6 py-3 bg-[var(--surface-raised)] border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
                <div className="flex items-center gap-4">
                  <span>{content.game.levelLabel}: <strong className="text-[var(--text-primary)]">{activeLevel.name}</strong></span>
                  <span className="hidden sm:inline text-[var(--text-subtle)]">|</span>
                  <span>{content.game.controlsText}</span>
                </div>

                <div className="flex items-center gap-2 sm:hidden w-full justify-center pt-2">
                  <button
                    type="button"
                    onPointerDown={() => setTouchKey("left", true)}
                    onPointerUp={() => setTouchKey("left", false)}
                    className="p-3 rounded-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] active:bg-[var(--carmine)]"
                    aria-label="Izquierda"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onPointerDown={() => setTouchKey("jump", true)}
                    onPointerUp={() => setTouchKey("jump", false)}
                    className="px-6 py-3 rounded-sm bg-[var(--carmine)] text-white font-bold active:bg-[var(--carmine-light)]"
                    aria-label="Saltar"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onPointerDown={() => setTouchKey("right", true)}
                    onPointerUp={() => setTouchKey("right", false)}
                    className="p-3 rounded-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] active:bg-[var(--carmine)]"
                    aria-label="Derecha"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </section>
  );
}
