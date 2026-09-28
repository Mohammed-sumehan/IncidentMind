import React from 'react';
import { Database, Sparkles, History, BookmarkCheck, Server } from 'lucide-react';

interface MemoryCardProps {
  memorySummary: string;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ memorySummary }) => {
  const hasMemory = Boolean(
    memorySummary &&
      !memorySummary.toLowerCase().includes('no historical memories') &&
      !memorySummary.toLowerCase().includes('no relevant memories')
  );

  return (
    <div className="relative rounded-2xl bg-gradient-to-b from-indigo-50/80 via-white to-slate-50/90 dark:from-[#13192b] dark:to-[#0c111e] border border-indigo-200/90 dark:border-indigo-500/30 p-6 memory-highlight transition-all">
      {/* Visual Header with Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-indigo-100 dark:border-indigo-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-400/40 flex items-center justify-center text-indigo-600 dark:text-indigo-300 shadow-inner">
            <Database className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Engineering Memory</h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-indigo-100 dark:bg-indigo-500/25 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-400/40">
                HINDSIGHT MEMORY
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Relevant experience from previous incidents recalled from organizational memory
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          {hasMemory ? (
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 shadow-sm dark:shadow-none">
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>Memory Found & Matched</span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-500/30">
              <span>No Prior Incident Found</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Memory Content Area */}
      <div className="space-y-4">
        <div className="rounded-xl bg-white/95 dark:bg-[#090d16]/80 border border-indigo-100 dark:border-indigo-500/20 p-4 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed relative shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-indigo-50 dark:border-white/5 text-[11px] text-indigo-600 dark:text-indigo-400">
            <span className="flex items-center space-x-1.5 font-semibold uppercase tracking-wider">
              <History className="w-3.5 h-3.5" />
              <span>Historical Evidence</span>
            </span>
            <span className="text-slate-400 text-[10px]">Bank: incidentmind</span>
          </div>

          <div className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans sm:text-sm text-xs whitespace-pre-wrap break-words">
            {memorySummary}
          </div>
        </div>

        {/* Informational callout for hackathon judges explaining Hindsight value */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
          <div className="p-3 rounded-lg bg-white dark:bg-surface-200 border border-slate-200 dark:border-surface-border flex items-start space-x-2 shadow-sm dark:shadow-none">
            <Server className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-800 dark:text-slate-200">Durable Memory</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Retains past incident root causes & resolutions across deployments.</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-surface-200 border border-slate-200 dark:border-surface-border flex items-start space-x-2 shadow-sm dark:shadow-none">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-800 dark:text-slate-200">Semantic Recall</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Surfaces matches even with varied symptom wording.</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-surface-200 border border-slate-200 dark:border-surface-border flex items-start space-x-2 shadow-sm dark:shadow-none">
            <BookmarkCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-800 dark:text-slate-200">Proven Fixes</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Avoids trial-and-error by retrieving what previously restored service.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MemoryCard;
