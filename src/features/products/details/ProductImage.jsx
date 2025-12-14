import React from 'react';
import { Lock } from 'lucide-react';

const ProductImage = ({ product, discount, isSubscribed }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 flex items-center justify-center relative transition-colors duration-300 shadow-sm dark:shadow-slate-900/50">
      {/* Conditional Badge */}
      {discount > 0 && (
        isSubscribed ? (
          <span className="absolute top-6 left-6 z-20 bg-rose-500 text-white font-bold px-3 py-1 rounded-full text-xs shadow-lg shadow-rose-500/30">
            VIP: -{Math.round(discount)}% OFF
          </span>
        ) : (
          <span className="absolute top-6 left-6 bg-slate-950 text-amber-400 border border-slate-800 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-2 shadow-xl">
            <Lock size={12} /> Premium Price Available
          </span>
        )
      )}
      
      <img 
        src={product.main_image_url || product.image} 
        alt={product.title} 
        className="max-h-[400px] w-full object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
};

export default ProductImage;