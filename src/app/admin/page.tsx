"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, X, Shield, RefreshCw, Lock, AlertCircle } from "lucide-react";
import { PixelArtEntry } from "@/lib/guestbook";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [entries, setEntries] = useState<PixelArtEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);

    try {
      const res = await fetch("/api/guestbook/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, action: "list" })
      });

      const data = await res.json();
      if (data.success && Array.isArray(data.entries)) {
        setIsAuthenticated(true);
        setEntries(data.entries);
      } else {
        setAuthError(data.error || "Contraseña incorrecta");
      }
    } catch {
      setAuthError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: "approved" | "rejected") => {
    setActionLoadingId(id);
    try {
      const res = await fetch("/api/guestbook/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, action: "update", id, status })
      });

      const data = await res.json();
      if (data.success) {
        setEntries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status } : item))
        );
      }
    } catch {} finally {
      setActionLoadingId(null);
    }
  };

  const pendingEntries = entries.filter((e) => e.status === "pending");
  const approvedEntries = entries.filter((e) => e.status === "approved");
  const rejectedEntries = entries.filter((e) => e.status === "rejected");

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] font-mono-custom p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[var(--carmine)]" />
            <h1 className="text-lg sm:text-xl font-bold">Panel de Moderación · Pixel Guestbook</h1>
          </div>

          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Portafolio</span>
          </Link>
        </div>

        {!isAuthenticated ? (
          <div className="max-w-md mx-auto my-20 p-6 sm:p-8 rounded-sm bg-[var(--surface)] border border-[var(--border-strong)] shadow-2xl space-y-6">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--carmine)]">
              <Lock className="w-4 h-4" />
              <span>Acceso Administrativo</span>
            </div>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Introduce tu contraseña de administrador para gestionar y aprobar las firmas de pixel art.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña de administrador..."
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[var(--bg)] border border-[var(--border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--carmine)]"
                />
              </div>

              {authError && (
                <div className="flex items-center gap-2 text-xs text-rose-500">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-sm bg-[var(--carmine)] hover:bg-[var(--carmine-light)] text-white text-xs font-bold transition-all disabled:opacity-50"
              >
                {loading ? "Verificando..." : "Ingresar"}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
                <div className="flex items-center gap-2 text-sm font-bold text-[var(--amber-glow)]">
                  <span>Pendientes de Aprobación</span>
                  <span className="px-2 py-0.5 rounded-sm bg-[var(--surface-raised)] border border-[var(--border)] text-xs text-[var(--text-primary)]">
                    {pendingEntries.length}
                  </span>
                </div>
              </div>

              {pendingEntries.length === 0 ? (
                <div className="p-6 rounded-sm bg-[var(--surface)] border border-[var(--border)] text-center text-xs text-[var(--text-muted)]">
                  No hay firmas pendientes de revisión en este momento.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {pendingEntries.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-sm bg-[var(--surface)] border border-[var(--border)] flex flex-col items-center space-y-3"
                    >
                      <div
                        className="p-1 bg-[#090b10] border border-[var(--border-strong)] rounded-xs"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(16, 1fr)",
                          gridTemplateRows: "repeat(16, 1fr)",
                          gap: "0.5px",
                          width: "128px",
                          height: "128px"
                        }}
                      >
                        {item.pixels.map((color, pIdx) => (
                          <div key={pIdx} style={{ backgroundColor: color }} className="w-full h-full" />
                        ))}
                      </div>

                      <div className="w-full text-center space-y-0.5 text-xs">
                        <div className="font-bold text-[var(--text-primary)]">{item.authorName}</div>
                        {item.authorSocial && (
                          <div className="text-[11px] text-[var(--carmine)] truncate">{item.authorSocial}</div>
                        )}
                        <div className="text-[10px] text-[var(--text-subtle)]">{new Date(item.createdAt).toLocaleString()}</div>
                      </div>

                      <div className="flex items-center gap-2 w-full pt-2 border-t border-[var(--border)]">
                        <button
                          type="button"
                          disabled={actionLoadingId === item.id}
                          onClick={() => handleUpdateStatus(item.id, "approved")}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all disabled:opacity-50"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Aprobar</span>
                        </button>

                        <button
                          type="button"
                          disabled={actionLoadingId === item.id}
                          onClick={() => handleUpdateStatus(item.id, "rejected")}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-sm bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all disabled:opacity-50"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Rechazar</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-500">
                  <span>Firmas Aprobadas y Públicas</span>
                  <span className="px-2 py-0.5 rounded-sm bg-[var(--surface-raised)] border border-[var(--border)] text-xs text-[var(--text-primary)]">
                    {approvedEntries.length}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {approvedEntries.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-sm bg-[var(--surface)] border border-[var(--border)] flex flex-col items-center space-y-2"
                  >
                    <div
                      className="p-0.5 bg-[#090b10] border border-[var(--border-strong)] rounded-xs"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(16, 1fr)",
                        gridTemplateRows: "repeat(16, 1fr)",
                        gap: "0.5px",
                        width: "80px",
                        height: "80px"
                      }}
                    >
                      {item.pixels.map((color, pIdx) => (
                        <div key={pIdx} style={{ backgroundColor: color }} className="w-full h-full" />
                      ))}
                    </div>

                    <div className="w-full text-center text-[11px] font-bold truncate">
                      {item.authorName}
                    </div>

                    <button
                      type="button"
                      disabled={actionLoadingId === item.id}
                      onClick={() => handleUpdateStatus(item.id, "rejected")}
                      className="w-full py-1 rounded-sm bg-[var(--surface-raised)] text-[10px] text-rose-500 hover:bg-rose-500 hover:text-white border border-[var(--border)] transition-all"
                    >
                      Desactivar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
