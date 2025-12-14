import React from 'react';
import { X } from 'lucide-react';

const InvoiceHeader = ({ orderId, onClose }) => {
  return (
    <div className="bg-slate-950 text-white p-6 flex justify-between items-center print:bg-white print:text-black print:border-b-2 print:border-black shrink-0">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-3">
          RecruitStore 
          <span className="text-blue-400 text-xs font-bold px-2 py-0.5 bg-blue-900/50 rounded uppercase tracking-wider no-print border border-blue-500/30">Invoice</span>
        </h2>
        <p className="text-slate-400 text-xs mt-1 font-mono print:text-gray-600">
          #{orderId}
        </p>
      </div>
      
      <button 
        onClick={onClose} 
        className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white no-print"
      >
        <X size={24} />
      </button>
    </div>
  );
};

export default InvoiceHeader;