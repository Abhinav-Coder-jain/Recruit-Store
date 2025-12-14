import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, decreaseQuantity } from '../../../../features/cart/cartSlice';
import { Star, Minus, Plus, ShoppingCart, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductInfoSection = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux
  const { user } = useSelector((state) => state.user);
  const cartItem = useSelector((state) => 
    state.cart.items.find((item) => item.id === parseInt(product.id))
  );

  // Price Logic
  const discount = product.discount_percentage || 0;
  const isVIP = user?.isSubscribed || false;
  const finalPrice = isVIP && discount > 0 
    ? (product.price * (1 - discount / 100)).toFixed(2) 
    : product.price;

  // Cart Handler
  const handleAddToCart = () => {
    if (!user) { 
      toast.error("Please login"); 
      navigate('/login'); 
      return; 
    }
    dispatch(addToCart({ 
      ...product, 
      price: parseFloat(finalPrice), 
      image: product.main_image_url || product.image, 
      quantity: 1 
    }));
    toast.success("Added to Cart");
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
          {product.category}
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
          {product.title}
        </h1>
        {product.sku && (
           <p className="text-xs font-mono text-slate-400 dark:text-slate-500 mb-4">SKU: {product.sku}</p>
        )}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full">
            <Star size={16} className="fill-amber-500 text-amber-500" />
            <span className="text-sm font-bold text-amber-800 dark:text-amber-400">
              {product.rating} Global Rating
            </span>
          </div>
          <span className="text-sm text-slate-400">({product.stock} in stock)</span>
        </div>
        
         <div className="prose mt-5 dark:prose-invert text-slate-600 dark:text-slate-400"><p>{product.description || "No description available."}</p></div>
      </div>

      {/* Pricing Card */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        
         <div className="flex items-end gap-3 mb-2">
           <span className="text-4xl font-extrabold text-slate-900 dark:text-white">${finalPrice}</span>
           {isVIP && discount > 0 && <span className="text-lg text-slate-400 line-through mb-1">${product.price}</span>}
         </div>
         {isVIP && discount > 0 ? (
           <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">VIP Price Applied (-{Math.round(discount)}%)</p>
         ) : (
           <p className="text-sm text-slate-500">Join VIP for extra discounts!</p>
         )}

         <div className="mt-6">
           {cartItem ? (
             <div className="flex items-center gap-4">
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
                  <button onClick={() => dispatch(decreaseQuantity(product.id))} className="p-3 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"><Minus size={20} /></button>
                  <span className="w-12 text-center font-bold text-lg text-slate-900 dark:text-white">{cartItem.quantity}</span>
                  <button onClick={() => dispatch(addToCart({ ...product, price: parseFloat(finalPrice), quantity: 1 }))} className="p-3 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"><Plus size={20} /></button>
                </div>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">In Cart</span>
             </div>
           ) : (
             <button onClick={handleAddToCart} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2">
               <ShoppingCart size={20} /> Add to Cart
             </button>
           )}
         </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-3 gap-4 text-center">
         <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50"><Truck className="mx-auto text-blue-600 mb-2" size={24} /><p className="text-xs font-bold text-slate-600 dark:text-slate-300">Fast Delivery</p></div>
         <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50"><ShieldCheck className="mx-auto text-emerald-600 mb-2" size={24} /><p className="text-xs font-bold text-slate-600 dark:text-slate-300">2 Year Warranty</p></div>
         <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50"><RotateCcw className="mx-auto text-purple-600 mb-2" size={24} /><p className="text-xs font-bold text-slate-600 dark:text-slate-300">Easy Returns</p></div>
      </div>
      
     
    </div>
  );
};

export default ProductInfoSection;