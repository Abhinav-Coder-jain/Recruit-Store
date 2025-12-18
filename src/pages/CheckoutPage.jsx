import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../features/cart/cartSlice';
import { updateWallet } from '../features/auth/userSlice';
import { doc, runTransaction, serverTimestamp, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import toast from 'react-hot-toast';
import { ShieldCheck } from 'lucide-react';

import ShippingForm from '../features/checkout/ShippingForm';
import CreditCardForm from '../features/checkout/CreditCardForm';
import CheckoutSummary from '../features/checkout/CheckoutSummary';

const CheckoutPage = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('wallet'); 

  
  const [formData, setFormData] = useState({
    fullName: user?.displayName || "",
    address: "",
    city: "",
    zipCode: "",
    country: "India"
  });

  // Card State
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [cardErrors, setCardErrors] = useState({});

  // 1. CALCULATE TOTALS
  const tax = totalAmount * 0.08;
  const grossTotal = totalAmount + tax;
  
  const discountAmount = paymentMethod === 'wallet' ? grossTotal * 0.05 : 0;
  const finalTotal = grossTotal - discountAmount;

  // Handlers
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleCardChange = (e) => {
    let val = e.target.value;
    if (e.target.name === 'number') val = val.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    if (e.target.name === 'expiry') val = val.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1/').slice(0, 5);
    
    setCardData({ ...cardData, [e.target.name]: val });
    if (cardErrors[e.target.name]) setCardErrors({ ...cardErrors, [e.target.name]: null });
  };

  // Validation Logic
  const validateForm = () => {
    if (!formData.address || !formData.city || !formData.zipCode) {
      toast.error("Please fill in all shipping details");
      return false;
    }

    if (paymentMethod === 'card') {
      const errors = {};
      if (cardData.number.replace(/\s/g, '').length < 16) errors.number = "Invalid Card Number";
      if (!cardData.name) errors.name = "Name required";
      if (cardData.expiry.length < 5) errors.expiry = "Invalid Date";
      if (cardData.cvv.length < 3) errors.cvv = "Invalid CVV";
      
      if (Object.keys(errors).length > 0) {
        setCardErrors(errors);
        toast.error("Please fix card errors");
        return false;
      }
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      await runTransaction(db, async (transaction) => {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await transaction.get(userRef);
        if (!userDoc.exists()) throw "User does not exist!";

        const currentBalance = userDoc.data().walletBalance || 0;

        if (paymentMethod === 'wallet') {
           if (currentBalance < finalTotal) {
             throw new Error("Insufficient funds! Transaction rejected.");
           }
           const newBalance = currentBalance - finalTotal;
           transaction.update(userRef, { walletBalance: newBalance });
        }
        
        transaction.update(userRef, { 
          cart: { items: [], totalQuantity: 0, totalAmount: 0 } 
        });

        const orderRef = doc(collection(db, "orders"));
        transaction.set(orderRef, {
          userId: user.uid,
          items: items,
          amount: finalTotal,
          discount: discountAmount,
          paymentMethod: paymentMethod,
          shippingAddress: formData,
          status: 'Processing',
          createdAt: serverTimestamp()
        });
      });

      if (paymentMethod === 'wallet') {
        dispatch(updateWallet(user.walletBalance - finalTotal));
      }
      dispatch(clearCart());
      
      toast.success("Order Placed Successfully!");
      navigate('/orders'); 

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Order Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 transition-colors duration-300">
      <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-8 flex items-center gap-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <ShieldCheck className="text-blue-600 dark:text-blue-400" size={24} />
        </div>
        Secure Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* LEFT: Forms */}
        <div className="lg:col-span-2 space-y-6">
           <ShippingForm formData={formData} handleChange={handleInputChange} />
           
           {paymentMethod === 'card' && (
             <CreditCardForm 
                cardData={cardData} 
                handleCardChange={handleCardChange} 
                errors={cardErrors}
             />
           )}
        </div>

        {/* RIGHT: Order Summary */}
        <div className="lg:col-span-1">
          <CheckoutSummary 
            items={items}
            total={totalAmount}
            tax={tax}
            finalTotal={finalTotal}
            discountAmount={discountAmount}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            userBalance={user?.walletBalance || 0}
            loading={loading}
            onPlaceOrder={handlePlaceOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;