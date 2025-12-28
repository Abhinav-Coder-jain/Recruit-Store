import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
      <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl
       flex items-center justify-center text-white font-bold shadow-blue-200 dark:shadow-none shadow-lg group-hover:scale-105 transition-transform">
        R
      </div>
      <span className="text-xl font-extrabold text-slate-800 dark:text-white hidden sm:block tracking-tight">
        RecruitStore
      </span>
    </Link>
  );
};

export default Logo;