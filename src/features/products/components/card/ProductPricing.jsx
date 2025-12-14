import React from "react";

const ProductPricing = ({ finalPrice, originalPrice, isSubscribed, discount }) => {
  return (
    <div className="flex flex-col">
      <span className="text-lg font-extrabold text-slate-900 dark:text-white">
        ${finalPrice}
      </span>
      {isSubscribed && discount > 0 && (
        <span className="text-[10px] text-slate-400 line-through">
          ${originalPrice}
        </span>
      )}
      {!isSubscribed && discount > 0 && (
        <span className="text-[10px] text-amber-500 font-medium">
          VIP Price Available
        </span>
      )}
    </div>
  );
};

export default ProductPricing;