
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-black border-l border-white/10 z-[70] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold tracking-tighter italic">YOUR GEAR</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto pr-2 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <ShoppingBag size={48} className="mb-4" />
                  <p className="text-lg">Your cart is empty.</p>
                  <p className="text-sm mono mt-2">Add some power to your regime.</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 h-24 bg-[#111] rounded-lg overflow-hidden shrink-0 border border-white/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-sm uppercase tracking-tight">{item.name}</h3>
                        <p className="mono text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="text-xs text-gray-500 mb-4">{item.category}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-white/10 rounded-md">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:text-white transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-sm mono">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:text-white transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-[10px] text-gray-500 hover:text-red-500 uppercase tracking-widest mono transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="mt-8 border-t border-white/10 pt-8">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400 uppercase tracking-widest text-xs font-bold mono">Total Amount</span>
                  <span className="text-2xl font-bold tracking-tighter">${total.toFixed(2)}</span>
                </div>
                <button className="w-full py-4 bg-white text-black font-bold rounded-md hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm">
                  Proceed to Checkout
                </button>
                <p className="text-center text-[10px] text-gray-600 mt-4 mono">Free shipping on orders over $500</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
