import React from 'react';

const InvoiceItemsTable = ({ items }) => {
  return (
    <table className="w-full mb-8 text-sm">
      <thead>
        <tr className="border-b border-slate-200 dark:border-slate-700 text-left">
          <th className="py-3 font-bold text-slate-900 dark:text-white pl-2">Item</th>
          <th className="py-3 font-bold text-slate-900 dark:text-white text-center">Qty</th>
          <th className="py-3 font-bold text-slate-900 dark:text-white text-right">Price</th>
          <th className="py-3 font-bold text-slate-900 dark:text-white text-right pr-2">Total</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
         <tr key={index} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
           <td className="py-4 pl-2 text-slate-700 dark:text-slate-300">
             <div className="flex items-center gap-3">
               {/* Optional: Hide image in print to save ink, or keep it. Keeping for now. */}
               <div className="w-10 h-10 rounded border border-slate-200 dark:border-slate-700 p-1 flex-shrink-0 bg-white print:hidden">
                 {item.image && <img src={item.image} alt="" className="w-full h-full object-contain" />}
               </div>
               <span className="font-medium max-w-[180px] sm:max-w-xs truncate">{item.title}</span>
             </div>
           </td>
           <td className="py-4 text-center text-slate-600 dark:text-slate-400">{item.quantity}</td>
           <td className="py-4 text-right text-slate-600 dark:text-slate-400">${item.price.toFixed(2)}</td>
           <td className="py-4 text-right font-bold text-slate-900 dark:text-white pr-2">${(item.price * item.quantity).toFixed(2)}</td>
         </tr>
        ))}
      </tbody>
   </table>
  );
};

export default InvoiceItemsTable;