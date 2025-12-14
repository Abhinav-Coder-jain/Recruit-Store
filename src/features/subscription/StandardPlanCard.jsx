import React from 'react';
import { Check, X } from 'lucide-react';

const StandardPlanCard = () => {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden transition-colors duration-300">
      <h3 className="text-lg font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
        Standard
      </h3>
      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-5xl font-extrabold text-slate-900 dark:text-white">$0</span>
        <span className="text-lg text-slate-400 dark:text-slate-500 font-medium">/mo</span>
      </div>

      <ul className="space-y-5 mb-8">
        <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
          <div className="p-1 rounded-full bg-slate-100 dark:bg-slate-800">
             <Check className="text-slate-600 dark:text-slate-400" size={16} />
          </div>
          Access to all products
        </li>
        <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
          <div className="p-1 rounded-full bg-slate-100 dark:bg-slate-800">
             <Check className="text-slate-600 dark:text-slate-400" size={16} />
          </div>
          Standard Shipping
        </li>
        <li className="flex items-center gap-3 text-slate-400 dark:text-slate-600">
          <div className="p-1 rounded-full bg-slate-50 dark:bg-slate-900">
             <X className="text-slate-300 dark:text-slate-700" size={16} />
          </div>
          Exclusive VIP Pricing
        </li>
        <li className="flex items-center gap-3 text-slate-400 dark:text-slate-600">
          <div className="p-1 rounded-full bg-slate-50 dark:bg-slate-900">
             <X className="text-slate-300 dark:text-slate-700" size={16} />
          </div>
          Priority Delivery
        </li>
      </ul>

      <button
        disabled
        className="w-full py-4 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-200 dark:border-slate-700"
      >
        Current Plan
      </button>
    </div>
  );
};

export default StandardPlanCard;