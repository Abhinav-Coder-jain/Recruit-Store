import React from 'react';
import { Check, Crown, Star, Zap, Shield, Loader2 } from 'lucide-react';

const PremiumPlanCard = ({ cost, isSubscribed, loading, onUpgrade }) => {
  return (
    <div className="bg-slate-900 dark:bg-black p-8 rounded-3xl border border-slate-800 dark:border-slate-800 shadow-2xl relative overflow-hidden transform md:-translate-y-6 md:scale-105 ring-1 ring-slate-800 dark:ring-slate-800">
      
      {/* Banner */}
      <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-yellow-600 text-slate-900 text-[10px] font-extrabold tracking-widest px-4 py-1.5 rounded-bl-xl uppercase shadow-lg">
        Most Popular
      </div>

      <h3 className="text-lg font-bold text-amber-400 uppercase tracking-wide mb-4 flex items-center gap-2">
        <Crown size={20} className="fill-amber-400" /> Premium VIP
      </h3>
      
      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-5xl font-extrabold text-white">${cost}</span>
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

      {isSubscribed ? (
        <button
          disabled
          className="w-full py-4 rounded-xl font-bold bg-emerald-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 cursor-default"
        >
          <Check size={20} /> Membership Active
        </button>
      ) : (
        <button
          onClick={onUpgrade}
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
  );
};

export default PremiumPlanCard;