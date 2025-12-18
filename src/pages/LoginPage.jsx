import React from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import AuthLayout from '../features/auth/AuthLayout';
import { Loader2, Mail, Lock, ArrowRight, LogIn } from 'lucide-react';

const LoginPage = () => {
  // Logic extracted to hook
  const { form: { register, handleSubmit, formState: { errors } }, handleLogin, isLoading } = useLogin();

  const inputClass = "w-full pl-10 pr-4 py-3 border rounded-xl outline-none transition-all bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-400";
  const labelClass = "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5";

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Access your premium dashboard, manage your wallet, and explore exclusive VIP deals."
      image="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1674&q=80"
    >
      <div className="text-center lg:text-left">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
          <LogIn size={24} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Sign in to your account</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Welcome back! Please enter your details.</p>
      </div>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
        
        {/* Email Field */}
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

        {/* Password Field */}
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
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/30 dark:shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <>Sign In <ArrowRight size={18} /></>}
        </button>
      </form>

      <p className="text-center text-sm text-slate-600 dark:text-slate-400">
        Don't have an account?{' '}
        <Link to="/signup" className="font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline transition-all">
          Sign up for free
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;