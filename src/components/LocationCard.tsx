import { motion } from "framer-motion";
import { MapPin, Clock, Phone, ExternalLink } from "lucide-react";

interface Props {
  name: string;
  eyebrow: string;
  address: string;
  hours: string;
  phone: string;
  mapsEmbed: string;
  mapsLink: string;
}

export default function LocationCard({
  name,
  eyebrow,
  address,
  hours,
  phone,
  mapsEmbed,
  mapsLink,
}: Props) {
  return (
    <section className="container mx-auto px-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid lg:grid-cols-5 gap-6"
      >
        <div className="lg:col-span-3 relative overflow-hidden rounded-sm border border-gold/20 shadow-deep min-h-[400px]">
          <iframe
            src={mapsEmbed}
            title={`Peta lokasi ${name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full"
            style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg) saturate(0.8)" }}
            allowFullScreen
          />
          <div className="absolute top-4 left-4 glass-heritage px-4 py-2 rounded-sm pointer-events-none">
            <p className="text-[10px] uppercase tracking-[0.3em] text-copper">{eyebrow}</p>
            <p className="font-display text-gold text-base">{name}</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-3">
          <div className="mb-2">
            <p className="text-[10px] uppercase tracking-[0.4em] text-copper mb-2">Lokasi</p>
            <h3 className="font-display text-2xl gradient-text-gold">{name}</h3>
          </div>

          {[
            { icon: MapPin, label: "Alamat", value: address },
            { icon: Clock, label: "Jam Buka", value: hours },
            { icon: Phone, label: "Kontak", value: phone },
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
            href={mapsLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 w-full justify-center py-3 gradient-gold text-heritage-950 font-medium tracking-wide rounded-sm shadow-gold hover:shadow-deep transition"
          >
            Buka di Google Maps
            <ExternalLink size={14} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
