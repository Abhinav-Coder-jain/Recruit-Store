import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

const ProductHeader = ({ 
  searchTerm, 
  category, 
  count, 
  total, 
  showMobileFilters, 
  setShowMobileFilters 
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {searchTerm ? `Results for "${searchTerm}"` : `${category} Products`}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Showing {count} of {total} results
        </p>
      </div>
      
      <button 
        className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-700 dark:text-slate-200 font-bold transition-colors"
        onClick={() => setShowMobileFilters(!showMobileFilters)}
      >
        <SlidersHorizontal size={18} /> {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
      </button>
    </div>
  );
};

export default ProductHeader;