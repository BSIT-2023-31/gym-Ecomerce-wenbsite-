
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const ParticleDrift: React.FC = () => {
  const particles = useMemo(() => Array.from({ length: 30 }), []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/10 rounded-full"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight 
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export const LightBeams: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse delay-700" />
    </div>
  );
};

export const GridShimmer: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="shimmer-grid absolute inset-0 opacity-5" />
    </div>
  );
};

export const SoftAnimatedGradient: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[-25%] left-[-25%] w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0,transparent_70%)]"
      />
    </div>
  );
};
