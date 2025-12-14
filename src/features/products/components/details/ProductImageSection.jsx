import React from 'react';

const ProductImageSection = ({ image, title }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm h-fit">
      <img 
        src={image} 
        alt={title} 
        className="w-full max-w-md object-contain hover:scale-105 transition-transform duration-500"
      />
    </div>
  );
};

export default ProductImageSection;