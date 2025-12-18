import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query'; // React Query
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { authSuccess, authFailure } from '../features/auth/userSlice';
import { loginSchema } from '../lib/validators';
import toast from 'react-hot-toast';

// 1. The Async Function
const loginFn = async ({ email, password }) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// 2. The Hook
export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const toastShownRef = useRef(false);

  // Handle Redirect Messages
  useEffect(() => {
    if (location.state?.message && !toastShownRef.current) {
      toast.error(location.state.message);
      toastShownRef.current = true;
    }
  }, [location.state]);

  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  // React Query Mutation
  const mutation = useMutation({
    mutationFn: loginFn,
    onSuccess: (user) => {
      dispatch(authSuccess({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      }));
      toast.success("Welcome back!");
      const destination = location.state?.from?.pathname || "/products";
      navigate(destination, { replace: true });
    },
    onError: (error) => {
      const errorMessage = error.message.includes("invalid-credential") 
        ? "Invalid email or password" 
        : error.message;
      dispatch(authFailure(errorMessage));
      toast.error(errorMessage);
    }
  });

  return { 
    form, 
    handleLogin: (data) => mutation.mutate(data), 
    isLoading: mutation.isPending 
  };
};