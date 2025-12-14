import React from "react";
import { Lock } from "lucide-react";

const ProductBadge = ({ discount, isSubscribed }) => {
  if (discount <= 0) return null;

  if (isSubscribed) {
    return (
      <span className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full z-10 shadow-lg shadow-rose-500/30">
        VIP: -{Math.round(discount)}%
      </span>
    );
  }

  return (
    <span className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md text-amber-400 border border-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full z-10 flex items-center gap-1 shadow-lg">
      <Lock size={10} /> Save {Math.round(discount)}%
    </span>
  );
};

export default ProductBadge;