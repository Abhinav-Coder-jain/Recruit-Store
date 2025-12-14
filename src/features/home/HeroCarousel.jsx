import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Welcome to RecruitStore",
    desc: "Discover the latest tech, fashion, and accessories at unbeatable prices.",
    btnText: "Shop Now",
    link: "/products",
    lightColor: "bg-gradient-to-br from-blue-600 to-indigo-700",
    darkColor: "dark:from-blue-900 dark:to-slate-900" 
  },
  {
    id: 2,
    title: "Join the VIP Club",
    desc: "Get 20% OFF instantly on all products. Upgrade your lifestyle today.",
    btnText: "Go Premium",
    link: "/subscription",
    lightColor: "bg-gradient-to-br from-orange-600 to-red-700",
    darkColor: "dark:from-slate-900 dark:to-amber-900/50"
  },
  {
    id: 3,
    title: "Seamless Wallet Payments",
    desc: "Experience lightning-fast checkout with our secure wallet system.",
    btnText: "Manage Funds",
    link: "/wallet",
    lightColor: "bg-gradient-to-br from-purple-600 to-fuchsia-700",
    darkColor: "dark:from-indigo-950 dark:to-purple-950"
  }
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 3000); 
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((current + 1) % slides.length);
  const prevSlide = () => setCurrent((current - 1 + slides.length) % slides.length);

  return (
    <div className="relative mx-auto mt-6 mb-12 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 dark:shadow-none h-[380px] md:h-[450px] group border border-slate-200 dark:border-slate-800">
      
      {/* SLIDES */}
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out transform ${index === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}`}
        >
          <div className={`w-full h-full ${slide.lightColor} dark:bg-gradient-to-br ${slide.darkColor} flex flex-col justify-center items-center text-center text-white px-4 md:px-20 transition-colors duration-500`}>
            
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-md animate-slide-up">
              {slide.title}
            </h1>
            
            <p className="text-white/95 text-lg md:text-xl mb-10 max-w-2xl font-medium animate-fade-in delay-100 leading-relaxed drop-shadow-sm">
              {slide.desc}
            </p>
            
            <Link 
              to={slide.link} 
              className="group bg-white text-slate-900 font-bold py-3.5 px-8 rounded-full hover:scale-105 hover:shadow-xl transition-all animate-bounce-in delay-200 flex items-center gap-2"
            >
              {slide.btnText} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-current" />
            </Link>
          </div>

          {/* Abstract Shapes */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white opacity-10 dark:opacity-5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-white opacity-10 dark:opacity-5 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      ))}

      {/* CONTROLS (Updated: Z-Index 30 ensures they are ALWAYS on top) */}
      
      {/* Left Button */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full  text-white backdrop-blur-md hover:bg-black/50 transition-all transform hover:scale-110 shadow-lg border border-white/10"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Right Button */}
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full  text-white backdrop-blur-md hover:bg-black/50 transition-all transform hover:scale-110 shadow-lg border border-white/10"
      >
        <ChevronRight size={16} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${index === current ? 'bg-white w-8 opacity-100' : 'bg-white/50 w-2 hover:bg-white hover:opacity-100'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;