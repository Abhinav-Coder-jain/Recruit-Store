import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PaginationControl = ({ currentPage, totalPages, setPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 py-8 border-t border-slate-100 dark:border-slate-800">
      <button
        onClick={() => setPage(p => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300 font-bold transition-all disabled:hover:bg-transparent"
      >
        <ChevronLeft size={18} /> Previous
      </button>
      
      <div className="hidden sm:flex items-center gap-1 px-4">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Page</span>
        <span className="text-base font-bold text-slate-900 dark:text-white">{currentPage}</span>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">of {totalPages}</span>
      </div>

      <button
        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700
         hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300 font-bold transition-all disabled:hover:bg-transparent"
      >
        Next <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default PaginationControl;