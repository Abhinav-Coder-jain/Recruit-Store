import React, { useState } from 'react';
import { CreditCard, X } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { authSuccess } from '../../features/auth/userSlice';
import toast from 'react-hot-toast';

// 1. REUSE the existing component
import CreditCardForm from '../checkout/CreditCardForm';

const LinkCardModal = ({ onClose }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Form State
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({}); // Added for validation feedback

  // Reuse the same change handler logic
  const handleChange = (e) => {
    let val = e.target.value;
    if (e.target.name === 'number') val = val.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    if (e.target.name === 'expiry') val = val.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1/').slice(0, 5);
    
    setCard({ ...card, [e.target.name]: val });
    
    // Clear error when typing
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const handleLinkCard = async (e) => {
    e.preventDefault();

    // Basic Validation
    const newErrors = {};
    if (card.number.length < 19) newErrors.number = "Invalid Card Number";
    if (!card.name) newErrors.name = "Name Required";
    if (card.expiry.length < 5) newErrors.expiry = "Invalid Date";
    if (card.cvv.length < 3) newErrors.cvv = "Invalid CVV";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const userRef = doc(db, 'users', user.uid);
      
      const updatedData = {
        isCardLinked: true,
        linkedCardLast4: card.number.slice(-4) 
      };

      await updateDoc(userRef, updatedData);
      dispatch(authSuccess({ ...user, ...updatedData }));

      toast.success("Card Linked Successfully!");
      onClose();

    } catch (error) {
      console.error(error);
      toast.error("Failed to link card");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="bg-slate-50 dark:bg-slate-950/50 p-6 flex justify-between items-center border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <CreditCard className="text-blue-600" /> Link Your Card
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500">
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
            To activate your wallet and enable deposits, please link a valid credit or debit card.
          </p>

          {/* 2. RENDER THE REUSED COMPONENT */}
          {/* We pass a custom className or wrap it to remove the default margin-top if needed, 
              but standard spacing usually looks fine. */}
          <div className="-mt-4"> 
            <CreditCardForm 
              cardData={card} 
              handleCardChange={handleChange} 
              errors={errors} 
            />
          </div>

          <button 
            onClick={handleLinkCard}
            disabled={loading}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Verifying..." : "Securely Link Card"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkCardModal;