
import React from 'react';
import { Instagram, Facebook, Youtube, Music } from 'lucide-react';
import { Language, translations } from '../i18n/translations';
import { SectionTitle } from '../components/SectionTitle';
import { MagneticButton } from '../components/MagneticButton';

interface SocialFollowProps {
  lang: Language;
}

export const SocialFollow: React.FC<SocialFollowProps> = ({ lang }) => {
  const t = translations[lang].social;
  const platforms = [
    { 
      name: 'TikTok', 
      icon: <Music size={32} />, 
      link: 'https://www.tiktok.com/@rigasautoskola',
      color: 'hover:bg-[#00F2EA]/10',
      glow: 'hover:shadow-[0_0_50px_rgba(0,242,234,0.4)]',
      border: 'border-cyan-500/20'
    },
    { 
      name: 'Instagram', 
      icon: <Instagram size={32} />, 
      link: 'https://www.instagram.com/rigasautoskola/',
      color: 'hover:bg-pink-500/10',
      glow: 'hover:shadow-[0_0_50px_rgba(219,39,119,0.4)]',
      border: 'border-pink-500/20'
    },
    { 
      name: 'Facebook', 
      icon: <Facebook size={32} />, 
      link: 'https://www.facebook.com/rigasautoskola/',
      color: 'hover:bg-blue-600/10',
      glow: 'hover:shadow-[0_0_50px_rgba(24,119,242,0.4)]',
      border: 'border-blue-500/20'
    },
    { 
      name: 'YouTube', 
      icon: <Youtube size={32} />, 
      link: 'https://www.youtube.com/@rigasautoskola',
      color: 'hover:bg-red-600/10',
      glow: 'hover:shadow-[0_0_50px_rgba(255,0,0,0.4)]',
      border: 'border-red-500/20'
    }
  ];

  return (
    <section id="social" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionTitle title={t.title} subtitle={t.subtitle} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {platforms.map((plat) => (
            <MagneticButton 
              key={plat.name}
              className={plat.name}
              link={plat.link}
              color={plat.color}
              glow={plat.glow}
              border={plat.border}
            >
              {plat.icon}
            </MagneticButton>
          ))}
        </div>
      </div>
    </section>
  );
};
