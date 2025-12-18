import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { authSuccess, logoutUser } from './userSlice';
import { setCart } from '../cart/cartSlice';
import { Loader2 } from 'lucide-react';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("AuthProvider: Session Found:", user.uid);
        
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            
            // 1. Restore User
            dispatch(authSuccess({
              uid: user.uid,
              email: user.email,
              displayName: userData.name || user.displayName,
              walletBalance: userData.walletBalance || 0,
              isSubscribed: userData.isSubscribed || false
            }));

           
            if (userData.cart) {
              
              const cartItems = userData.cart.items || userData.cart;
              if (Array.isArray(cartItems)) {
                console.log("AuthProvider: Restoring cart with", cartItems.length, "items");
                dispatch(setCart(cartItems));
              }
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        dispatch(logoutUser());
      }
      setIsInitializing(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return children;
};

export default AuthProvider;