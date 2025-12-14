import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateWallet } from '../features/auth/userSlice';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Wallet, CreditCard, ArrowUpCircle, ArrowDownCircle, Loader2, Lock, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

// Import the new modal
import LinkCardModal from '../features/wallet/LinkCardModal';

const WalletPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);

  // Check if card is linked (default to false if field doesn't exist)
  const isCardLinked = user?.isCardLinked || false;

  const handleTransaction = async (type) => {
    // 1. Validation
    const val = parseFloat(amount);
    if (!val || val <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (type === 'withdraw' && val > user.walletBalance) {
      toast.error("Insufficient Funds");
      return;
    }

    setLoading(true);

    try {
      const adjustment = type === 'deposit' ? val : -val;
      const newBalance = user.walletBalance + adjustment;

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        walletBalance: increment(adjustment)
      });

      dispatch(updateWallet(newBalance));
      toast.success(type === 'deposit' ? "Funds Added Successfully!" : "Withdrawal Successful!");
      setAmount("");

    } catch (error) {
      console.error("Wallet Error:", error);
      toast.error("Transaction Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 transition-colors duration-300">
      
      <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-8 flex items-center gap-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Wallet className="text-blue-600 dark:text-blue-400" size={24} />
        </div>
        My Wallet
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        
        {/* LEFT: Digital Card UI */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-800 rounded-3xl p-8 text-white shadow-2xl shadow-blue-900/30 dark:shadow-none relative overflow-hidden h-64 flex flex-col justify-between transform transition-transform hover:scale-[1.02] duration-300">
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-blue-200 text-sm font-semibold mb-1 uppercase tracking-wider">Current Balance</p>
              <h2 className="text-4xl font-extrabold tracking-tight">${user?.walletBalance?.toFixed(2) || "0.00"}</h2>
            </div>
            {/* Show Lock icon if not linked, Card icon if linked */}
            {isCardLinked ? <CreditCard size={32} className="opacity-80 text-blue-100" /> : <Lock size={32} className="opacity-50 text-blue-200" />}
          </div>

          <div className="w-12 h-9 border border-yellow-500/30 bg-yellow-500/10 rounded-md z-10 flex items-center justify-center">
             <div className="w-8 h-6 border border-yellow-500/40 rounded-[2px] grid grid-cols-2 gap-1"></div>
          </div>

          <div className="z-10 flex justify-between items-end">
            <div>
              <p className="text-blue-200 text-[10px] uppercase font-bold mb-0.5">Account Holder</p>
              <p className="font-bold tracking-widest uppercase text-shadow-sm truncate max-w-[200px]">
                {user?.displayName || "Recruit User"}
              </p>
            </div>
            {/* Show masked number if linked */}
            <p className="text-lg font-mono font-bold tracking-widest opacity-80">
              {isCardLinked ? `•••• ${user.linkedCardLast4 || '4242'}` : 'Not Linked'}
            </p>
          </div>

          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>
        </div>

        {/* RIGHT: Actions Panel (Conditional Rendering) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 transition-colors duration-300 flex flex-col justify-center relative overflow-hidden">
          
          {isCardLinked ? (
            // ACTIVE STATE: Show Inputs
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
                  onClick={() => handleTransaction('deposit')}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 py-4 px-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 font-bold rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-all disabled:opacity-50 active:scale-95"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <><ArrowDownCircle size={20} /> Deposit</>}
                </button>

                <button 
                  onClick={() => handleTransaction('withdraw')}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 py-4 px-4 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-900/50 font-bold rounded-xl hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-all disabled:opacity-50 active:scale-95"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <><ArrowUpCircle size={20} /> Withdraw</>}
                </button>
              </div>
            </>
          ) : (
            // LOCKED STATE: Show Link Button
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
                onClick={() => setShowLinkModal(true)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
              >
                <CreditCard size={18} /> Link Card Now
              </button>
            </div>
          )}

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500">
             <ShieldCheck size={12} />
             <span>{isCardLinked ? "Secure Connection Active" : "Bank Grade Encryption"}</span>
          </div>
        </div>
      </div>

      {/* Render Modal */}
      {showLinkModal && <LinkCardModal onClose={() => setShowLinkModal(false)} />}
    </div>
  );
};

export default WalletPage;