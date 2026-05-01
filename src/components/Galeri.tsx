import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import g1 from "@/assets/galeri-1.jpg";
import g2 from "@/assets/galeri-2.jpg";
import g3 from "@/assets/galeri-3.jpg";
import g4 from "@/assets/galeri-4.jpg";
import detail from "@/assets/batu-tulis-detail.jpg";
import peta from "@/assets/museum-peta.jpg";

const items = [
  { src: g1, title: "Fragmen Batu", caption: "Pecahan prasasti dari situs penggalian Bogor." },
  { src: g2, title: "Mahkota Bronze", caption: "Artefak ceremonial era Pajajaran." },
  { src: g3, title: "Naskah Lontar", caption: "Naskah aksara Sunda Kuno yang terjaga." },
  { src: g4, title: "Relief Raja", caption: "Patung relief Sri Baduga Maharaja." },
  { src: detail, title: "Aksara", caption: "Detail aksara di permukaan prasasti." },
  { src: peta, title: "Peta Antik", caption: "Kartografi dunia abad ke-18." },
];

export default function Galeri() {
  return (
    <section className="py-24 md:py-32 pt-32">
      <div className="container mx-auto px-6">
        <SectionHeading
          align="center"
          eyebrow="Galeri Heritage"
          title="Koleksi"
          highlight="Visual"
          description="Sebuah perjalanan visual menyusuri koleksi prasasti, naskah, dan peta yang membentuk narasi heritage Pajajaran."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.figure
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.7 }}
              className="group relative overflow-hidden rounded-sm border border-gold/15 bg-heritage-900 shadow-deep"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={it.src}
                  alt={it.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-heritage-950 via-heritage-950/30 to-transparent opacity-90" />
              </div>
              <figcaption className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[10px] uppercase tracking-[0.4em] text-copper mb-2">Heritage</p>
                <h3 className="font-display text-2xl text-parchment mb-1">{it.title}</h3>
                <p className="text-sm text-muted-foreground translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500">
                  {it.caption}
                </p>
              </figcaption>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-gold/40 grid place-items-center text-gold text-[10px] tracking-widest">
                {String(i + 1).padStart(2, "0")}
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
