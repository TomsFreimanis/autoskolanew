
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

// Use HTMLMotionProps<'button'> to ensure compatibility with Framer Motion's internal prop types (like onAnimationStart)
interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const base = "px-5 py-2.5 md:px-7 md:py-3.5 rounded-xl md:rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group whitespace-nowrap text-sm md:text-base";
  const variants = {
    primary: "bg-[#CCFF00] text-black hover:brightness-110 shadow-[0_10px_30px_rgba(204,255,0,0.2)]",
    secondary: "glass text-white hover:bg-white/10",
    outline: "border border-white/20 text-white hover:border-[#CCFF00] hover:text-[#CCFF00]"
  };
  
  return (
    <motion.button 
      whileHover={{ scale: 1.02 }} 
      whileTap={{ scale: 0.98 }}
      className={`${base} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </motion.button>
  );
};
