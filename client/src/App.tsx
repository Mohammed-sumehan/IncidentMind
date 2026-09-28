import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { History } from './pages/History';
import { Memory } from './pages/Memory';
import { IncidentAnalysis, IncidentRecord, ResolutionOutcome } from './types';
import { analyzeIncident, checkBackendHealth } from './services/api';

const STORAGE_KEY = 'incidentmind_history_v1';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'investigate' | 'history' | 'memory'>('investigate');
  const [incident, setIncident] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<IncidentAnalysis | null>(null);
  const [backendConnected, setBackendConnected] = useState<boolean>(false);

  // Local state persistence for history records
  const [records, setRecords] = useState<IncidentRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Verify backend connectivity on mount
  useEffect(() => {
    let mounted = true;
    const verifyHealth = async () => {
      const res = await checkBackendHealth();
      if (mounted) {
        setBackendConnected(res.ok);
      }
    };
    verifyHealth();
    const interval = setInterval(verifyHealth, 15000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // Save history records to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.warn('Could not save history to localStorage', e);
    }
  }, [records]);

  const handleInvestigate = async () => {
    if (!incident.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeIncident(incident);
      setAnalysis(result);

      // Create history record
      const newRecord: IncidentRecord = {
        id: result.id || `inc-${Date.now()}`,
        timestamp: new Date().toISOString(),
        inputIncident: incident.trim(),
        analysis: result,
      };

      setRecords((prev) => [newRecord, ...prev]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred during incident analysis.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setError(null);
    setIncident('');
    setActiveTab('investigate');
  };

  const handleSelectRecord = (record: IncidentRecord) => {
    setAnalysis(record.analysis);
    setIncident(record.inputIncident);
    setActiveTab('investigate');
  };

  const handleClearHistory = () => {
    setRecords([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const handleFeedback = (status: ResolutionOutcome) => {
    if (!analysis) return;
    setRecords((prev) =>
      prev.map((rec) =>
        rec.analysis === analysis
          ? { ...rec, feedback: status, feedbackRetained: true }
          : rec
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-800 dark:text-slate-100 flex flex-col selection:bg-indigo-500/25 selection:text-indigo-600 dark:selection:text-indigo-200 transition-colors duration-150">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        backendConnected={backendConnected}
        historyCount={records.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'investigate' && (
          <Dashboard
            incident={incident}
            setIncident={setIncident}
            onInvestigate={handleInvestigate}
            isLoading={isLoading}
            error={error}
            analysis={analysis}
            onReset={handleReset}
            onFeedback={handleFeedback}
          />
        )}

        {activeTab === 'history' && (
          <History
            records={records}
            onSelectRecord={handleSelectRecord}
            onClearHistory={handleClearHistory}
            onNewInvestigation={() => {
              handleReset();
              setActiveTab('investigate');
            }}
          />
        )}

        {activeTab === 'memory' && <Memory />}
      </main>

      <footer className="border-t border-slate-200 dark:border-surface-border py-6 mt-12 bg-white/80 dark:bg-[#090d16] text-xs text-slate-500 dark:text-slate-400 transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-800 dark:text-slate-300">IncidentMind</span>
            <span>—</span>
            <span>AI that remembers how your engineering team solved incidents</span>
          </div>
          <div className="flex items-center space-x-4 font-mono text-[11px]">
            <span>Memory: <strong className="text-indigo-600 dark:text-indigo-400">Hindsight Cloud</strong></span>
            <span>Inference: <strong className="text-violet-600 dark:text-violet-400">Groq</strong></span>
            <span>Status: <strong className="text-emerald-600 dark:text-emerald-400">Live Backend</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
