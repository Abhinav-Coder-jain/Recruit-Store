
const AuthLayout = ({ title, subtitle, image, children }) => {
  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* LEFT: Branding/Image Section */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10"></div>
        <img 
          src={image} 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-20 text-center px-12">
          <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight">{title}</h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>



      {/* RIGHT: Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {children}
        </div>
      </div>

    </div>
  );
};

export default AuthLayout;