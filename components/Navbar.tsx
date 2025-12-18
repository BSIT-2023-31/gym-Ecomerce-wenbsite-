
import React from 'react';
import { ShoppingCart, Search, User, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenSearch, onOpenProfile }) => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <div className="w-4 h-4 bg-black rotate-45" />
              </div>
              <span className="text-xl font-extrabold tracking-tighter uppercase italic">Kinetic</span>
            </a>
            <div className="hidden md:flex space-x-8">
              <a href="#shop" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Shop</a>
              <a href="#performance" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Performance</a>
              <a href="#journal" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Journal</a>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button 
              onClick={onOpenSearch}
              className="text-gray-400 hover:text-white transition-colors hidden sm:block"
            >
              <Search size={20} />
            </button>
            <button 
              onClick={onOpenProfile}
              className="text-gray-400 hover:text-white transition-colors hidden sm:block"
            >
              <User size={20} />
            </button>
            <button 
              onClick={onOpenCart}
              className="relative text-gray-400 hover:text-white transition-colors"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full mono">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="text-gray-400 hover:text-white md:hidden">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
