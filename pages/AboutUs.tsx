import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Language, translations } from '../i18n/translations';
import { SectionTitle } from '../components/SectionTitle';

interface AboutUsProps {
  lang: Language;
}

// ja kādreiz deploy uz sub-path
const withBase = (p: string) =>
  `${import.meta.env.BASE_URL}${p.replace(/^\/+/, "")}`;

export const AboutUs: React.FC<AboutUsProps> = ({ lang }) => {
  const t = translations[lang].about;

  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionTitle title={t.title} align="left" />
            <p className="text-white/70 text-sm md:text-lg leading-relaxed mb-6 md:mb-8">
              {t.text}
            </p>

            <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 glass border-[#CCFF00]/20 rounded-xl md:rounded-2xl">
              <div className="bg-[#CCFF00] text-black p-2 md:p-3 rounded-full shrink-0">
                <Zap size={18} className="md:size-5" />
              </div>
              <span className="font-bold text-[#CCFF00] text-xs md:text-base uppercase tracking-wider italic">
                {t.highlight}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] md:aspect-square rounded-[24px] md:rounded-[40px] overflow-hidden glass relative border border-white/10 p-1 md:p-2 shadow-2xl">
            <img
  src="/assets/images/parmums.jpg"
  alt="Par mums"
  className="w-full h-full object-cover rounded-[20px] md:rounded-[32px]"
/>

              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
