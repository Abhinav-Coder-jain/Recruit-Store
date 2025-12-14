import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProductsQuery } from '../hooks/useProductsQuery'; // Custom Hook
import { Loader2 } from 'lucide-react';

// Import The Modular Components
import ProductFilters from '../features/products/ProductFilters';
import ProductHeader from '../features/products/components/listing/ProductHeader';
import ProductGrid from '../features/products/components/listing/ProductGrid';
import PaginationControl from '../features/products/components/listing/PaginationControl';
import EmptyState from '../features/products/components/listing/EmptyState';
import LoadingState from '../features/products/components/listing/LoadingState';

const ProductListingPage = () => {
  // 1. URL Params
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || "";
  const categoryParam = searchParams.get('category') || "All";
  
  // 2. Local State
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ maxPrice: 2000, minRating: 0 });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // 3. Effect: Reset page on new search/filter
  useEffect(() => {
    function resetPage(){
       setPage(1);
    }
    resetPage();
  }, [searchTerm, categoryParam, filters]);

  // 4. Data Fetching (via Custom Hook)
  const { data, isLoading, isFetching } = useProductsQuery({ 
    searchTerm, 
    category: categoryParam, 
    filters, 
    page 
  });

  if (isLoading) return <LoadingState />;

  // 5. Data Extraction
  const products = data?.data || []; 
  const totalItems = data?.total || 0;
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || 1;

  const handleClearFilters = () => setFilters({ maxPrice: 2000, minRating: 0 });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* --- HEADER --- */}
        <ProductHeader 
          searchTerm={searchTerm} 
          category={categoryParam} 
          count={products.length} 
          total={totalItems} 
          showMobileFilters={showMobileFilters}
          setShowMobileFilters={setShowMobileFilters}
        />

        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* --- SIDEBAR FILTERS (DESKTOP) --- */}
          <aside className="hidden md:block w-72 flex-shrink-0 sticky top-24">
            <ProductFilters 
              filters={filters} 
              setFilters={setFilters} 
              clearFilters={handleClearFilters} 
            />
          </aside>

          {/* --- MAIN CONTENT AREA --- */}
          <main className="flex-grow w-full">
            
            {/* Mobile Filters Drawer */}
            {showMobileFilters && (
              <div className="md:hidden mb-8 animate-slide-down">
                 <ProductFilters 
                  filters={filters} 
                  setFilters={setFilters} 
                  clearFilters={handleClearFilters} 
                />
              </div>
            )}

            {/* Background Fetch Indicator */}
            {isFetching && products.length > 0 && (
               <div className="mb-4 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 animate-pulse">
                 <Loader2 size={16} className="animate-spin" /> Updating results...
               </div>
            )}

            {products.length > 0 ? (
              <>
                {/* Product Grid */}
                <ProductGrid products={products} />

                {/* Pagination */}
                <PaginationControl 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  setPage={setPage} 
                />
              </>
            ) : (
              // No Results Found
              <EmptyState onClearFilters={handleClearFilters} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;