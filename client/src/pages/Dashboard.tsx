import React from 'react';
import { IncidentAnalysis, ResolutionOutcome } from '../types';
import { IncidentInput } from '../components/IncidentInput';
import { InvestigationProgress } from '../components/InvestigationProgress';
import { AnalysisResult } from '../components/AnalysisResult';
import { ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

interface DashboardProps {
  incident: string;
  setIncident: (val: string) => void;
  onInvestigate: () => void;
  isLoading: boolean;
  error: string | null;
  analysis: IncidentAnalysis | null;
  onReset: () => void;
  onFeedback: (status: ResolutionOutcome) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  incident,
  setIncident,
  onInvestigate,
  isLoading,
  error,
  analysis,
  onReset,
  onFeedback,
}) => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Hero Section */}
      {!analysis && !isLoading && (
        <div className="text-center pt-4 sm:pt-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider shadow-sm dark:shadow-none">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Incident Response Powered by Hindsight + Groq</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight sm:leading-tight">
            Resolve incidents with your <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 dark:from-indigo-400 dark:via-violet-300 dark:to-indigo-200 bg-clip-text text-transparent">
              team's memory.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Find relevant past incidents and use your team's engineering memory to guide response.
          </p>

          {/* Normal AI vs IncidentMind Value Proposition Diagram */}
          <div className="max-w-3xl mx-auto mt-6 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {/* Generic AI approach */}
            <div className="p-4 rounded-xl bg-white dark:bg-surface-100 border border-slate-200 dark:border-surface-border text-xs space-y-2 shadow-sm dark:shadow-none">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                <span className="font-semibold uppercase">Standard AI Approach</span>
                <span className="text-[10px]">No organizational recall</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-slate-600 dark:text-slate-400 py-1">
                <span className="bg-slate-100 dark:bg-surface-200 px-2 py-0.5 rounded border border-slate-200/60 dark:border-transparent">Incident</span>
                <ArrowRight className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
                <span className="bg-slate-100 dark:bg-surface-200 px-2 py-0.5 rounded border border-slate-200/60 dark:border-transparent">Generic LLM</span>
                <ArrowRight className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
                <span className="bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-500/20 font-medium">Generic advice</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Starts with limited team-specific context and no organizational recall.
              </p>
            </div>

            {/* IncidentMind approach */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/50 dark:from-indigo-950/40 dark:to-surface-100 border border-indigo-200 dark:border-indigo-500/30 text-xs space-y-2 relative shadow-sm dark:shadow-none">
              <div className="flex items-center justify-between text-indigo-700 dark:text-indigo-300 font-mono text-[11px]">
                <span className="font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> IncidentMind
                </span>
                <span className="text-indigo-700 dark:text-indigo-400 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20">
                  Hindsight Powered
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-slate-700 dark:text-slate-300 py-1">
                <span className="bg-slate-100 dark:bg-surface-200 px-2 py-0.5 rounded border border-slate-200/60 dark:border-transparent">Incident</span>
                <ArrowRight className="w-3 h-3 text-indigo-500 dark:text-indigo-400 shrink-0" />
                <span className="bg-indigo-100 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-500/30 font-medium">Hindsight Memory</span>
                <ArrowRight className="w-3 h-3 text-indigo-500 dark:text-indigo-400 shrink-0" />
                <span className="bg-slate-100 dark:bg-surface-200 px-2 py-0.5 rounded border border-slate-200/60 dark:border-transparent">Groq</span>
                <ArrowRight className="w-3 h-3 text-indigo-500 dark:text-indigo-400 shrink-0" />
                <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/30 font-medium">Contextual recommendation</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                Surfaces past incidents and outcomes from organizational memory to generate tailored recommendations.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Incident Input Panel (shown on initial state or when investigating) */}
      {!analysis && (
        <IncidentInput
          incident={incident}
          setIncident={setIncident}
          onInvestigate={onInvestigate}
          isLoading={isLoading}
          error={error}
        />
      )}

      {/* In-Flight Investigation Loading State */}
      {isLoading && <InvestigationProgress isLoading={isLoading} />}

      {/* Analysis Result State */}
      {analysis && !isLoading && (
        <AnalysisResult
          analysis={analysis}
          incidentText={incident}
          onReset={onReset}
          onFeedback={onFeedback}
        />
      )}
    </div>
  );
};
