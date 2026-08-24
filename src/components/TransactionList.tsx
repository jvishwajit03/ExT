import React, { useState, useMemo } from 'react';
import { Transaction } from '../types';
import { formatCurrency } from '../utils/currency';
import { Search, Download, Trash2, Tag, Calendar, Layers, X, Filter } from 'lucide-react';

interface TransactionListProps {
  entries: Transaction[];
  onDeleteEntry: (id: number) => void;
  onClearAll: () => void;
  onExportCSV: () => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  entries,
  onDeleteEntry,
  onClearAll,
  onExportCSV
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'Credit' | 'Debit'>('ALL');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const categoriesInEntries = useMemo(() => {
    const set = new Set<string>();
    entries.forEach((e) => {
      if (e.category) set.add(e.category);
    });
    return Array.from(set);
  }, [entries]);

  const filteredEntries = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return entries.filter((e) => {
      // Type filter
      if (filterType !== 'ALL' && e.type !== filterType) return false;
      // Category filter
      if (filterCategory !== 'ALL' && e.category !== filterCategory) return false;

      // Search term
      if (!q) return true;
      return (
        (e.reason && e.reason.toLowerCase().includes(q)) ||
        (e.category && e.category.toLowerCase().includes(q)) ||
        (e.paymentMode && e.paymentMode.toLowerCase().includes(q)) ||
        (e.cardName && e.cardName.toLowerCase().includes(q)) ||
        (e.date && e.date.includes(q)) ||
        (e.amount && e.amount.toString().includes(q))
      );
    });
  }, [entries, searchTerm, filterType, filterCategory]);

  return (
    <div className="space-y-3">
      {/* Top Action Controls: Export CSV & Clear All */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          id="export-csv-btn"
          onClick={onExportCSV}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.98] cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>

        <button
          id="clear-all-data-btn"
          onClick={onClearAll}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-bold transition-all active:scale-[0.98] cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      {/* Search and Filters Header */}
      <div className="bg-slate-900/70 backdrop-blur-xl border border-white/10 p-3.5 rounded-2xl shadow-xl shadow-black/40">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Recent History</span>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              id="search-transactions-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="bg-slate-950/90 border border-white/10 rounded-xl pl-8 pr-7 py-1.5 text-xs text-slate-100 placeholder:text-slate-600 focus:border-cyan-400 outline-none w-32 sm:w-44 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-all ${
              filterType === 'ALL'
                ? 'bg-slate-700 text-white'
                : 'bg-slate-950/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            All Types
          </button>
          <button
            onClick={() => setFilterType('Debit')}
            className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-all ${
              filterType === 'Debit'
                ? 'bg-rose-500/25 border border-rose-500/50 text-rose-300'
                : 'bg-slate-950/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            Debits (-)
          </button>
          <button
            onClick={() => setFilterType('Credit')}
            className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-all ${
              filterType === 'Credit'
                ? 'bg-emerald-500/25 border border-emerald-500/50 text-emerald-300'
                : 'bg-slate-950/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            Credits (+)
          </button>

          {categoriesInEntries.length > 0 && (
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-950/80 border border-slate-800 text-slate-300 text-[11px] font-medium rounded-lg px-2 py-1 outline-none ml-auto"
            >
              <option value="ALL">All Categories</option>
              {categoriesInEntries.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Transaction Items */}
      {filteredEntries.length === 0 ? (
        <div className="py-8 text-center bg-slate-900/40 rounded-2xl border border-dashed border-slate-800/80 p-6">
          <p className="text-xs text-slate-400 font-medium">
            {entries.length === 0
              ? 'No transactions found. Log your first expense above!'
              : 'No matching transactions found for your search query.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredEntries.map((entry) => {
            const isCredit = entry.type === 'Credit';
            const modeDisplay =
              entry.cardName && entry.cardName !== 'N/A'
                ? `${entry.paymentMode} (${entry.cardName})`
                : entry.paymentMode;

            return (
              <div
                key={entry.id}
                className="bg-slate-900/70 backdrop-blur-xl border border-white/10 p-3.5 rounded-2xl shadow-md hover:border-slate-700/80 transition-all group"
              >
                {/* Upper Row: Reason & Formatted Amount */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-xs sm:text-sm text-slate-100 truncate">
                    {entry.reason}
                  </span>
                  <span
                    className={`font-mono text-sm sm:text-base font-extrabold tracking-tight shrink-0 ${
                      isCredit ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {isCredit ? '+' : '-'}
                    {formatCurrency(entry.amount, entry.currency as string)}
                  </span>
                </div>

                {/* Lower Row: Badges & Actions */}
                <div className="flex items-center gap-1.5 mt-2.5 flex-wrap text-[10px]">
                  {/* Type Badge */}
                  <span
                    className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      isCredit
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {entry.type}
                  </span>

                  {/* Category Badge */}
                  <span className="px-2 py-0.5 rounded-full font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5" />
                    {entry.category}
                  </span>

                  {/* Payment Mode Badge */}
                  <span className="px-2 py-0.5 rounded-full font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 truncate max-w-[150px]">
                    {modeDisplay}
                  </span>

                  {/* Date & Delete Button */}
                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-slate-400 font-medium flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" />
                      {entry.date}
                    </span>
                    <button
                      id={`delete-tx-${entry.id}`}
                      onClick={() => onDeleteEntry(entry.id)}
                      className="px-2 py-0.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/40 text-[11px] font-bold cursor-pointer transition-all active:scale-90"
                      title="Delete entry"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
