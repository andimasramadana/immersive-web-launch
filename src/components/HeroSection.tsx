import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-batu-tulis.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with parallax-like scale */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img
          src={heroImg}
          alt="Prasasti Batu Tulis di museum heritage"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-heritage-950/70 via-heritage-950/50 to-heritage-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-heritage-950 via-heritage-950/30 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xs uppercase tracking-[0.5em] text-copper mb-6"
          >
            — Warisan Sunda Pajajaran
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6"
          >
            Jejak <span className="gradient-text-gold italic">Prasasti</span>
            <br />
            yang Berbicara
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl"
          >
            Sebuah penghormatan pada Prasasti Batu Tulis dan koleksi peta kuno Nusantara—
            menelusuri narasi sejarah yang terukir di batu dan tergambar di lembar tua.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/batu-tulis"
              className="group inline-flex items-center gap-2 px-7 py-3.5 gradient-gold text-heritage-950 font-medium tracking-wide rounded-sm shadow-gold hover:shadow-deep transition-all"
            >
              Jelajahi Prasasti
              <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
            </Link>
            <Link
              to="/galeri"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-gold/40 text-gold tracking-wide rounded-sm hover:bg-gold/10 transition"
            >
              Lihat Galeri
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-md"
          >
            {[
              { n: "1533", l: "Diperkirakan dibuat" },
              { n: "VII", l: "Baris aksara" },
              { n: "Bogor", l: "Lokasi situs" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl md:text-3xl gradient-text-gold">{s.n}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
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
