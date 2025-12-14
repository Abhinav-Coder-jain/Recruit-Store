import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../config/firebase';
import { updateWallet, setSubscriptionStatus } from '../features/auth/userSlice';
import toast from 'react-hot-toast';

// 1. Pure Async Function (The Mutation)
// This only handles the "Server Side" logic (Firestore)
const upgradeSubscriptionFn = async ({ userId, cost }) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    walletBalance: increment(-cost),
    isSubscribed: true,
  });
  return cost; // Return cost to use it in onSuccess if needed
};

// 2. The Custom Hook
export const useSubscription = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const PREMIUM_COST = 49.99;

  // React Query Mutation
  const mutation = useMutation({
    mutationFn: upgradeSubscriptionFn,
    
    // 3. Side Effects (Redux, Toast, Navigation) happen here
    onSuccess: (cost) => {
      // Update Client State (Redux) immediately
      dispatch(updateWallet(user.walletBalance - cost));
      dispatch(setSubscriptionStatus(true));

      toast.success("Welcome to the VIP Club!", { icon: "👑" });
      navigate("/products");
    },
    onError: (error) => {
      console.error("Subscription Error:", error);
      toast.error("Transaction Failed. Please try again.");
    }
  });

  // 4. The Trigger Function
  const handleUpgrade = () => {
    // Validation Logic (Client Side)
    if (user.isSubscribed) {
      toast.success("You are already a Premium Member!");
      return;
    }

    if (user.walletBalance < PREMIUM_COST) {
      toast.error("Insufficient Wallet Balance. Please deposit funds first.");
      navigate("/wallet");
      return;
    }

    // Trigger the mutation
    mutation.mutate({ userId: user.uid, cost: PREMIUM_COST });
  };

  return { 
    handleUpgrade, 
    loading: mutation.isPending, // React Query handles the loading state automatically
    user, 
    PREMIUM_COST 
  };
};