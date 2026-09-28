import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BrainCircuit, Sparkles, AlertCircle, History } from 'lucide-react';

interface ReasoningPanelProps {
  reasoning: string;
}

export const ReasoningPanel: React.FC<ReasoningPanelProps> = ({ reasoning }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="rounded-2xl bg-white dark:bg-surface-100 border border-slate-200 dark:border-surface-border overflow-hidden glow-card transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-surface-200 transition-colors text-left"
      >
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight">
              How IncidentMind reached this conclusion
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evidence-based rationale separating current facts from historical inference
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
          <span>{isOpen ? 'Collapse' : 'Expand'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-5 pt-0 space-y-4 border-t border-slate-100 dark:border-surface-border/50">
          {/* Three Pillars Distinction */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-surface-200 border border-slate-200 dark:border-surface-border shadow-sm dark:shadow-none">
              <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>CURRENT INCIDENT</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Direct reported symptoms, deployment timeframe, and runtime errors.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-surface-200 border border-indigo-100 dark:border-indigo-500/20 shadow-sm dark:shadow-none">
              <div className="flex items-center space-x-2 text-violet-600 dark:text-violet-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-1">
                <History className="w-3.5 h-3.5" />
                <span>HISTORICAL EVIDENCE</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Prior matching incidents recalled from Hindsight memory bank.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-surface-200 border border-emerald-100 dark:border-emerald-500/20 shadow-sm dark:shadow-none">
              <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI INFERENCE</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Probabilistic deduction distinguishing likely root cause from absolute certainty.
              </p>
            </div>
          </div>

          {/* Full Agent Reasoning Text */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-surface-border font-sans text-xs sm:text-sm text-slate-800 dark:text-slate-300 leading-relaxed whitespace-pre-wrap break-words">
            {reasoning}
          </div>
        </div>
      )}
    </div>
  );
};
export default ReasoningPanel;
