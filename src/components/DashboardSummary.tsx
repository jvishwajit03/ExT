import React from 'react';
import { CurrencyTotals } from '../types';
import { formatCurrency } from '../utils/currency';
import { TrendingUp, TrendingDown, Wallet, Activity } from 'lucide-react';

interface DashboardSummaryProps {
  totals: CurrencyTotals;
  transactionCount: number;
}

export const DashboardSummary: React.FC<DashboardSummaryProps> = ({ totals, transactionCount }) => {
  const currencyKeys = Object.keys(totals);

  return (
    <div className="bg-slate-900/70 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl shadow-black/40 mb-4 transition-all">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-purple-400" />
          <h2 className="text-sm font-bold text-slate-100 tracking-tight">Dashboard Summary</h2>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-purple-300 bg-purple-500/15 border border-purple-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
            LIVE
          </span>
          <span className="text-[11px] font-medium text-slate-400">
            {transactionCount} {transactionCount === 1 ? 'tx' : 'txs'}
          </span>
        </div>
      </div>

      {currencyKeys.length === 0 ? (
        <div className="py-4 text-center text-xs text-slate-400 bg-slate-950/40 rounded-xl border border-slate-800/80 mt-2">
          No entries recorded yet. Add your first transaction below!
        </div>
      ) : (
        <div className="space-y-3 mt-2">
          {currencyKeys.map((curr) => {
            const data = totals[curr];
            const isBalancePositive = data.balance >= 0;

            return (
              <div key={curr} className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    Currency: {curr}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-400">
                    Net: <span className={isBalancePositive ? 'text-emerald-400' : 'text-rose-400'}>
                      {formatCurrency(data.balance, curr)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  {/* Income */}
                  <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 flex flex-col justify-center">
                    <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                      <span>Income</span>
                    </div>
                    <strong className="text-xs sm:text-sm font-extrabold text-emerald-400 mt-1 truncate">
                      +{formatCurrency(data.in, curr)}
                    </strong>
                  </div>

                  {/* Expense */}
                  <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 flex flex-col justify-center">
                    <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <TrendingDown className="w-3 h-3 text-rose-400" />
                      <span>Expense</span>
                    </div>
                    <strong className="text-xs sm:text-sm font-extrabold text-rose-400 mt-1 truncate">
                      {formatCurrency(data.out, curr)}
                    </strong>
                  </div>

                  {/* Balance */}
                  <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 flex flex-col justify-center">
                    <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <Wallet className="w-3 h-3 text-indigo-400" />
                      <span>Balance</span>
                    </div>
                    <strong className={`text-xs sm:text-sm font-extrabold mt-1 truncate ${
                      isBalancePositive ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {formatCurrency(data.balance, curr)}
                    </strong>
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
