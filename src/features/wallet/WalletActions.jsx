import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Loader2, CreditCard, Lock, ShieldCheck } from 'lucide-react';

const WalletActions = ({ 
  isLinked, 
  amount, 
  setAmount, 
  loading, 
  onTransaction, 
  onLinkCard 
}) => {
  
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 transition-colors duration-300 flex flex-col justify-center relative overflow-hidden">
     

      {isLinked ? (
        // --- ACTIVE STATE ---
        <>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Manage Funds</h3>
          
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-slate-400 dark:text-slate-500 font-bold text-lg">$</span>
            </div>
            <input 
              type="number" 
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-9 pr-4 py-4 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500/50 outline-none transition-all font-bold text-xl placeholder:text-slate-400 placeholder:font-normal"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => onTransaction('deposit')}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-4 px-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 font-bold rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-all disabled:opacity-50 active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <><ArrowDownCircle size={20} /> Deposit</>}
            </button>

            <button 
              onClick={() => onTransaction('withdraw')}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-4 px-4 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-900/50 font-bold rounded-xl hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-all disabled:opacity-50 active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <><ArrowUpCircle size={20} /> Withdraw</>}
            </button>
          </div>
        </>
      ) : (
        // --- LOCKED STATE ---
        <div className="flex flex-col items-center justify-center text-center h-full space-y-4">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-2">
            <Lock size={32} className="text-slate-400 dark:text-slate-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Wallet Locked</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-[200px] mx-auto">
              Link your credit or debit card to activate deposits and withdrawals.
            </p>
          </div>
          <button 
            onClick={onLinkCard}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
          >
            <CreditCard size={18} /> Link Card Now
          </button>
        </div>
      )}

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500">
          <ShieldCheck size={12} />
          <span>{isLinked ? "Secure Connection Active" : "Bank Grade Encryption"}</span>
      </div>
    </div>
  );
};

export default WalletActions;