import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, AlertTriangle, Loader2 } from "lucide-react";
import { Language, translations } from "../i18n/translations";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const FORMSPREE_URL = "https://formspree.io/f/mbdrnkoj";

type Status = "idle" | "loading" | "success" | "error";

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const t = translations[lang].contact;

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    code: "",
    email: "",
    comment: "",
  });

  // Kad atver/aizver modali — reset
  useEffect(() => {
    if (!isOpen) {
      setStatus("idle");
      setErrorMsg("");
      setForm({ name: "", phone: "", code: "", email: "", comment: "" });
    }
  }, [isOpen]);

  const onChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          code: form.code,
          email: form.email,
          message: form.comment, // Formspree bieži izmanto "message"
          page: window.location.href,
        }),
      });

      if (!res.ok) {
        // Formspree reizēm atgriež JSON ar errors
        let details = "";
        try {
          const data = await res.json();
          details =
            data?.errors?.[0]?.message ||
            data?.error ||
            "Neizdevās nosūtīt pieteikumu.";
        } catch {
          details = "Neizdevās nosūtīt pieteikumu.";
        }
        setStatus("error");
        setErrorMsg(details);
        return;
      }

      setStatus("success");

      // aizver pēc 2.2s
      setTimeout(() => {
        onClose();
      }, 2200);
    } catch (err) {
      setStatus("error");
      setErrorMsg("Tīkla kļūda. Pamēģini vēlreiz.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <AnimatePresence mode="wait">
        {status !== "success" ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <h3 className="text-2xl md:text-4xl font-black mb-1 uppercase italic">
              {t.formTitle}
            </h3>
            <p className="text-white/40 mb-6 md:mb-8 uppercase text-[9px] md:text-xs tracking-widest">
              {t.formSubtitle}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <input
                name="name"
                value={form.name}
                onChange={onChange("name")}
                type="text"
                placeholder={t.formName}
                required
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl md:rounded-2xl outline-none focus:border-[#CCFF00] transition-all text-sm"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange("phone")}
                  type="tel"
                  placeholder={t.formPhone}
                  required
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl md:rounded-2xl outline-none focus:border-[#CCFF00] transition-all text-sm"
                />

                <input
                  name="code"
                  value={form.code}
                  onChange={onChange("code")}
                  type="text"
                  placeholder={t.formCode}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl md:rounded-2xl outline-none focus:border-[#CCFF00] transition-all text-sm"
                />
              </div>

              <input
                name="email"
                value={form.email}
                onChange={onChange("email")}
                type="email"
                placeholder={t.formEmail}
                required
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl md:rounded-2xl outline-none focus:border-[#CCFF00] transition-all text-sm"
              />

              <textarea
                name="message"
                value={form.comment}
                onChange={onChange("comment")}
                placeholder={t.formComment}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl md:rounded-2xl outline-none focus:border-[#CCFF00] transition-all min-h-[90px] text-sm"
              />

              {/* Error box */}
              {status === "error" && (
                <div className="flex items-start gap-3 p-3 rounded-xl border border-red-500/30 bg-red-500/10">
                  <AlertTriangle className="mt-0.5" size={18} />
                  <p className="text-sm text-white/80">{errorMsg}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full h-12 md:h-16 text-sm md:text-lg uppercase tracking-wider flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Sūtu...
                  </>
                ) : (
                  t.formSubmit
                )}
              </Button>

              <p className="text-white/30 text-[10px] md:text-xs">
                Nosūtot, jūs piekrītat, ka ar jums sazināsimies.
              </p>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-6"
          >
            <div className="w-16 h-16 md:w-24 md:h-24 bg-[#CCFF00] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(204,255,0,0.5)]">
              <ShieldCheck size={32} className="text-black md:size-12" />
            </div>
            <h3 className="text-xl md:text-3xl font-black mb-2 uppercase italic">
              Pieteikums saņemts!
            </h3>
            <p className="text-white/50 text-sm md:text-lg">
              Paldies! Mēs sazināsimies tuvākajā laikā!.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};
