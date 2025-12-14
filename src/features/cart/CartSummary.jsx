import React from 'react';
import { ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartSummary = ({ subtotal }) => {
  const navigate = useNavigate();

  const TAX_RATE = 0.08;
  const taxAmount = subtotal * TAX_RATE;
  const shipping = 0;
  const finalTotal = subtotal + taxAmount + shipping;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sticky top-28 transition-colors duration-300">
      <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
        Order Summary
      </h2>

      <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Tax (8%)</span>
          <span className="font-semibold text-slate-900 dark:text-white">${taxAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
          <span>Shipping</span>
          <span className="font-bold">{shipping === 0 ? "Free" : `$${shipping}`}</span>
        </div>
      </div>

      <div className="flex justify-between items-end py-6">
        <div>
           <span className="text-sm text-slate-500 dark:text-slate-400">Total Amount</span>
           <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">${finalTotal.toFixed(2)}</p>
        </div>
      </div>

      <button 
        onClick={() => navigate('/checkout')}
        className="group w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 dark:shadow-none transition-all flex items-center justify-center gap-2 active:scale-95 mb-4"
      >
        Proceed to Checkout <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-950/50 py-2 rounded-lg border border-slate-100 dark:border-slate-800">
        <ShieldCheck size={14} className="text-emerald-500" />
        <span>Secure SSL Encrypted Checkout</span>
      </div>
    </div>
  );
};

export default CartSummary;