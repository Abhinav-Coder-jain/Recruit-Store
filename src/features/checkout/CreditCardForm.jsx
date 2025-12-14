import React from 'react';
import { CreditCard, Calendar, Lock } from 'lucide-react';

const CreditCardForm = ({ cardData, handleCardChange, errors }) => {
  
  const inputBaseClass = "w-full pl-10 pr-4 py-2.5 border rounded-lg outline-none transition-all bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400";
  const labelClass = "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5";

  // Dynamic border color based on error
  const getBorderClass = (hasError) => 
    hasError 
      ? "border-rose-500 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-900/50" 
      : "border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500/50";

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 mt-6 animate-fade-in transition-colors duration-300">
      <h3 className="font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
        <CreditCard className="text-blue-600 dark:text-blue-400" size={20} /> Card Details
      </h3>

      <div className="space-y-5">
        {/* Card Number */}
        <div>
          <label className={labelClass}>Card Number</label>
          <div className="relative">
            <input
              type="text" name="number" maxLength="19" placeholder="0000 0000 0000 0000"
              value={cardData.number} onChange={handleCardChange}
              className={`${inputBaseClass} ${getBorderClass(errors.number)}`}
            />
            <CreditCard className="absolute left-3 top-3 text-slate-400 dark:text-slate-500" size={18} />
          </div>
          {errors.number && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.number}</p>}
        </div>

        {/* Name on Card */}
        <div>
          <label className={labelClass}>Name on Card</label>
          <input
            type="text" name="name" placeholder="JOHN DOE"
            value={cardData.name} onChange={handleCardChange}
            className={`px-4 ${inputBaseClass.replace('pl-10', '')} ${getBorderClass(errors.name)}`}
          />
          {errors.name && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-2 gap-5">
          {/* Expiry */}
          <div>
            <label className={labelClass}>Expiry Date</label>
            <div className="relative">
              <input
                type="text" name="expiry" maxLength="5" placeholder="MM/YY"
                value={cardData.expiry} onChange={handleCardChange}
                className={`${inputBaseClass} ${getBorderClass(errors.expiry)}`}
              />
              <Calendar className="absolute left-3 top-3 text-slate-400 dark:text-slate-500" size={18} />
            </div>
            {errors.expiry && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.expiry}</p>}
          </div>

          {/* CVV */}
          <div>
            <label className={labelClass}>CVV</label>
            <div className="relative">
              <input
                type="password" name="cvv" maxLength="3" placeholder="123"
                value={cardData.cvv} onChange={handleCardChange}
                className={`${inputBaseClass} ${getBorderClass(errors.cvv)}`}
              />
              <Lock className="absolute left-3 top-3 text-slate-400 dark:text-slate-500" size={18} />
            </div>
            {errors.cvv && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.cvv}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;