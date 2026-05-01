import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Beranda" },
  { to: "/galeri", label: "Galeri" },
  { to: "/kelompok", label: "Kelompok" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 glass-heritage border-b border-gold/20" : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" data-tour="logo" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 rounded-full gradient-gold opacity-90 group-hover:opacity-100 transition" />
            <div className="absolute inset-[3px] rounded-full bg-heritage-950 grid place-items-center">
              <span className="font-display text-gold text-sm">PS</span>
            </div>
          </div>
          <div className="leading-tight">
            <p className="font-display text-base text-parchment tracking-wider">Project Sejarah</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-copper">Heritage Project</p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" data-tour="nav-links">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-tour={`nav-${l.label.toLowerCase()}`}
              className="px-4 py-2 text-sm tracking-wide text-muted-foreground hover:text-gold transition relative group"
              activeProps={{ className: "text-gold" }}
            >
              {l.label}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-gold group-hover:w-6 transition-all duration-300" />
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-gold p-2"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-heritage overflow-hidden border-t border-gold/15"
          >
            <nav className="container mx-auto px-6 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm tracking-wide text-muted-foreground hover:text-gold border-b border-gold/10"
                  activeProps={{ className: "text-gold" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
