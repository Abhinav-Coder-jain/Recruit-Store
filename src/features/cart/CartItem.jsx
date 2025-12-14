import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart, decreaseQuantity } from './cartSlice';
import { Trash2, Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item.id));
    } else {
      handleRemove();
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
    toast.success(`${item.title} removed`);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-6 border-b border-slate-100 dark:border-slate-800 last:border-0 group transition-colors duration-300">
      {/* Image */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-slate-50 dark:bg-slate-950 rounded-xl p-2 border border-slate-200 dark:border-slate-800">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
        />
      </div>

      {/* Details */}
      <div className="flex-grow min-w-0">
        <h3 className="text-base font-bold text-slate-800 dark:text-white truncate pr-4">
          {item.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Unit Price: <span className="font-semibold text-slate-900 dark:text-slate-200">${item.price}</span>
        </p>
      </div>

      {/* Controls Container (Mobile: Row, Desktop: Separate) */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0">
        
        {/* Quantity Controls */}
        <div className="flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
          <button 
            onClick={handleDecrease}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors w-9 h-9 flex items-center justify-center"
          >
            <Minus size={14} />
          </button>
          <span className="w-10 text-center text-sm font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 h-9 flex items-center justify-center border-x border-slate-200 dark:border-slate-800">
            {item.quantity}
          </span>
          <button 
            onClick={handleIncrease}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors w-9 h-9 flex items-center justify-center"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Total & Remove */}
        <div className="text-right min-w-[100px]">
          <p className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
          <button 
            onClick={handleRemove}
            className="text-xs font-medium text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 flex items-center justify-end gap-1.5 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <Trash2 size={14} /> Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;