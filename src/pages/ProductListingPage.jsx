import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getFilteredProducts } from '../utils/productData';
import ProductCard from '../features/products/ProductCard'; 
import ProductFilters from '../features/products/ProductFilters'; 
import { Loader2, SlidersHorizontal, ChevronLeft, ChevronRight, SearchX } from 'lucide-react';

const ProductListingPage = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || "";
  const categoryParam = searchParams.get('category') || "All";
  
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ maxPrice: 2000, minRating: 0 });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Reset page when queries change
  useEffect(() => {
     function resetPage() {
       setPage(1);
     }
     resetPage();
  }, [searchTerm, categoryParam, filters]);

  // Fetch Data
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['products', searchTerm, categoryParam, filters.maxPrice, filters.minRating, page],
    queryFn: () => getFilteredProducts({
      search: searchTerm,
      category: categoryParam,
      maxPrice: filters.maxPrice,
      minRating: filters.minRating,
      page: page 
    }),
    keepPreviousData: true 
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white dark:bg-slate-950 transition-colors duration-300">
        <Loader2 className="animate-spin text-blue-600" size={48} />
        <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Loading products...</p>
      </div>
    );
  }

  const products = data?.data || []; 
  const totalItems = data?.total || 0;
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || 1;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {searchTerm ? `Results for "${searchTerm}"` : `${categoryParam} Products`}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Showing {products.length} of {totalItems} results
            </p>
          </div>
          
          <button 
            className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-700 dark:text-slate-200 font-bold transition-colors"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <SlidersHorizontal size={18} /> {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Sidebar (Desktop) */}
          <aside className="hidden md:block w-72 flex-shrink-0 sticky top-24">
            <ProductFilters 
              filters={filters} 
              setFilters={setFilters} 
              clearFilters={() => setFilters({ maxPrice: 2000, minRating: 0 })} 
            />
          </aside>

          {/* Main Grid */}
          <main className="flex-grow w-full">
            
            {/* Mobile Filters Drawer */}
            {showMobileFilters && (
              <div className="md:hidden mb-8 animate-slide-down">
                 <ProductFilters 
                  filters={filters} 
                  setFilters={setFilters} 
                  clearFilters={() => setFilters({ maxPrice: 2000, minRating: 0 })} 
                />
              </div>
            )}

            {isFetching && products.length > 0 && (
               <div className="mb-4 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 animate-pulse">
                 <Loader2 size={16} className="animate-spin" /> Updating results...
               </div>
            )}

            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
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
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300 font-bold transition-all disabled:hover:bg-transparent"
                    >
                      Next <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center py-20 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-center px-4">
                <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <SearchX size={40} className="text-slate-400 dark:text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No products found</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto mb-6">
                  We couldn't find any items matching your filters. Try adjusting your price range or rating.
                </p>
                <button 
                  onClick={() => setFilters({ maxPrice: 2000, minRating: 0 })}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-500/30"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;