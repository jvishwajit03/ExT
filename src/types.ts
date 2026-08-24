export type TransactionType = 'Debit' | 'Credit';

export type CurrencyType = 'INR' | 'USD' | 'EUR' | 'GBP';

export type PaymentModeType = 
  | 'UPI' 
  | 'Cash' 
  | 'Credit Card' 
  | 'Debit Card' 
  | 'Net Banking';

export interface Transaction {
  id: number;
  date: string;
  reason: string;
  type: TransactionType;
  category: string;
  currency: CurrencyType | string;
  paymentMode: PaymentModeType | string;
  cardName: string;
  amount: number;
}

export interface CurrencyTotals {
  [currency: string]: {
    in: number;
    out: number;
    balance: number;
  };
}

export const CATEGORIES = [
  'Food & Dining',
  'Groceries',
  'Shopping',
  'Bills & Utilities',
  'Transport & Fuel',
  'Entertainment',
  'Salary / Income',
  'Health & Medical',
  'Investment & Savings',
  'General / Other'
] as const;

export const CURRENCIES: { code: CurrencyType; symbol: string; name: string }[] = [
  { code: 'INR', symbol: '₹', name: 'INR (₹)' },
  { code: 'USD', symbol: '$', name: 'USD ($)' },
  { code: 'EUR', symbol: '€', name: 'EUR (€)' },
  { code: 'GBP', symbol: '£', name: 'GBP (£)' }
];

export const PAYMENT_MODES: PaymentModeType[] = [
  'UPI',
  'Cash',
  'Credit Card',
  'Debit Card',
  'Net Banking'
];
