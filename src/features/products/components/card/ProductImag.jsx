import React from "react";
import { Zap } from "lucide-react";

const ProductImage = ({ image, title }) => {
  return (
    <div className="relative aspect-[4/3] bg-slate-50 dark:bg-slate-950/30 p-6 overflow-hidden flex items-center justify-center">
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      ) : (
        <div className="flex flex-col items-center gap-2 text-slate-400">
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
            <Zap size={20} className="opacity-50" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImage;     