
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';

interface ProductGridProps {
  onAddToCart: (p: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const categories = ['ALL', 'EQUIPMENT', 'CARDIO', 'APPAREL', 'RECOVERY'];

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'ALL') return PRODUCTS;
    return PRODUCTS.filter(p => p.category.toUpperCase() === activeCategory);
  }, [activeCategory]);

  return (
    <section id="shop" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold mono">Precision Selection</span>
          <h2 className="text-3xl font-bold tracking-tight">FEATURED GEAR</h2>
        </div>
        <div className="flex flex-wrap gap-4 md:gap-8 border-b border-white/5 pb-2">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] font-bold tracking-widest transition-all mono pb-2 relative ${
                activeCategory === cat ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <AnimatePresence mode='popLayout'>
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="group relative"
            >
              <div className="relative aspect-square overflow-hidden bg-[#0a0a0a] rounded-xl border border-white/5">
                <div className="shimmer-grid absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" />
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                
                <button 
                  onClick={() => onAddToCart(product)}
                  className="absolute bottom-4 right-4 p-3 bg-white text-black rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl"
                >
                  <Plus size={20} />
                </button>
              </div>
              
              <div className="mt-4 flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-sm group-hover:text-white transition-colors uppercase tracking-tight italic">{product.name}</h3>
                  <p className="text-[10px] text-gray-500 mono uppercase tracking-widest mt-1">{product.category}</p>
                </div>
                <p className="font-bold mono text-sm">${product.price.toFixed(2)}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-24 opacity-30">
          <p className="mono uppercase tracking-[0.2em]">No performance gear in this category yet.</p>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
