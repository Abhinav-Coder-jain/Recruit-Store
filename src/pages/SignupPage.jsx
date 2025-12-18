import React from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';
import AuthLayout from '../features/auth/AuthLayout';
import { Loader2, User, Mail, Lock, ArrowRight } from 'lucide-react';

const SignupPage = () => {
 
  const { form: { register, handleSubmit, formState: { errors } }, handleSignup, isLoading } = useSignup();

  const inputClass = "w-full pl-10 pr-4 py-3 border rounded-xl outline-none transition-all bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-400";
  const labelClass = "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5";

  return (
    <AuthLayout
      title="Join the Club"
      subtitle="Create an account today to unlock exclusive member pricing, fast shipping, and a secure digital wallet."
      image="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
    >
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Create an account</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Start your journey with us today.</p>
      </div>

      <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
        
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
          disabled={isLoading}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/30 dark:shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <>Create Account <ArrowRight size={18} /></>}
        </button>
      </form>

      <p className="text-center text-sm text-slate-600 dark:text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline transition-all">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignupPage;