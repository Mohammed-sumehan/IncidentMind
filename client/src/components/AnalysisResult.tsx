import React from 'react';
import { IncidentAnalysis, ResolutionOutcome } from '../types';
import { MemoryCard } from './MemoryCard';
import { RecommendationList } from './RecommendationList';
import { ConfidenceIndicator } from './ConfidenceIndicator';
import { ReasoningPanel } from './ReasoningPanel';
import { ResolutionFeedback } from './ResolutionFeedback';
import { FileText, AlertOctagon, CheckCircle2, RotateCcw } from 'lucide-react';

interface AnalysisResultProps {
  analysis: IncidentAnalysis;
  incidentText?: string;
  onReset: () => void;
  onFeedback?: (status: ResolutionOutcome) => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({
  analysis,
  incidentText,
  onReset,
  onFeedback,
}) => {
  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Header bar of result: Title, Confidence, New Investigation CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-surface-100 rounded-2xl border border-slate-200 dark:border-surface-border glow-card transition-all">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Investigation Analysis</h2>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Live Agent Output</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Correlated with organizational memory from Hindsight
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 self-start sm:self-auto">
          <ConfidenceIndicator confidence={analysis.confidence} />
          <button
            onClick={onReset}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-surface-200 hover:bg-slate-200 dark:hover:bg-surface-50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-surface-border transition-colors shadow-sm dark:shadow-none"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Investigation</span>
          </button>
        </div>
      </div>

      {/* Grid of Incident Summary & Likely Root Cause */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Incident Summary */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-100 border border-slate-200 dark:border-surface-border glow-card space-y-3 transition-all">
          <div className="flex items-center space-x-2.5 text-indigo-600 dark:text-indigo-400 pb-2 border-b border-slate-100 dark:border-surface-border">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white uppercase tracking-wider font-mono text-[11px]">
              Incident Summary
            </h3>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-sans pt-1 break-words">
            {analysis.incident_summary}
          </p>
        </div>

        {/* 2. Likely Root Cause */}
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-100 border border-slate-200 dark:border-surface-border glow-card space-y-3 transition-all">
          <div className="flex items-center space-x-2.5 text-amber-600 dark:text-amber-400 pb-2 border-b border-slate-100 dark:border-surface-border">
            <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex items-center justify-center">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white uppercase tracking-wider font-mono text-[11px]">
              Likely Root Cause
            </h3>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-sans pt-1 break-words">
            {analysis.likely_root_cause}
          </p>
        </div>
      </div>

      {/* 3. MOST IMPORTANT SECTION: HINDSIGHT ENGINEERING MEMORY */}
      <MemoryCard memorySummary={analysis.relevant_memory_summary} />

      {/* 4. RECOMMENDED ACTIONS */}
      <RecommendationList actions={analysis.recommended_actions} />

      {/* 5. REASONING PANEL */}
      <ReasoningPanel reasoning={analysis.reasoning} />

      {/* 6. RESOLUTION FEEDBACK & HINDSIGHT LEARNING LOOP */}
      <ResolutionFeedback
        incidentId={analysis.id || 'current-incident'}
        incidentText={incidentText || analysis.incident_summary}
        analysis={analysis}
        onFeedbackSaved={(outcome) => onFeedback?.(outcome)}
      />
    </div>
  );
};
export default AnalysisResult;
