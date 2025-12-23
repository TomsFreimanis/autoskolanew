
import React from 'react';
import { motion } from 'framer-motion';
import { Info, Car, Zap, CreditCard } from 'lucide-react';
import { Language, translations } from '../i18n/translations';
import { SectionTitle } from '../components/SectionTitle';

interface DetailedPricingProps {
  lang: Language;
}

export const DetailedPricing: React.FC<DetailedPricingProps> = ({ lang }) => {
  const t = translations[lang].pricing;
  const items = [
    { label: t.theory, price: t.theoryPrice, icon: <Info size={18}/> },
    { label: t.manual, price: t.manualPrice, icon: <Car size={18}/> },
    { label: t.auto, price: t.autoPrice, icon: <Zap size={18}/> },
    { label: t.exam, price: t.examDetail, icon: <CreditCard size={18}/> }
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-black/40">
      <div className="container mx-auto px-6">
        <SectionTitle title={t.title} subtitle={t.subtitle} />
        <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
          {items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col md:flex-row md:items-center justify-between p-5 md:p-8 glass rounded-[20px] md:rounded-[24px] hover:border-[#CCFF00]/40 transition-all group"
            >
              <div className="flex items-center gap-4 md:gap-6 mb-3 md:mb-0">
                <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[#CCFF00]/10 flex items-center justify-center text-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-black transition-all">
                  {item.icon}
                </div>
                <span className="text-sm md:text-lg font-bold uppercase tracking-tight">{item.label}</span>
              </div>
              <div className="text-xl md:text-3xl font-black text-[#CCFF00] italic">{item.price}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
