import React, { useState } from 'react';
import { Database, Sparkles, CheckCircle2, RefreshCw, Layers, Server } from 'lucide-react';

export const Memory: React.FC = () => {
  const [liveTestLoading, setLiveTestLoading] = useState(false);
  const [liveMemoryData, setLiveMemoryData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveMemoryTest = async () => {
    setLiveTestLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/test/memory');
      if (!res.ok) {
        throw new Error(`Memory query returned HTTP ${res.status}`);
      }
      const data = await res.json();
      setLiveMemoryData(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Could not query backend test memory.');
    } finally {
      setLiveTestLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="p-6 bg-white dark:bg-surface-100 rounded-2xl border border-slate-200 dark:border-surface-border glow-card transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Database className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Engineering Memory Architecture</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                  HINDSIGHT CLOUD
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Organizational memory to recall previous incident resolutions across production outages
              </p>
            </div>
          </div>

          <button
            onClick={fetchLiveMemoryTest}
            disabled={liveTestLoading}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/20"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${liveTestLoading ? 'animate-spin' : ''}`} />
            <span>{liveTestLoading ? 'Querying Hindsight...' : 'Query Live Memory Bank'}</span>
          </button>
        </div>
      </div>

      {/* The Core Hackathon Concept: Why Hindsight? */}
      <div className="p-6 rounded-2xl bg-white dark:bg-surface-100 border border-slate-200 dark:border-surface-border space-y-4 transition-all glow-card">
        <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>The IncidentMind Memory Pipeline</span>
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Standard incident response suffers from knowledge loss: when an on-call engineer fixes a subtle bug at 3 AM, that knowledge is buried in closed Slack threads or forgotten post-mortems. IncidentMind uses Hindsight to capture and automatically surface this experience.
        </p>

        {/* Visual Pipeline Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-surface-border text-center space-y-1.5 shadow-sm dark:shadow-none">
            <div className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold uppercase">01 • INPUT</div>
            <div className="font-semibold text-xs text-slate-900 dark:text-slate-200">Current Incident</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Error messages, stack traces & symptoms</div>
          </div>

          <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/30 text-center space-y-1.5 shadow-sm dark:shadow-none">
            <div className="text-[10px] font-mono text-indigo-700 dark:text-indigo-300 font-bold uppercase">02 • RECALL</div>
            <div className="font-semibold text-xs text-slate-900 dark:text-white">Hindsight Recall</div>
            <div className="text-[11px] text-indigo-600 dark:text-indigo-300/80">Semantic lookup in bank: incidentmind</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-surface-border text-center space-y-1.5 shadow-sm dark:shadow-none">
            <div className="text-[10px] font-mono text-violet-600 dark:text-violet-400 font-bold uppercase">03 • EVIDENCE</div>
            <div className="font-semibold text-xs text-slate-900 dark:text-slate-200">Historical Facts</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Past post-mortems, verified resolutions</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-surface-border text-center space-y-1.5 shadow-sm dark:shadow-none">
            <div className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold uppercase">04 • REASONING</div>
            <div className="font-semibold text-xs text-slate-900 dark:text-slate-200">Groq LLM Synthesis</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Strict schema json output (openai/gpt-oss-20b)</div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 text-center space-y-1.5 shadow-sm dark:shadow-none">
            <div className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase">05 • OUTPUT</div>
            <div className="font-semibold text-xs text-slate-900 dark:text-white">Contextual Fix</div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-300/80">Immediate actionable remediation</div>
          </div>
        </div>
      </div>

      {/* What IncidentMind Remembers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-surface-100 border border-slate-200 dark:border-surface-border space-y-3 glow-card transition-all">
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
            <Layers className="w-4 h-4" />
            <span>What IncidentMind Retains in Memory</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong className="text-slate-900 dark:text-white">Previous incidents:</strong> Outage logs, alerts, deployment version changes</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong className="text-slate-900 dark:text-white">Root causes:</strong> True underlying triggers discovered in post-incident retrospectives</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong className="text-slate-900 dark:text-white">Successful resolutions:</strong> Exact configuration fixes, rollbacks, and pool adjustments</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong className="text-slate-900 dark:text-white">Engineering decisions:</strong> Context on architectural limits and past trade-offs</span>
            </li>
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-surface-100 border border-slate-200 dark:border-surface-border space-y-3 glow-card transition-all">
          <div className="flex items-center space-x-2 text-violet-600 dark:text-violet-400 font-semibold text-sm">
            <Server className="w-4 h-4" />
            <span>Active Memory Bank Configuration</span>
          </div>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-surface-200 border border-slate-200/60 dark:border-transparent">
              <span className="text-slate-500 dark:text-slate-400">Provider</span>
              <span className="text-slate-900 dark:text-white font-semibold">Hindsight Cloud (@vectorize-io)</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-surface-200 border border-slate-200/60 dark:border-transparent">
              <span className="text-slate-500 dark:text-slate-400">Bank Identifier</span>
              <span className="text-indigo-600 dark:text-indigo-300 font-semibold">incidentmind</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-surface-200 border border-slate-200/60 dark:border-transparent">
              <span className="text-slate-500 dark:text-slate-400">Recall Capabilities</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Semantic, Keyword & Reranker</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-surface-200 border border-slate-200/60 dark:border-transparent">
              <span className="text-slate-500 dark:text-slate-400">Reasoning Agent</span>
              <span className="text-violet-600 dark:text-violet-300 font-semibold">Groq openai/gpt-oss-20b</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Hindsight Memory Bank Probe Results */}
      {liveMemoryData && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0b101c] border border-indigo-200 dark:border-indigo-500/30 glow-card space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-surface-border">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                Live Hindsight Cloud Memory Inspection
              </h4>
            </div>
            <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-medium">
              Query: "{liveMemoryData.query}"
            </span>
          </div>

          <div className="space-y-3">
            {liveMemoryData.result?.results?.map((res: any, idx: number) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-surface-100 border border-slate-200 dark:border-surface-border text-xs space-y-2">
                <div className="flex items-center justify-between font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold uppercase">Memory #{idx + 1} • Type: {res.type}</span>
                  {res.scores && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      Reranker Score: {res.scores.reranker ? res.scores.reranker.toFixed(4) : 'N/A'}
                    </span>
                  )}
                </div>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-sans text-xs">
                  {res.text}
                </p>
                {res.entities && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {res.entities.map((ent: string, eIdx: number) => (
                      <span key={eIdx} className="px-2 py-0.5 rounded bg-white dark:bg-surface-200 text-[10px] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-surface-border">
                        {ent}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-800 dark:text-rose-300 text-xs">
          <strong>Failed to query live memory bank:</strong> {error}
        </div>
      )}
    </div>
  );
};
export default Memory;
