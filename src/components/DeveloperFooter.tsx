import React from 'react';
import { Smartphone } from 'lucide-react';

interface DeveloperFooterProps {
  onOpenApkModal: () => void;
}

export const DeveloperFooter: React.FC<DeveloperFooterProps> = ({ onOpenApkModal }) => {
  return (
    <footer className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-4 z-40 flex items-center justify-between sm:justify-end gap-2 pointer-events-none">
      {/* Dev tag */}
      <div className="pointer-events-auto text-[11px] text-slate-400 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg shadow-black/50 flex items-center gap-1.5">
        <span>App developed by</span>
        <span className="font-bold text-cyan-400">Vishwajit Jadhav</span>
      </div>

      {/* Mini APK button on bottom right */}
      <button
        onClick={onOpenApkModal}
        className="pointer-events-auto p-2 sm:px-3 sm:py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/30 border border-indigo-400/30 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
        title="Android APK / Install"
      >
        <Smartphone className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">APK / App</span>
      </button>
    </footer>
  );
};
