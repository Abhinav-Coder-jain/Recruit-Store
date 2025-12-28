import React, { useState } from 'react';
import { Star, Send, Loader2 } from 'lucide-react';

const ReviewForm = ({ onSubmit, isSubmitting }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return; 

    // Pass data up to parent
    await onSubmit({ rating, comment });
    
    // Reset form
    setRating(0);
    setComment("");
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
        Rate & Review
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star Rating */}
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

        {/* Comment */}
        <textarea
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What did you like or dislike?"
          maxLength={300}
          className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2
           focus:ring-blue-500 outline-none text-slate-900 dark:text-white placeholder-slate-400"
          required
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Send size={18} /> Post Review
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;