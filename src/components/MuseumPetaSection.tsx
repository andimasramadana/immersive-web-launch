import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import petaImg from "@/assets/museum-peta.jpg";

export default function MuseumPetaSection() {
  return (
    <section id="museum-peta" className="relative py-24 md:py-32 bg-heritage-900/40">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <SectionHeading
            eyebrow="Museum Peta"
            title="Kartografi"
            highlight="Nusantara"
            description="Koleksi peta kuno menampilkan bagaimana para penjelajah, kartografer, dan kerajaan memandang Nusantara berabad-abad lalu — dari kompas tua, naga laut, hingga jalur rempah yang membentuk dunia."
          />

          <ul className="mt-10 space-y-4">
            {[
              "Peta dunia abad ke-16 dengan ornamen kompas emas",
              "Kartografi Nusantara dari era VOC dan kolonial",
              "Sketsa jalur rempah dari Maluku ke Eropa",
              "Atlas heritage karya kartografer lokal Bogor",
            ].map((t, i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 text-muted-foreground"
              >
                <span className="mt-2 inline-block w-2 h-px bg-gold" />
                <span>{t}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 12 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2 relative perspective-1000"
        >
          <div className="absolute -inset-6 gradient-gold opacity-15 blur-3xl rounded-full" />
          <div className="relative preserve-3d">
            <img
              src={petaImg}
              alt="Peta antik Nusantara di Museum Peta"
              loading="lazy"
              width={1920}
              height={1280}
              className="w-full aspect-[3/2] object-cover rounded-sm shadow-deep border border-gold/20"
            />
            <div className="absolute top-4 left-4 glass-heritage px-4 py-2 rounded-sm">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Est. 1745</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
