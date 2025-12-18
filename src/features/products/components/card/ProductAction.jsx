import React from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";

const ProductActions = ({ cartItem, onAdd, onDecrease, user }) => {
  if (user && cartItem) {
    return (
      <div
        className="flex items-center bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-500/30 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onDecrease}
          className="p-2 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-blue-600 dark:text-blue-400 transition-colors"
        >
          <Minus size={14} />
        </button>
        <span className="w-6 text-center text-xs font-bold text-blue-700 dark:text-blue-300">
          {cartItem.quantity}
        </span>
        <button
          onClick={onAdd}
          className="p-2 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-blue-600 dark:text-blue-400 transition-colors"
        >
          <Plus size={14} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onAdd}
      className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-2.5 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white transition-all shadow-md shadow-slate-200 dark:shadow-none"
    >
      <ShoppingCart size={18} />
    </button>
  );
};

export default ProductActions;