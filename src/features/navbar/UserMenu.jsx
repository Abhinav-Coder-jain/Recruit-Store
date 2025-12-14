import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User, LayoutDashboard, CreditCard, Star, ChevronDown } from 'lucide-react';

const UserMenu = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) {
    return (
      <Link 
        to="/login" 
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-all shadow-md shadow-blue-900/20"
      >
        <User size={18} />
        <span className="hidden sm:block">Login</span>
      </Link>
    );
  }

  return (
    <div className="relative z-50" ref={menuRef}>
      
      {/* TRIGGER BUTTON (Click instead of Hover) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 p-1 rounded-full transition-all py-1.5 pr-3 border ${isOpen ? 'bg-slate-400 border-slate-700' : 'border-transparent hover:bg-slate-100 hover:border-slate-400'}`}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
          {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
        </div>
        <span className="text-sm font-semibold text-slate-800  dark:text-slate-400 hidden lg:block max-w-[100px] truncate">
          {user.displayName ? user.displayName[0].toUpperCase() + user.displayName.slice(1) : 'User'}
        </span>
        {/* Tiny arrow to indicate dropdown */}
        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 hidden lg:block ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 animate-fade-in origin-top-right">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden ring-1 ring-black/5">
            
            {/* Wallet Summary */}
            <div className="px-5 py-4 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
               <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">Wallet Balance</p>
               <div className="flex justify-between items-center">
                 <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">${user.walletBalance?.toFixed(2)}</p>
                 <Link to="/wallet" onClick={() => setIsOpen(false)} className="text-xs font-bold text-blue-600 hover:underline">Add Funds</Link>
               </div>
            </div>

            {/* Links */}
            <div className="p-2 space-y-1">
              <Link 
                to="/orders" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                 <div className="p-1.5 bg-blue-50 dark:bg-slate-800 rounded-lg text-blue-600 dark:text-blue-400">
                   <LayoutDashboard size={16} /> 
                 </div>
                 My Orders
              </Link>
              
              <Link 
                to="/wallet" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                 <div className="p-1.5 bg-purple-50 dark:bg-slate-800 rounded-lg text-purple-600 dark:text-purple-400">
                   <CreditCard size={16} /> 
                 </div>
                 My Wallet
              </Link>
              
              <Link 
                to="/subscription" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                 <div className="p-1.5 bg-amber-50 dark:bg-slate-800 rounded-lg text-amber-500">
                   <Star size={16} className="fill-amber-500" /> 
                 </div>
                 Subscription Status
              </Link>
            </div>

            {/* Logout */}
            <div className="p-2 border-t border-slate-100 dark:border-slate-800">
              <button 
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }} 
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-rose-600 dark:text-rose-400 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
              >
                <div className="p-1.5 rounded-lg">
                  <LogOut size={16} /> 
                </div>
                Sign Out
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;