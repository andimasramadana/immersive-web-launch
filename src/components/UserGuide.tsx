import { useEffect, useLayoutEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react";

interface UserGuideProps {
  /** Set true once the loading screen finishes so the guide appears after it. */
  start: boolean;
}

const STORAGE_KEY = "ps-user-guide-seen-v2";

type Step = {
  selector?: string; // CSS selector for the target element. If omitted = intro modal centered.
  title: string;
  body: string;
  accent: string;
};

const steps: Step[] = [
  {
    title: "Selamat Datang di Project Sejarah",
    body: "Mari kita berkeliling sebentar — saya akan menyorot setiap fitur penting di web ini. Kamu bisa melewatinya kapan saja.",
    accent: "Tur Singkat",
  },
  {
    selector: '[data-tour="logo"]',
    title: "Logo & Identitas",
    body: "Klik logo PS kapan saja untuk kembali ke halaman beranda dengan cepat.",
    accent: "Navigasi Cepat",
  },
  {
    selector: '[data-tour="nav-links"]',
    title: "Menu Navigasi",
    body: "Akses semua halaman utama: Beranda, Galeri, dan Kelompok melalui menu di kanan atas.",
    accent: "Menu Utama",
  },
  {
    selector: '[data-tour="explore-btn"]',
    title: "Tombol Jelajahi Tempat",
    body: "Tombol utama ini membawamu memilih tempat bersejarah — Prasasti Batu Tulis atau Museum PETA.",
    accent: "Aksi Utama",
  },
  {
    selector: '[data-tour="nav-galeri"]',
    title: "Galeri Horizontal",
    body: "Buka Galeri lalu scroll mouse — halaman akan bergulir ke samping dengan smooth menampilkan koleksi visual.",
    accent: "Scroll ke samping",
  },
  {
    selector: '[data-tour="nav-kelompok"]',
    title: "Tim Pengembang",
    body: "Kenali 3 developer di balik proyek ini lengkap dengan motto hidup dan peran masing-masing.",
    accent: "3 Developer",
  },
  {
    title: "Selamat Menjelajah!",
    body: "Tur selesai. Selamat menyusuri jejak heritage Pajajaran melalui Project Sejarah.",
    accent: "Mulai Sekarang",
  },
];

const PADDING = 10;
const RADIUS = 8;

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export default function UserGuide({ start }: UserGuideProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });

  // Trigger after loading
  useEffect(() => {
    if (!start || typeof window === "undefined") return;
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => setOpen(true), 400);
    return () => clearTimeout(t);
  }, [start]);

  // Lock scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const measure = useCallback(() => {
    if (typeof window === "undefined") return;
    setViewport({ w: window.innerWidth, h: window.innerHeight });
    const sel = steps[step]?.selector;
    if (!sel) {
      setRect(null);
      return;
    }
    const el = document.querySelector(sel) as HTMLElement | null;
    if (!el) {
      setRect(null);
      return;
    }
    // Scroll element into view first
    el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    // Slight delay to let scroll settle, then measure
    requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      setRect({
        top: r.top - PADDING,
        left: r.left - PADDING,
        width: r.width + PADDING * 2,
        height: r.height + PADDING * 2,
      });
    });
  }, [step]);

  useLayoutEffect(() => {
    if (!open) return;
    measure();
  }, [open, step, measure]);

  useEffect(() => {
    if (!open) return;
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, true);
    const interval = setInterval(measure, 400); // re-sync against layout shifts
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize, true);
      clearInterval(interval);
    };
  }, [open, measure]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
      else if (e.key === "ArrowRight" || e.key === "Enter") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, step]);

  const finish = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  const next = () => {
    if (step < steps.length - 1) setStep((s) => s + 1);
    else finish();
  };
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const current = steps[step];
  const isLast = step === steps.length - 1;
  const hasTarget = !!rect;

  // Compute tooltip position relative to spotlight rect
  const TOOLTIP_W = 360;
  const TOOLTIP_H_EST = 240;
  const GAP = 18;
  let tooltipStyle: React.CSSProperties = {};

  if (hasTarget && rect && viewport.w) {
    const spaceBelow = viewport.h - (rect.top + rect.height);
    const spaceAbove = rect.top;
    const placeBelow = spaceBelow > TOOLTIP_H_EST + GAP || spaceBelow > spaceAbove;
    const top = placeBelow
      ? Math.min(rect.top + rect.height + GAP, viewport.h - TOOLTIP_H_EST - 16)
      : Math.max(16, rect.top - TOOLTIP_H_EST - GAP);
    const centerX = rect.left + rect.width / 2;
    const left = Math.max(16, Math.min(centerX - TOOLTIP_W / 2, viewport.w - TOOLTIP_W - 16));
    tooltipStyle = { top, left, width: TOOLTIP_W };
  } else {
    tooltipStyle = {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: Math.min(TOOLTIP_W, viewport.w - 32),
    };
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="user-guide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[9000]"
          aria-modal="true"
          role="dialog"
        >
          {/* SVG mask: dark+blurred everywhere, transparent over the target rect */}
          <svg
            className="absolute inset-0 h-full w-full"
            width="100%"
            height="100%"
            style={{ pointerEvents: "auto" }}
          >
            <defs>
              <mask id="ps-tour-mask">
                <rect width="100%" height="100%" fill="white" />
                {hasTarget && rect && (
                  <motion.rect
                    initial={false}
                    animate={{
                      x: rect.left,
                      y: rect.top,
                      width: rect.width,
                      height: rect.height,
                    }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    rx={RADIUS}
                    ry={RADIUS}
                    fill="black"
                  />
                )}
              </mask>
              <filter id="ps-tour-blur">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>
            {/* Dark veil with hole */}
            <rect
              width="100%"
              height="100%"
              fill="oklch(0.12 0.02 60 / 0.82)"
              mask="url(#ps-tour-mask)"
            />
          </svg>

          {/* Backdrop blur layer using same mask via CSS — overlay an extra blurred clone */}
          {hasTarget && rect && (
            <motion.div
              className="absolute pointer-events-none"
              initial={false}
              animate={{
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ borderRadius: RADIUS }}
            >
              {/* Glowing border around spotlight */}
              <div
                className="absolute inset-0 ring-2 ring-gold/80 shadow-gold animate-glow"
                style={{ borderRadius: RADIUS }}
              />
              <div
                className="absolute -inset-1 ring-1 ring-gold/30"
                style={{ borderRadius: RADIUS + 2 }}
              />
            </motion.div>
          )}

          {/* Click-catcher to close on outside click of tooltip and target */}
          <div className="absolute inset-0" onClick={() => {}} />

          {/* Tooltip card */}
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute overflow-hidden rounded-sm border border-gold/25 bg-heritage-900/95 shadow-gold backdrop-blur-md"
            style={tooltipStyle}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px gradient-gold opacity-80" />
            <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />

            {/* Skip (always visible) */}
            <button
              onClick={finish}
              className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-gold hover:bg-gold/10 transition"
              aria-label="Lewati tur"
            >
              <X size={12} /> Skip
            </button>

            <div className="relative px-6 pt-8 pb-6">
              <p className="text-[10px] uppercase tracking-[0.4em] text-copper mb-3">
                {current.accent} · {step + 1}/{steps.length}
              </p>

              <div className="mb-3 flex items-center gap-2">
                <div className="relative h-8 w-8">
                  <div className="absolute inset-0 rounded-full gradient-gold opacity-90" />
                  <div className="absolute inset-[2px] rounded-full bg-heritage-950 grid place-items-center">
                    <Sparkles size={13} className="text-gold" />
                  </div>
                </div>
                <h2 className="font-display text-xl text-parchment">{current.title}</h2>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">{current.body}</p>

              {/* Progress dots */}
              <div className="mt-5 flex items-center gap-1.5">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setStep(i)}
                    aria-label={`Langkah ${i + 1}`}
                    className={`h-1 rounded-full transition-all ${
                      i === step ? "w-6 bg-gold" : i < step ? "w-3 bg-gold/50" : "w-3 bg-gold/15"
                    }`}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="mt-5 flex items-center justify-between gap-3">
                <button
                  onClick={prev}
                  disabled={step === 0}
                  className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-gold transition disabled:opacity-30 disabled:hover:text-muted-foreground"
                >
                  <ChevronLeft size={13} /> Kembali
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={finish}
                    className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-gold transition px-2 py-2"
                  >
                    Lewati
                  </button>
                  <button
                    onClick={next}
                    className="inline-flex items-center gap-1.5 rounded-sm gradient-gold px-4 py-2 text-[11px] font-medium uppercase tracking-[0.25em] text-heritage-950 shadow-gold hover:opacity-95 transition"
                  >
                    {isLast ? "Selesai" : "Lanjut"} <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px gradient-gold opacity-50" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
