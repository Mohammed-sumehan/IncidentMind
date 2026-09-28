import React from 'react';
import { ArrowRight, Sparkles, Terminal, AlertCircle } from 'lucide-react';

interface IncidentInputProps {
  incident: string;
  setIncident: (val: string) => void;
  onInvestigate: () => void;
  isLoading: boolean;
  error: string | null;
}

const SAMPLE_INCIDENTS = [
  {
    title: 'Payments 500 Errors',
    prompt: 'Payments API is returning 500 errors after the latest deployment.',
    tag: 'Production · Deployment',
  },
  {
    title: 'Checkout DB Timeouts',
    prompt: 'Production checkout requests began failing with database connection timeouts and PostgreSQL pool saturation.',
    tag: 'Database · Latency',
  },
  {
    title: 'Worker Queue Stalls',
    prompt: 'Background job worker queue latency spiking over 10x following v2026.09.20 release rollback.',
    tag: 'Queue · Reliability',
  },
];

export const IncidentInput: React.FC<IncidentInputProps> = ({
  incident,
  setIncident,
  onInvestigate,
  isLoading,
  error,
}) => {
  const charCount = incident.length;
  const isInvalid = charCount > 0 && charCount < 10;
  const isTooLong = charCount > 5000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading && charCount >= 10 && !isTooLong) {
      onInvestigate();
    }
  };

  return (
    <div className="w-full bg-white dark:bg-surface-100 rounded-2xl border border-slate-200 dark:border-surface-border p-5 sm:p-7 glow-card transition-all relative overflow-hidden">
      {/* Decorative gradient top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-60" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight">What happened?</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Describe symptoms, error codes, logs, or recent deployment events
            </p>
          </div>
        </div>

        {/* Example Presets for Fast Hackathon Demo */}
        <div className="flex items-center space-x-2 overflow-x-auto py-1">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0">
            <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" /> Presets:
          </span>
          {SAMPLE_INCIDENTS.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setIncident(sample.prompt)}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-surface-200 hover:bg-slate-200 dark:hover:bg-surface-50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-surface-border transition-colors shrink-0"
              title={sample.prompt}
            >
              {sample.title}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={incident}
            onChange={(e) => setIncident(e.target.value)}
            disabled={isLoading}
            rows={4}
            placeholder="Example: Payments API is returning 500 errors after the latest deployment..."
            className="w-full bg-slate-50 dark:bg-[#0b101c] text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm rounded-xl p-4 border border-slate-300 dark:border-surface-border focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:bg-white dark:focus:bg-[#0b101c] outline-none transition resize-y font-mono leading-relaxed disabled:opacity-60"
          />
          <div className="flex items-center justify-between mt-2 px-1 text-xs">
            <div className="flex items-center space-x-2">
              {isInvalid && (
                <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> Minimum 10 characters required
                </span>
              )}
              {isTooLong && (
                <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> Maximum 5,000 characters allowed
                </span>
              )}
              {!isInvalid && !isTooLong && (
                <span className="text-slate-500 dark:text-slate-400">
                  Tip: Mentioning deployments, error codes (e.g. 500), or services helps recall relevant memories.
                </span>
              )}
            </div>
            <span
              className={`font-mono text-[11px] ${
                isTooLong ? 'text-rose-600 dark:text-rose-400 font-semibold' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {charCount} / 5000
            </span>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-300 text-sm flex items-start space-x-2.5 animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed">
              <span className="font-semibold">Investigation error: </span>
              {error}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 dark:bg-violet-400" />
              <span>Hindsight Memory Bank: <span className="font-mono text-slate-700 dark:text-slate-300 font-medium">incidentmind</span></span>
            </div>
            <div className="hidden sm:flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400" />
              <span>Groq Model: <span className="font-mono text-slate-700 dark:text-slate-300 font-medium">openai/gpt-oss-20b</span></span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || charCount < 10 || isTooLong}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 shadow-lg transition-all ${
              isLoading || charCount < 10 || isTooLong
                ? 'bg-indigo-600/40 text-indigo-200 dark:text-indigo-300/60 cursor-not-allowed border border-indigo-500/20'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/25 hover:shadow-indigo-500/40 active:scale-[0.99] border border-indigo-400/30'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Investigating Incident...</span>
              </>
            ) : (
              <>
                <span>Investigate Incident</span>
                <ArrowRight className="w-4 h-4 text-indigo-100" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
