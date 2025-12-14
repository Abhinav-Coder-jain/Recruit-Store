import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../lib/validators';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { authStart, authSuccess, authFailure } from '../features/auth/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2, User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    dispatch(authStart());
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: data.fullName });

      await setDoc(doc(db, "users", user.uid), {
        name: data.fullName,
        email: data.email,
        walletBalance: 0,
        isSubscribed: false,
        cart: [],
        orders: []
      });

      dispatch(authSuccess({
        uid: user.uid,
        email: user.email,
        displayName: data.fullName,
        walletBalance: 0,
        isSubscribed: false
      }));

      toast.success("Account created! Welcome aboard.");
      navigate('/'); 
    } catch (error) {
      const errorMessage = error.message.includes("email-already-in-use") 
        ? "This email is already registered." 
        : error.message;
      
      dispatch(authFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  const inputClass = "w-full pl-10 pr-4 py-3 border rounded-xl outline-none transition-all bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-400";
  const labelClass = "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5";

  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* LEFT: Branding/Image Section */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-blue-600/20 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80" 
          alt="Signup Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-20 text-center px-12">
          <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight">Join the Club</h1>
          <p className="text-xl text-slate-300 leading-relaxed mb-8">
            Create an account today to unlock exclusive member pricing, fast shipping, and a secure digital wallet.
          </p>
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm">
                <ShieldCheck size={16} className="text-emerald-400" /> Secure Payments
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm">
                <User size={16} className="text-blue-400" /> VIP Access
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Create an account</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Start your journey with us today.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className={labelClass}>Full Name</label>
              <div className="relative">
                <input 
                  {...register("fullName")}
                  type="text" 
                  className={`${inputClass} ${errors.fullName ? 'border-rose-500' : ''}`}
                  placeholder="John Doe"
                />
                <User className="absolute left-3 top-3.5 text-slate-400" size={18} />
              </div>
              {errors.fullName && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.fullName.message}</p>}
            </div>

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
              <label className={labelClass}>Password</label>
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

            {/* Confirm Password */}
            <div>
              <label className={labelClass}>Confirm Password</label>
              <div className="relative">
                <input 
                  {...register("confirmPassword")}
                  type="password" 
                  className={`${inputClass} ${errors.confirmPassword ? 'border-rose-500' : ''}`}
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
              </div>
              {errors.confirmPassword && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.confirmPassword.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/30 dark:shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <>Create Account <ArrowRight size={18} /></>}
            </button>

          </form>

          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline transition-all">
              Log in
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default SignupPage;