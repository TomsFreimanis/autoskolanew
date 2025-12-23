import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Play, X, ExternalLink, ChevronDown } from "lucide-react";
import { Language, translations } from "../i18n/translations";
import { SectionTitle } from "../components/SectionTitle";

interface VideoGuideProps {
  lang: Language;
}

type VideoItem = {
  url: string;
  title: string;
  tag?: string;
};

function safeYouTubeId(inputUrl: string): string | null {
  try {
    const url = new URL(inputUrl);

    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace("/", "").trim();
      return id || null;
    }

    const v = url.searchParams.get("v");
    if (v) return v;

    if (url.pathname.includes("/embed/")) {
      const parts = url.pathname.split("/embed/");
      return parts[1]?.split("/")[0] ?? null;
    }

    return null;
  } catch {
    return null;
  }
}

function toEmbedUrl(watchUrl: string) {
  const id = safeYouTubeId(watchUrl);
  if (!id) return null;

  let start = 0;
  try {
    const u = new URL(watchUrl);
    const t = u.searchParams.get("t");
    if (t) {
      const asNum = Number(t);
      if (!Number.isNaN(asNum)) start = asNum;
      else {
        const m = t.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/i);
        if (m) {
          const h = Number(m[1] || 0);
          const mm = Number(m[2] || 0);
          const s = Number(m[3] || 0);
          start = h * 3600 + mm * 60 + s;
        }
      }
    }
  } catch {
    // ignore
  }

  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  if (start > 0) params.set("start", String(start));

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

function toThumbs(watchUrl: string) {
  const id = safeYouTubeId(watchUrl);
  if (!id) return null;

  return [
    `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/sddefault.jpg`,
    `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
  ];
}

function lockBodyScroll(lock: boolean) {
  const body = document.body;
  if (!body) return;

  if (lock) {
    const scrollY = window.scrollY;
    body.dataset.scrollY = String(scrollY);
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
  } else {
    const y = Number(body.dataset.scrollY || "0");
    body.style.position = "";
    body.style.top = "";
    body.style.left = "";
    body.style.right = "";
    body.style.width = "";
    delete body.dataset.scrollY;
    window.scrollTo(0, y);
  }
}

export const VideoGuide: React.FC<VideoGuideProps> = ({ lang }) => {
  const t = translations[lang].videoGuide;
  const reduceMotion = useReducedMotion();

  const videos: VideoItem[] = useMemo(
    () => [
      {
        url: "https://www.youtube.com/watch?v=R19shVbMHVs",
        title: "Iebraukšana stāvvietā perpendikulāri brauktuves malai",
        tag: "Manevri",
      },
     
      {
        url: "https://www.youtube.com/watch?v=eOzU-OloalI",
        title: "Visiem, kuri tuvākajā laikā kārtos CSDD eksāmenu",
        tag: "CSDD",
      },
      {
        url: "https://www.youtube.com/watch?v=ZjzqqW3Y9cg",
        title: "Kas notiek ar papildsekciju?",
        tag: "Noteikumi",
      },
      {
        url: "https://www.youtube.com/watch?v=UIvScNwMJqw",
        title: "2 rupjas kļūdas 2 minūtēs!",
        tag: "Kļūdas",
      },
      {
        url: "https://www.youtube.com/watch?v=IBncus5RebU&t=1s",
        title: "3 āķīgi virzieni",
        tag: "Krustošanās",
      },
      {
        url: "https://www.youtube.com/watch?v=jtqyWRJNfQA&t=1s",
        title: "CSDD speciālie manevri — parkošanās paralēli brauktuves malai",
        tag: "Manevri",
      },
    ],
    []
  );

  // ======= SHOW MORE (responsive without window listeners) =======
  // Tailwind breakpoints: sm=640, md=768, lg=1024
  // Bez JS media query: izmantojam 2 pogas (mobile/desktop) ar hidden/block klasēm.
  const MOBILE_INITIAL = 3;
  const DESKTOP_INITIAL = 8;

  const [showAllMobile, setShowAllMobile] = useState(false);
  const [showAllDesktop, setShowAllDesktop] = useState(false);

  const visibleMobile = showAllMobile ? videos : videos.slice(0, MOBILE_INITIAL);
  const visibleDesktop = showAllDesktop ? videos : videos.slice(0, DESKTOP_INITIAL);

  const [openUrl, setOpenUrl] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState<string>("Video");
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const selectedEmbed = openUrl ? toEmbedUrl(openUrl) : null;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenUrl(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const isOpen = Boolean(openUrl);
    lockBodyScroll(isOpen);
    if (isOpen) setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => lockBodyScroll(false);
  }, [openUrl]);

  const featuredIndex = 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.06, duration: reduceMotion ? 0 : 0.45 },
    }),
  };

  const renderGrid = (list: VideoItem[]) => (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
      {list.map((vid, i) => {
        // i šeit ir redzamā saraksta indeks, bet featured vajag balstīt uz pilno sarakstu:
        const realIndex = videos.findIndex((v) => v.url === vid.url);
        const isFeatured = realIndex === featuredIndex;

        const thumbs = toThumbs(vid.url) ?? [];
        const primary = thumbs[0] || "";
        const fallbacks = thumbs.slice(1);

        return (
          <motion.button
            key={vid.url}
            type="button"
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            whileHover={reduceMotion ? undefined : { y: -6 }}
            whileTap={reduceMotion ? undefined : { scale: 0.99 }}
            onClick={() => {
              setActiveTitle(vid.title);
              setOpenUrl(vid.url);
            }}
            className={[
              "group relative text-left overflow-hidden",
              "glass border border-white/5 hover:border-[#CCFF00]/30 transition-all",
              "rounded-[20px] md:rounded-[32px]",
              "focus:outline-none focus:ring-2 focus:ring-[#CCFF00]/60 focus:ring-offset-0",
              isFeatured ? "aspect-[16/10] lg:col-span-2" : "aspect-[16/10] md:aspect-[3/4]",
            ].join(" ")}
            aria-label={`Skatīties: ${vid.title}`}
          >
            <img
              src={primary}
              alt={vid.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-55 group-hover:scale-110 transition-all duration-700"
              onError={(e) => {
                const img = e.currentTarget;
                const next = fallbacks.find((u) => u && u !== img.src);
                if (next) img.src = next;
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_20%,rgba(204,255,0,0.18),transparent_45%)]" />

            <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 md:p-6">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-[#CCFF00] group-hover:text-black transition-all shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
                  <Play size={18} fill="currentColor" />
                </div>

                {vid.tag && (
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-[10px] font-black uppercase tracking-widest border border-white/10 group-hover:border-[#CCFF00]/40 group-hover:text-[#CCFF00] transition">
                    {vid.tag}
                  </span>
                )}
              </div>

              <h4 className="text-sm md:text-xl font-black text-white uppercase tracking-tighter leading-tight group-hover:text-[#CCFF00] transition-colors">
                {vid.title}
              </h4>

              <div className="mt-2 flex items-center justify-between">
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-black">
                  youtube.com
                </p>
                <span className="text-white/30 text-[10px] font-bold">
                  Skatīties →
                </span>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );

  const hasMoreMobile = videos.length > MOBILE_INITIAL;
  const hasMoreDesktop = videos.length > DESKTOP_INITIAL;

  return (
    <section id="video" className="py-16 md:py-24 bg-black/40">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between gap-6">
          <SectionTitle title={t.title} subtitle={t.subtitle} />
          <a
            href={videos[0]?.url}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-[#CCFF00] transition"
          >
            Skatīt YouTube <ExternalLink size={14} />
          </a>
        </div>

        {/* MOBILE grid */}
        <div className="block lg:hidden">
          {renderGrid(visibleMobile)}

          {hasMoreMobile && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllMobile((v) => !v)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl glass border border-white/10 hover:border-[#CCFF00]/40 transition text-xs font-black uppercase tracking-widest text-white/80 hover:text-[#CCFF00]"
              >
                {showAllMobile ? "Rādīt mazāk" : "Parādīt vēl"}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${showAllMobile ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          )}
        </div>

        {/* DESKTOP grid */}
        <div className="hidden lg:block">
          {renderGrid(visibleDesktop)}

          {hasMoreDesktop && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllDesktop((v) => !v)}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl glass border border-white/10 hover:border-[#CCFF00]/40 transition text-[10px] font-black uppercase tracking-widest text-white/80 hover:text-[#CCFF00]"
              >
                {showAllDesktop ? "Rādīt mazāk" : "Parādīt vēl"}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${showAllDesktop ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openUrl && selectedEmbed && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setOpenUrl(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Video atskaņotājs"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 12 }}
              transition={{ type: "spring", damping: 22, stiffness: 260 }}
              className="w-full max-w-5xl glass border border-white/10 rounded-[18px] md:rounded-[28px] overflow-hidden shadow-2xl"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 px-4 md:px-6 py-3 md:py-4 border-b border-white/10">
                <div className="min-w-0">
                  <div className="text-white/40 text-[10px] font-black uppercase tracking-widest">
                    Video
                  </div>
                  <div className="text-white text-sm md:text-base font-bold truncate">
                    {activeTitle}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={openUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/10 transition text-white/70 text-[10px] font-black uppercase tracking-widest"
                  >
                    Atvērt YouTube <ExternalLink size={14} />
                  </a>

                  <button
                    ref={closeBtnRef}
                    className="p-2 rounded-xl hover:bg-white/10 transition"
                    onClick={() => setOpenUrl(null)}
                    aria-label="Aizvērt"
                    type="button"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="relative w-full aspect-video bg-black">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={selectedEmbed}
                  title={activeTitle}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
