import React, { useState } from 'react';
import { ListChecks, Check, Copy } from 'lucide-react';

interface RecommendationListProps {
  actions: string[];
}

export const RecommendationList: React.FC<RecommendationListProps> = ({ actions }) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-surface-100 border border-slate-200 dark:border-surface-border p-6 glow-card transition-all">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-surface-border">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <ListChecks className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white tracking-tight">Recommended Actions</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Safe, concrete next steps to validate and mitigate the issue</p>
          </div>
        </div>

        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
          {actions.length} {actions.length === 1 ? 'action' : 'actions'} prioritized
        </span>
      </div>

      <div className="space-y-3">
        {actions.map((action, idx) => {
          const numStr = String(idx + 1).padStart(2, '0');
          const isDone = completedSteps[idx];

          return (
            <div
              key={idx}
              className={`group flex items-start space-x-3.5 p-4 rounded-xl border transition-all duration-200 ${
                isDone
                  ? 'bg-slate-100/60 dark:bg-surface-300 border-slate-200 dark:border-surface-border/40 opacity-70'
                  : 'bg-slate-50 dark:bg-surface-200 hover:bg-slate-100 dark:hover:bg-surface-50 border-slate-200 dark:border-surface-border hover:border-slate-300 dark:hover:border-slate-600 shadow-sm dark:shadow-none'
              }`}
            >
              {/* Number indicator */}
              <div
                onClick={() => toggleStep(idx)}
                className={`font-mono text-xs font-bold px-2 py-1 rounded-md cursor-pointer transition-colors shrink-0 mt-0.5 select-none ${
                  isDone
                    ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30'
                    : 'bg-white dark:bg-surface-100 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-surface-border group-hover:border-indigo-300 dark:group-hover:border-indigo-500/40'
                }`}
                title="Click to mark step completed"
              >
                {isDone ? 'DONE' : numStr}
              </div>

              {/* Action content */}
              <div className="flex-1 text-sm text-slate-800 dark:text-slate-200 leading-relaxed pt-0.5 break-words">
                <span className={isDone ? 'line-through text-slate-400 dark:text-slate-500' : ''}>
                  {action}
                </span>
              </div>

              {/* Copy button */}
              <button
                type="button"
                onClick={() => handleCopy(action, idx)}
                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-surface-50 transition-all shrink-0"
                title="Copy action to clipboard"
              >
                {copiedIdx === idx ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default RecommendationList;
