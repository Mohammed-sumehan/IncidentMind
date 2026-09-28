import React from 'react';
import { IncidentRecord } from '../types';
import { History as HistoryIcon, Clock, ChevronRight, RotateCcw, AlertOctagon } from 'lucide-react';
import { ConfidenceIndicator } from '../components/ConfidenceIndicator';

interface HistoryProps {
  records: IncidentRecord[];
  onSelectRecord: (record: IncidentRecord) => void;
  onClearHistory: () => void;
  onNewInvestigation: () => void;
}

export const History: React.FC<HistoryProps> = ({
  records,
  onSelectRecord,
  onClearHistory,
  onNewInvestigation,
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-surface-100 rounded-2xl border border-slate-200 dark:border-surface-border glow-card transition-all">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <HistoryIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Incident History</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Previously investigated incidents in this session
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {records.length > 0 && (
            <button
              onClick={onClearHistory}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-surface-border hover:border-rose-300 dark:hover:border-rose-500/30 transition-colors"
            >
              Clear Session
            </button>
          )}
          <button
            onClick={onNewInvestigation}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Investigate New Incident</span>
          </button>
        </div>
      </div>

      {/* Empty State */}
      {records.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white dark:bg-surface-100 rounded-2xl border border-slate-200 dark:border-surface-border space-y-3 transition-all">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-surface-200 flex items-center justify-center text-slate-400 dark:text-slate-500">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">No incidents investigated yet</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            When you investigate an incident using IncidentMind, it will be cataloged here for quick review.
          </p>
          <div className="pt-2">
            <button
              onClick={onNewInvestigation}
              className="text-xs px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition shadow-sm"
            >
              Start First Investigation
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {records.map((item) => {
            const formattedTime = new Date(item.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            });

            return (
              <div
                key={item.id}
                onClick={() => onSelectRecord(item)}
                className="group p-5 rounded-2xl bg-white dark:bg-surface-100 hover:bg-slate-50 dark:hover:bg-surface-200 border border-slate-200 dark:border-surface-border hover:border-indigo-300 dark:hover:border-indigo-500/40 glow-card transition-all cursor-pointer space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-surface-border/60">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                      {formattedTime}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">•</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-md">
                      Prompt: "{item.inputIncident.slice(0, 70)}{item.inputIncident.length > 70 ? '...' : ''}"
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    {item.feedback === 'worked' && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 font-semibold">
                        RESOLVED
                      </span>
                    )}
                    {item.feedback === 'failed' && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 font-semibold">
                        FIX FAILED
                      </span>
                    )}
                    {item.feedback === 'not_resolved' && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 font-semibold">
                        IN PROGRESS
                      </span>
                    )}
                    <ConfidenceIndicator confidence={item.analysis.confidence} />
                    <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 block mb-1 font-medium">
                      Incident Summary
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 line-clamp-2">
                      {item.analysis.incident_summary}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase text-amber-700 dark:text-amber-400/80 block mb-1 flex items-center gap-1 font-medium">
                      <AlertOctagon className="w-3 h-3" />
                      Likely Root Cause
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 line-clamp-2">
                      {item.analysis.likely_root_cause}
                    </p>
                  </div>
                </div>

                {item.analysis.relevant_memory_summary && (
                  <div className="pt-2 text-xs text-indigo-700 dark:text-indigo-300 font-mono line-clamp-1 border-t border-slate-100 dark:border-surface-border/40 flex items-center space-x-1.5">
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-transparent">
                      HINDSIGHT MEMORY
                    </span>
                    <span className="truncate text-slate-600 dark:text-slate-400">{item.analysis.relevant_memory_summary}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default History;
