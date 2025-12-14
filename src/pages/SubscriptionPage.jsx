import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateWallet, setSubscriptionStatus } from "../features/auth/userSlice";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../config/firebase";
import { Check, Shield, Zap, Star, Crown, Loader2, X } from "lucide-react";
import toast from "react-hot-toast";

const SubscriptionPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const PREMIUM_COST = 49.99;

  const handleUpgrade = async () => {
    if (user.isSubscribed) {
      toast.success("You are already a Premium Member!");
      return;
    }

    if (user.walletBalance < PREMIUM_COST) {
      toast.error("Insufficient Wallet Balance. Please deposit funds first.");
      navigate("/wallet");
      return;
    }

    setLoading(true);

    try {
      const userRef = doc(db, "users", user.uid);

      // 1. Atomic Update in Firestore
      await updateDoc(userRef, {
        walletBalance: increment(-PREMIUM_COST),
        isSubscribed: true,
      });

      // 2. Update Redux State
      dispatch(updateWallet(user.walletBalance - PREMIUM_COST));
      dispatch(setSubscriptionStatus(true));

      toast.success("Welcome to the VIP Club!", { icon: "👑" });
      navigate("/products"); 
    } catch (error) {
      console.error(error);
      toast.error("Transaction Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 transition-colors duration-300 flex items-center justify-center">
      <div className="max-w-6xl w-full">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm">Upgrade your lifestyle</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Choose Your Experience
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Unlock exclusive perks, priority support, and unbeatable VIP prices with our premium membership.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
          
          {/* FREE TIER CARD */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden transition-colors duration-300">
            <h3 className="text-lg font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
              Standard
            </h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-extrabold text-slate-900 dark:text-white">$0</span>
              <span className="text-lg text-slate-400 dark:text-slate-500 font-medium">/mo</span>
            </div>

            <ul className="space-y-5 mb-8">
              <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                <div className="p-1 rounded-full bg-slate-100 dark:bg-slate-800">
                    <Check className="text-slate-600 dark:text-slate-400" size={16} />
                </div>
                Access to all products
              </li>
              <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                <div className="p-1 rounded-full bg-slate-100 dark:bg-slate-800">
                    <Check className="text-slate-600 dark:text-slate-400" size={16} />
                </div>
                Standard Shipping
              </li>
              <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                <div className="p-1 rounded-full bg-slate-100 dark:bg-slate-800">
                    <Check className="text-slate-600 dark:text-slate-400" size={16} />
                </div>
                Basic Customer Support
              </li>
              <li className="flex items-center gap-3 text-slate-400 dark:text-slate-600">
                <div className="p-1 rounded-full bg-slate-50 dark:bg-slate-900">
                    <X className="text-slate-300 dark:text-slate-700" size={16} />
                </div>
                Exclusive VIP Pricing
              </li>
              <li className="flex items-center gap-3 text-slate-400 dark:text-slate-600">
                <div className="p-1 rounded-full bg-slate-50 dark:bg-slate-900">
                    <X className="text-slate-300 dark:text-slate-700" size={16} />
                </div>
                Priority Delivery
              </li>
            </ul>

            <button
              disabled
              className="w-full py-4 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-200 dark:border-slate-700"
            >
              Current Plan
            </button>
          </div>

          {/* PREMIUM TIER CARD */}
          <div className="bg-slate-900 dark:bg-black p-8 rounded-3xl border border-slate-800 dark:border-slate-800 shadow-2xl relative overflow-hidden transform md:-translate-y-6 md:scale-105 ring-1 ring-slate-800 dark:ring-slate-800">
            
            {/* Banner */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-yellow-600 text-slate-900 text-[10px] font-extrabold tracking-widest px-4 py-1.5 rounded-bl-xl uppercase shadow-lg">
              Most Popular
            </div>

            <h3 className="text-lg font-bold text-amber-400 uppercase tracking-wide mb-4 flex items-center gap-2">
              <Crown size={20} className="fill-amber-400" /> Premium VIP
            </h3>
            
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-extrabold text-white">${PREMIUM_COST}</span>
              <span className="text-lg text-slate-400 font-medium">/year</span>
            </div>

            <ul className="space-y-5 mb-8">
              <li className="flex items-center gap-3 text-slate-300">
                <div className="p-1 rounded-full bg-slate-800">
                    <Check className="text-slate-400" size={16} />
                </div>
                <span>Everything in Standard</span>
              </li>
              <li className="flex items-center gap-3 text-white font-medium">
                <div className="p-1 rounded-full bg-amber-500/20">
                    <Star className="text-amber-400 fill-amber-400" size={16} />
                </div>
                <span>Up to 20% OFF all items</span>
              </li>
              <li className="flex items-center gap-3 text-slate-200">
                <div className="p-1 rounded-full bg-blue-500/20">
                    <Zap className="text-blue-400" size={16} />
                </div>
                <span>Priority Fast Shipping</span>
              </li>
              <li className="flex items-center gap-3 text-slate-200">
                <div className="p-1 rounded-full bg-purple-500/20">
                    <Shield className="text-purple-400" size={16} />
                </div>
                <span>Extended Warranty</span>
              </li>
            </ul>

            {user?.isSubscribed ? (
              <button
                disabled
                className="w-full py-4 rounded-xl font-bold bg-emerald-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
              >
                <Check size={20} /> Membership Active
              </button>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="group w-full py-4 rounded-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 text-slate-900 hover:from-amber-300 hover:to-yellow-500 transition-all shadow-xl shadow-amber-900/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Upgrade to VIP"}
              </button>
            )}

            <p className="text-center text-slate-500 text-xs mt-5">
              Secure payment via Wallet Balance • Cancel anytime
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;