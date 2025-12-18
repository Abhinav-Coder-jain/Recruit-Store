import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../config/firebase';
import { updateWallet, setSubscriptionStatus } from '../features/auth/userSlice';
import toast from 'react-hot-toast';


const upgradeSubscriptionFn = async ({ userId, cost }) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    walletBalance: increment(-cost),
    isSubscribed: true,
  });
  return cost; 
};


export const useSubscription = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const PREMIUM_COST = 49.99;

  
  const mutation = useMutation({
    mutationFn: upgradeSubscriptionFn,
    
   
    onSuccess: (cost) => {
      
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

  
  const handleUpgrade = () => {
   
    if (user.isSubscribed) {
      toast.success("You are already a Premium Member!");
      return;
    }

    if (user.walletBalance < PREMIUM_COST) {
      toast.error("Insufficient Wallet Balance. Please deposit funds first.");
      navigate("/wallet");
      return;
    }

    
    mutation.mutate({ userId: user.uid, cost: PREMIUM_COST });
  };

  return { 
    handleUpgrade, 
    loading: mutation.isPending, 
    user, 
    PREMIUM_COST 
  };
};