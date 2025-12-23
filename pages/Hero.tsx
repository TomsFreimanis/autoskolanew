
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Zap, Car } from 'lucide-react';
import { Language, translations } from '../i18n/translations';
import { Button } from '../components/Button';

interface HeroProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenBooking }) => {
  const t = translations[lang].hero;
  return (
    <section className="relative min-h-[75vh] md:min-h-[90vh] flex items-center pt-16 md:pt-24 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 rounded-full border border-[#CCFF00]/30 bg-[#CCFF00]/5 text-[#CCFF00] text-[9px] md:text-xs font-extrabold uppercase tracking-widest mb-6 md:mb-8"
          >
            <Zap size={10} className="md:size-3" /> {t.badge}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-6xl lg:text-8xl font-black leading-[1.1] mb-6 md:mb-8 tracking-tighter uppercase italic"
          >
            {t.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm md:text-xl text-white/60 mb-8 md:mb-12 max-w-2xl leading-relaxed"
          >
            {t.subtitle}
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-5">
            <Button onClick={onOpenBooking} className="w-full sm:w-auto">
              {t.ctaPrimary} <ChevronRight size={16} />
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
              {t.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-1/2 hidden lg:block opacity-5 pointer-events-none">
        <div className="animate-float">
          <Car size={600} strokeWidth={0.5} className="text-[#CCFF00]" />
        </div>
      </div>
    </section>
  );
};
