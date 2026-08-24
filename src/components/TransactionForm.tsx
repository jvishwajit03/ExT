import React, { useState } from 'react';
import { Transaction, TransactionType, CATEGORIES, CURRENCIES, PAYMENT_MODES } from '../types';
import { PlusCircle, CreditCard, Calendar, Tag, DollarSign, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TransactionFormProps {
  onAddTransaction: (entry: Omit<Transaction, 'id'>) => void;
  defaultCurrency: string;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  onAddTransaction,
  defaultCurrency
}) => {
  const [date, setDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<TransactionType>('Debit');
  const [category, setCategory] = useState<string>('Food & Dining');
  const [currency, setCurrency] = useState<string>(defaultCurrency || 'INR');
  const [reason, setReason] = useState<string>('');
  const [paymentMode, setPaymentMode] = useState<string>('UPI');
  const [cardName, setCardName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isCardOrNetBanking = paymentMode.includes('Card') || paymentMode === 'Net Banking';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const parsedAmount = parseFloat(amount);
    const trimmedReason = reason.trim();
    const trimmedCardName = cardName.trim();

    if (!trimmedReason) {
      setErrorMsg('Please enter a valid description / reason.');
      return;
    }

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMsg('Please enter a positive transaction amount.');
      return;
    }

    if (isCardOrNetBanking && !trimmedCardName) {
      setErrorMsg('Please specify the Card / Bank Name (e.g., HDFC Regalia, SBI).');
      return;
    }

    onAddTransaction({
      date,
      reason: trimmedReason,
      type,
      category,
      currency,
      paymentMode,
      cardName: isCardOrNetBanking ? trimmedCardName : 'N/A',
      amount: parsedAmount
    });

    // Fire subtle celebratory burst for positive transactions or general delight
    if (type === 'Credit') {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (err) {}
    }

    // Reset inputs
    setReason('');
    setAmount('');
    setCardName('');
  };

  const handleQuickAmount = (val: number) => {
    const current = parseFloat(amount) || 0;
    setAmount((current + val).toString());
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900/70 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl shadow-black/40 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
          Add New Transaction
        </h3>
        <span className="text-[11px] text-slate-400">Offline & local storage auto-save</span>
      </div>

      {errorMsg && (
        <div className="mb-3 p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2 animate-fadeIn">
          <span>⚠️</span> {errorMsg}
        </div>
      )}

      {/* Row 1: Date & Type */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" /> Date
          </label>
          <input
            id="tx-date-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-100 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Type
          </label>
          <select
            id="tx-type-select"
            value={type}
            onChange={(e) => setType(e.target.value as TransactionType)}
            className={`w-full bg-slate-950/80 border rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold outline-none transition-all ${
              type === 'Debit'
                ? 'border-rose-500/40 text-rose-300 focus:border-rose-400'
                : 'border-emerald-500/40 text-emerald-300 focus:border-emerald-400'
            }`}
          >
            <option value="Debit">Debit (- Expense)</option>
            <option value="Credit">Credit (+ Income)</option>
          </select>
        </div>
      </div>

      {/* Row 2: Category & Currency */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Tag className="w-3 h-3 text-slate-400" /> Category
          </label>
          <select
            id="tx-category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-100 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-slate-400" /> Currency
          </label>
          <select
            id="tx-currency-select"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-100 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3: Description */}
      <div className="mb-3">
        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
          <FileText className="w-3 h-3 text-slate-400" /> Reason / Description
        </label>
        <input
          id="tx-reason-input"
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="e.g., Grocery shopping, Taxi to office, Monthly Salary"
          className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-100 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all placeholder:text-slate-600"
          required
        />
      </div>

      {/* Row 4: Payment Mode & Amount */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Payment Mode
          </label>
          <select
            id="tx-payment-mode-select"
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-100 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all"
          >
            {PAYMENT_MODES.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Amount
          </label>
          <input
            id="tx-amount-input"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
            className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-100 font-mono focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all placeholder:text-slate-600"
            required
          />
        </div>
      </div>

      {/* Quick Amount Suggestion Chips */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        <span className="text-[10px] font-bold uppercase text-slate-500 mr-1">Quick:</span>
        {[100, 500, 1000, 2000, 5000].map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => handleQuickAmount(val)}
            className="px-2 py-0.5 rounded-lg bg-slate-800/70 hover:bg-slate-700/80 text-[11px] font-medium text-slate-300 border border-slate-700/60 transition-all cursor-pointer active:scale-95"
          >
            +{val}
          </button>
        ))}
      </div>

      {/* Dynamic Card / Bank Name */}
      {isCardOrNetBanking && (
        <div className="bg-indigo-950/30 border border-dashed border-indigo-500/50 p-3 rounded-xl mb-3 animate-fadeIn">
          <label className="block text-[11px] font-bold text-cyan-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
            Card / Bank Name
          </label>
          <input
            id="tx-card-name-input"
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="e.g., HDFC Regalia, Axis Debit, SBI Online"
            className="w-full bg-slate-950/90 border border-indigo-500/30 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-100 focus:border-cyan-400 outline-none"
            required={isCardOrNetBanking}
          />
        </div>
      )}

      {/* Submit Button */}
      <button
        id="add-transaction-submit-btn"
        type="submit"
        className="w-full py-3 px-4 rounded-xl font-bold text-white text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/25 transition-all transform active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
      >
        <PlusCircle className="w-4 h-4" />
        <span>+ Add Transaction</span>
      </button>
    </form>
  );
};
