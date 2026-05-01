import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

interface Props {
  nextTo?: "/batu-tulis" | "/museum-peta";
  nextLabel?: string;
}

export default function ExploreNav({ nextTo, nextLabel }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="container mx-auto px-6 pb-24"
    >
      <div className="glass-heritage rounded-sm p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5">
        <Link
          to="/jelajahi"
          className="inline-flex items-center gap-2 text-sm tracking-wide text-muted-foreground hover:text-gold transition group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition" />
          Kembali ke Jelajahi
        </Link>

        <div className="flex flex-wrap items-center gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-copper/40 text-copper tracking-wide rounded-sm hover:bg-copper/10 transition text-sm"
          >
            <X size={14} />
            Keluar
          </Link>

          {nextTo && (
            <Link
              to={nextTo}
              className="group inline-flex items-center gap-2 px-6 py-2.5 gradient-gold text-heritage-950 font-medium tracking-wide rounded-sm shadow-gold hover:shadow-deep transition-all text-sm"
            >
              Selanjutnya: {nextLabel}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
