import React from 'react';
import { Star } from 'lucide-react';

const ProductInfo = ({ product }) => {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4">
           <p className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest">
             {product.category}
           </p>
           {/* Rating Pill */}
           <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 px-3 py-1 rounded-full">
             <Star size={14} className="fill-amber-400 text-amber-400" />
             <span className="font-bold text-slate-800 dark:text-amber-400 text-sm">{product.rating}</span>
           </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
          {product.title}
        </h1>
        
        {/* Specs Tags */}
        <div className="flex flex-wrap gap-3 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
          <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700">
            Brand: <span className="text-slate-700 dark:text-slate-200">{product.brand || "Generic"}</span>
          </span>
          <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700">
            SKU: <span className="text-slate-700 dark:text-slate-200">{product.sku || "N/A"}</span>
          </span>
          <span className={`${product.stock > 0 ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20" : "bg-rose-50 text-rose-700 border-rose-200"} px-3 py-1.5 rounded-md border`}>
             {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
          </span>
        </div>
      </div>

      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg border-t border-slate-100 dark:border-slate-800 pt-6">
        {product.description || "No description available for this product."}
      </p>
    </div>
  );
};

export default ProductInfo;