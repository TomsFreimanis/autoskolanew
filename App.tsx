import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ChevronRight } from "lucide-react";

import { Language, translations } from "./i18n/translations";
import { Hero } from "./pages/Hero";
import { AboutUs } from "./pages/AboutUs";
import { VideoGuide } from "./pages/VideoGuide";
import { DetailedPricing } from "./pages/DetailedPricing";
import { EStudies } from "./pages/EStudies";
import { BookingModal } from "./pages/BookingModal";
import { Instructors } from "./pages/Instructors";
import { FacebookReviews } from "./pages/FacebookReviews";
import { SocialFollow } from "./pages/SocialFollow";

import { Button } from "./components/Button";
import { Logo } from "./components/Logo";
import { Footer } from "./components/Footer";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [lang, setLang] = useState<Language>("LV");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      const offset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const nav = translations[lang].nav;

  return (
    <div className="relative selection:bg-[#CCFF00] selection:text-black bg-[#0A0A0A] text-white overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "py-2 md:py-3 glass border-b border-white/5" : "py-5 md:py-8"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <Logo className="w-16 md:w-20" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-3 mr-4 border-r border-white/10 pr-4">
              {(Object.keys(translations) as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`text-[9px] font-black transition-colors ${
                    lang === l ? "text-[#CCFF00] underline underline-offset-4" : "text-white/40 hover:text-white"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <nav className="flex items-center gap-6">
              <a
                href="#about"
                onClick={(e) => scrollToSection(e, "#about")}
                className="text-[9px] font-bold uppercase tracking-[0.2em] hover:text-[#CCFF00] transition-colors"
              >
                {nav.about}
              </a>
              <a
                href="#video"
                onClick={(e) => scrollToSection(e, "#video")}
                className="text-[9px] font-bold uppercase tracking-[0.2em] hover:text-[#CCFF00] transition-colors"
              >
                {nav.video}
              </a>
              <a
                href="#instructors"
                onClick={(e) => scrollToSection(e, "#instructors")}
                className="text-[9px] font-bold uppercase tracking-[0.2em] hover:text-[#CCFF00] transition-colors"
              >
                {nav.instructors}
              </a>
              <a
                href="#reviews"
                onClick={(e) => scrollToSection(e, "#reviews")}
                className="text-[9px] font-bold uppercase tracking-[0.2em] hover:text-[#CCFF00] transition-colors"
              >
                {nav.reviews}
              </a>
              <a
                href="#pricing"
                onClick={(e) => scrollToSection(e, "#pricing")}
                className="text-[9px] font-bold uppercase tracking-[0.2em] hover:text-[#CCFF00] transition-colors"
              >
                {nav.pricing}
              </a>
            </nav>

            <Button variant="outline" className="px-4 py-1.5 text-[8px] border-white/20" onClick={() => setIsBookingOpen(true)}>
              Pieteikties
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[49] bg-black/98 backdrop-blur-2xl flex flex-col p-10 pt-28 gap-5 overflow-y-auto"
          >
            <div className="flex gap-6 mb-6 border-b border-white/10 pb-5">
              {(Object.keys(translations) as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`text-xs font-black tracking-[0.15em] ${lang === l ? "text-[#CCFF00]" : "text-white/40"}`}
                >
                  {l}
                </button>
              ))}
            </div>

            <nav className="flex flex-col gap-5">
              <a
                href="#about"
                onClick={(e) => scrollToSection(e, "#about")}
                className="text-xl font-black uppercase tracking-tight hover:text-[#CCFF00] transition-all flex justify-between items-center italic"
              >
                {nav.about} <ChevronRight size={20} className="text-[#CCFF00]" />
              </a>

              <a
                href="#video"
                onClick={(e) => scrollToSection(e, "#video")}
                className="text-xl font-black uppercase tracking-tight hover:text-[#CCFF00] transition-all flex justify-between items-center italic"
              >
                {nav.video} <ChevronRight size={20} className="text-[#CCFF00]" />
              </a>

              <a
                href="#instructors"
                onClick={(e) => scrollToSection(e, "#instructors")}
                className="text-xl font-black uppercase tracking-tight hover:text-[#CCFF00] transition-all flex justify-between items-center italic"
              >
                {nav.instructors} <ChevronRight size={20} className="text-[#CCFF00]" />
              </a>

              <a
                href="#reviews"
                onClick={(e) => scrollToSection(e, "#reviews")}
                className="text-xl font-black uppercase tracking-tight hover:text-[#CCFF00] transition-all flex justify-between items-center italic"
              >
                {nav.reviews} <ChevronRight size={20} className="text-[#CCFF00]" />
              </a>

              <a
                href="#pricing"
                onClick={(e) => scrollToSection(e, "#pricing")}
                className="text-xl font-black uppercase tracking-tight hover:text-[#CCFF00] transition-all flex justify-between items-center italic"
              >
                {nav.pricing} <ChevronRight size={20} className="text-[#CCFF00]" />
              </a>
            </nav>

            <Button
              className="mt-6 py-5 text-lg uppercase tracking-widest italic"
              onClick={() => {
                setIsBookingOpen(true);
                setIsMobileMenuOpen(false);
              }}
            >
              Pieteikties
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Hero lang={lang} onOpenBooking={() => setIsBookingOpen(true)} />
        <AboutUs lang={lang} />

        {/* Scrolling Banner */}
        <section className="py-10 md:py-20 border-y border-white/5 bg-black/20 overflow-hidden">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="flex gap-10 md:gap-20 whitespace-nowrap opacity-20"
          >
            {[...Array(6)].map((_, i) => (
              <span key={i} className="text-xl md:text-5xl font-black uppercase tracking-[0.2em] italic">
                RĪGAS AUTOSKOLA PIEDĀVĀ PĀRREĢISTRĀCIJU NO JEBKURAS AUTOSKOLAS! • NEGAIDI - PIESAKIES! • KVALITATĪVA APMĀCĪBA • PROFESIONĀLI INSTRUKTORI • MODERNS AUTOPARKS •
              </span>
            ))}
          </motion.div>
        </section>

        <Instructors lang={lang} />
        <VideoGuide lang={lang} />
        <FacebookReviews lang={lang} />
        <SocialFollow lang={lang} />
        <EStudies lang={lang} onOpenBooking={() => setIsBookingOpen(true)} />
        <DetailedPricing lang={lang} />

        {/* Contact CTA (bez mistiskās mini-formas) */}
        <section id="contact" className="py-20 md:py-32 border-t border-white/5 bg-gradient-to-b from-transparent to-black">
          <div className="container mx-auto px-6">
            <div className="glass p-8 md:p-20 rounded-[28px] md:rounded-[56px] grid lg:grid-cols-2 gap-12 md:gap-24 items-center relative overflow-hidden shadow-2xl border-white/5">
              <div className="absolute -right-32 -bottom-32 w-[420px] h-[420px] bg-[#CCFF00]/10 rounded-full blur-[140px]" />

              <div>
                <h2 className="text-3xl md:text-8xl font-black tracking-tighter italic uppercase mb-8">Gatavs sākt?</h2>

                <p className="text-white/60 text-sm md:text-lg max-w-xl mb-10 leading-relaxed">
                  Piesakies apmācībām jau šodien — mēs ar tevi sazināsimies un palīdzēsim izvēlēties piemērotāko apmācību veidu.
                </p>

                <div className="space-y-6 md:space-y-8">
                  <a href="tel:+37126388885" className="flex items-center gap-5 group">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white/5 rounded-xl md:rounded-[20px] flex items-center justify-center group-hover:bg-[#CCFF00] group-hover:text-black transition-all">
                      <Phone size={22} />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-1">Zvaniet</p>
                      <p className="text-lg md:text-3xl font-bold tracking-tight">+371 263 88885</p>
                    </div>
                  </a>

                  <a href="mailto:info@rigasautoskola.lv" className="flex items-center gap-5 group">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white/5 rounded-xl md:rounded-[20px] flex items-center justify-center group-hover:bg-[#CCFF00] group-hover:text-black transition-all">
                      <Mail size={22} />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-1">Rakstiet</p>
                      <p className="text-base md:text-3xl font-bold tracking-tight break-all">info@rigasautoskola.lv</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center lg:items-start gap-8">
                <Button
                  onClick={() => setIsBookingOpen(true)}
                  className="h-14 md:h-20 px-12 text-sm md:text-xl uppercase tracking-widest italic shadow-[0_0_50px_rgba(204,255,0,0.35)]"
                >
                  Pieteikties apmācībām
                </Button>

                <p className="text-white/40 text-xs md:text-sm max-w-md text-center lg:text-left">
                  Aizpildi pieteikuma formu, un mēs ar tevi sazināsimies tuvākajā laikā.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <BookingModal lang={lang} isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
