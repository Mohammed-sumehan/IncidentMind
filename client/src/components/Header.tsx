import React from 'react';
import { History, Database, Cpu, Activity, Sun, Moon } from 'lucide-react';
import { Logo } from './Logo';
import { useTheme } from '../context/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-slate-200 dark:border-surface-border bg-white/90 dark:bg-[#090d16]/95 backdrop-blur sticky top-0 z-40 transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo & Product Identity */}
        <div
          className="cursor-pointer shrink-0"
          onClick={() => setActiveTab('investigate')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setActiveTab('investigate');
            }
          }}
          title="IncidentMind — AI Incident Response"
        >
          <Logo size={38} />
        </div>

        {/* Navigation Tabs with Full Names */}
        <nav className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => setActiveTab('investigate')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'investigate'
                ? 'bg-slate-100 dark:bg-surface-100 text-slate-900 dark:text-white shadow-sm border border-slate-300 dark:border-surface-border'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-surface-200'
            }`}
          >
            <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>Investigate</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'history'
                ? 'bg-slate-100 dark:bg-surface-100 text-slate-900 dark:text-white shadow-sm border border-slate-300 dark:border-surface-border'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-surface-200'
            }`}
          >
            <History className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
            <span>Incident History</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-mono bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-200 dark:border-indigo-500/30">
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('memory')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'memory'
                ? 'bg-slate-100 dark:bg-surface-100 text-slate-900 dark:text-white shadow-sm border border-slate-300 dark:border-surface-border'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-surface-200'
            }`}
          >
            <Database className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0" />
            <span>Memory Bank</span>
          </button>
        </nav>

        {/* Right Section: Status Indicator + Theme Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {/* Live Backend Connection Indicator */}
          <div className="hidden md:flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-surface-200 px-3 py-1.5 rounded-full border border-slate-200 dark:border-surface-border">
            <div className="relative flex items-center justify-center">
              <span
                className={`w-2 h-2 rounded-full ${
                  backendConnected ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-amber-500 dark:bg-amber-400 animate-pulse'
                }`}
              />
              {backendConnected && (
                <span className="absolute w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping opacity-40" />
              )}
            </div>
            <Activity className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-mono text-[11px]">{backendConnected ? 'Backend: 5000' : 'Connecting...'}</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-surface-border bg-slate-100 dark:bg-surface-200 hover:bg-slate-200 dark:hover:bg-surface-50 text-slate-700 dark:text-slate-200 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/40 active:scale-95"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-fadeIn" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 animate-fadeIn" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
