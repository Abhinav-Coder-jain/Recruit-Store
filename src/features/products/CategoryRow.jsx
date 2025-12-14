import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

const CategoryRow = ({ title, products }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 4;
  const visibleProducts = products.slice(startIndex, startIndex + itemsToShow);

  const handleNext = () => {
    if (startIndex + itemsToShow < products.length) setStartIndex(startIndex + itemsToShow);
  };

  const handlePrev = () => {
    if (startIndex - itemsToShow >= 0) setStartIndex(startIndex - itemsToShow);
  };

  const isPrevDisabled = startIndex === 0;
  const isNextDisabled = startIndex + itemsToShow >= products.length;

  return (
    <section className="py-10 border-b border-slate-300 dark:border-slate-800 last:border-0">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 px-2">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">{title}</h2>
        
        <div className="flex items-center gap-4">
          <Link 
            to={`/products?category=${title}`}
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors group"
          >
            Browse All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          {/* Navigation Controls */}
          <div className="flex gap-2">
            <button 
              onClick={handlePrev}
              disabled={isPrevDisabled}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              disabled={isNextDisabled}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        
        {/* Skeleton Fillers */}
        {visibleProducts.length < 4 && (
           Array(4 - visibleProducts.length).fill(0).map((_, i) => (
             <div key={i} className="hidden lg:block bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800" />
           ))
        )}
      </div>
    </section>
  );
};

export default CategoryRow;