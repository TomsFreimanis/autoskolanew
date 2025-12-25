import React from "react";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "./Logo";

const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M16.5 3c.7 3.2 2.7 5.2 6 5.5v3.1c-2.1.1-4-.6-6-1.9v6.3c0 4-3.2 7.2-7.2 7.2S2 20.9 2 16.9s3.2-7.2 7.2-7.2c.4 0 .8 0 1.2.1v3.4c-.4-.1-.8-.2-1.2-.2-2.1 0-3.8 1.7-3.8 3.8s1.7 3.8 3.8 3.8 3.8-1.7 3.8-3.8V3h3.3z"/>
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid gap-10 md:gap-12 md:grid-cols-3 items-start">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Logo className="w-20 md:w-24" />
            <p className="text-white/35 text-xs md:text-sm leading-relaxed max-w-sm">
              Profesionāla apmācība, mierīga pieeja un reāli eksāmenu padomi — lai tiesības būtu kabatā ar pārliecību.
            </p>
            <p className="text-white/25 text-[10px] uppercase tracking-[0.2em] font-black">
              © SIA Rīgas Autoskola
            </p>
          </div>

          {/* Contacts */}
          <div className="space-y-3">
            <div className="text-white/50 text-[10px] font-black uppercase tracking-widest">
              Kontakti
            </div>

            <a href="tel:+37126388885" className="flex items-center gap-3 text-white/70 hover:text-[#CCFF00] transition">
              <Phone size={16} />
              <span className="text-sm font-bold">+371 263 88885</span>
            </a>

            <a href="mailto:info@rigasautoskola.lv" className="flex items-center gap-3 text-white/70 hover:text-[#CCFF00] transition">
              <Mail size={16} />
              <span className="text-sm font-bold break-all">info@rigasautoskola.lv</span>
            </a>

            {/* ja gribi – nomaini uz īsto adresi */}
            <div className="flex items-center gap-3 text-white/60">
              <MapPin size={16} />
              <span className="text-sm">Rīga, Latvija</span>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4 md:text-right">
            <div className="text-white/50 text-[10px] font-black uppercase tracking-widest">
              Seko mums
            </div>

            <div className="flex md:justify-end gap-3">
              <a
                href="https://www.facebook.com/rigasautoskola/"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-black hover:bg-[#CCFF00] transition"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-black hover:bg-[#CCFF00] transition"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-black hover:bg-[#CCFF00] transition"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>

              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-black hover:bg-[#CCFF00] transition"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
            </div>

            <div className="text-white/25 text-[10px] md:text-[11px] leading-relaxed">
              Izstrāde: <span className="text-white/40">Rīgas Autoskola</span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row gap-3 md:gap-6 justify-between text-white/25 text-[10px] uppercase tracking-[0.2em] font-black">
          <span>Visas tiesības aizsargātas</span>
          <span className="text-white/20">Made with ♥ in Riga</span>
        </div>
      </div>
    </footer>
  );
};
