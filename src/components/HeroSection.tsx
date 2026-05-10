import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import heroImg from "@/assets/hero-bogor.jpg";
import GoldenMotes from "./fx/GoldenMotes";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const veilOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden perspective-1000"
    >
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0"
      >
        <img
          src={heroImg}
          alt="Pemandangan Kota Bogor di senja hari dengan gunung dan kabut tropis"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1280}
        />
        <motion.div
          style={{ opacity: veilOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-heritage-950/70 via-heritage-950/55 to-heritage-950"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-heritage-950 via-heritage-950/30 to-transparent" />
        {/* Vignette + radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 70% 30%, oklch(0.82 0.16 82 / 0.15), transparent 55%)",
          }}
        />
      </motion.div>

      <GoldenMotes count={32} />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 container mx-auto px-6 pt-32 pb-20"
      >
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.5em" }}
            transition={{ delay: 0.4, duration: 1.2 }}
            className="text-xs uppercase text-copper mb-6"
          >
            — Warisan Tanah Sunda
          </motion.p>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6 [perspective:800px]">
            <motion.span
              initial={{ opacity: 0, y: 40, rotateX: -30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
              style={{ transformOrigin: "50% 100%" }}
            >
              Dua Tempat
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0, y: 40, rotateX: -30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block italic shimmer-text"
              style={{ transformOrigin: "50% 100%" }}
            >
              Bersejarah
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 40, rotateX: -30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
              style={{ transformOrigin: "50% 100%" }}
            >
              Berpengaruh di Bogor
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.9 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl"
          >
            Menelusuri jejak Pajajaran lewat Prasasti Batu Tulis dan koleksi peta kuno
            di Museum Peta Bogor — dua saksi bisu dari perjalanan panjang Nusantara.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/jelajahi"
              data-tour="explore-btn"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 gradient-gold-animated text-heritage-950 font-medium tracking-wide rounded-sm shadow-gold hover:shadow-deep transition-all overflow-hidden"
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                Jelajahi Tempat
                <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
              </span>
              {/* Shine sweep */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.1s] ease-out"
                style={{
                  background:
                    "linear-gradient(100deg, transparent, oklch(1 0 0 / 0.55), transparent)",
                }}
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-md"
          >
            {[
              { n: "2", l: "Tempat bersejarah" },
              { n: "3", l: "Developer" },
              { n: "Bogor", l: "Tanah Pajajaran" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 20, rotateY: -20 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: 1.6 + i * 0.12, duration: 0.8 }}
                whileHover={{ y: -4, rotateX: 6 }}
                className="[transform-style:preserve-3d]"
              >
                <div className="font-display text-2xl md:text-3xl gradient-text-gold">{s.n}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-copper"
      >
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent animate-glow" />
      </motion.div>
    </section>
  );
}
