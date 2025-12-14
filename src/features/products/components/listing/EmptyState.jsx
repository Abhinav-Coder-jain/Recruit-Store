import React from 'react';
import { SearchX } from 'lucide-react';

const EmptyState = ({ onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-center px-4">
      <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
        <SearchX size={40} className="text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No products found</h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto mb-6">
        We couldn't find any items matching your filters. Try adjusting your price range or rating.
      </p>
      <button 
        onClick={onClearFilters}
        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-500/30"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default EmptyState;