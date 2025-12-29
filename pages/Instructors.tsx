import React, { useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { UserCheck } from "lucide-react";
import { Language, translations } from "../i18n/translations";
import { SectionTitle } from "../components/SectionTitle";

interface InstructorsProps {
  lang: Language;
}

const withBase = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\/+/, "")}`;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

const TiltCard: React.FC<{
  imgSrc: string;
  name: string;
  role: string;
  delay?: number;
}> = ({ imgSrc, name, role, delay = 0 }) => {
  const reduceMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 260, damping: 22 });
  const sy = useSpring(my, { stiffness: 260, damping: 22 });

  // rotācija atkarīga no pointer pozīcijas
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-12, 12]);

  // shine
  const shineX = useTransform(sx, [-0.5, 0.5], ["20%", "80%"]);
  const shineY = useTransform(sy, [-0.5, 0.5], ["20%", "80%"]);

  const onMove = (clientX: number, clientY: number, rect: DOMRect) => {
    const px = (clientX - rect.left) / rect.width - 0.5;
    const py = (clientY - rect.top) / rect.height - 0.5;
    mx.set(clamp(px, -0.5, 0.5));
    my.set(clamp(py, -0.5, 0.5));
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ delay, duration: reduceMotion ? 0 : 0.55, ease: "easeOut" }}
      className="group relative"
      style={{ perspective: 900 }}
    >
      <motion.div
        className={[
          "relative aspect-[4/5] overflow-hidden",
          "rounded-[20px] md:rounded-[32px]",
          "glass border border-white/10",
          "transition-all duration-500",
          "group-hover:border-[#CCFF00]/50",
          "will-change-transform",
        ].join(" ")}
        style={
          reduceMotion
            ? undefined
            : {
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
              }
        }
        onPointerMove={(e) => {
          if (reduceMotion) return;
          const el = e.currentTarget;
          const rect = el.getBoundingClientRect();
          onMove(e.clientX, e.clientY, rect);
        }}
        onPointerLeave={() => !reduceMotion && reset()}
        onPointerDown={(e) => {
          if (reduceMotion) return;
          const el = e.currentTarget;
          const rect = el.getBoundingClientRect();
          onMove(e.clientX, e.clientY, rect);
        }}
        onPointerUp={() => !reduceMotion && reset()}
      >
        {/* bg image */}
        <img
          src={imgSrc}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-95 transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-[1.04]"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = imgSrc;
          }}
        />

        {/* gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent opacity-85" />

        {/* shine (moves with pointer) */}
        {!reduceMotion && (
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at ${shineX.get()} ${shineY.get()}, rgba(204,255,0,0.18), transparent 55%)`,
            }}
          />
        )}

        {/* content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8">
          <div className="flex items-center gap-2 text-[#CCFF00] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <UserCheck size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">
              Sertificēts instruktors
            </span>
          </div>

          <h4 className="text-sm md:text-2xl font-black text-white uppercase tracking-tight leading-tight">
            {name}
          </h4>
          <p className="text-white/55 text-[9px] md:text-[10px] font-bold uppercase tracking-wider mt-1">
            {role}
          </p>
        </div>

        {/* depth border */}
        <div className="absolute inset-0 rounded-[20px] md:rounded-[32px] pointer-events-none shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
      </motion.div>
    </motion.div>
  );
};

export const Instructors: React.FC<InstructorsProps> = ({ lang }) => {
  const t = translations[lang].instructors;
  if (!t?.list?.length) return null;

  const images = useMemo(
    () => [
      withBase("/assets/images/neimanis.jpg"),
      withBase("/assets/images/seeja.jpg"),
      withBase("/assets/images/miks.jpg"),
      withBase("/assets/images/jaunais.jpg"),
    ],
    []
  );

  return (
    <section id="instructors" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <SectionTitle title={t.title} subtitle={t.subtitle} />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          {t.list.map((ins, i) => (
            <TiltCard
              key={`${ins.name}-${i}`}
              imgSrc={images[i] ?? images[0]}
              name={ins.name}
              role={ins.role}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
