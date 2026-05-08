import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import SectionHeading from "./SectionHeading";
import Tilt3D from "./fx/Tilt3D";
import MaskReveal from "./fx/MaskReveal";
import GoldenMotes from "./fx/GoldenMotes";
import btInside from "@/assets/galeri/bt-inside.jpg";
import btText from "@/assets/galeri/bt-text.jpg";
import btHousing from "@/assets/galeri/bt-housing.jpg";
import petaHall from "@/assets/galeri/peta-hall.jpg";
import petaTank from "@/assets/galeri/peta-tank.jpg";
import petaSudirman from "@/assets/galeri/peta-sudirman.jpg";

const items = [
  {
    src: btInside,
    title: "Prasasti Batu Tulis",
    caption: "Batu prasasti peninggalan Sri Baduga Maharaja di Bogor Selatan.",
    tag: "Batu Tulis",
  },
  {
    src: btText,
    title: "Aksara Sunda Kuno",
    caption: "Detail pahatan aksara Sunda Kuno pada permukaan prasasti.",
    tag: "Batu Tulis",
  },
  {
    src: btHousing,
    title: "Cungkup Pelindung",
    caption: "Bangunan cungkup yang melindungi situs Prasasti Batu Tulis.",
    tag: "Batu Tulis",
  },
  {
    src: petaHall,
    title: "Gedung Museum PETA",
    caption: "Bangunan utama Museum Pembela Tanah Air di Bogor.",
    tag: "Museum Peta",
  },
  {
    src: petaTank,
    title: "Kendaraan Lapis Baja",
    caption: "AMX-13 APC yang dipajang di pelataran Museum PETA.",
    tag: "Museum Peta",
  },
  {
    src: petaSudirman,
    title: "Patung Jenderal Sudirman",
    caption: "Patung penghormatan kepada Jenderal Sudirman di Museum PETA.",
    tag: "Museum Peta",
  },
];

export default function Galeri() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Convert vertical wheel into horizontal scroll with smooth easing
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      // Only hijack when there's room to scroll horizontally
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = el.scrollLeft >= max - 1 && e.deltaY > 0;
      if (atStart || atEnd) return;
      e.preventDefault();
      el.scrollBy({ left: e.deltaY, behavior: "smooth" });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section className="py-24 md:py-32 pt-32 relative overflow-hidden">
      <GoldenMotes count={26} />
      <div className="container mx-auto px-6">
        <SectionHeading
          align="center"
          eyebrow="Galeri Heritage"
          title="Koleksi"
          highlight="Visual"
          description="Sebuah perjalanan visual menyusuri koleksi prasasti, naskah, dan peta yang membentuk narasi heritage Pajajaran. Geser ke samping untuk menjelajah."
        />
      </div>

      <div
        ref={scrollerRef}
        className="mt-16 overflow-x-auto overflow-y-hidden scroll-smooth pb-8"
        style={{ scrollbarWidth: "thin" }}
      >
        <div className="flex gap-6 px-6 md:px-12 w-max">
          {items.map((it, i) => (
            <motion.figure
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.7 }}
              className="flex-shrink-0 w-[280px] md:w-[360px] perspective-1000"
            >
              <Tilt3D max={16} scale={1.03} className="rounded-sm">
                <div className="group relative overflow-hidden rounded-sm border border-gold/15 bg-heritage-900 shadow-deep">
                  <MaskReveal
                    delay={(i % 3) * 0.08}
                    direction={i % 2 === 0 ? "up" : "left"}
                    className="relative aspect-[4/5]"
                  >
                    <img
                      src={it.src}
                      alt={it.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-heritage-950 via-heritage-950/30 to-transparent opacity-90" />
                  </MaskReveal>
                  <figcaption
                    className="absolute bottom-0 left-0 right-0 p-6"
                    style={{ transform: "translateZ(50px)" }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.4em] text-copper mb-2">{it.tag}</p>
                    <h3 className="font-display text-2xl text-parchment mb-1">{it.title}</h3>
                    <p className="text-sm text-muted-foreground translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500">
                      {it.caption}
                    </p>
                  </figcaption>
                  <div
                    className="absolute top-4 right-4 w-8 h-8 rounded-full border border-gold/40 grid place-items-center text-gold text-[10px] tracking-widest backdrop-blur-md bg-heritage-950/40"
                    style={{ transform: "translateZ(60px)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  {/* corner ornament */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-2 left-2 h-5 w-5 border-t border-l border-gold/70" />
                    <div className="absolute top-2 right-2 h-5 w-5 border-t border-r border-gold/70" />
                    <div className="absolute bottom-2 left-2 h-5 w-5 border-b border-l border-gold/70" />
                    <div className="absolute bottom-2 right-2 h-5 w-5 border-b border-r border-gold/70" />
                  </div>
                </div>
              </Tilt3D>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
