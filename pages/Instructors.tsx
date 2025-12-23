import React from "react";
import { motion } from "framer-motion";
import { UserCheck } from "lucide-react";
import { Language, translations } from "../i18n/translations";
import { SectionTitle } from "../components/SectionTitle";

interface InstructorsProps {
  lang: Language;
}

// Ja kādreiz būs deploy apakš-mapē, šis palīdzēs
const withBase = (p: string) =>
  `${import.meta.env.BASE_URL}${p.replace(/^\/+/, "")}`;

const images = [
  withBase("/assets/images/janka.jpg"),
  withBase("/assets/images/seeja.jpg"),
  withBase("/assets/images/miks.jpg"),
  withBase("/assets/images/jaunais.jpg"),
];

export const Instructors: React.FC<InstructorsProps> = ({ lang }) => {
  const t = translations[lang].instructors;
  if (!t?.list?.length) return null;

  return (
    <section id="instructors" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <SectionTitle title={t.title} subtitle={t.subtitle} />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          {t.list.map((instructor, i) => {
            const imgSrc = images[i] ?? images[0];

            return (
              <motion.div
                key={instructor.name ?? i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] md:rounded-[32px] glass border border-white/10 group-hover:border-[#CCFF00]/50 transition-all duration-500">
                  <img
                    src={imgSrc}
                    alt={instructor.name}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                    loading="lazy"
                    onError={(e) => {
                      // ja kāds fails nav atrasts, lai nepaliek “salūzusi bilde”
                      (e.currentTarget as HTMLImageElement).src = images[0];
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                  <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-1 md:gap-2 text-[#CCFF00] mb-1 md:mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <UserCheck size={12} className="md:size-4" />
                      <span className="text-[7px] md:text-[9px] font-black uppercase tracking-widest">
                        Sertificēts
                      </span>
                    </div>

                    <h4 className="text-xs md:text-2xl font-black text-white uppercase tracking-tight mb-0.5 md:mb-1">
                      {instructor.name}
                    </h4>
                    <p className="text-white/50 text-[7px] md:text-[10px] font-bold uppercase tracking-wider">
                      {instructor.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
