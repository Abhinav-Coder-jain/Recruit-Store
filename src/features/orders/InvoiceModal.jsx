import React from 'react';
import { X, Printer, Download } from 'lucide-react';

const InvoiceModal = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in no-print-bg">
      
      {/* Container: White in Print, Dark in Digital Dark Mode */}
      <div className="print-only w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-950 text-white p-6 flex justify-between items-center print:bg-white print:text-black print:border-b-2 print:border-black shrink-0">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3">
              RecruitStore 
              <span className="text-blue-400 text-xs font-bold px-2 py-0.5 bg-blue-900/50 rounded uppercase tracking-wider no-print border border-blue-500/30">Invoice</span>
            </h2>
            <p className="text-slate-400 text-xs mt-1 font-mono print:text-gray-600">#{order.id}</p>
          </div>
          
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white no-print">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          
          {/* Order Meta Grid */}
          <div className="grid grid-cols-2 gap-8 mb-8 text-sm border-b border-slate-100 dark:border-slate-800 pb-8">
             <div>
                <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider text-xs mb-3">Bill To</p>
                <p className="font-bold text-slate-900 dark:text-white text-lg mb-1">{order.shippingAddress?.fullName || 'Customer'}</p>
                <p className="text-slate-600 dark:text-slate-400">{order.shippingAddress?.address}</p>
                <p className="text-slate-600 dark:text-slate-400">
                  {order.shippingAddress?.city}, {order.shippingAddress?.zipCode}
                </p>
             </div>
             
             <div className="text-right">
                <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider text-xs mb-3">Order Details</p>
                <div className="space-y-1">
                  <p className="text-slate-600 dark:text-slate-400">Date: <span className="font-medium text-slate-900 dark:text-white">{order.createdAt.toLocaleDateString()}</span></p>
                  <p className="text-slate-600 dark:text-slate-400">Payment: <span className="font-medium text-slate-900 dark:text-white capitalize">{order.paymentMethod || 'Wallet'}</span></p>
                  <p className="text-slate-600 dark:text-slate-400">Status: <span className="font-medium text-slate-900 dark:text-white">{order.status}</span></p>
                </div>
             </div>
          </div>
          
          {/* Items Table */}
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
               {order.items.map((item, index) => (
                <tr key={index} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 pl-2 text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded border border-slate-200 dark:border-slate-700 p-1 flex-shrink-0 bg-white">
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

          {/* Totals Section */}
          <div className="flex justify-end">
            <div className="w-64 space-y-3 text-sm bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800 print:bg-transparent print:border-none print:p-0">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span>${(order.amount + (order.discount || 0) - (order.amount * 0.08)).toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Discount</span>
                  <span>-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Tax (8%)</span>
                <span>${(order.amount * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-extrabold text-slate-900 dark:text-white pt-4 border-t border-slate-200 dark:border-slate-700">
                <span>Total</span>
                <span>${order.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 dark:bg-slate-950/50 p-6 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800 no-print shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
          <button 
            onClick={handlePrint}
            className="px-6 py-2.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
          >
            <Printer size={18} /> Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;