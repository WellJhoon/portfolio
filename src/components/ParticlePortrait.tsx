"use client";

import { useEffect, useRef } from "react";

export default function ParticlePortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 400;
    const H = 500;
    canvas.width = W;
    canvas.height = H;

    interface Dot {
      x: number;
      y: number;
      brightness: number;
      baseX: number;
      baseY: number;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/jhon-photo.jpg";

    let animId: number;
    let dots: Dot[] = [];

    const STEP = 8;
    const THRESHOLD = 0.22;

    img.onload = () => {
      const offW = Math.floor(W / STEP);
      const offH = Math.floor(H / STEP);
      const off = document.createElement("canvas");
      off.width = offW;
      off.height = offH;
      const offCtx = off.getContext("2d");
      if (!offCtx) return;

      const cropX = img.width * 0.25;
      const cropY = img.height * 0.08;
      const cropW = img.width * 0.42;
      const cropH = img.height * 0.70;

      offCtx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, offW, offH);
      const data = offCtx.getImageData(0, 0, offW, offH).data;

      dots = [];
      for (let row = 0; row < offH; row++) {
        for (let col = 0; col < offW; col++) {
          const i = (row * offW + col) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          if (brightness < THRESHOLD) continue;

          const bx = col * STEP + STEP / 2;
          const by = row * STEP + STEP / 2;
          dots.push({
            x: bx,
            y: by,
            baseX: bx,
            baseY: by,
            brightness
          });
        }
      }

      let time = 0;

      const render = () => {
        time += 0.018;

        const m = mouseRef.current;
        m.x += (m.targetX - m.x) * 0.07;
        m.y += (m.targetY - m.y) * 0.07;

        ctx.clearRect(0, 0, W, H);

        ctx.fillStyle = "#0a1628";
        ctx.fillRect(0, 0, W, H);

        const cx = W / 2;
        const cy = H / 2;

        const rotY = m.x * 0.30;
        const rotX = -m.y * 0.22;
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);

        for (const dot of dots) {
          const wave = Math.sin(time * 1.1 + dot.baseY * 0.06 + dot.baseX * 0.04) * (dot.brightness * 5);

          const dx = dot.baseX - cx;
          const dy = dot.baseY - cy;
          const dz = dot.brightness * 40 + wave;

          const x1 = dx * cosY - dz * sinY;
          const z1 = dx * sinY + dz * cosY;

          const y2 = dy * cosX - z1 * sinX;
          const z2 = dy * sinX + z1 * cosX;

          const fov = 500;
          const scale = fov / (fov + z2);

          const projX = cx + x1 * scale;
          const projY = cy + y2 * scale;

          const radius = Math.max(0.8, dot.brightness * 2.8 * scale);

          const alpha = 0.55 + dot.brightness * 0.45;

          if (dot.brightness > 0.7) {
            ctx.fillStyle = `rgba(190, 255, 255, ${alpha})`;
          } else if (dot.brightness > 0.5) {
            ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`;
          } else if (dot.brightness > 0.35) {
            ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(8, 145, 178, ${alpha * 0.85})`;
          }

          ctx.beginPath();
          ctx.arc(projX, projY, radius, 0, Math.PI * 2);
          ctx.fill();
        }

        animId = requestAnimationFrame(render);
      };

      animId = requestAnimationFrame(render);
    };

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseRef.current.targetX = x;
    mouseRef.current.targetY = y;
  };

  const handleMouseLeave = () => {
    mouseRef.current.targetX = 0;
    mouseRef.current.targetY = 0;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[400px] aspect-[4/5] select-none cursor-crosshair rounded-sm overflow-hidden shadow-2xl"
      style={{ background: "#0a1628" }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono-custom text-[10px] text-[rgba(34,211,238,0.5)] z-10 select-none border-t border-[rgba(34,211,238,0.15)] pt-2">
        <span>Jhon Medina</span>
        <span>Move mouse to interact</span>
      </div>
    </div>
  );
}
