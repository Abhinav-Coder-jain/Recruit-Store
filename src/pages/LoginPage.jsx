import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../lib/validators';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { authStart, authSuccess, authFailure } from '../features/auth/userSlice';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2, Mail, Lock, ArrowRight, LogIn } from 'lucide-react';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.user);
  const toastShownRef = useRef(false);

  useEffect(() => {
    if (location.state?.message && !toastShownRef.current) {
      toast.error(location.state.message);
      toastShownRef.current = true;
    }
  }, [location.state]);

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    dispatch(authStart());
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      
      dispatch(authSuccess({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      }));

      toast.success("Welcome back!");

      const destination = location.state?.from?.pathname || "/products";
      navigate(destination, { replace: true });

    } catch (error) {
      const errorMessage = error.message.includes("invalid-credential") 
        ? "Invalid email or password" 
        : error.message;
      
      dispatch(authFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  const inputClass = "w-full pl-10 pr-4 py-3 border rounded-xl outline-none transition-all bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-400";
  const labelClass = "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5";

  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* LEFT: Branding/Image Section (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1674&q=80" 
          alt="Login Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-20 text-center px-12">
          <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight">Welcome Back</h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Access your premium dashboard, manage your wallet, and explore exclusive VIP deals.
          </p>
        </div>
      </div>

      {/* RIGHT: Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
              <LogIn size={24} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Sign in to your account</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Email */}
            <div>
              <label className={labelClass}>Email</label>
              <div className="relative">
                <input 
                  {...register("email")}
                  type="email" 
                  className={`${inputClass} ${errors.email ? 'border-rose-500' : ''}`}
                  placeholder="john@example.com"
                />
                <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
              </div>
              {errors.email && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                <Link to="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">Forgot password?</Link>
              </div>
              <div className="relative">
                <input 
                  {...register("password")}
                  type="password" 
                  className={`${inputClass} ${errors.password ? 'border-rose-500' : ''}`}
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
              </div>
              {errors.password && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.password.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/30 dark:shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <>Sign In <ArrowRight size={18} /></>}
            </button>

          </form>

          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline transition-all">
              Sign up for free
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default LoginPage;