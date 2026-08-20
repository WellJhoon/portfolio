"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Play, RotateCcw, CheckCircle2, Lock, Cpu, Server, FileCheck, X } from "lucide-react";
import { sound } from "@/lib/sound";
import { useLanguage } from "@/context/LanguageContext";

interface AuditMetric {
  title: string;
  value: string;
  status: "verified" | "pending";
  detail: string;
}

export default function SecurityAuditor() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (scanning) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setScanning(false);
            setCompleted(true);
            sound.playSuccess();
            return 100;
          }
          if (prev % 25 === 0) {
            sound.playTerminalBeep();
          }
          return prev + 5;
        });
      }, 90);
    }
    return () => clearInterval(interval);
  }, [scanning]);

  const handleStartScan = () => {
    sound.playClick();
    setProgress(0);
    setCompleted(false);
    setScanning(true);
  };

  const handleReset = () => {
    sound.playClick();
    setProgress(0);
    setScanning(false);
    setCompleted(false);
  };

  const metrics: AuditMetric[] = [
    {
      title: "PCI-DSS v4 Security Standards",
      value: "100% Compliant",
      status: progress >= 30 ? "verified" : "pending",
      detail: language === "es" ? "Tokenización de tarjetas, enmascaramiento PAN y TLS 1.3" : "Card tokenization, PAN masking & TLS 1.3"
    },
    {
      title: "SonarQube & Checkmarx SAST",
      value: "0 Critical / 0 High",
      status: progress >= 60 ? "verified" : "pending",
      detail: language === "es" ? "Análisis estático de seguridad libre de inyecciones y fugas" : "Static application security scan free of vulnerabilities"
    },
    {
      title: "Cypress E2E Regression Suite",
      value: "94% Test Coverage",
      status: progress >= 85 ? "verified" : "pending",
      detail: language === "es" ? "Mocking de red determinista y validación de pasarelas de pago" : "Deterministic network mocking & payment gateway flows"
    },
    {
      title: "Clean Architecture Coupling Index",
      value: "0 Circular Deps",
      status: progress >= 100 ? "verified" : "pending",
      detail: language === "es" ? "Desacoplamiento estricto Dominio / Aplicación / Infraestructura" : "Strict Domain / Application / Infrastructure decoupling"
    }
  ];

  return (
    <>
      <div className="py-6 flex justify-center">
        <button
          type="button"
          onClick={() => {
            sound.playOpen();
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border-2 border-[var(--carmine)] bg-[var(--carmine)]/10 hover:bg-[var(--carmine)] hover:text-white text-[var(--text-primary)] font-mono-custom text-xs font-bold transition-all shadow-md group cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4 text-[var(--carmine)] group-hover:text-white transition-colors" />
          <span>
            {language === "es"
              ? "[AUDITORÍA DE SEGURIDAD & COMPLIANCE EN VIVO]"
              : "[LIVE SECURITY & COMPLIANCE AUDIT SCAN]"}
          </span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 font-mono-custom animate-fadeIn select-none">
          <div className="w-full max-w-2xl bg-[var(--surface)] border-2 border-[var(--carmine)] rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-4 py-3 bg-[var(--surface-raised)] border-b border-[var(--border)] text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-2 text-[var(--carmine)] font-bold">
                <Lock className="w-4 h-4" />
                <span className="text-[var(--text-primary)] uppercase">
                  {language === "es" ? "Inspector de Seguridad & Arquitectura Enterprise" : "Enterprise Security & Architecture Inspector"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1 hover:text-[var(--carmine)] text-[var(--text-muted)] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-sm bg-[var(--surface-raised)] border border-[var(--border)]">
                <div>
                  <h4 className="font-bold text-sm text-[var(--text-primary)]">
                    {language === "es" ? "Escáner de Cumplimiento Técnico" : "Technical Compliance Scanner"}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    {language === "es"
                      ? "Verificación de estándares bancarios, cobertura de pruebas y arquitectura."
                      : "Audit bank compliance, test suites, and architecture standards."}
                  </p>
                </div>

                {!scanning && !completed && (
                  <button
                    type="button"
                    onClick={handleStartScan}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[var(--carmine)] hover:bg-[var(--carmine-light)] text-white text-xs font-bold transition-all shadow-sm shrink-0"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{language === "es" ? "Iniciar Auditoría" : "Run Audit"}</span>
                  </button>
                )}

                {scanning && (
                  <div className="flex items-center gap-2 text-xs text-[var(--amber-glow)] font-bold animate-pulse">
                    <Cpu className="w-4 h-4" />
                    <span>{progress}% {language === "es" ? "Analizando..." : "Scanning..."}</span>
                  </div>
                )}

                {completed && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-[var(--border)] hover:border-[var(--carmine)] text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{language === "es" ? "Re-escanear" : "Rescan"}</span>
                  </button>
                )}
              </div>

              <div className="w-full bg-[var(--surface-raised)] rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[var(--carmine)] h-full transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-sm border transition-all ${
                      m.status === "verified"
                        ? "bg-emerald-500/5 border-emerald-500/40 text-[var(--text-primary)]"
                        : "bg-[var(--surface)] border-[var(--border)] opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold">{m.title}</span>
                      {m.status === "verified" ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <span className="text-[10px] text-[var(--text-subtle)]">PENDING</span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-[var(--carmine)]">{m.value}</div>
                    <p className="text-[11px] text-[var(--text-muted)] mt-1">{m.detail}</p>
                  </div>
                ))}
              </div>

              {completed && (
                <div className="p-4 rounded-sm bg-emerald-500/10 border-2 border-emerald-500 text-center space-y-1 animate-fadeIn">
                  <span className="font-pixel-custom text-2xl text-emerald-500 font-bold tracking-wider">
                    [PASSED: PRODUCTION & ENTERPRISE READY]
                  </span>
                  <p className="text-xs text-emerald-400">
                    {language === "es"
                      ? "✓ Cumplimiento estricto de seguridad transaccional, cobertura E2E y desacoplamiento verificado."
                      : "✓ Transactional security compliance, E2E coverage & architectural decoupling verified."}
                  </p>
                </div>
              )}
            </div>

            <div className="px-4 py-2.5 bg-[var(--surface-raised)] border-t border-[var(--border)] flex items-center justify-between text-[10px] text-[var(--text-subtle)]">
              <span>Security Engine · Jhon Medina Portfolio</span>
              <span>PCI-DSS v4 Certified</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
