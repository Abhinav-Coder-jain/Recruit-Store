import React from 'react';
import { Loader2, ShieldCheck, AlertCircle, Wallet, CreditCard, Sparkles } from 'lucide-react';

const CheckoutSummary = ({ 
  items, total, tax, finalTotal, 
  userBalance, loading, onPlaceOrder, 
  paymentMethod, setPaymentMethod, discountAmount 
}) => {
  
  const hasInsufficientFunds = paymentMethod === 'wallet' && userBalance < finalTotal;

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 sticky top-24 transition-colors duration-300">
      <h3 className="font-bold text-slate-800 dark:text-white mb-4">Payment Method</h3>

      {/* Payment Toggles */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => setPaymentMethod('wallet')}
          className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 relative overflow-hidden ${
            paymentMethod === 'wallet' 
              ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 shadow-md' 
              : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400'
          }`}
        >
          <Wallet size={24} className="mb-2" />
          <span className="text-sm font-bold">Wallet</span>
          
          {/* Discount Badge */}
          <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full mt-1.5 font-bold">
            -5% OFF
          </span>
        </button>

        <button
          onClick={() => setPaymentMethod('card')}
          className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
            paymentMethod === 'card' 
              ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 shadow-md' 
              : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400'
          }`}
        >
          <CreditCard size={24} className="mb-2" />
          <span className="text-sm font-bold">Credit Card</span>
        </button>
      </div>

      <h3 className="font-bold text-slate-800 dark:text-white mb-4">Order Summary</h3>
      
      {/* Item List */}
      <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
        {items.map(item => (
          <div key={item.id} className="flex justify-between text-sm group">
            <span className="text-slate-600 dark:text-slate-400 truncate w-2/3 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
              {item.quantity}x {item.title}
            </span>
            <span className="font-semibold text-slate-900 dark:text-slate-200">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2 text-sm">
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        {/* Discount Row */}
        {paymentMethod === 'wallet' && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold items-center bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded-lg">
            <span className="flex items-center gap-1.5"><Sparkles size={14} /> Wallet Savings</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between font-extrabold text-lg pt-3 border-t border-slate-100 dark:border-slate-800 mt-2 text-slate-900 dark:text-white">
          <span>Total</span>
          <span className="text-blue-600 dark:text-blue-400">${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Wallet Balance Info */}
      {paymentMethod === 'wallet' && (
        <div className={`mt-6 p-3 rounded-lg text-sm flex justify-between items-center border ${
          hasInsufficientFunds 
            ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400' 
            : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300'
        }`}>
          <span className="font-medium">Wallet Balance:</span>
          <span className="font-bold">${userBalance?.toFixed(2)}</span>
        </div>
      )}

      {hasInsufficientFunds && (
        <p className="text-xs text-rose-500 font-medium mt-2 flex items-center gap-1.5 animate-pulse">
          <AlertCircle size={14} /> Insufficient funds. Please deposit money.
        </p>
      )}

      {/* Action Button */}
      <button 
        onClick={onPlaceOrder}
        disabled={loading || items.length === 0 || hasInsufficientFunds}
        className="group w-full mt-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white py-3.5 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-200 dark:shadow-none active:scale-95"
      >
        {loading ? <Loader2 className="animate-spin" /> : "Place Order"}
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-medium">
        <ShieldCheck size={14} className="text-emerald-500" />
        <span>Secure Transaction</span>
      </div>
    </div>
  );
};

export default CheckoutSummary;