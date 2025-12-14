import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useOrders } from '../hooks/useOrders';
import { Loader2, ShoppingBag } from 'lucide-react';

// Sub-Components
import OrderCard from '../features/orders/OrderCard';
import EmptyOrdersState from '../features/orders/EmptyOrdersState';
import InvoiceModal from '../features/orders/InvoiceModal';

const OrdersPage = () => {
  const { user } = useSelector((state) => state.user);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Custom Hook
  const { data: orders = [], isLoading } = useOrders(user);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white dark:bg-slate-950 transition-colors duration-300">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  if (orders.length === 0) {
    return <EmptyOrdersState />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <ShoppingBag className="text-blue-600 dark:text-blue-400" size={24} />
        </div>
        My Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard 
            key={order.id} 
            order={order} 
            onViewInvoice={setSelectedOrder} 
          />
        ))}
      </div>

      {selectedOrder && (
        <InvoiceModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
  );
};

export default OrdersPage;