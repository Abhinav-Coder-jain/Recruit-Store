import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const CartButton = ({ totalQuantity , user  }) => {
  return (
    <Link 
      to="/cart" 
      className="relative p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100
       dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
    >
      <ShoppingCart size={22} />
      {user && totalQuantity > 0 && (
        <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold
         w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white dark:ring-slate-950
          animate-bounce-short shadow-sm">
          {totalQuantity}
        </span>
      )}
    </Link>
  );
};

export default CartButton;