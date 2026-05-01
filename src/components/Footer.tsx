import { Link } from "@tanstack/react-router";
import { MapPin, Mail, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-gold/15 bg-heritage-950">
      <div className="ornament-divider" />

      <div className="container mx-auto px-6 py-16 flex flex-col items-center text-center gap-6">
        <Link to="/" className="inline-flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full gradient-gold opacity-90" />
            <div className="absolute inset-[3px] rounded-full bg-heritage-950 grid place-items-center">
              <span className="font-display text-gold text-sm">PS</span>
            </div>
          </div>
          <div className="leading-tight text-left">
            <p className="font-display text-lg text-parchment tracking-wider">Project Sejarah</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-copper">Heritage Project</p>
          </div>
        </Link>

        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
          Sebuah penghormatan pada dua tempat bersejarah di Bogor — Prasasti Batu Tulis
          dan Museum PETA. Proyek dokumentasi heritage karya Tugas Kelompok.
        </p>

        <div className="flex gap-3">
          {[
            { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
            { icon: Instagram, href: "#", label: "Instagram" },
            { icon: MapPin, href: "https://maps.google.com/?q=Bogor", label: "Maps" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="w-10 h-10 rounded-full border border-gold/30 grid place-items-center text-gold hover:bg-gold hover:text-heritage-950 transition-all"
            >
              <s.icon size={15} />
            </a>
          ))}
        </div>
      </div>

      <div className="ornament-divider" />
      <div className="container mx-auto px-6 py-6 flex justify-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground text-center">
          © {new Date().getFullYear()} Tugas Kelompok · Heritage Edition
        </p>
      </div>
    </footer>
  );
}
