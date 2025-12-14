import React from 'react';

const InvoiceTotals = ({ amount, discount }) => {
  const subtotal = amount + (discount || 0) - (amount * 0.08);
  const tax = amount * 0.08;

  return (
    <div className="flex justify-end">
      <div className="w-64 space-y-3 text-sm bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800 print:bg-transparent print:border-none print:p-0">
        
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-xl font-extrabold text-slate-900 dark:text-white pt-4 border-t border-slate-200 dark:border-slate-700">
          <span>Total</span>
          <span>${amount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTotals;