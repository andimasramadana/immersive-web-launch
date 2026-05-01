import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const members = [
  { name: "Anggota Satu", role: "Ketua Kelompok", initial: "AS" },
  { name: "Anggota Dua", role: "Riset Sejarah", initial: "AD" },
  { name: "Anggota Tiga", role: "Desain Visual", initial: "AT" },
  { name: "Anggota Empat", role: "Dokumentasi", initial: "AE" },
  { name: "Anggota Lima", role: "Penulis Konten", initial: "AL" },
  { name: "Anggota Enam", role: "Editor & Presentasi", initial: "AN" },
];

export default function Kelompok() {
  return (
    <section className="py-24 md:py-32 pt-32">
      <div className="container mx-auto px-6">
        <SectionHeading
          align="center"
          eyebrow="Tim Kami"
          title="Anggota"
          highlight="Kelompok"
          description="Proyek heritage ini dikerjakan bersama-sama oleh anggota kelompok dengan peran masing-masing."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.7 }}
              whileHover={{ y: -6 }}
              className="group relative glass-heritage p-8 rounded-sm border-t-2 border-gold/40 overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full gradient-gold opacity-10 blur-3xl group-hover:opacity-25 transition duration-700" />

              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 rounded-full gradient-gold opacity-90" />
                <div className="absolute inset-[2px] rounded-full bg-heritage-900 grid place-items-center">
                  <span className="font-display text-2xl gradient-text-gold">{m.initial}</span>
                </div>
              </div>

              <h3 className="font-display text-2xl text-parchment mb-1">{m.name}</h3>
              <p className="text-xs uppercase tracking-[0.3em] text-copper mb-4">{m.role}</p>

              <div className="ornament-divider w-12" />

              <p className="mt-4 text-sm text-muted-foreground italic">
                Kontributor proyek heritage Batu Tulis & Museum Peta.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
