"use client";

import { useState, useEffect } from "react";
import { Play, RotateCcw, CheckCircle2, Terminal, Cpu } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectSimulatorProps {
  projectId: string;
}

export default function ProjectSimulator({ projectId }: ProjectSimulatorProps) {
  const { language } = useLanguage();
  const [running, setRunning] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (running && stepIndex < getSteps(projectId).length) {
      timer = setTimeout(() => {
        setStepIndex((prev) => prev + 1);
      }, 700);
    } else if (running && stepIndex >= getSteps(projectId).length) {
      setRunning(false);
      setCompleted(true);
    }
    return () => clearTimeout(timer);
  }, [running, stepIndex, projectId]);

  const handleStart = () => {
    setStepIndex(0);
    setCompleted(false);
    setRunning(true);
  };

  const handleReset = () => {
    setRunning(false);
    setStepIndex(0);
    setCompleted(false);
  };

  const steps = getSteps(projectId);
  if (steps.length === 0) return null;

  return (
    <div className="mt-4 pt-3 border-t border-[var(--border)] font-mono-custom text-xs">
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-1.5 text-[10px] text-[var(--carmine)] font-bold">
          <Terminal className="w-3 h-3" />
          <span>{getSimulatorTitle(projectId, language)}</span>
        </div>

        <div className="flex items-center gap-1">
          {!running && !completed && (
            <button
              type="button"
              onClick={handleStart}
              className="flex items-center gap-1 px-2 py-0.5 rounded-xs bg-[var(--carmine)] hover:bg-[var(--carmine-light)] text-white text-[10px] font-bold transition-all"
            >
              <Play className="w-2.5 h-2.5 fill-white" />
              <span>{language === "es" ? "Ejecutar Simulación" : "Run Simulation"}</span>
            </button>
          )}

          {running && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-xs bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] animate-pulse">
              <Cpu className="w-2.5 h-2.5" />
              <span>{language === "es" ? "Procesando..." : "Executing..."}</span>
            </span>
          )}

          {completed && (
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
                <CheckCircle2 className="w-3 h-3" />
                <span>{language === "es" ? "Completado" : "Passed"}</span>
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="p-0.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                title={language === "es" ? "Reiniciar" : "Reset"}
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-2.5 rounded-xs bg-[var(--surface-raised)] border border-[var(--border)] text-[11px] text-[var(--text-primary)] space-y-1.5 overflow-x-auto min-h-[85px] flex flex-col justify-center transition-colors duration-300">
        {stepIndex === 0 && !completed && (
          <p className="text-[var(--text-muted)] italic text-center py-2 text-[10px]">
            {language === "es"
              ? "Presiona 'Ejecutar Simulación' para probar el flujo técnico."
              : "Press 'Run Simulation' to test this technical flow live."}
          </p>
        )}

        {steps.slice(0, stepIndex).map((step, idx) => (
          <div key={idx} className="flex items-start gap-1.5 font-mono-custom leading-tight">
            <span className={step.color || "text-emerald-600 dark:text-emerald-400"}>›</span>
            <span className={step.color || "text-[var(--text-primary)]"}>{step.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface StepItem {
  text: string;
  color?: string;
}

function getSimulatorTitle(id: string, lang: string): string {
  switch (id) {
    case "cypress-e2e-suite":
      return lang === "es" ? "CYPRESS E2E RUNNER" : "CYPRESS E2E RUNNER";
    case "ecommerce-net-clean":
      return lang === "es" ? "CQRS / MEDIATR DISPATCHER" : "CQRS / MEDIATR DISPATCHER";
    case "agentic-ai-orchestrator":
      return lang === "es" ? "MULTI-AGENT ORCHESTRATION" : "MULTI-AGENT ORCHESTRATION";
    case "angular-fintech-portal":
      return lang === "es" ? "SIGNALS TRANSACTION STREAM" : "SIGNALS TRANSACTION STREAM";
    default:
      return lang === "es" ? "INSPECTOR TÉCNICO" : "TECHNICAL INSPECTOR";
  }
}

function getSteps(id: string): StepItem[] {
  switch (id) {
    case "cypress-e2e-suite":
      return [
        { text: "cy.intercept('POST', '/api/v1/payments/settle').as('settle')", color: "text-amber-600 dark:text-amber-400" },
        { text: "cy.get('[data-cy=\"card-pan\"]').type('•••• 4242')", color: "text-sky-600 dark:text-sky-400" },
        { text: "cy.get('[data-cy=\"submit-btn\"]').click()", color: "text-sky-600 dark:text-sky-400" },
        { text: "cy.wait('@settle').its('response.statusCode').should('eq', 200)", color: "text-amber-600 dark:text-amber-400" },
        { text: "✓ PCI-DSS Transaction Verified (4 tests passed, 380ms)", color: "text-emerald-600 dark:text-emerald-400 font-bold" }
      ];
    case "ecommerce-net-clean":
      return [
        { text: "Dispatching: CreateOrderCommand { CustomerId: 9812, Amount: $420.00 }", color: "text-sky-600 dark:text-sky-400" },
        { text: "FluentValidation: Payload sanitized & validated without errors", color: "text-emerald-600 dark:text-emerald-400" },
        { text: "EF Core: INSERT INTO Orders (SQL Server transactional commit)", color: "text-purple-600 dark:text-purple-400" },
        { text: "Result<OrderDto>.Success({ OrderId: 'ORD-2026', Status: 'Settled' })", color: "text-emerald-600 dark:text-emerald-400 font-bold" }
      ];
    case "agentic-ai-orchestrator":
      return [
        { text: "Agent[Planner]: Parsing request intent & decomposing DAG pipeline", color: "text-amber-600 dark:text-amber-400" },
        { text: "Agent[Worker]: Contextual retrieval from Redis Vector Store", color: "text-sky-600 dark:text-sky-400" },
        { text: "Agent[Critic]: Validating output schema against Zod definitions", color: "text-purple-600 dark:text-purple-400" },
        { text: "✓ Pipeline completed in 620ms (0 schema deviations)", color: "text-emerald-600 dark:text-emerald-400 font-bold" }
      ];
    case "angular-fintech-portal":
      return [
        { text: "Signal: merchantBalance.set($84,250.00)", color: "text-sky-600 dark:text-sky-400" },
        { text: "RxJS Pipe: filter(tx => tx.pciCompliant).pipe(debounceTime(150))", color: "text-purple-600 dark:text-purple-400" },
        { text: "DOM: Virtual table re-rendered with sub-millisecond diffing", color: "text-emerald-600 dark:text-emerald-400 font-bold" }
      ];
    default:
      return [
        { text: "Telemetry initialized: health check 200 OK", color: "text-sky-600 dark:text-sky-400" },
        { text: "Architecture compliance verified", color: "text-emerald-600 dark:text-emerald-400 font-bold" }
      ];
  }
}
