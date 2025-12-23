
import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Language, translations } from '../i18n/translations';
import { Button } from '../components/Button';

interface EStudiesProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const EStudies: React.FC<EStudiesProps> = ({ lang, onOpenBooking }) => {
  const t = translations[lang].estudies;
  return (
    <section id="estudies" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-6">
        <div className="glass p-8 md:p-20 rounded-[24px] md:rounded-[48px] border-[#CCFF00]/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 hidden md:block">
            <div className="bg-[#CCFF00] text-black px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(204,255,0,0.4)]">
              {t.badge}
            </div>
          </div>
          
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-6xl font-black mb-4 md:mb-6 uppercase italic">{t.title}</h2>
            <p className="text-base md:text-2xl text-white/80 font-medium mb-6 md:mb-10 leading-relaxed">
              {t.intro}
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
              {t.points.map((p, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="text-[#CCFF00] md:size-5" size={16} />
                  </div>
                  <p className="text-white/60 leading-relaxed text-xs md:text-sm">{p}</p>
                </div>
              ))}
            </div>

            <Button onClick={onOpenBooking} className="w-full sm:w-auto h-12 md:h-16">
              {t.cta} <ArrowRight size={16} className="md:size-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
