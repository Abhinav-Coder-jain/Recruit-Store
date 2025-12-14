import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Loader2, Package, Clock, CheckCircle, ShoppingBag, Calendar, Wallet, CreditCard, Sparkles, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import InvoiceModal from '../features/orders/InvoiceModal';

const OrdersPage = () => {
  const { user } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const ordersData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date() 
          };
        });

        ordersData.sort((a, b) => b.createdAt - a.createdAt);
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white dark:bg-slate-950 transition-colors duration-300">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-6 animate-bounce-short">
          <Package size={48} className="text-slate-400 dark:text-slate-500" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">No orders yet</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm text-lg">
          You haven't placed any orders yet. Start shopping to see your history here.
        </p>
        <Link 
          to="/products" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 dark:shadow-blue-900/20 hover:shadow-xl hover:-translate-y-0.5"
        >
          Browse Products
        </Link>
      </div>
    );
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
          <div key={order.id} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden animate-fade-in transition-colors duration-300">
            
            {/* Header */}
            <div className="bg-slate-50 dark:bg-slate-950/50 px-6 py-4 flex flex-wrap gap-4 justify-between items-center border-b border-slate-100 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                
                {/* Date */}
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">Placed On</p>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
                    <Calendar size={14} className="text-slate-400" />
                    {order.createdAt.toLocaleDateString()}
                  </div>
                </div>

                {/* Total */}
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">Total</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">${order.amount.toFixed(2)}</p>
                    {order.discount > 0 && (
                      <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <Sparkles size={10} /> Saved ${order.discount.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Payment */}
                <div className="hidden sm:block">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">Payment</p>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                    {order.paymentMethod === 'wallet' ? (
                      <><Wallet size={14} className="text-blue-600 dark:text-blue-400" /> Wallet</>
                    ) : (
                      <><CreditCard size={14} className="text-purple-600 dark:text-purple-400" /> Card</>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                order.status === 'Delivered' 
                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' 
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
              }`}>
                {order.status === 'Delivered' ? <CheckCircle size={14} /> : <Clock size={14} />}
                {order.status}
              </div>
            </div>

            {/* Items */}
            <div className="p-6 space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 p-2 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1 text-sm sm:text-base">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Qty: {item.quantity} × ${item.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Footer Actions */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/30 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-400 font-mono">ID: {order.id.slice(0, 8)}...</span>
              <button 
                onClick={() => setSelectedOrder(order)} 
                className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <FileText size={16} /> View Invoice
              </button>
            </div>

          </div>
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