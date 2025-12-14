import React, { useState, useEffect } from 'react';
import { Filter, Star, RotateCcw } from 'lucide-react';

const ProductFilters = ({ filters, setFilters, clearFilters }) => {
  // FIX 2: Local state for smooth sliding
  const [localPrice, setLocalPrice] = useState(filters.maxPrice);

  // Sync local state if parent resets filters (e.g. Clear All)
  useEffect(() => {
     function syncLocalPrice() {
       setLocalPrice(filters.maxPrice);
     }
     syncLocalPrice();
  }, [filters.maxPrice]);

  // 1. Updates ONLY local visual state (Instant, no lag)
  const handleSliderMove = (e) => {
    setLocalPrice(Number(e.target.value));
  };

  // 2. Updates GLOBAL state only when user lets go (Triggers fetch)
  const handleSliderRelease = () => {
    setFilters({ ...filters, maxPrice: localPrice });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors duration-300">
      
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <Filter size={20} className="text-blue-600 dark:text-blue-400" />
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">Filters</h2>
      </div>

      <div className="space-y-8">
        
        {/* Price Filter */}
        <div>
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Max Price</h3>
             <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md">
               ${localPrice}
             </span>
          </div>
          
          <div className="relative h-6 flex items-center">
            <input 
              type="range" 
              min="0" 
              max="2000" 
              step="10"
              value={localPrice}           // Bind to LOCAL
              onChange={handleSliderMove}    // Update LOCAL
              onMouseUp={handleSliderRelease} // Commit to GLOBAL (Desktop)
              onTouchEnd={handleSliderRelease}// Commit to GLOBAL (Mobile)
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div className="flex justify-between text-xs text-slate-400 font-medium mt-1">
            <span>$0</span>
            <span>$2000+</span>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Minimum Rating</h3>
          <div className="space-y-3">
            {[4, 3, 2, 1].map((star) => (
              <label key={star} className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.minRating === star}
                    onChange={() => setFilters({ ...filters, minRating: star })}
                    className="peer appearance-none w-5 h-5 border-2 border-slate-300 dark:border-slate-600 rounded-full checked:border-blue-600 checked:bg-blue-600 transition-all"
                  />
                  <div className="absolute w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <span className="text-slate-700 dark:text-slate-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  {star} <Star size={14} className="fill-amber-400 text-amber-400" /> & Up
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear Button */}
        <button
          onClick={clearFilters}
          className="w-full py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 group"
        >
          <RotateCcw size={16} className="group-hover:-rotate-180 transition-transform duration-500" /> Reset Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;