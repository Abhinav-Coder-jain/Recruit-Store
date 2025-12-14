import React from 'react';
import { CreditCard, Lock } from 'lucide-react';

const DigitalCard = ({ user, isLinked }) => {
  return (
    <div className="bg-gradient-to-br from-blue-900 to-indigo-800 rounded-3xl p-8 text-white shadow-2xl shadow-blue-900/30 dark:shadow-none relative overflow-hidden h-64 flex flex-col justify-between transform transition-transform hover:scale-[1.02] duration-300">
      
      {/* Top Row: Balance & Status */}
      <div className="flex justify-between items-start z-10">
        <div>
          <p className="text-blue-200 text-sm font-semibold mb-1 uppercase tracking-wider">Current Balance</p>
          <h2 className="text-4xl font-extrabold tracking-tight">${user?.walletBalance?.toFixed(2) || "0.00"}</h2>
        </div>
        {isLinked ? (
          <CreditCard size={32} className="opacity-80 text-blue-100" />
        ) : (
          <Lock size={32} className="opacity-50 text-blue-200" />
        )}
      </div>

      {/* Chip */}
      <div className="w-12 h-9 border border-yellow-500/30 bg-yellow-500/10 rounded-md z-10 flex items-center justify-center">
         <div className="w-8 h-6 border border-yellow-500/40 rounded-[2px] grid grid-cols-2 gap-1"></div>
      </div>

      {/* Bottom Row: Name & Number */}
      <div className="z-10 flex justify-between items-end">
        <div>
          <p className="text-blue-200 text-[10px] uppercase font-bold mb-0.5">Account Holder</p>
          <p className="font-bold tracking-widest uppercase text-shadow-sm truncate max-w-[200px]">
            {user?.displayName || "Recruit User"}
          </p>
        </div>
        <p className="text-lg font-mono font-bold tracking-widest opacity-80">
          {isLinked ? `•••• ${user.linkedCardLast4 || '4242'}` : 'Not Linked'}
        </p>
      </div>

      {/* Background Shapes */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>
    </div>
  );
};

export default DigitalCard;