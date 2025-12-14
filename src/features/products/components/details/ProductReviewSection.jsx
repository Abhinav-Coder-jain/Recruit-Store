import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProductReviews } from '../../../../hooks/useProductReviews'; 
import ReviewLoginPrompt from '../reviews/ReviewLoginPrompt';
import ReviewForm from '../reviews/ReviewForm';
import ReviewSuccess from '../reviews/ReviewSuccess';
import ReviewList from '../reviews/ReviewList';
import ReviewItem from '../reviews/ReviewItem';

// Import Sub-Components


const ProductReviewsSection = ({ productId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  // React Query Hook
  const { reviews, submitReview, isSubmitting, userHasReviewed } = useProductReviews(productId, user);

  // Handlers
  const handleLogin = () => {
    navigate('/login', { state: { from: location } });
  };

  const handleSubmitReview = async ({ rating, comment }) => {
    await submitReview({ productId, user, rating, comment });
  };

  return (
    <div className="border-t border-slate-200 dark:border-slate-800 pt-12">
       <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Customer Reviews</h2>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         
         {/* LEFT COLUMN: Sidebar Logic */}
         <div className="lg:col-span-1">
           <div className="sticky top-24">
             {!user ? (
               <ReviewLoginPrompt onLogin={handleLogin} />
             ) : userHasReviewed ? (
               <ReviewSuccess />
             ) : (
               <ReviewForm 
                 onSubmit={handleSubmitReview} 
                 isSubmitting={isSubmitting} 
               />
             )}
           </div>
         </div>

         {/* RIGHT COLUMN: Review List */}
         <div className="lg:col-span-2">
            <ReviewList reviews={reviews} />
         </div>

       </div>
    </div>
  );
};

export default ProductReviewsSection;