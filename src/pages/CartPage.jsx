import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Added useDispatch
import { Link } from 'react-router-dom';
import CartItem from '../features/cart/CartItem';
import CartSummary from '../features/cart/CartSummary'; 
import { clearCart } from '../features/cart/cartSlice'; // Import Action
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react'; // Added Trash2
import toast from 'react-hot-toast'; // Added toast

const CartPage = () => {
  const { items: cartItems, totalQuantity, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch(); // Init dispatch

  // Handler for clearing cart
  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to remove all items from your cart?")) {
      dispatch(clearCart());
      toast.success("Cart cleared successfully");
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 transition-colors duration-300">
        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-6 animate-bounce-short">
          <ShoppingBag size={48} className="text-slate-400 dark:text-slate-500" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Your cart is empty</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm text-lg">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link 
          to="/products" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 dark:shadow-blue-900/20 hover:shadow-xl hover:-translate-y-0.5"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 transition-colors duration-300">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
          Shopping Cart 
          <span className="text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full">
            {totalQuantity} items
          </span>
        </h1>

        {/* Header Actions */}
        <div className="flex items-center gap-4">
          {/* Clear Cart Button */}
          <button 
            onClick={handleClearCart}
            className="flex items-center gap-2 text-sm font-bold text-rose-500 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 px-4 py-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all"
          >
            <Trash2 size={18} /> <span className="hidden sm:inline">Clear Cart</span>
          </button>

          {/* Continue Shopping Link */}
          <Link to="/products" className="hidden sm:flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
            <ArrowLeft size={18} /> Continue Shopping
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-8 transition-colors duration-300">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Right Column: Summary */}
        <div className="lg:col-span-1">
          <CartSummary subtotal={totalAmount} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;