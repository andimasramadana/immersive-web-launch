import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, X, Sparkles, Compass, Images, Users, MapPin } from "lucide-react";

interface UserGuideProps {
  /** Set true once the loading screen finishes so the guide appears after it. */
  start: boolean;
}

const STORAGE_KEY = "ps-user-guide-seen-v1";

const steps = [
  {
    icon: Sparkles,
    title: "Selamat Datang di Project Sejarah",
    body: "Sebuah perjalanan singkat menyusuri dua tempat bersejarah berpengaruh di Bogor — Prasasti Batu Tulis & Museum PETA.",
    accent: "Heritage of Pajajaran",
  },
  {
    icon: Compass,
    title: "Jelajahi Tempat",
    body: "Mulai dari halaman beranda, klik tombol \"Jelajahi Tempat\" untuk memilih situs bersejarah yang ingin kamu kunjungi terlebih dahulu.",
    accent: "Beranda → Jelajahi",
  },
  {
    icon: MapPin,
    title: "Halaman Tempat",
    body: "Di setiap halaman tempat, kamu akan menemukan informasi lengkap, peta Google Maps, serta tombol untuk berpindah ke tempat berikutnya atau keluar.",
    accent: "Informasi & Lokasi",
  },
  {
    icon: Images,
    title: "Galeri Horizontal",
    body: "Buka menu Galeri — scroll mouse seperti biasa, dan halaman akan bergulir ke samping dengan smooth untuk menampilkan koleksi visual.",
    accent: "Scroll → ke samping",
  },
  {
    icon: Users,
    title: "Tim Pengembang",
    body: "Kunjungi halaman Kelompok untuk berkenalan dengan 3 developer di balik proyek ini, lengkap dengan motto hidup dan peran masing-masing.",
    accent: "3 Developer",
    cta: true,
  },
];

export default function UserGuide({ start }: UserGuideProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (typeof window === "undefined") return;
    try {
      const seen = window.localStorage.getItem(STORAGE_KEY);
      if (seen === "1") return;
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => setOpen(true), 400);
    return () => clearTimeout(t);
  }, [start]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const close = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  const next = () => {
    if (step < steps.length - 1) setStep((s) => s + 1);
    else close();
  };
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const current = steps[step];
  const Icon = current.icon;
  const isLast = step === steps.length - 1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="user-guide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9000] flex items-center justify-center px-4"
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-heritage-950/85 backdrop-blur-md"
            onClick={close}
          />

          {/* Card */}
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-sm border border-gold/25 bg-heritage-900/95 shadow-gold"
          >
            {/* Top ornament */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px gradient-gold opacity-80" />
            <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-copper/10 blur-3xl" />

            {/* Close */}
            <button
              onClick={close}
              aria-label="Tutup panduan"
              className="absolute top-3 right-3 z-10 grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:text-gold hover:bg-gold/10 transition"
            >
              <X size={16} />
            </button>

            <div className="relative px-7 pt-9 pb-7">
              {/* Step indicator */}
              <p className="text-[10px] uppercase tracking-[0.4em] text-copper mb-4">
                Panduan · {step + 1} / {steps.length}
              </p>

              {/* Icon */}
              <div className="mb-5 flex items-center gap-3">
                <div className="relative h-12 w-12">
                  <div className="absolute inset-0 rounded-full gradient-gold opacity-90" />
                  <div className="absolute inset-[2px] rounded-full bg-heritage-950 grid place-items-center">
                    <Icon size={20} className="text-gold" />
                  </div>
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-gold/80">
                  {current.accent}
                </span>
              </div>

              {/* Title + body */}
              <h2 className="font-display text-2xl md:text-3xl text-parchment mb-3">
                {current.title}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {current.body}
              </p>

              {/* Progress */}
              <div className="mt-7 flex items-center gap-2">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setStep(i)}
                    aria-label={`Langkah ${i + 1}`}
                    className={`h-1 rounded-full transition-all ${
                      i === step
                        ? "w-8 bg-gold"
                        : i < step
                        ? "w-4 bg-gold/50"
                        : "w-4 bg-gold/15"
                    }`}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  onClick={prev}
                  disabled={step === 0}
                  className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-gold transition disabled:opacity-30 disabled:hover:text-muted-foreground"
                >
                  <ChevronLeft size={14} /> Kembali
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={close}
                    className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-gold transition px-2 py-2"
                  >
                    Lewati
                  </button>
                  {isLast && current.cta ? (
                    <Link
                      to="/"
                      onClick={close}
                      className="inline-flex items-center gap-2 rounded-sm gradient-gold px-5 py-2.5 text-xs font-medium uppercase tracking-[0.25em] text-heritage-950 shadow-gold hover:opacity-95 transition"
                    >
                      Mulai Jelajahi
                    </Link>
                  ) : (
                    <button
                      onClick={next}
                      className="inline-flex items-center gap-2 rounded-sm gradient-gold px-5 py-2.5 text-xs font-medium uppercase tracking-[0.25em] text-heritage-950 shadow-gold hover:opacity-95 transition"
                    >
                      {isLast ? "Selesai" : "Lanjut"} <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom ornament */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px gradient-gold opacity-50" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
