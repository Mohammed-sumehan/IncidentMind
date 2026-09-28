import React, { useState } from 'react';
import { IncidentAnalysis, ResolutionOutcome, ResolutionResponse } from '../types';
import { submitResolution } from '../services/api';
import { Check, X, Clock, Loader2, Database, AlertCircle, BookmarkCheck } from 'lucide-react';

interface ResolutionFeedbackProps {
  incidentId: string;
  incidentText?: string;
  analysis?: IncidentAnalysis;
  onFeedbackSaved?: (outcome: ResolutionOutcome, response: ResolutionResponse) => void;
}

export const ResolutionFeedback: React.FC<ResolutionFeedbackProps> = ({
  incidentId,
  incidentText,
  analysis,
  onFeedbackSaved,
}) => {
  const [selectedOutcome, setSelectedOutcome] = useState<ResolutionOutcome | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<ResolutionResponse | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSelectOutcome = (outcome: ResolutionOutcome) => {
    setSelectedOutcome(outcome);
    setSaveError(null);
    setSaveSuccess(null);
  };

  const handleConfirmAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOutcome || isSaving) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      const response = await submitResolution(incidentId, {
        outcome: selectedOutcome,
        details: notes.trim() || undefined,
        incident: incidentText,
        analysis,
      });

      setSaveSuccess(response);
      if (onFeedbackSaved) {
        onFeedbackSaved(selectedOutcome, response);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Could not save resolution to Hindsight.';
      setSaveError(msg);
      setSaveSuccess(null);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-surface-100 border border-slate-200 dark:border-surface-border p-5 sm:p-6 glow-card transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight">
              Did this resolve the incident?
            </h4>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
              Hindsight RETAIN
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Retain this resolution outcome in organizational memory to guide future incidents.
          </p>
        </div>

        {/* 3 Outcome Buttons */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSelectOutcome('worked')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              selectedOutcome === 'worked'
                ? 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/50 shadow-sm'
                : 'bg-slate-100 dark:bg-surface-200 hover:bg-slate-200 dark:hover:bg-surface-50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-surface-border'
            }`}
          >
            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Fix worked</span>
          </button>

          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSelectOutcome('failed')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              selectedOutcome === 'failed'
                ? 'bg-rose-500/20 text-rose-800 dark:text-rose-300 border-rose-500/50 shadow-sm'
                : 'bg-slate-100 dark:bg-surface-200 hover:bg-slate-200 dark:hover:bg-surface-50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-surface-border'
            }`}
          >
            <X className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Fix didn't work</span>
          </button>

          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSelectOutcome('not_resolved')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              selectedOutcome === 'not_resolved'
                ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/50 shadow-sm'
                : 'bg-slate-100 dark:bg-surface-200 hover:bg-slate-200 dark:hover:bg-surface-50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-surface-border'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Not resolved yet</span>
          </button>
        </div>
      </div>

      {/* Detail Input and Confirmation when an outcome is selected */}
      {selectedOutcome && !saveSuccess && (
        <form onSubmit={handleConfirmAndSave} className="mt-4 pt-4 border-t border-slate-100 dark:border-surface-border/60 space-y-3 animate-fadeIn">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {selectedOutcome === 'worked' && 'Resolution notes (optional details on the verified fix):'}
              {selectedOutcome === 'failed' && 'Resolution attempt notes (what was attempted and why it failed):'}
              {selectedOutcome === 'not_resolved' && 'Current status notes (diagnostic findings or ongoing mitigations):'}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isSaving}
              placeholder={
                selectedOutcome === 'worked'
                  ? 'Example: Restored shared connection pool and rolled back release. Error rate normal.'
                  : selectedOutcome === 'failed'
                  ? 'Example: Restarted pods but 500 errors persisted due to upstream timeout.'
                  : 'Example: Root cause still under investigation; database locks being analyzed.'
              }
              className="w-full bg-slate-50 dark:bg-[#0b101c] text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-xs rounded-xl p-3 border border-slate-300 dark:border-surface-border focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:bg-white dark:focus:bg-[#0b101c] outline-none transition font-sans"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
              <Database className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>
                Target: Hindsight Cloud Bank <strong className="text-slate-700 dark:text-slate-300 font-mono">incidentmind</strong>
              </span>
            </span>

            <button
              type="submit"
              disabled={isSaving}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all shadow-md ${
                isSaving
                  ? 'bg-indigo-600/40 text-indigo-200 dark:text-indigo-300/60 cursor-not-allowed border border-indigo-500/20'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/25 border border-indigo-400/30 active:scale-[0.98]'
              }`}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                  <span>Retaining in Hindsight...</span>
                </>
              ) : (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5 text-indigo-100" />
                  <span>Retain Resolution Outcome</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Success Banner */}
      {saveSuccess && (
        <div className="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-xs space-y-1.5 animate-fadeIn">
          <div className="flex items-center justify-between font-semibold">
            <span className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Resolution successfully retained in Hindsight Cloud memory</span>
            </span>
            <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400/80 px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30">
              RETAIN VERIFIED
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
            Future similar incidents will RECALL this outcome to guide on-call engineers.
          </p>
          {saveSuccess.documentId && (
            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 pt-0.5 truncate">
              Document ID: {saveSuccess.documentId}
            </div>
          )}
        </div>
      )}

      {/* Error Banner */}
      {saveError && (
        <div className="mt-4 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/25 text-rose-800 dark:text-rose-300 text-xs flex items-start space-x-2.5 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <strong className="font-semibold">Failed to retain in Hindsight: </strong>
            <span>{saveError}</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default ResolutionFeedback;
