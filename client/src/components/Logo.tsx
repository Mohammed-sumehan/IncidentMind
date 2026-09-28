import React from 'react';

interface LogoProps {
  size?: number;
  showBadge?: boolean;
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 38,
  showBadge = true,
  showSubtitle = true,
}) => {
  return (
    <div className="flex items-center space-x-3 select-none group">
      {/* Brand Icon Mark */}
      <div
        className="relative flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-[1.03]"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(99,102,241,0.25)] dark:drop-shadow-[0_4px_16px_rgba(99,102,241,0.4)]"
        >
          <defs>
            {/* Background Gradient */}
            <linearGradient id="im-bg-gradient" x1="2" y1="2" x2="42" y2="42" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>

            {/* Neural Memory Circuit Gradient */}
            <linearGradient id="im-circuit-grad" x1="10" y1="12" x2="34" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="45%" stopColor="#a5b4fc" />
              <stop offset="100%" stopColor="#e0e7ff" />
            </linearGradient>

            {/* Incident Alert Spark Gradient */}
            <radialGradient id="im-core-pulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Hex-Shield Outer Enclosure (Reliability & Engineering Rigor) */}
          <rect
            x="2"
            y="2"
            width="40"
            height="40"
            rx="11"
            fill="url(#im-bg-gradient)"
          />

          {/* Subtle Inner Bevel / Highlight Ring */}
          <rect
            x="2.5"
            y="2.5"
            width="39"
            height="39"
            rx="10.5"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1"
          />

          {/* Shield / Geometric Telemetry Structure */}
          <path
            d="M 22 8 L 33 13.5 V 23 C 33 29.5 28.5 34.5 22 36.5 C 15.5 34.5 11 29.5 11 23 V 13.5 Z"
            fill="rgba(15, 23, 42, 0.22)"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Continuous Memory Feedback Loop (Hindsight Organizational Recall) */}
          <path
            d="M 16 22 C 16 18.5 19 17 22 17 C 25 17 28 18.5 28 22 C 28 25.5 25 27 22 27 C 19 27 16 25.5 16 22 Z"
            stroke="url(#im-circuit-grad)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeDasharray="28 2"
          />

          {/* AI Neural Interconnects / SRE Pulse Nodes */}
          {/* Top Node */}
          <circle cx="22" cy="12.5" r="1.75" fill="#ffffff" />
          <line x1="22" y1="14.25" x2="22" y2="17" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />

          {/* Left Node */}
          <circle cx="14" cy="22" r="1.5" fill="#38bdf8" />
          <line x1="15.5" y1="22" x2="17.5" y2="22" stroke="rgba(56,189,248,0.8)" strokeWidth="1.2" />

          {/* Right Node */}
          <circle cx="30" cy="22" r="1.5" fill="#a5b4fc" />
          <line x1="26.5" y1="22" x2="28.5" y2="22" stroke="rgba(165,180,252,0.8)" strokeWidth="1.2" />

          {/* Incident Telemetry Spark / AI Core (Real-Time Incident Response) */}
          <circle cx="22" cy="22" r="4" fill="url(#im-core-pulse)" opacity="0.65" />
          <circle cx="22" cy="22" r="1.75" fill="#ffffff" />
        </svg>
      </div>

      {/* Brand Wordmark & Metadata */}
      <div>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center">
            Incident
            <span className="text-indigo-600 dark:text-indigo-400 ml-0.5">Mind</span>
          </span>

          {showBadge && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-500/20 shadow-sm dark:shadow-none">
              AI Incident Response
            </span>
          )}
        </div>

        {showSubtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
            Powered by{' '}
            <span className="text-slate-700 dark:text-slate-300 font-medium">Hindsight Memory</span>{' '}
            + <span className="text-slate-700 dark:text-slate-300 font-medium">Groq</span>
          </p>
        )}
      </div>
    </div>
  );
};
export default Logo;
