import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts, getAllCategories } from '../utils/productData';
import CategoryRow from '../features/products/CategoryRow';
import HeroCarousel from '../features/home/HeroCarousel';
import { Loader2 } from 'lucide-react';

const HomePage = () => {
  // Fetch Data
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  // Filter Logic
  const displayedCategories = categories
    .filter(c => c !== "All")
    .slice(0, 10);

  return (
    <div className="min-h-screen transition-colors duration-300">
      
      {/* SECTION 1: HERO BANNER AREA 
         
      */}
      <div className="bg-slate-50 dark:bg-slate-950 pt-6 pb-2 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <HeroCarousel />
        </div>
      </div>

      {/* SECTION 2: PRODUCT ROWS AREA
          
      */}
      <div className="bg-gray-200 dark:bg-slate-950 py-12 border-t border-slate-100 dark:border-slate-800/50 transition-colors duration-300">
        <div className="container mx-auto px-4 space-y-4">
          {displayedCategories.map((category) => {
            const categoryProducts = products.filter(p => p.category === category);
            if (categoryProducts.length === 0) return null;

            return (
              <CategoryRow 
                key={category} 
                title={category} 
                products={categoryProducts} 
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;