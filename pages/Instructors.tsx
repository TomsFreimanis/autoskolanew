import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { UserCheck } from "lucide-react";
import { Language, translations } from "../i18n/translations";
import { SectionTitle } from "../components/SectionTitle";

interface InstructorsProps {
  lang: Language;
}

// Base path drošībai Netlify/Deploy
const withBase = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\/+/, "")}`;

const images = [
  withBase("/assets/images/janka.jpg"),
  withBase("/assets/images/seeja.jpg"),
  withBase("/assets/images/miks.jpg"),
  withBase("/assets/images/jaunais.jpg"),
];

export const Instructors: React.FC<InstructorsProps> = ({ lang }) => {
  const t = translations[lang].instructors;
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  if (!t?.list?.length) return null;

  const items = useMemo(() => t.list.map((x, i) => ({ ...x, i })), [t.list]);

  return (
    <section id="instructors" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <SectionTitle title={t.title} subtitle={t.subtitle} />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          {items.map((instructor) => {
            const i = instructor.i;
            const imgSrc = images[i] ?? images[0];
            const isActive = active === i;

            return (
              <motion.button
                key={instructor.name ?? i}
                type="button"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: i * 0.08, duration: reduce ? 0 : 0.45 }}
                className="group relative text-left focus:outline-none"
                onClick={() => setActive((p) => (p === i ? null : i))}
                aria-label={`Instruktors: ${instructor.name}`}
                style={{ perspective: 1000 }}
              >
                <motion.div
                  className={[
                    "relative aspect-[4/5] overflow-hidden",
                    "rounded-[20px] md:rounded-[32px]",
                    "glass border border-white/10",
                    "transition-all duration-500",
                    "shadow-[0_20px_80px_rgba(0,0,0,0.45)]",
                    "will-change-transform",
                  ].join(" ")}
                  whileHover={
                    reduce
                      ? undefined
                      : {
                          rotateY: -10,
                          rotateX: 6,
                          scale: 1.02,
                        }
                  }
                  animate={
                    isActive && !reduce
                      ? { rotateY: -12, rotateX: 8, scale: 1.02 }
                      : { rotateY: 0, rotateX: 0, scale: 1 }
                  }
                  transition={{ type: "spring", damping: 18, stiffness: 220 }}
                >
                  {/* neon glow */}
                  <div className="pointer-events-none absolute -inset-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(204,255,0,0.18),transparent_55%)]" />
                  </div>

                  {/* image */}
                  <img
                    src={imgSrc}
                    alt={instructor.name}
                    className={[
                      "w-full h-full object-cover",
                      "opacity-70 group-hover:opacity-100",
                      "transition-all duration-700",
                      "grayscale group-hover:grayscale-0",
                      "group-hover:scale-[1.06]",
                    ].join(" ")}
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = images[0];
                    }}
                  />

                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent opacity-90" />

                  {/* badge + text */}
                  <div className="absolute bottom-0 left-0 w-full p-4 md:p-8">
                    <div className="flex items-center gap-2 text-[#CCFF00] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <UserCheck size={14} className="md:size-4" />
                      <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">
                        Sertificēts
                      </span>
                    </div>

                    <h4 className="text-xs md:text-2xl font-black text-white uppercase tracking-tight leading-tight">
                      {instructor.name}
                    </h4>
                    <p className="text-white/50 text-[8px] md:text-[10px] font-bold uppercase tracking-wider mt-1">
                      {instructor.role}
                    </p>

                    {/* mobile hint */}
                    <p className="mt-3 text-white/35 text-[9px] md:hidden font-bold uppercase tracking-widest">
                      Pieskaries →
                    </p>
                  </div>

                  {/* active ring (mobile tap) */}
                  <div
                    className={[
                      "absolute inset-0 rounded-[20px] md:rounded-[32px] pointer-events-none",
                      "ring-1 ring-white/10",
                      isActive ? "ring-2 ring-[#CCFF00]/50" : "",
                      "transition-all duration-300",
                    ].join(" ")}
                  />
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
