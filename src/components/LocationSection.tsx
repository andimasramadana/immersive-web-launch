import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";
import SectionHeading from "./SectionHeading";
import lokasiImg from "@/assets/lokasi-bogor.jpg";

const info = [
  { icon: MapPin, label: "Alamat", value: "Jl. Batutulis No. 54, Bogor Selatan, Jawa Barat" },
  { icon: Clock, label: "Jam Buka", value: "Selasa – Minggu · 08.00 – 16.00 WIB" },
  { icon: Phone, label: "Kontak", value: "+62 251 1234 5678" },
];

export default function LocationSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <SectionHeading
          align="center"
          eyebrow="Lokasi"
          title="Temui kami di"
          highlight="Bogor"
          description="Situs Prasasti Batu Tulis berada di jantung Kota Bogor — sebuah ruang sunyi yang dikelilingi pohon-pohon tua dan jejak Pajajaran."
        />

        <div className="mt-16 grid lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-3 relative overflow-hidden rounded-sm border border-gold/20 shadow-deep"
          >
            <img
              src={lokasiImg}
              alt="Pemandangan situs Batu Tulis Bogor"
              loading="lazy"
              width={1600}
              height={1000}
              className="w-full aspect-[16/10] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-heritage-950/60 to-transparent" />
            <div className="absolute bottom-6 left-6 glass-heritage px-5 py-3 rounded-sm">
              <p className="text-[10px] uppercase tracking-[0.3em] text-copper">Heritage Site</p>
              <p className="font-display text-gold text-lg">Batu Tulis · Bogor</p>
            </div>
          </motion.div>

          <div className="lg:col-span-2 space-y-4">
            {info.map((it, i) => (
              <motion.div
                key={it.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-heritage p-6 rounded-sm flex gap-4 items-start"
              >
                <div className="w-10 h-10 rounded-full gradient-gold grid place-items-center shrink-0">
                  <it.icon size={18} className="text-heritage-950" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-copper mb-1">{it.label}</p>
                  <p className="font-display text-lg text-parchment leading-snug">{it.value}</p>
                </div>
              </motion.div>
            ))}

            <motion.a
              href="https://maps.google.com/?q=Prasasti+Batu+Tulis+Bogor"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="block text-center w-full py-3.5 gradient-gold text-heritage-950 font-medium tracking-wide rounded-sm shadow-gold hover:shadow-deep transition"
            >
              Buka di Google Maps
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
