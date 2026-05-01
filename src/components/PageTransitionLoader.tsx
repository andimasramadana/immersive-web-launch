import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

export default function PageTransitionLoader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [visible, setVisible] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 850);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[9998] pointer-events-none"
        >
          {/* Dark veil */}
          <div className="absolute inset-0 bg-heritage-950/85 backdrop-blur-sm" />

          {/* Sweeping gold curtains */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: [0.85, 0, 0.15, 1] }}
            className="absolute inset-y-0 left-0 w-1/2 origin-left"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.18 0.03 60) 0%, oklch(0.22 0.04 60) 100%)",
            }}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.7, ease: [0.85, 0, 0.15, 1] }}
            className="absolute inset-y-0 right-0 w-1/2"
            style={{
              background:
                "linear-gradient(270deg, oklch(0.18 0.03 60) 0%, oklch(0.22 0.04 60) 100%)",
            }}
          />

          {/* Center ornament + spinner */}
          <div className="relative z-10 flex h-full w-full items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-col items-center gap-5"
            >
              <div className="relative h-14 w-14">
                <div className="absolute inset-0 rounded-full border border-gold/20" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold border-r-copper"
                />
                <div className="absolute inset-3 rounded-full gradient-gold opacity-70 animate-glow" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-copper">
                Memuat halaman
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
