import { motion } from "framer-motion";
import { MapPin, Clock, Phone, ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";

const locations = [
  {
    name: "Prasasti Batu Tulis",
    eyebrow: "Situs Heritage Pajajaran",
    desc: "Salah satu prasasti terpenting peninggalan Kerajaan Sunda Pajajaran, didirikan untuk menghormati Sri Baduga Maharaja (Prabu Siliwangi).",
    address: "Jl. Batutulis No. 54, RT.01/RW.01, Batutulis, Kec. Bogor Selatan, Kota Bogor, Jawa Barat 16133",
    hours: "Selasa – Minggu · 08.00 – 16.00 WIB",
    phone: "+62 251 8323 644",
    mapsEmbed:
      "https://www.google.com/maps?q=Prasasti+Batu+Tulis+Bogor&output=embed",
    mapsLink: "https://maps.google.com/?q=Prasasti+Batu+Tulis+Bogor",
  },
  {
    name: "Museum Peta",
    eyebrow: "Museum Pembela Tanah Air",
    desc: "Museum yang merekam sejarah pasukan PETA serta menyimpan koleksi peta dan dokumen perjuangan kemerdekaan Indonesia.",
    address: "Jl. Jenderal Sudirman No. 35, Sempur, Kec. Bogor Tengah, Kota Bogor, Jawa Barat 16129",
    hours: "Selasa – Minggu · 08.00 – 15.00 WIB",
    phone: "+62 251 8324 945",
    mapsEmbed:
      "https://www.google.com/maps?q=Museum+PETA+Bogor&output=embed",
    mapsLink: "https://maps.google.com/?q=Museum+PETA+Bogor",
  },
];

export default function LocationSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <SectionHeading
          align="center"
          eyebrow="Lokasi Tempat"
          title="Temui kami di"
          highlight="Bogor"
          description="Dua situs heritage yang berdiri di jantung Kota Bogor — keduanya menyimpan jejak panjang tanah Sunda."
        />

        <div className="mt-16 space-y-16">
          {locations.map((loc, idx) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className={`grid lg:grid-cols-5 gap-8 items-stretch ${
                idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="lg:col-span-3 relative overflow-hidden rounded-sm border border-gold/20 shadow-deep min-h-[380px]">
                <iframe
                  src={loc.mapsEmbed}
                  title={`Peta lokasi ${loc.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full grayscale-[0.3] contrast-110"
                  style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg) saturate(0.8)" }}
                  allowFullScreen
                />
                <div className="absolute top-4 left-4 glass-heritage px-4 py-2 rounded-sm pointer-events-none">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-copper">{loc.eyebrow}</p>
                  <p className="font-display text-gold text-base">{loc.name}</p>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-copper mb-2">{loc.eyebrow}</p>
                  <h3 className="font-display text-3xl gradient-text-gold mb-3">{loc.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{loc.desc}</p>
                </div>

                {[
                  { icon: MapPin, label: "Alamat", value: loc.address },
                  { icon: Clock, label: "Jam Buka", value: loc.hours },
                  { icon: Phone, label: "Kontak", value: loc.phone },
                ].map((it) => (
                  <div key={it.label} className="glass-heritage p-4 rounded-sm flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-full gradient-gold grid place-items-center shrink-0">
                      <it.icon size={16} className="text-heritage-950" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-copper mb-1">{it.label}</p>
                      <p className="font-display text-base text-parchment leading-snug">{it.value}</p>
                    </div>
                  </div>
                ))}

                <a
                  href={loc.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 w-full justify-center py-3 gradient-gold text-heritage-950 font-medium tracking-wide rounded-sm shadow-gold hover:shadow-deep transition"
                >
                  Buka di Google Maps
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
