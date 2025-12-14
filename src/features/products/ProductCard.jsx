import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, decreaseQuantity } from "../cart/cartSlice";
import { ShoppingCart, Star, Plus, Minus, Lock, Zap } from "lucide-react"; 
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const isSubscribed = user?.isSubscribed || false;

  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  const discount = product.discount_percentage || 0;
  const discountedPrice = discount > 0
      ? (product.price * (1 - discount / 100)).toFixed(2)
      : product.price;

  const finalPrice = isSubscribed ? discountedPrice : product.price;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const validImage = product.main_image_url || product.image || "";

    dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: parseFloat(finalPrice),
        image: validImage,
        quantity: 1,
        stock: product.stock,
      })
    );
    if (!cartItem) toast.success("Added to Cart!");
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    dispatch(decreaseQuantity(product.id));
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200
       dark:border-slate-800 overflow-hidden shadow-md shadow-slate-300/90 dark:shadow-slate-900/40  hover:shadow-xl hover:shadow-slate-400/90 dark:hover:shadow-slate-900/80 
       transition-all duration-300 cursor-pointer flex flex-col h-full relative"
    >
      {/* Badge */}
      {discount > 0 &&
        (isSubscribed ? (
          <span className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full z-10 shadow-lg shadow-rose-500/30">
            VIP: -{Math.round(discount)}%
          </span>
        ) : (
          <span className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md text-amber-400 border border-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full z-10 flex items-center gap-1 shadow-lg">
            <Lock size={10} /> Save {Math.round(discount)}%
          </span>
        ))}

      {/* Image Area */}
      <div className="relative aspect-[4/3] bg-slate-50 dark:bg-slate-950/30 p-6 overflow-hidden flex items-center justify-center">
        {product.main_image_url || product.image ? (
          <img
            src={product.main_image_url || product.image}
            alt={product.title}
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

      {/* Details */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
           <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">{product.category}</p>
           <div className="flex items-center gap-1">
             <Star size={12} className="fill-amber-400 text-amber-400" />
             <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{product.rating}</span>
           </div>
        </div>

        <h3 className="font-bold text-slate-800 dark:text-white text-sm mb-2 line-clamp-2 leading-relaxed min-h-[40px]">
          {product.title}
        </h3>

        {/* Footer: Price + Button */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/50">
          <div className="flex flex-col">
            <span className="text-lg font-extrabold text-slate-900 dark:text-white">
              ${finalPrice}
            </span>
            {isSubscribed && discount > 0 && (
              <span className="text-[10px] text-slate-400 line-through">
                ${product.price}
              </span>
            )}
            {!isSubscribed && discount > 0 && (
               <span className="text-[10px] text-amber-500 font-medium">VIP Price Available</span>
            )}
          </div>

          {cartItem ? (
            <div className="flex items-center bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-500/30 overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <button onClick={handleDecrease} className="p-2 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-blue-600 dark:text-blue-400 transition-colors">
                <Minus size={14} />
              </button>
              <span className="w-6 text-center text-xs font-bold text-blue-700 dark:text-blue-300">
                {cartItem.quantity}
              </span>
              <button onClick={handleAddToCart} className="p-2 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-blue-600 dark:text-blue-400 transition-colors">
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-2.5 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white transition-all shadow-md shadow-slate-200 dark:shadow-none"
            >
              <ShoppingCart size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;