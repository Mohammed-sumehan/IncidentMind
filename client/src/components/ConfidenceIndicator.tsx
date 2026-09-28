import React, { useState } from 'react';
import { ConfidenceLevel } from '../types';
import { HelpCircle, ShieldCheck, ShieldAlert } from 'lucide-react';

interface ConfidenceIndicatorProps {
  confidence: ConfidenceLevel;
}

export const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({ confidence }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const config = {
    high: {
      label: 'High Confidence',
      bgColor: 'bg-emerald-50 dark:bg-emerald-500/10',
      textColor: 'text-emerald-700 dark:text-emerald-400',
      borderColor: 'border-emerald-200 dark:border-emerald-500/30',
      dotColor: 'bg-emerald-500 dark:bg-emerald-400',
      barWidth: 'w-full',
      barColor: 'bg-emerald-500',
    },
    medium: {
      label: 'Medium Confidence',
      bgColor: 'bg-amber-50 dark:bg-amber-500/10',
      textColor: 'text-amber-700 dark:text-amber-400',
      borderColor: 'border-amber-200 dark:border-amber-500/30',
      dotColor: 'bg-amber-500 dark:bg-amber-400',
      barWidth: 'w-2/3',
      barColor: 'bg-amber-500',
    },
    low: {
      label: 'Low Confidence',
      bgColor: 'bg-rose-50 dark:bg-rose-500/10',
      textColor: 'text-rose-700 dark:text-rose-400',
      borderColor: 'border-rose-200 dark:border-rose-500/30',
      dotColor: 'bg-rose-500 dark:bg-rose-400',
      barWidth: 'w-1/3',
      barColor: 'bg-rose-500',
    },
  }[confidence.toLowerCase() as ConfidenceLevel] || {
    label: confidence,
    bgColor: 'bg-slate-100 dark:bg-slate-500/10',
    textColor: 'text-slate-700 dark:text-slate-400',
    borderColor: 'border-slate-200 dark:border-slate-500/30',
    dotColor: 'bg-slate-500 dark:bg-slate-400',
    barWidth: 'w-1/2',
    barColor: 'bg-slate-500',
  };

  return (
    <div className="relative inline-flex items-center">
      <div
        className={`flex items-center space-x-2.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-help transition-all shadow-sm dark:shadow-none ${config.bgColor} ${config.textColor} ${config.borderColor}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
      >
        <span className={`w-2 h-2 rounded-full ${config.dotColor}`} />
        <span className="font-semibold uppercase tracking-wider text-[11px]">{config.label}</span>
        <HelpCircle className="w-3.5 h-3.5 opacity-60 hover:opacity-100 transition-opacity" />
      </div>

      {showTooltip && (
        <div className="absolute right-0 top-full mt-2 w-72 p-3.5 bg-white dark:bg-surface-200 text-slate-800 dark:text-slate-200 text-xs rounded-xl border border-slate-200 dark:border-surface-border shadow-xl z-50 animate-fadeIn leading-relaxed">
          <div className="flex items-center space-x-2 mb-1.5 text-slate-900 dark:text-slate-300 font-semibold">
            {confidence === 'high' ? (
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            )}
            <span>Confidence Assessment</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Confidence reflects the agent's assessment based on the current incident and historical evidence.
          </p>
          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-surface-border/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            <span>Score weight:</span>
            <div className="w-24 bg-slate-100 dark:bg-surface-50 h-1.5 rounded-full overflow-hidden">
              <div className={`h-full ${config.barColor} ${config.barWidth}`} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ConfidenceIndicator;
