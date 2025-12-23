import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Star, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Language, translations } from "../i18n/translations";
import { SectionTitle } from "../components/SectionTitle";

interface FacebookReviewsProps {
  lang: Language;
}

type Review = {
  name: string;      // var būt anonimizēts (Anna K.)
  date: string;      // "8. Decembris"
  text: string;
  rating?: number;   // ja gribi (default 5)
};

export const FacebookReviews: React.FC<FacebookReviewsProps> = ({ lang }) => {
  const t = translations[lang].reviews;

  // ✅ ŠEIT ieliec savas īstās atsauksmes (anonimizētas, ja vēlies)
  const reviews: Review[] = useMemo(
    () => [
      {
        name: "Anna K.",
        date: "8. decembris",
        text:
          "Vislielākais paldies Rīgas autoskolai un instruktoram Jānim. Ļoti saprotamas un mierīgas braukšanas. Nevaru iedomāties, ka būtu dabūjusi tiesības bez šīs pieejas.",
        rating: 5,
      },
      {
        name: "Besi G.",
        date: "4. decembris",
        text:
          "Ļoti laba autoskola ar profesionālu instruktoru – mierīgs, saprotams un palīdz izlabot kļūdas. Pēc katras nodarbības tiek atsūtītas vizuālas shēmas un Google Maps bildes, kas ļoti palīdz saprast situācijas uz ceļa. Noteikti iesaku!",
        rating: 5,
      },
      {
        name: "Beate K.",
        date: "20. novembris",
        text:
          "Pieteicos autoskolā pēc radinieka ieteikuma. Sākotnēji biju ļoti nobijusies, taču instruktors skaidri, mierīgi un pacietīgi mācīja. Tagad tiesības ir kabatā, un autoskolu iesaku ar lielāko pārliecību.",
        rating: 5,
      },
      {
        name: "Augusts P.",
        date: "10. novembris",
        text:
          "Uzsāku autoskolu ar ideju, ka visu jau zinu, bet instruktori iedeva daudz jaunus padomus. Varēju brīvi jautāt visu, ko nesapratu, bez uztraukuma.",
        rating: 5,
      },
      {
        name: "Markuss B.",
        date: "14. oktobris",
        text: "Lieliski apmāca, izskaidro saprotoši un viegli māca 👍",
        rating: 5,
      },
      {
        name: "Krists H.",
        date: "8. septembris",
        text:
          "Paldies instruktoram Jānim. Ar viņa mācīšanas prasmēm ātri tiku līdz CSDD braukšanas eksāmenam un nokārtoju. 10/10",
        rating: 5,
      },
      {
        name: "Liene B.",
        date: "31. augusts",
        text:
          "Instruktors Jānis – ļoti pozitīva attieksme, mierīgs un nosvērts. Iedeva daudz vērtīgu padomu. Kvalitāte – kā diena pret nakti!",
        rating: 5,
      },
    ],
    []
  );

  // Mobilajā sākumā rādam 3, desktopā 6
  const initialMobile = 3;
  const initialDesktop = 6;

  const [expanded, setExpanded] = useState(false);

  // vienkārši: mobilais vs desktop pēc Tailwind breakpoint (renderēsim abus ar CSS)
  const visibleMobile = expanded ? reviews.length : Math.min(initialMobile, reviews.length);
  const visibleDesktop = expanded ? reviews.length : Math.min(initialDesktop, reviews.length);

  const Stars = ({ count = 5 }: { count?: number }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < count ? "text-[#CCFF00]" : "text-white/15"}
          fill={i < count ? "currentColor" : "none"}
        />
      ))}
    </div>
  );

  return (
    <section id="reviews" className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionTitle title={t?.title ?? "Studentu atsauksmes"} subtitle={t?.subtitle ?? ""} />

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          <AnimatePresence initial={false}>
            {reviews.slice(0, visibleDesktop).map((r) => (
              <motion.div
                key={`${r.name}-${r.date}`}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.25 }}
                className="glass p-7 rounded-[28px] border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <Stars count={r.rating ?? 5} />
                  <div className="flex items-center gap-2 text-white/50">
                    <Facebook size={18} className="text-[#1877F2] opacity-70" />
                  </div>
                </div>

                <p className="text-white/80 text-sm leading-relaxed mb-6 italic">
                  “{r.text}”
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-black text-[#CCFF00] text-xs">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold uppercase tracking-tight">{r.name}</h5>
                    <span className="text-[10px] text-white/40 uppercase font-black">{r.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile list (3 + Show more) */}
        <div className="md:hidden space-y-4">
          <AnimatePresence initial={false}>
            {reviews.slice(0, visibleMobile).map((r) => (
              <motion.div
                key={`${r.name}-${r.date}`}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 14 }}
                transition={{ duration: 0.22 }}
                className="glass p-5 rounded-[22px] border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <Stars count={r.rating ?? 5} />
                  <Facebook size={16} className="text-[#1877F2] opacity-70" />
                </div>

                <p className="text-white/80 text-sm leading-relaxed mb-4 italic">
                  “{r.text}”
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center font-black text-[#CCFF00] text-xs">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-tight">{r.name}</h5>
                    <span className="text-[10px] text-white/40 uppercase font-black">{r.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {reviews.length > initialMobile && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="w-full mt-2 glass border border-white/10 rounded-2xl py-3 text-xs font-black uppercase tracking-widest text-[#CCFF00] flex items-center justify-center gap-2 hover:border-[#CCFF00]/40 transition"
            >
              {expanded ? (
                <>
                  Rādīt mazāk <ChevronUp size={16} />
                </>
              ) : (
                <>
                  Rādīt vairāk <ChevronDown size={16} />
                </>
              )}
            </button>
          )}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.facebook.com/rigasautoskola/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#CCFF00] hover:text-white transition-colors text-xs md:text-sm font-black uppercase tracking-widest border-b border-[#CCFF00]/20 pb-1"
          >
            Skatīt visas atsauksmes Facebook <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};
