import React from 'react';
import { Star } from 'lucide-react';

const ReviewItem = ({ review }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
            {review.userName ? review.userName[0].toUpperCase() : 'U'}
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white text-sm">
              {review.userName}
            </p>
            <p className="text-xs text-slate-400">
              {review.clientDate || "Recently"}
            </p>
          </div>
        </div>
        <div className="flex items-center bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={`${
                i < review.rating
                  ? "fill-blue-500 text-blue-500"
                  : "text-slate-300 dark:text-slate-600"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        {review.comment}
      </p>
    </div>
  );
};

export default ReviewItem;