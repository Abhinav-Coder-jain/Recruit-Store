import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../utils/productData'; 
import { Loader2, ArrowLeft } from 'lucide-react';

// Import our 3  modular components
import ProductImageSection from '../features/products/components/details/ProductImageSection';
import ProductInfoSection from '../features/products/components/details/ProductInfoSection';
import ProductReviewSection from '../features/products/components/details/ProductReviewSection';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch Product Data (Already using React Query)
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id)
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Product not found</h2>
        <button onClick={() => navigate('/products')} className="mt-4 text-blue-600 hover:underline">
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 mb-6 transition-colors"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Top Section: Grid for Image & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* 1. Image Component */}
          <ProductImageSection 
            image={product.main_image_url || product.image} 
            title={product.title} 
          />

          {/* 2. Info Component */}
          <ProductInfoSection product={product} />

        </div>

        {/* 3. Reviews Component (Bottom) */}
        <ProductReviewSection productId={id} />

      </div>
    </div>
  );
};

export default ProductDetailsPage;