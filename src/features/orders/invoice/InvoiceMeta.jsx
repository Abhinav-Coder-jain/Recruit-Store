import React from 'react';

const InvoiceMeta = ({ order }) => {
  return (
    <div className="grid grid-cols-2 gap-8 mb-8 text-sm border-b border-slate-100 dark:border-slate-800 pb-8">
      {/* Bill To */}
      <div>
         <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider text-xs mb-3">Bill To</p>
         <p className="font-bold text-slate-900 dark:text-white text-lg mb-1">{order.shippingAddress?.fullName || 'Customer'}</p>
         <p className="text-slate-600 dark:text-slate-400">{order.shippingAddress?.address}</p>
         <p className="text-slate-600 dark:text-slate-400">
           {order.shippingAddress?.city}, {order.shippingAddress?.zipCode}
         </p>
      </div>
      
      {/* Order Details */}
      <div className="text-right">
         <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider text-xs mb-3">Order Details</p>
         <div className="space-y-1">
           <p className="text-slate-600 dark:text-slate-400">Date: <span className="font-medium text-slate-900 dark:text-white">{order.createdAt.toLocaleDateString()}</span></p>
           <p className="text-slate-600 dark:text-slate-400">Payment: <span className="font-medium text-slate-900 dark:text-white capitalize">{order.paymentMethod || 'Wallet'}</span></p>
           <p className="text-slate-600 dark:text-slate-400">Status: <span className="font-medium text-slate-900 dark:text-white">{order.status}</span></p>
         </div>
      </div>
   </div>
  );
};

export default InvoiceMeta;