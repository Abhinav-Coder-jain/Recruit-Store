import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, decreaseQuantity } from "../cart/cartSlice";
import toast from "react-hot-toast";

// Import Sub-Components

import ProductActions from "./components/card/ProductAction";
import ProductBadge from "./components/Card/ProductBadge";
import ProductImage from "./components/card/ProductImag";
import ProductMeta from "./components/Card/ProductMeta";
import ProductPricing from "./components/Card/ProductPricing";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux State
  const { user } = useSelector((state) => state.user);
  const isSubscribed = user?.isSubscribed || false;
  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  // Price Logic
  const discount = product.discount_percentage || 0;
  const discountedPrice =
    discount > 0 ? (product.price * (1 - discount / 100)).toFixed(2) : product.price;
  const finalPrice = isSubscribed ? discountedPrice : product.price;

  // Handlers
  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    const validImage = product.main_image_url || product.image || "";

    dispatch(
      addToCart({
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
       dark:border-slate-800 overflow-hidden shadow-md shadow-slate-300/90 dark:shadow-slate-900/40 
       hover:shadow-xl hover:shadow-slate-400/90 dark:hover:shadow-slate-900/80 
       transition-all duration-300 cursor-pointer flex flex-col h-full relative"
    >
      {/* 1. Badge Section */}
      <ProductBadge discount={discount} isSubscribed={isSubscribed} />

      {/* 2. Image Section */}
      <ProductImage 
        image={product.main_image_url || product.image} 
        title={product.title} 
      />

      {/* 3. Details Container */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Meta Info (Category, Rating, SKU, Title) */}
        <ProductMeta 
          category={product.category}
          rating={product.rating}
          sku={product.sku}
          title={product.title}
        />

        {/* Footer: Price + Actions */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/50">
          
          <ProductPricing 
            finalPrice={finalPrice} 
            originalPrice={product.price}
            isSubscribed={isSubscribed}
            discount={discount}
          />

          <ProductActions 
            cartItem={cartItem}
            onAdd={handleAddToCart}
            onDecrease={handleDecrease}
          />
          
        </div>
      </div>
    </div>
  );
};

export default ProductCard;