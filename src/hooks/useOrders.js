import { useQuery } from '@tanstack/react-query';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const fetchOrdersFn = async (userId) => {
  if (!userId) return [];
  
  const ordersRef = collection(db, "orders");
  const q = query(ordersRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  const orders = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      // Handle Firebase Timestamp conversion safely
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt || Date.now()) 
    };
  });

  // Sort by Newest First
  return orders.sort((a, b) => b.createdAt - a.createdAt);
};

export const useOrders = (user) => {
  return useQuery({
    queryKey: ['orders', user?.uid],
    queryFn: () => fetchOrdersFn(user?.uid),
    enabled: !!user?.uid, // Only fetch if user is logged in
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};  