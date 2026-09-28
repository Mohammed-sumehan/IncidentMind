import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Database, Brain, Sparkles, Terminal } from 'lucide-react';

interface InvestigationProgressProps {
  isLoading: boolean;
}

const STEPS = [
  { id: 1, label: 'Incident received & parsed', icon: Terminal, delay: 0 },
  { id: 2, label: 'Searching Hindsight engineering memory', icon: Database, delay: 900 },
  { id: 3, label: 'Extracting similar incidents & resolutions', icon: Sparkles, delay: 2400 },
  { id: 4, label: 'Analyzing historical outcomes & patterns', icon: Brain, delay: 4200 },
  { id: 5, label: 'Generating contextual recommendation via Groq', icon: Loader2, delay: 6000 },
];

export const InvestigationProgress: React.FC<InvestigationProgressProps> = ({ isLoading }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  useEffect(() => {
    if (!isLoading) {
      setCurrentStep(1);
      return;
    }

    const timeouts = STEPS.map((step) => {
      return setTimeout(() => {
        setCurrentStep(step.id);
      }, step.delay);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="w-full bg-white dark:bg-surface-100 rounded-2xl border border-slate-200 dark:border-surface-border p-6 glow-card transition-all animate-fadeIn">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-surface-border">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Investigation in progress...</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Querying Hindsight memory bank <span className="font-mono text-indigo-600 dark:text-indigo-300 font-medium">incidentmind</span> and synthesizing with Groq
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 text-xs text-indigo-700 dark:text-indigo-400 font-mono px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20">
          <span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-ping" />
          <span>Real-time synthesis</span>
        </div>
      </div>

      <div className="space-y-4">
        {STEPS.map((step) => {
          const isDone = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isPending = currentStep < step.id;
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                isCurrent
                  ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 shadow-sm'
                  : isDone
                  ? 'bg-slate-50 dark:bg-surface-200 border border-slate-200/80 dark:border-surface-border/40 opacity-85 dark:opacity-80'
                  : 'opacity-40 border border-transparent'
              }`}
            >
              <div className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 animate-spin" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600" />
                )}
              </div>

              <div className="flex-1 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <Icon
                    className={`w-4 h-4 ${
                      isCurrent
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : isDone
                        ? 'text-emerald-600 dark:text-emerald-400/80'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      isCurrent
                        ? 'text-slate-900 dark:text-white font-semibold'
                        : isDone
                        ? 'text-slate-700 dark:text-slate-300'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                <div className="text-xs font-mono">
                  {isDone && <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">Completed</span>}
                  {isCurrent && <span className="text-indigo-600 dark:text-indigo-400 text-[11px] font-semibold animate-pulse">Running</span>}
                  {isPending && <span className="text-slate-400 dark:text-slate-600 text-[11px]">Queued</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default InvestigationProgress;
