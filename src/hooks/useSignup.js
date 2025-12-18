import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query'; // React Query
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { authSuccess, authFailure } from '../features/auth/userSlice';
import { signupSchema } from '../lib/validators';
import toast from 'react-hot-toast';

// 1. The Async Function
const signupFn = async ({ email, password, fullName }) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Update Auth Profile
  await updateProfile(user, { displayName: fullName });

  // Create Firestore Document
  await setDoc(doc(db, "users", user.uid), {
    name: fullName,
    email: email,
    walletBalance: 0,
    isSubscribed: false,
    cart: [],
    orders: []
  });

  return { user, fullName };
};

// 2. The Hook
export const useSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signupSchema),
  });

  // React Query Mutation
  const mutation = useMutation({
    mutationFn: signupFn,
    onSuccess: ({ user, fullName }) => {
      dispatch(authSuccess({
        uid: user.uid,
        email: user.email,
        displayName: fullName,
        walletBalance: 0,
        isSubscribed: false
      }));
      toast.success("Account created! Welcome aboard.");
      navigate('/'); 
    },
    onError: (error) => {
      const errorMessage = error.message.includes("email-already-in-use") 
        ? "This email is already registered." 
        : error.message;
      dispatch(authFailure(errorMessage));
      toast.error(errorMessage);
    }
  });

  return { 
    form, 
    handleSignup: (data) => mutation.mutate(data), 
    isLoading: mutation.isPending 
  };
};