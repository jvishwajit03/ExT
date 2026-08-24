import React, { useState, useEffect, useMemo } from 'react';
import { Transaction, CurrencyTotals } from './types';
import { Header } from './components/Header';
import { DashboardSummary } from './components/DashboardSummary';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { ApkExportModal } from './components/ApkExportModal';
import { DeveloperFooter } from './components/DeveloperFooter';
import { exportTransactionsToCSV } from './utils/export';

const STORAGE_KEY = 'expenses_v4';

export default function App() {
  const [entries, setEntries] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load transactions from localStorage', e);
    }
    return [];
  });

  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Capture PWA install prompt for Android
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallPwa = async () => {
    if (!deferredPrompt) {
      setIsApkModalOpen(true);
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (e) {
      console.error('Failed to save transactions to localStorage', e);
    }
  }, [entries]);

  // Compute live multi-currency totals
  const totals = useMemo(() => {
    const map: CurrencyTotals = {};

    entries.forEach((e) => {
      const curr = e.currency || 'INR';
      if (!map[curr]) {
        map[curr] = { in: 0, out: 0, balance: 0 };
      }

      if (e.type === 'Credit') {
        map[curr].in += e.amount;
        map[curr].balance += e.amount;
      } else {
        map[curr].out += e.amount;
        map[curr].balance -= e.amount;
      }
    });

    return map;
  }, [entries]);

  const handleAddTransaction = (newEntry: Omit<Transaction, 'id'>) => {
    const entryWithId: Transaction = {
      ...newEntry,
      id: Date.now()
    };
    setEntries((prev) => [entryWithId, ...prev]);
  };

  const handleDeleteEntry = (id: number) => {
    if (window.confirm('Delete this transaction?')) {
      setEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all stored transactions?')) {
      setEntries([]);
    }
  };

  const handleExportCSV = () => {
    exportTransactionsToCSV(entries);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 relative selection:bg-indigo-500 selection:text-white pb-20">
      {/* Background ambient lighting effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content Container */}
      <main className="relative z-10 max-w-lg mx-auto px-4 pt-4 sm:pt-6">
        <Header
          onOpenApkModal={() => setIsApkModalOpen(true)}
          deferredPrompt={deferredPrompt}
          onInstallPwa={handleInstallPwa}
        />

        <DashboardSummary totals={totals} transactionCount={entries.length} />

        <TransactionForm
          onAddTransaction={handleAddTransaction}
          defaultCurrency="INR"
        />

        <TransactionList
          entries={entries}
          onDeleteEntry={handleDeleteEntry}
          onClearAll={handleClearAll}
          onExportCSV={handleExportCSV}
        />
      </main>

      {/* Persistent Developer attribution & APK quick launcher */}
      <DeveloperFooter onOpenApkModal={() => setIsApkModalOpen(true)} />

      {/* Android APK & Install Modal */}
      <ApkExportModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
        deferredPrompt={deferredPrompt}
        onInstallPwa={handleInstallPwa}
      />
    </div>
  );
}
