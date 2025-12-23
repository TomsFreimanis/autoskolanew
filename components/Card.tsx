
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export const Card: React.FC<HTMLMotionProps<'div'>> = ({ 
  children, 
  className = '', 
  ...props 
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`glass p-5 md:p-8 rounded-[24px] md:rounded-[32px] hover:border-[#CCFF00]/30 transition-all duration-500 group ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);
