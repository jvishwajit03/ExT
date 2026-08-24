import React from 'react';
import { Smartphone, Sparkles, Download, ShieldCheck, Wallet } from 'lucide-react';

interface HeaderProps {
  onOpenApkModal: () => void;
  deferredPrompt: any;
  onInstallPwa: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenApkModal,
  deferredPrompt,
  onInstallPwa
}) => {
  return (
    <header className="text-center mb-5 relative pt-1">
      {/* Top action bar with quick APK install/info pill */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-[11px] tracking-wide">PWA & APK READY</span>
        </div>

        <button
          id="apk-modal-open-btn"
          onClick={onOpenApkModal}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
          <span>Get Android APK</span>
        </button>
      </div>

      <div className="flex items-center justify-center gap-2.5 mb-1">
        <div className="p-2 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-500/20 border border-white/10 shadow-lg shadow-indigo-500/10">
          <Wallet className="w-6 h-6 text-cyan-400" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
          Expense Tracker
        </h1>
      </div>
      <p className="text-xs sm:text-sm text-slate-400 font-medium">
        Smart Daily Money Management
      </p>
    </header>
  );
};
