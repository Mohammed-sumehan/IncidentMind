import React from 'react';
import { ShieldAlert, History, Database, Cpu, Activity } from 'lucide-react';

interface HeaderProps {
  activeTab: 'investigate' | 'history' | 'memory';
  setActiveTab: (tab: 'investigate' | 'history' | 'memory') => void;
  backendConnected: boolean;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  backendConnected,
  historyCount,
}) => {
  return (
    <header className="border-b border-surface-border bg-[#090d16]/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Product Identity */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('investigate')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/10">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold tracking-tight text-white">IncidentMind</span>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                AI Incident Response
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Powered by <span className="text-slate-300 font-medium">Hindsight Memory</span> + <span className="text-slate-300 font-medium">Groq</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => setActiveTab('investigate')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'investigate'
                ? 'bg-surface-100 text-white shadow-sm border border-surface-border'
                : 'text-slate-400 hover:text-slate-200 hover:bg-surface-100/50'
            }`}
          >
            <Cpu className="w-4 h-4 text-indigo-400" />
            <span>Investigate</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'history'
                ? 'bg-surface-100 text-white shadow-sm border border-surface-border'
                : 'text-slate-400 hover:text-slate-200 hover:bg-surface-100/50'
            }`}
          >
            <History className="w-4 h-4 text-slate-400" />
            <span>Incident History</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-mono bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30">
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('memory')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'memory'
                ? 'bg-surface-100 text-white shadow-sm border border-surface-border'
                : 'text-slate-400 hover:text-slate-200 hover:bg-surface-100/50'
            }`}
          >
            <Database className="w-4 h-4 text-violet-400" />
            <span>Memory Bank</span>
          </button>
        </nav>

        {/* Live Backend Connection Indicator */}
        <div className="hidden md:flex items-center space-x-2 text-xs text-slate-400 bg-surface-200/80 px-3 py-1.5 rounded-full border border-surface-border">
          <div className="relative flex items-center justify-center">
            <span
              className={`w-2 h-2 rounded-full ${
                backendConnected ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
              }`}
            />
            {backendConnected && (
              <span className="absolute w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-40" />
            )}
          </div>
          <Activity className="w-3.5 h-3.5 text-slate-500" />
          <span>{backendConnected ? 'Backend: 5000' : 'Connecting backend...'}</span>
        </div>
      </div>
    </header>
  );
};
