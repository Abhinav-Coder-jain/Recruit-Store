import React from 'react';
import { CheckCircle } from 'lucide-react';

const ReviewSuccess = () => {
  return (
    <div className="bg-emerald-50 dark:bg-emerald-900/10 p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 text-center animate-fade-in">
      <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle size={32} className="text-emerald-600 dark:text-emerald-400" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
        Thanks for your feedback!
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm">
        You have already reviewed this product.
      </p>
    </div>
  );
};

export default ReviewSuccess;