import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../utils/productData'; 
import { addToCart, decreaseQuantity } from '../features/cart/cartSlice';
import { 
  Loader2, ShoppingCart, Star, ArrowLeft, Minus, Plus, 
  ShieldCheck, Truck, RotateCcw, User, Send, CheckCircle 
} from 'lucide-react';
import { 
  collection, addDoc, query, where, getDocs, serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import toast from 'react-hot-toast';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Redux State
  const { user } = useSelector((state) => state.user);
  const cartItem = useSelector((state) => 
    state.cart.items.find((item) => item.id === parseInt(id))
  );

  // Local State
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // 1. Fetch Product Data
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id)
  });

  // 2. Fetch Reviews & Check existing review
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, "reviews"), where("productId", "==", id));
        const snapshot = await getDocs(q);
        const fetchedReviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        fetchedReviews.sort((a, b) => b.createdAt - a.createdAt);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error loading reviews:", error);
      }
    };
    fetchReviews();
  }, [id]);

  // NEW: Check if current user has already reviewed
  const userHasReviewed = user && reviews.some((r) => r.userId === user.uid);

  // 3. Handle Review Submission
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    
    setSubmitting(true);
    try {
      const newReview = {
        productId: id,
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        rating: rating,
        comment: comment,
        createdAt: serverTimestamp(),
        clientDate: new Date().toLocaleDateString() 
      };

      const docRef = await addDoc(collection(db, "reviews"), newReview);
      
      setReviews([{ ...newReview, id: docRef.id }, ...reviews]);
      setComment("");
      setRating(0);
      toast.success("Review posted successfully!");

    } catch (error) {
      console.error(error);
      toast.error("Failed to post review");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Product not found</h2>
        <button onClick={() => navigate('/products')} className="mt-4 text-blue-600 hover:underline">
          Back to Products
        </button>
      </div>
    );
  }

  const discount = product.discount_percentage || 0;
  const isVIP = user?.isSubscribed || false;
  const finalPrice = isVIP && discount > 0 
    ? (product.price * (1 - discount / 100)).toFixed(2) 
    : product.price;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 mb-6 transition-colors"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* MAIN PRODUCT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm h-fit">
             <img 
               src={product.main_image_url || product.image} 
               alt={product.title} 
               className="w-full max-w-md object-contain hover:scale-105 transition-transform duration-500"
             />
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
                {product.title}
              </h1>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full">
                  <Star size={16} className="fill-amber-500 text-amber-500" />
                  <span className="text-sm font-bold text-amber-800 dark:text-amber-400">
                    {product.rating} Global Rating
                  </span>
                </div>
                <span className="text-sm text-slate-400">({product.stock} in stock)</span>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
               <div className="flex items-end gap-3 mb-2">
                 <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                   ${finalPrice}
                 </span>
                 {isVIP && discount > 0 && (
                   <span className="text-lg text-slate-400 line-through mb-1">
                     ${product.price}
                   </span>
                 )}
               </div>
               {isVIP && discount > 0 ? (
                 <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                   VIP Price Applied (-{Math.round(discount)}%)
                 </p>
               ) : (
                 <p className="text-sm text-slate-500">
                   Join VIP for extra discounts!
                 </p>
               )}

               <div className="mt-6">
                 {cartItem ? (
                   <div className="flex items-center gap-4">
                      <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
                        <button 
                          onClick={() => dispatch(decreaseQuantity(product.id))}
                          className="p-3 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                        >
                          <Minus size={20} />
                        </button>
                        <span className="w-12 text-center font-bold text-lg text-slate-900 dark:text-white">
                          {cartItem.quantity}
                        </span>
                        <button 
                          onClick={() => dispatch(addToCart({ ...product, price: parseFloat(finalPrice), quantity: 1 }))}
                          className="p-3 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">In Cart</span>
                   </div>
                 ) : (
                   <button 
                     onClick={() => {
                        dispatch(addToCart({ ...product, price: parseFloat(finalPrice), image: product.main_image_url || product.image, quantity: 1 }));
                        toast.success("Added to Cart");
                     }}
                     className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                   >
                     <ShoppingCart size={20} /> Add to Cart
                   </button>
                 )}
               </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
               <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50">
                 <Truck className="mx-auto text-blue-600 mb-2" size={24} />
                 <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Fast Delivery</p>
               </div>
               <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50">
                 <ShieldCheck className="mx-auto text-emerald-600 mb-2" size={24} />
                 <p className="text-xs font-bold text-slate-600 dark:text-slate-300">2 Year Warranty</p>
               </div>
               <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50">
                 <RotateCcw className="mx-auto text-purple-600 mb-2" size={24} />
                 <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Easy Returns</p>
               </div>
            </div>

            <div className="prose dark:prose-invert text-slate-600 dark:text-slate-400">
               <p>{product.description || "No description available for this product."}</p>
            </div>
          </div>
        </div>

        {/* REVIEWS SECTION */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-12">
           <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Customer Reviews</h2>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
             
             {/* LEFT: Review Logic Panel */}
             <div className="lg:col-span-1">
               <div className="sticky top-24">
                 {user ? (
                   userHasReviewed ? (
                     // ALREADY REVIEWED STATE
                     <div className="bg-emerald-50 dark:bg-emerald-900/10 p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 text-center animate-fade-in">
                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle size={32} className="text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Thanks for your feedback!</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                          You have already reviewed this product.
                        </p>
                     </div>
                   ) : (
                     // WRITE REVIEW FORM
                     <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                       <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Rate & Review</h3>
                       <form onSubmit={handleSubmitReview} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Your Rating</label>
                            <div className="flex gap-2">
                               {[1, 2, 3, 4, 5].map((star) => (
                                 <button
                                   key={star}
                                   type="button"
                                   onMouseEnter={() => setHoverRating(star)}
                                   onMouseLeave={() => setHoverRating(0)}
                                   onClick={() => setRating(star)}
                                   className="transition-transform hover:scale-110 focus:outline-none"
                                 >
                                   <Star 
                                     size={28} 
                                     className={`${
                                       (hoverRating || rating) >= star 
                                         ? "fill-blue-500 text-blue-500" 
                                         : "text-slate-300 dark:text-slate-700"
                                     }`} 
                                   />
                                 </button>
                               ))}
                            </div>
                          </div>

                          <div>
                             <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Your Experience</label>
                             <textarea
                               rows="4"
                               value={comment}
                               onChange={(e) => setComment(e.target.value)}
                               placeholder="What did you like or dislike?"
                               className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white placeholder-slate-400"
                               required
                             ></textarea>
                          </div>

                          <button 
                            type="submit" 
                            disabled={submitting}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            {submitting ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Post Review</>}
                          </button>
                       </form>
                     </div>
                   )
                 ) : (
                   // LOGIN PROMPT
                   <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 text-center py-8">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User size={24} className="text-slate-400" />
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Log in to Review</h3>
                      <p className="text-sm text-slate-500 mb-6">Share your thoughts with the community.</p>
                      <button 
                        onClick={() => navigate('/login', { state: { from: location } })}
                        className="w-full py-3 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        Log In Now
                      </button>
                   </div>
                 )}
               </div>
             </div>

             {/* RIGHT: Reviews List */}
             <div className="lg:col-span-2 space-y-6">
                {reviews.length > 0 ? (
                  reviews.map((rev) => (
                    <div key={rev.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm animate-fade-in">
                       <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                                {rev.userName ? rev.userName[0].toUpperCase() : 'U'}
                             </div>
                             <div>
                                <p className="font-bold text-slate-900 dark:text-white text-sm">{rev.userName}</p>
                                <p className="text-xs text-slate-400">{rev.clientDate || "Recently"}</p>
                             </div>
                          </div>
                          
                          <div className="flex items-center bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg">
                             {Array.from({ length: 5 }).map((_, i) => (
                               <Star 
                                 key={i} 
                                 size={14} 
                                 className={`${
                                   i < rev.rating ? "fill-blue-500 text-blue-500" : "text-slate-300 dark:text-slate-600"
                                 }`} 
                               />
                             ))}
                          </div>
                       </div>
                       <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                         {rev.comment}
                       </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                     <p className="text-slate-400 dark:text-slate-500 font-medium">No reviews yet. Be the first to share your thoughts!</p>
                  </div>
                )}
             </div>

           </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailsPage;