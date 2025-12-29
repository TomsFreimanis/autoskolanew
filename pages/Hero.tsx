import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Language, translations } from "../i18n/translations";
import { Button } from "../components/Button";
import { Logo } from "../components/Logo";

interface HeroProps {
  lang: Language;
  onOpenBooking: () => void;
}

const withBase = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\/+/, "")}`;

export const Hero: React.FC<HeroProps> = ({ lang, onOpenBooking }) => {
  const t = translations[lang].hero;
  const reduceMotion = useReducedMotion();

  const bg = withBase("/assets/images/neimanis.jpg");

  return (
    <section className="relative min-h-[86vh] md:min-h-[90vh] flex items-center pt-24 md:pt-28 overflow-hidden">
      {/* background image */}
      <div className="absolute inset-0">
        <img
          src={bg}
          alt="Jānis Neimanis"
          className="w-full h-full object-cover object-[55%_25%] md:object-[60%_20%] opacity-80"
          loading="eager"
        />
        {/* top dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/90" />
        {/* neon accent */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(204,255,0,0.18),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_45%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full">
        {/* mobile top */}
        <div className="flex items-center justify-between md:hidden mb-8">
        
      
        </div>

        <div className="max-w-xl">
          {/* badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xl"
          >
            <Sparkles size={14} className="text-[#CCFF00]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/80">
              {t?.badge ?? "Premium apmācība"}
            </span>
          </motion.div>

          {/* title */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: reduceMotion ? 0 : 0.55 }}
            className="mt-5 text-[34px] leading-[0.95] md:text-7xl font-black uppercase italic tracking-tight"
          >
            {t?.title ?? "Kļūsti par autovadītāju ar pārliecību."}
          </motion.h1>

          {/* subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: reduceMotion ? 0 : 0.55 }}
            className="mt-4 text-white/60 text-sm md:text-lg leading-relaxed max-w-lg"
          >
            {t?.subtitle ??
              "Modernākā autoskola Rīgā. Pieredze. Profesionalitāte. Atbildība."}
          </motion.p>

          {/* instructor chip */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: reduceMotion ? 0 : 0.55 }}
            className="mt-6 inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-2xl shadow-2xl"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10">
              <img
                src={bg}
                alt="Jānis Neimanis"
                className="w-full h-full object-cover object-[55%_25%]"
                loading="lazy"
              />
            </div>
            <div className="leading-tight">
              <div className="text-[10px] uppercase tracking-widest font-black text-[#CCFF00]/90">
                Galvenais instruktors
              </div>
              <div className="text-sm font-bold text-white">Jānis Neimanis</div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: reduceMotion ? 0 : 0.55 }}
            className="mt-8 flex flex-col gap-3"
          >
            <Button
              className="h-12 md:h-16 text-sm md:text-lg uppercase tracking-widest italic"
              onClick={onOpenBooking}
            >
              {t?.ctaPrimary ?? "Pieteikties kursam"} <ArrowRight size={18} />
            </Button>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("about");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="h-12 md:h-16 rounded-2xl border border-white/15 bg-black/35 backdrop-blur-xl text-white/80 hover:text-white hover:border-white/25 transition text-xs md:text-sm font-black uppercase tracking-widest italic"
            >
              {t?.ctaSecondary ?? "Uzzināt vairāk"}
            </button>
          </motion.div>
        </div>
      </div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-black" />
    </section>
  );
};
