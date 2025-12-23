import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, AlertTriangle } from "lucide-react";
import { Language, translations } from "../i18n/translations";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

type FormState = {
  name: string;
  phone: string;
  code: string;
  email: string;
  comment: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  code: "",
  email: "",
  comment: "",
};

function normalizePhone(input: string) {
  return input.replace(/[^\d+]/g, "").trim();
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, lang }) => {
  const t = translations[lang].contact;

  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const canSubmit = useMemo(() => {
    const nameOk = form.name.trim().length >= 2;
    const emailOk = /^\S+@\S+\.\S+$/.test(form.email.trim());
    const phoneOk = normalizePhone(form.phone).length >= 8; // vienkārša pārbaude
    return nameOk && emailOk && phoneOk && status !== "loading";
  }, [form, status]);

  const handleChange = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));
  };

  const handleClose = () => {
    setStatus("idle");
    setErrorMsg("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setStatus("loading");

    try {
      // ✅ Tev vajag endpointu (skat. zemāk 3 variantus kā to izdarīt)
      // Piemērs: VITE_LEADS_ENDPOINT="https://tavs-domens.lv/api/lead"
      const endpoint = import.meta.env.VITE_LEADS_ENDPOINT as string | undefined;

      if (!endpoint) {
        throw new Error("Nav norādīts VITE_LEADS_ENDPOINT .env failā");
      }

      const payload = {
        name: form.name.trim(),
        phone: normalizePhone(form.phone),
        code: form.code.trim(),
        email: form.email.trim(),
        comment: form.comment.trim(),
        lang,
        page: window.location.href,
        createdAt: new Date().toISOString(),
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Neizdevās nosūtīt. Mēģini vēlreiz.");
      }

      setStatus("success");
      setForm(initialState);

      setTimeout(() => {
        handleClose();
      }, 2200);
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Kļūda. Mēģini vēlreiz.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <AnimatePresence mode="wait">
        {status !== "success" ? (
          <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <h3 className="text-2xl md:text-4xl font-black mb-1 uppercase italic">{t.formTitle}</h3>
            <p className="text-white/40 mb-6 md:mb-8 uppercase text-[9px] md:text-xs tracking-widest">{t.formSubtitle}</p>

            {status === "error" && (
              <div className="mb-4 p-4 rounded-2xl border border-red-500/20 bg-red-500/10 flex gap-3 items-start">
                <AlertTriangle className="shrink-0 mt-0.5" size={18} />
                <div className="text-sm text-white/80">
                  <div className="font-black uppercase tracking-widest text-[10px] text-red-200 mb-1">Kļūda</div>
                  <div className="text-white/70 text-xs md:text-sm">{errorMsg}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <input
                type="text"
                placeholder={t.formName}
                required
                value={form.name}
                onChange={handleChange("name")}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl md:rounded-2xl outline-none focus:border-[#CCFF00] transition-all text-sm"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <input
                  type="tel"
                  placeholder={t.formPhone}
                  required
                  value={form.phone}
                  onChange={handleChange("phone")}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl md:rounded-2xl outline-none focus:border-[#CCFF00] transition-all text-sm"
                />
                <input
                  type="text"
                  placeholder={t.formCode}
                  value={form.code}
                  onChange={handleChange("code")}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl md:rounded-2xl outline-none focus:border-[#CCFF00] transition-all text-sm"
                />
              </div>

              <input
                type="email"
                placeholder={t.formEmail}
                required
                value={form.email}
                onChange={handleChange("email")}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl md:rounded-2xl outline-none focus:border-[#CCFF00] transition-all text-sm"
              />

              <textarea
                placeholder={t.formComment}
                value={form.comment}
                onChange={handleChange("comment")}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl md:rounded-2xl outline-none focus:border-[#CCFF00] transition-all min-h-[90px] text-sm"
              />

              <Button
                type="submit"
                className="w-full h-12 md:h-16 text-sm md:text-lg uppercase tracking-wider"
                disabled={!canSubmit}
              >
                {status === "loading" ? "Sūta..." : t.formSubmit}
              </Button>

              <p className="text-[10px] text-white/30 uppercase tracking-widest font-black">
                Nosūtot, jūs piekrītat, ka ar jums sazināsimies.
              </p>
            </form>
          </motion.div>
        ) : (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-[#CCFF00] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(204,255,0,0.5)]">
              <ShieldCheck size={32} className="text-black md:size-12" />
            </div>
            <h3 className="text-xl md:text-3xl font-black mb-2 uppercase italic">Pieteikums nosūtīts!</h3>
            <p className="text-white/50 text-sm md:text-lg">Paldies! Mēs sazināsimies tuvākajā laikā.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};
