import React from 'react';
import { Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyOrdersState = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="w-24 h-24 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-6 animate-bounce-short">
        <Package size={48} className="text-slate-400 dark:text-slate-500" />
      </div>
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">No orders yet</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm text-lg">
        You haven't placed any orders yet. Start shopping to see your history here.
      </p>
      <Link 
        to="/products" 
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 dark:shadow-blue-900/20 hover:shadow-xl hover:-translate-y-0.5"
      >
        Browse Products
      </Link>
    </div>
  );
};

export default EmptyOrdersState;