import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white dark:bg-slate-950 transition-colors duration-300">
      <Loader2 className="animate-spin text-blue-600" size={48} />
      <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Loading products...</p>
    </div>
  );
};

export default LoadingState;