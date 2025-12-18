
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Command } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-black/80 backdrop-blur-xl"
        >
          <div 
            className="absolute inset-0" 
            onClick={onClose} 
          />
          <motion.div
            initial={{ y: -20, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -20, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center px-6 py-4 border-b border-white/5">
              <Search className="text-gray-500 mr-4" size={20} />
              <input
                autoFocus
                type="text"
                placeholder="Search gear, apparel, or performance labs..."
                className="flex-grow bg-transparent border-none outline-none text-white text-lg placeholder:text-gray-600 mono"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="flex items-center gap-2 px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-gray-500 mono">
                <Command size={10} />
                <span>ESC</span>
              </div>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {query.length === 0 ? (
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4 mono">Recent Searches</h4>
                  <div className="space-y-2">
                    {['Kettlebells', 'Resistance Bands', 'Performance Kit'].map((item) => (
                      <button key={item} className="w-full text-left px-4 py-2 hover:bg-white/5 rounded-md text-sm text-gray-400 transition-colors">
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 opacity-40">
                  <p className="text-sm mono">No results for "{query}"</p>
                  <p className="text-xs mt-2">Try searching for 'Gear' or 'Lab'</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
