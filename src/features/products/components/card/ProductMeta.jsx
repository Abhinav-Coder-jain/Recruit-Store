import React from "react";
import { Star } from "lucide-react";

const ProductMeta = ({ category, rating, sku, title }) => {
  return (
    <>
      <div className="flex justify-between items-start mb-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          {category}
        </p>
        <div className="flex items-center gap-1">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {rating}
          </span>
        </div>
      </div>

      {sku && (
        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mb-1">
          SKU: {sku}
        </p>
      )}

      <h3 className="font-bold text-slate-800 dark:text-white text-sm mb-2 line-clamp-2 leading-relaxed min-h-[40px]">
        {title}
      </h3>
    </>
  );
};

export default ProductMeta;