import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {  User, ChevronDown } from 'lucide-react';
import UserDropMenu from './UserDropMenu';

const UserMenu = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

 
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
       <UserDropMenu user={user} setIsOpen={setIsOpen} handleLogout={handleLogout} />
      )}
    </div>
  );
};

export default UserMenu;