import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../config/firebase';
import { syncUserProfile, updateWallet } from '../features/auth/userSlice';
import toast from 'react-hot-toast';

// --- API FUNCTIONS ---
const fetchUserWalletFn = async (userId) => {
  if (!userId) return null;
  const userRef = doc(db, "users", userId);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) return null;
  return snapshot.data();
};

const transactionFn = async ({ userId, adjustment }) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    walletBalance: increment(adjustment)
  });
  return adjustment;
};

// --- CUSTOM HOOK ---
export const useWallet = (user) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState("");
  
  // NEW: Track if we are still doing the initial sync
  const [initializing, setInitializing] = useState(true);

  // 1. SYNC: Fetch latest Wallet Data
  const { data: walletData, isLoading: isQueryLoading } = useQuery({
    queryKey: ['wallet', user?.uid],
    queryFn: () => fetchUserWalletFn(user.uid),
    enabled: !!user?.uid,
    onSuccess: () => setInitializing(false), // Stop loading when done
    onError: () => setInitializing(false),   // Stop loading on error too
  });

  // 2. EFFECT: Sync React Query Data to Redux
  useEffect(() => {
    function sync(){
 setInitializing(false);
    }
    if (walletData) {
      dispatch(syncUserProfile({
        walletBalance: walletData.walletBalance || 0,
        isCardLinked: walletData.isCardLinked || false,
        linkedCardLast4: walletData.linkedCardLast4 || '',
        isSubscribed: walletData.isSubscribed || false
      }));
      // Important: Mark initialization as done once data is synced
     sync();
    }
  }, [walletData, dispatch]);

  // 3. MUTATION: Handle Transactions
  const mutation = useMutation({
    mutationFn: transactionFn,
    onSuccess: (adjustment) => {
      const newBalance = (user?.walletBalance || 0) + adjustment;
      dispatch(updateWallet(newBalance));
      queryClient.invalidateQueries(['wallet', user?.uid]);
      toast.success(adjustment > 0 ? "Funds Added Successfully!" : "Withdrawal Successful!");
      setAmount("");
    },
    onError: (error) => {
      console.error("Transaction Error:", error);
      toast.error("Transaction Failed");
    }
  });

  const performTransaction = (type) => {
    const val = parseFloat(amount);
    if (!val || val <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    // Logic check: Withdrawals cannot exceed balance
    if (type === 'withdraw' && val > (user?.walletBalance || 0)) {
      toast.error("Insufficient Funds");
      return;
    }

    const adjustment = type === 'deposit' ? val : -val;
    mutation.mutate({ userId: user.uid, adjustment });
  };

  return { 
    amount, 
    setAmount, 
    loading: mutation.isPending, 
    initializing: initializing || isQueryLoading, // Expose initialization state
    performTransaction 
  };
};