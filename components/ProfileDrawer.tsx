
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Settings, Package, LogOut, ChevronRight } from 'lucide-react';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ isOpen, onClose }) => {
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
              <h2 className="text-2xl font-bold tracking-tighter italic">ACCOUNT</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col items-center text-center mb-10 pb-10 border-b border-white/5">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 flex items-center justify-center border-4 border-black shadow-xl">
                <User size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold tracking-tight">ATHLETE_01</h3>
              <p className="text-gray-500 text-xs mono mt-1 uppercase tracking-widest">Premium Member</p>
            </div>

            <div className="space-y-2 flex-grow">
              {[
                { icon: Package, label: 'Order History', value: '4' },
                { icon: Settings, label: 'Performance Profile', value: '88%' },
                { icon: User, label: 'Personal Details', value: null },
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-all group">
                  <div className="flex items-center gap-4">
                    <item.icon size={18} className="text-gray-500 group-hover:text-white transition-colors" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.value && <span className="text-[10px] mono text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">{item.value}</span>}
                    <ChevronRight size={14} className="text-gray-700" />
                  </div>
                </button>
              ))}
            </div>

            <button className="mt-auto flex items-center justify-center gap-3 w-full py-4 border border-white/10 rounded-xl hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500 transition-all text-sm font-bold mono">
              <LogOut size={16} />
              LOG OUT
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
