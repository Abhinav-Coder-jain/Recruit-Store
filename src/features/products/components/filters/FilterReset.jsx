import React from 'react';
import { RotateCcw } from 'lucide-react';

const FilterReset = ({ onReset }) => {
  return (
    <button
      onClick={onReset}
      className="w-full py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700
       dark:text-slate-300 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 group"
    >
      <RotateCcw size={16} className="group-hover:-rotate-180 transition-transform duration-500" /> 
      Reset Filters
    </button>
  );
};

export default FilterReset;