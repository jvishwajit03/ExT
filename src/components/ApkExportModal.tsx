import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Download, 
  CheckCircle2, 
  Copy, 
  Terminal, 
  ExternalLink, 
  Sparkles, 
  Layers,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface ApkExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: any;
  onInstallPwa: () => void;
}

export const ApkExportModal: React.FC<ApkExportModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt,
  onInstallPwa
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pwa' | 'capacitor' | 'github'>('pwa');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const capacitorCommands = `# 1. Build web production bundle
npm run build

# 2. Install Capacitor core & Android platform
npm install @capacitor/core @capacitor/cli @capacitor/android

# 3. Add Android platform project
npx cap add android

# 4. Sync web assets into Android project
npx cap sync android

# 5. Open in Android Studio & click "Build > Build APK(s)"
npx cap open android`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-100 text-base sm:text-lg">
                Convert to Android App & APK
              </h3>
              <p className="text-xs text-slate-400">
                Install as WebAPK or build standalone native .APK
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-800 bg-slate-950/70 p-1.5 gap-1 text-xs">
          <button
            onClick={() => setActiveTab('pwa')}
            className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'pwa'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>1-Click Install</span>
          </button>
          <button
            onClick={() => setActiveTab('capacitor')}
            className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'capacitor'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Capacitor APK</span>
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'github'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cloud Build</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300">
          {activeTab === 'pwa' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Direct Android Install (WebAPK)
                </div>
                <p className="text-xs text-slate-300">
                  Installs directly on any Android device with a native home-screen icon, splash screen, offline data caching, and full-screen immersive view.
                </p>
              </div>

              {deferredPrompt ? (
                <button
                  onClick={() => {
                    onInstallPwa();
                    onClose();
                  }}
                  className="w-full py-3 px-4 rounded-xl font-extrabold text-white text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Install App on this Device</span>
                </button>
              ) : (
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
                  <span className="font-bold text-slate-200 text-xs uppercase tracking-wider block">
                    How to install on Android phone:
                  </span>
                  <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300 leading-relaxed">
                    <li>Open this URL on your Android device (Google Chrome / Brave / Edge).</li>
                    <li>Tap the browser menu button <span className="font-mono bg-slate-800 px-1 rounded text-cyan-300 font-bold">⋮</span> (top right).</li>
                    <li>Tap <strong className="text-emerald-300">"Install app"</strong> or <strong className="text-emerald-300">"Add to Home screen"</strong>.</li>
                    <li>The app icon is added to your Android app drawer and home screen!</li>
                  </ol>
                </div>
              )}

              {/* Manifest Info */}
              <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800 text-[11px] space-y-1">
                <div className="text-slate-400">
                  <span className="font-semibold text-slate-300">Package Identifier:</span> <code className="text-cyan-300 font-mono">com.vishwajitjadhav.expensetracker</code>
                </div>
                <div className="text-slate-400">
                  <span className="font-semibold text-slate-300">App Name:</span> Daily Expense Tracker Pro
                </div>
                <div className="text-slate-400">
                  <span className="font-semibold text-slate-300">Author:</span> Vishwajit Jadhav
                </div>
              </div>
            </div>
          )}

          {activeTab === 'capacitor' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-300">
                To generate a raw <code className="text-cyan-300 font-mono">.apk</code> file for distribution or sideloading, use the pre-configured Capacitor commands below:
              </p>

              <div className="relative">
                <pre className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                  {capacitorCommands}
                </pre>
                <button
                  onClick={() => copyToClipboard(capacitorCommands, 'capacitor')}
                  className="absolute right-2.5 top-2.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                >
                  {copiedCode === 'capacitor' ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1">
                <span className="font-bold text-slate-200">How to export:</span>
                <p className="text-slate-400">
                  Export this project via AI Studio Settings &gt; Export to ZIP/GitHub, run the commands above in terminal, and Android Studio will compile your <code className="text-emerald-400 font-mono">app-debug.apk</code> and <code className="text-emerald-400 font-mono">app-release.apk</code> in seconds.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'github' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs space-y-1">
                <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  Automated GitHub Actions APK Workflow Ready
                </div>
                <p className="text-slate-300">
                  We have pre-configured <code className="text-cyan-300 font-mono">.github/workflows/build-apk.yml</code> in this repository.
                </p>
              </div>

              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-slate-200 block">3-Step Cloud APK Build:</span>
                <ol className="list-decimal list-inside space-y-1 text-slate-300">
                  <li>Export this project to your GitHub account.</li>
                  <li>Go to the <strong className="text-indigo-300">Actions</strong> tab in your GitHub repository.</li>
                  <li>Click <strong className="text-emerald-300">"Build Android APK"</strong> &gt; Run workflow.</li>
                </ol>
                <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  GitHub will automatically compile and produce the downloadable <code className="text-emerald-400 font-mono">DailyExpenseTrackerPro-Debug-APK.zip</code> artifact for you!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Dev: <strong className="text-slate-200">Vishwajit Jadhav</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
