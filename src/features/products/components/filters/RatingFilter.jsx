import React from 'react';
import { Star } from 'lucide-react';

const RatingFilter = ({ minRating, onChange }) => {
  return (
    <div>
      <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Minimum Rating</h3>
      <div className="space-y-3">
        {[4, 3, 2, 1].map((star) => (
          <label key={star} className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                type="radio"
                name="rating"
                checked={minRating === star}
                onChange={() => onChange(star)}
                className="peer appearance-none w-5 h-5 border-2 border-slate-300 dark:border-slate-600 rounded-full checked:border-blue-600 checked:bg-blue-600 transition-all"
              />
              <div className="absolute w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
            </div>
            <span className="text-slate-700 dark:text-slate-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
              {star} <Star size={14} className="fill-amber-400 text-amber-400" /> & Up
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;