
import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  align = 'center' 
}) => (
  <div className={`mb-10 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <motion.h2 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-3 md:mb-4 tracking-tighter uppercase italic leading-tight"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-white/50 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed px-4"
      >
        {subtitle}
      </motion.p>
    )}
    <div className={`w-12 md:w-16 h-1 bg-[#CCFF00] mt-4 md:mt-6 ${align === 'center' ? 'mx-auto' : ''}`}></div>
  </div>
);
