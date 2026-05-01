import { Link } from "@tanstack/react-router";
import { MapPin, Mail, Instagram } from "lucide-react";

const navLinks = [
  { to: "/" as const, label: "Beranda" },
  { to: "/jelajahi" as const, label: "Jelajahi Tempat" },
  { to: "/galeri" as const, label: "Galeri" },
  { to: "/kelompok" as const, label: "Kelompok" },
];

const places = [
  { to: "/batu-tulis" as const, label: "Prasasti Batu Tulis" },
  { to: "/museum-peta" as const, label: "Museum Peta" },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-gold/15 bg-heritage-950">
      <div className="ornament-divider" />

      <div className="container mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <Link to="/" className="inline-flex items-center gap-3 group mb-5">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full gradient-gold opacity-90" />
              <div className="absolute inset-[3px] rounded-full bg-heritage-950 grid place-items-center">
                <span className="font-display text-gold text-sm">BT</span>
              </div>
            </div>
            <div className="leading-tight">
              <p className="font-display text-lg text-parchment tracking-wider">Batu Tulis</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-copper">Heritage Project</p>
            </div>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
            Sebuah penghormatan pada dua tempat bersejarah di Bogor — Prasasti Batu Tulis
            dan Museum PETA. Proyek dokumentasi heritage karya Tugas Kelompok.
          </p>

          <div className="flex gap-3 mt-6">
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

        {/* Navigasi */}
        <div>
          <h4 className="font-display text-gold text-sm uppercase tracking-[0.3em] mb-5">Navigasi</h4>
          <ul className="space-y-3 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-muted-foreground hover:text-gold transition inline-flex items-center gap-2 group"
                >
                  <span className="w-3 h-px bg-copper group-hover:w-5 group-hover:bg-gold transition-all" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tempat */}
        <div>
          <h4 className="font-display text-gold text-sm uppercase tracking-[0.3em] mb-5">Tempat</h4>
          <ul className="space-y-3 text-sm">
            {places.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-muted-foreground hover:text-gold transition inline-flex items-center gap-2 group"
                >
                  <span className="w-3 h-px bg-copper group-hover:w-5 group-hover:bg-gold transition-all" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-copper mb-2">Lokasi</p>
            <p className="text-sm text-parchment font-display leading-snug">Kota Bogor, Jawa Barat</p>
          </div>
        </div>
      </div>

      <div className="ornament-divider" />
      <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          © {new Date().getFullYear()} Tugas Kelompok · Heritage Edition
        </p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-copper">
          Dibuat dengan rasa hormat pada warisan Sunda
        </p>
      </div>
    </footer>
  );
}
