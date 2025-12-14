import React from 'react';
import { User } from 'lucide-react';

const ReviewLoginPrompt = ({ onLogin }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 text-center py-8">
      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
        <User size={24} className="text-slate-400" />
      </div>
      <h3 className="font-bold text-slate-900 dark:text-white mb-2">
        Log in to Review
      </h3>
      <button
        onClick={onLogin}
        className="w-full py-3 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        Log In Now
      </button>
    </div>
  );
};

export default ReviewLoginPrompt;