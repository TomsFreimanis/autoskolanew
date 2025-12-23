
import React from 'react';
import { motion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
        onClick={onClose}
        className="absolute inset-0 bg-black/95 backdrop-blur-md"
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        className="glass w-full max-w-xl p-6 md:p-12 rounded-[32px] md:rounded-[40px] relative z-10 shadow-2xl border border-white/10"
      >
        <button onClick={onClose} className="absolute top-5 right-5 md:top-8 md:right-8 text-white/40 hover:text-white transition-colors text-lg">
           ✕
        </button>
        {children}
      </motion.div>
    </div>
  );
};
