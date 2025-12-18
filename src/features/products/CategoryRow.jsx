import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

const CategoryRow = ({ title, products }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4); // Default to desktop

  // --- RESPONSIVE LOGIC ---
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsToShow(1); // Mobile: 1 item
      } else if (width < 768) {
        setItemsToShow(2); // Small Tablet: 2 items
      } else if (width < 1024) {
        setItemsToShow(3); // Tablet/Laptop: 3 items
      } else {
        setItemsToShow(4); // Desktop: 4 items
      }
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- RESET INDEX ON RESIZE ---
  // If we resize and the startIndex becomes invalid, reset it to avoid blank spaces
  useEffect(() => {
       function adjustStartIndex() {
          setStartIndex(0);
       }
       adjustStartIndex();
  }, [itemsToShow]);

  const visibleProducts = products.slice(startIndex, startIndex + itemsToShow);

  const handleNext = () => {
    if (startIndex + itemsToShow < products.length) {
      setStartIndex(prev => prev + itemsToShow);
    }
  };

  const handlePrev = () => {
    if (startIndex - itemsToShow >= 0) {
      setStartIndex(prev => prev - itemsToShow);
    }
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
          {products.length > itemsToShow && (
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
          )}
        </div>
      </div>

      {/* Grid */}
      {/* Important: The grid-cols classes MUST match the logic in handleResize */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        
        {/* Skeleton Fillers (To keep layout stable if last page has fewer items) */}
        {visibleProducts.length < itemsToShow && (
           Array(itemsToShow - visibleProducts.length).fill(0).map((_, i) => (
             <div key={i} className="hidden sm:block bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 h-full min-h-[300px]" />
           ))
        )}
      </div>
    </section>
  );
};

export default CategoryRow;