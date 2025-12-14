import React, { useState, useEffect } from 'react';

const PriceSlider = ({ maxPrice, onChange }) => {
  // Local state for smooth sliding (visual only)
  const [localPrice, setLocalPrice] = useState(maxPrice);

  // Sync if parent updates it externally (e.g. Reset button)
  useEffect(() => {
     setLocalPrice(maxPrice);
  }, [maxPrice]);

  const handleMove = (e) => setLocalPrice(Number(e.target.value));
  
  // Commit changes to parent only when user stops dragging
  const handleRelease = () => onChange(localPrice);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
         <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Max Price</h3>
         <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md">
           ${localPrice}
         </span>
      </div>
      
      <div className="relative h-6 flex items-center">
        <input 
          type="range" 
          min="0" 
          max="2000" 
          step="10"
          value={localPrice}
          onChange={handleMove}
          onMouseUp={handleRelease}
          onTouchEnd={handleRelease}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600
           dark:accent-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
      </div>
      <div className="flex justify-between text-xs text-slate-400 font-medium mt-1">
        <span>$0</span>
        <span>$2000+</span>
      </div>
    </div>
  );
};

export default PriceSlider;