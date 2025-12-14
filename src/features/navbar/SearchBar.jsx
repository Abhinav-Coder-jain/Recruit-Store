import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react'; // Using 'SlidersHorizontal' for filter icon

const SearchBar = ({ 
  searchTerm, setSearchTerm, 
  category, setCategory, 
  categories, handleSearch,
  handleFilterClick // New Prop
}) => {
  return (
    <form onSubmit={handleSearch} className="hidden md:flex flex-grow max-w-2xl items-center mx-8">
      {/* Container: Changed bg-white to bg-white/50 for better blend with new navbar bg */}
      <div className="flex w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/50 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 overflow-hidden transition-all shadow-sm">
        
        {/* LEFT SECTION: Split into Dropdown + Filter Button */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 border-r border-slate-300 dark:border-slate-700">
          
          {/* 1. Category Select (Constrained Width) */}
          <div className="relative group hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-full bg-transparent text-slate-700 dark:text-slate-500 text-sm pl-4 pr-7 py-3 outline-none cursor-pointer appearance-none font-medium w-28 truncate"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {/* Tiny Arrow */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
               <svg width="8" height="5" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1L5 5L9 1"/></svg>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-slate-300 dark:bg-slate-600"></div>

          {/* 2. Filter Button (The new button you requested) */}
          <button 
            type="button" // Important: Prevent form submit
            onClick={handleFilterClick}
            className="px-3 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors tooltip"
            title="Browse All Products"
          >
            <SlidersHorizontal size={16} />
          </button>
        </div>

        {/* INPUT: Middle */}
        <input 
          type="text"
          placeholder="Search products..."
          className="flex-grow px-4 py-2.5 bg-transparent text-slate-700 dark:text-white placeholder-slate-400 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {/* SEARCH BUTTON: Right */}
        <button type="submit" className="px-5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
          <Search size={20} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;