import { Transaction } from '../types';

export function exportTransactionsToCSV(entries: Transaction[]) {
  if (entries.length === 0) {
    alert('No data available to export.');
    return;
  }

  let csvContent = "\uFEFFDate,Reason,Category,Type,Currency,Payment Mode,Card/Bank Name,Amount\n";

  entries.forEach(e => {
    const signedAmount = e.type === 'Debit' ? -e.amount : e.amount;
    const cleanReason = `"${(e.reason || '').replace(/"/g, '""')}"`;
    const cleanCategory = `"${(e.category || '').replace(/"/g, '""')}"`;
    const cleanPaymentMode = `"${(e.paymentMode || '').replace(/"/g, '""')}"`;
    const cleanCard = `"${(e.cardName || 'N/A').replace(/"/g, '""')}"`;
    csvContent += `${e.date},${cleanReason},${cleanCategory},${e.type},${e.currency},${cleanPaymentMode},${cleanCard},${signedAmount}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const downloadUrl = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = `Expense_Report_${new Date().toISOString().split('T')[0]}.csv`;
  
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  setTimeout(() => window.URL.revokeObjectURL(downloadUrl), 500);
}

export function exportTransactionsJSON(entries: Transaction[]) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entries, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `Expense_Backup_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
