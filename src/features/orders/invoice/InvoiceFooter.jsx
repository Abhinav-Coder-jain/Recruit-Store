import React from 'react';
import { Printer } from 'lucide-react';

const InvoiceFooter = ({ onClose, onPrint }) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950/50 p-6 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800 no-print shrink-0">
      <button 
        onClick={onClose}
        className="px-6 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
      >
        Close
      </button>
      <button 
        onClick={onPrint}
        className="px-6 py-2.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
      >
        <Printer size={18} /> Print Invoice
      </button>
    </div>
  );
};

export default InvoiceFooter;