import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Truck, ShieldCheck, Zap } from 'lucide-react';

const ProductActions = ({ 
  product, finalPrice, originalPrice, discount, 
  isSubscribed, potentialSavings, cartItem, 
  handleAddToCart, handleDecrease 
}) => {
  return (
    <div className="mt-8">
      <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
        
        {/* Price Section */}
        <div className="flex items-end gap-3 mb-6">
          <span className="text-4xl font-bold text-slate-900 dark:text-white">${finalPrice}</span>
          
          {discount > 0 && (
            isSubscribed ? (
              <div className="flex flex-col mb-1.5">
                <span className="text-slate-400 line-through text-sm font-medium">${originalPrice}</span>
                <span className="text-rose-500 dark:text-rose-400 font-bold text-xs bg-rose-50 dark:bg-rose-500/10 px-1.5 py-0.5 rounded">
                  SAVE ${potentialSavings}
                </span>
              </div>
            ) : (
              <div className="flex flex-col mb-2">
                <span className="text-slate-400 text-sm font-medium">Regular Price</span>
              </div>
            )
          )}
        </div>

        {/* Upsell Banner - Designed for dark mode readability */}
        {discount > 0 && !isSubscribed && (
          <div className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-500/20 rounded-lg text-amber-600 dark:text-amber-400">
                <Zap size={20} className="fill-current" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-amber-100">Unlock VIP Pricing</p>
                <p className="text-xs text-slate-600 dark:text-amber-200/70">Save <span className="font-bold text-slate-900 dark:text-white">${potentialSavings}</span> instantly on this item.</p>
              </div>
            </div>
            <Link to="/subscription" className="w-full sm:w-auto text-center bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-900 text-xs font-bold px-4 py-3 rounded-lg hover:opacity-90 transition-opacity">
              Go Premium
            </Link>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4">
          {cartItem ? (
            <div className="flex items-center gap-6 bg-white dark:bg-slate-950 rounded-xl px-2 py-2 border-2 border-slate-200 dark:border-slate-700 w-full justify-between sm:w-auto">
              <button onClick={handleDecrease} className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-600 dark:text-slate-200">
                <Minus size={20} />
              </button>
              <span className="text-xl font-bold text-slate-900 dark:text-white w-8 text-center">{cartItem.quantity}</span>
              <button onClick={handleAddToCart} className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-600 dark:text-slate-200">
                <Plus size={20} />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-600/20 dark:shadow-blue-900/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
            >
              <ShoppingCart size={20} /> {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Truck size={16} className="text-blue-500" /> Fast Delivery
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-500" /> 1 Year Warranty
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductActions;