"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { sound } from "@/lib/sound";

export default function SoundToggle() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMuted(sound.getIsMuted());
  }, []);

  const handleToggle = () => {
    const isNowMuted = sound.toggleMute();
    setMuted(isNowMuted);
    if (!isNowMuted) {
      sound.playClick();
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="p-1.5 rounded-sm border border-[var(--border-strong)] bg-[var(--surface)] hover:border-[var(--carmine)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all flex items-center justify-center"
      aria-label="Toggle UI Audio"
      title={muted ? "Activar Audio UI" : "Silenciar Audio UI"}
    >
      {muted ? (
        <VolumeX className="w-3.5 h-3.5 text-[var(--text-subtle)]" />
      ) : (
        <Volume2 className="w-3.5 h-3.5 text-[var(--amber-glow)]" />
      )}
    </button>
  );
}
