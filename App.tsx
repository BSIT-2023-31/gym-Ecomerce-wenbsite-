
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { ProfileDrawer } from './components/ProfileDrawer';
import { CustomCursor } from './components/CustomCursor';
import { ScrollToTop } from './components/ScrollToTop';
import { ParticleDrift, LightBeams, GridShimmer, SoftAnimatedGradient } from './components/BackgroundEffects';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const handleUpdateQuantity = useCallback((id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  }, []);

  const handleRemoveItem = useCallback((id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Interactive Global Elements */}
      <CustomCursor />
      <ScrollToTop />

      {/* Visual background layers */}
      <SoftAnimatedGradient />
      <GridShimmer />
      <LightBeams />
      <ParticleDrift />

      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />
      
      <main className="relative z-10">
        <Hero />
        
        {/* Product Highlights Section */}
        <div className="border-y border-white/5 py-12 overflow-hidden bg-white/[0.02]">
          <div className="flex whitespace-nowrap animate-marquee">
             {Array.from({ length: 10 }).map((_, i) => (
               <span key={i} className="mx-8 text-[12px] font-bold tracking-[0.4em] uppercase opacity-20 mono">
                 Performance Driven • Minimal Design • Advanced Recovery • Precision Engineering •
               </span>
             ))}
          </div>
        </div>

        <ProductGrid onAddToCart={handleAddToCart} />

        {/* Feature Section */}
        <section id="performance" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl group border border-white/5 shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1614928228253-dc09cbc3b11c?auto=format&fit=crop&q=80&w=1200" 
                alt="Bridge Performance Session" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000 ease-in-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />
              <div className="absolute bottom-10 left-10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-yellow-400 font-bold mono block mb-2 drop-shadow-lg">Field Testing Phase</span>
                <h3 className="text-4xl font-extrabold italic leading-tight tracking-tighter drop-shadow-2xl">THE LAB <br /> PERFORMANCE</h3>
              </div>
            </motion.div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mono block mb-4">Our Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-8 leading-tight italic">ENVIRONMENTAL AGNOSTIC PERFORMANCE.</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed font-light">
                Whether on the track, the gym floor, or urban architecture, Kinetic gear is designed to adapt. We engineer for movement, regardless of the terrain.
              </p>
              <ul className="space-y-4 mb-10">
                {['Hyper-Response Knurling', 'Impact-Neutral Bases', 'Thermal-Regulating Fabrics', 'Kinetic-Stretch Technology'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm mono">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => {
                  const el = document.getElementById('performance');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3 border border-white/20 rounded-md hover:bg-white hover:text-black transition-all uppercase tracking-widest text-xs font-bold"
              >
                Learn our story
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter / Footer Promo */}
        <section className="py-24 border-t border-white/10 bg-gradient-to-b from-transparent to-white/[0.02]">
           <div className="max-w-3xl mx-auto text-center px-4">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-6 italic">JOIN THE INNER CIRCLE</h2>
              <p className="text-gray-500 mb-10 mono text-sm">EXCLUSIVE RELEASES. PERFORMANCE DATA. NO FLUFF.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="EMAIL_ADDRESS" 
                  className="flex-grow bg-black border border-white/10 rounded-md px-6 py-4 focus:outline-none focus:border-white transition-colors mono text-sm"
                />
                <button className="px-10 py-4 bg-white text-black font-bold rounded-md hover:bg-gray-200 transition-colors uppercase tracking-widest text-xs">
                  Connect
                </button>
              </div>
           </div>
        </section>
      </main>

      <footer className="py-12 px-4 border-t border-white/5 text-center">
        <div className="flex justify-center gap-8 mb-8 opacity-40">
           {['X', 'INSTAGRAM', 'YOUTUBE'].map(social => (
             <a key={social} href="#" className="text-[10px] font-bold tracking-widest hover:text-white transition-colors mono">{social}</a>
           ))}
        </div>
        <p className="text-[10px] text-gray-700 tracking-widest mono uppercase">© 2024 Kinetic Elite Performance. All rights reserved. Precision Built.</p>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
      />

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      <ProfileDrawer 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
