import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const useCartSync = () => {
  const { user } = useSelector((state) => state.user);
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);

  useEffect(() => {
    // 1. Don't run if no user
    if (!user?.uid) return;

    // 2. SAFETY: Ensure items is an array
    const currentItems = Array.isArray(items) ? items : [];

    // 3. NUCLEAR SANITIZATION
    // We create the payload object first
    const payload = {
      cart: {
        items: currentItems.map(item => ({
          id: item.id || "",
          title: item.title || "Unknown Product",
          price: Number(item.price) || 0,
          image: item.image || "",
          quantity: Number(item.quantity) || 1
        })),
        totalQuantity: totalQuantity || 0,
        totalAmount: totalAmount || 0
      }
    };

    // 4. THE TRICK: deeply remove any remaining 'undefined' values
    // This converts the object to a string and back, stripping 'undefined' keys.
    const cleanPayload = JSON.parse(JSON.stringify(payload));

    const saveCartToFirebase = async () => {
      try {
        const cartRef = doc(db, 'users', user.uid);
        // Now we send cleanPayload, which is guaranteed to be safe
        await setDoc(cartRef, cleanPayload, { merge: true });
        // console.log("Cart synced safely");
      } catch (error) {
        console.error("Error syncing cart:", error);
      }
    };

    const timeoutId = setTimeout(() => {
      saveCartToFirebase();
    }, 1000);

    return () => clearTimeout(timeoutId);

  }, [items, totalQuantity, totalAmount, user]);
};

export default useCartSync;