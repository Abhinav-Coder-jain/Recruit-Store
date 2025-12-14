import React from 'react';
import { Filter } from 'lucide-react';

// Import Sub-Components
import PriceSlider from './components/filters/PriceSlider';
import RatingFilter from './components/filters/RatingFilter';
import FilterReset from './components/filters/FilterReset';

const ProductFilters = ({ filters, setFilters, clearFilters }) => {
  
  // Handlers to update specific filter keys
  const handlePriceChange = (val) => setFilters({ ...filters, maxPrice: val });
  const handleRatingChange = (val) => setFilters({ ...filters, minRating: val });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors duration-300">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <Filter size={20} className="text-blue-600 dark:text-blue-400" />
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">Filters</h2>
      </div>

      <div className="space-y-8">
        
        {/* 1. Price Component */}
        <PriceSlider 
          maxPrice={filters.maxPrice} 
          onChange={handlePriceChange} 
        />
        
        {/* 2. Rating Component */}
        <RatingFilter 
          minRating={filters.minRating} 
          onChange={handleRatingChange} 
        />

        {/* 3. Reset Button */}
        <FilterReset onReset={clearFilters} />
        
      </div>
    </div>
  );
};

export default ProductFilters;