import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User, LayoutDashboard, CreditCard, Star } from 'lucide-react';

const UserMenu = ({ user, handleLogout }) => {
  if (!user) {
    return (
      <Link 
        to="/login" 
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-slate-200 dark:shadow-none"
      >
        <User size={18} />
        <span className="hidden sm:block">Login</span>
      </Link>
    );
  }

  return (
    <div className="relative group h-full flex items-center z-50">
      <button className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all py-1.5 pr-3 border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
          {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
        </div>
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 hidden lg:block max-w-[100px] truncate">
          {user.displayName}
        </span>
      </button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 top-full pt-3 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform z-50 origin-top-right">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden ring-1 ring-black/5">
          
          {/* Wallet Header */}
          <div className="px-5 py-4 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
             <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">Wallet Balance</p>
             <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">${user.walletBalance?.toFixed(2)}</p>
          </div>

          {/* Links */}
          <div className="p-2 space-y-1">
            <Link to="/orders" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
               <LayoutDashboard size={16} className="text-slate-400" /> My Orders
            </Link>
            <Link to="/wallet" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
               <CreditCard size={16} className="text-slate-400" /> My Wallet
            </Link>
            <Link to="/subscription" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
               <Star size={16} className="text-amber-400" /> Subscription
            </Link>
          </div>

          <div className="p-2 border-t border-slate-100 dark:border-slate-800">
            <button 
              onClick={handleLogout} 
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-rose-600 dark:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserMenu;