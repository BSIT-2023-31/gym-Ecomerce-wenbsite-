
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ThreeHeroBackground } from './ThreeBackground';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* 3D Animated Background */}
      <ThreeHeroBackground />

      <motion.div style={{ opacity }} className="relative z-10 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 mb-6 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-gray-400 bg-white/5 backdrop-blur-sm mono">
            Peak Performance Systems
          </span>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[0.9] italic">
            BUILT FOR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">HUMANS.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Engineered for the elite. Minimalist aesthetics meeting industrial-grade durability. Elevate your physical baseline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => scrollToSection('shop')}
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-md overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                BROWSE GEAR <ArrowRight size={18} />
              </span>
              <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform" />
            </button>
            <button 
              onClick={() => scrollToSection('performance')}
              className="px-8 py-4 bg-black border border-white/10 text-white font-bold rounded-md hover:bg-white/5 transition-all"
            >
              PERFORMANCE LAB
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Parallax Background Shape */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-5 z-0"
      >
        <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full scale-125">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 0.15 }} />
              <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <motion.path 
            d="M500,50 L950,500 L500,950 L50,500 Z" 
            fill="url(#grad1)"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 0.95, 1]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </motion.div>

      {/* Floating Dynamic Visual */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute right-[-5%] bottom-[-5%] w-[50%] opacity-10 pointer-events-none hidden lg:block"
      >
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200" alt="Studio workout session" className="rounded-3xl grayscale brightness-50 contrast-125" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
