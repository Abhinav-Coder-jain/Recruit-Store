import React from 'react';
import InvoiceHeader from './invoice/InvoiceHeader';
import InvoiceMeta from './invoice/InvoiceMeta';
import InvoiceItemsTable from './invoice/InvoiceItemsTable';
import InvoiceTotals from './invoice/InvoiceTotals';
import InvoiceFooter from './invoice/InvoiceFooter';

const InvoiceModal = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in no-print-bg">
      
      {/* Main Card */}
      <div className="print-only w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* 1. Header */}
        <InvoiceHeader 
          orderId={order.id} 
          onClose={onClose} 
        />

        {/* Scrollable Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          
          {/* 2. Metadata */}
          <InvoiceMeta order={order} />
          
          {/* 3. Items Table */}
          <InvoiceItemsTable items={order.items} />

          {/* 4. Totals Calculation */}
          <InvoiceTotals 
            amount={order.amount} 
            discount={order.discount} 
          />
        
        </div>

        {/* 5. Footer Actions */}
        <InvoiceFooter 
          onClose={onClose} 
          onPrint={handlePrint} 
        />

      </div>
    </div>
  );
};

export default InvoiceModal;