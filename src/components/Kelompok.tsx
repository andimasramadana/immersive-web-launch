import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const members = [
  {
    name: "Andimas Ramadana",
    initial: "AR",
    rayon: "Rayon Pajajaran",
    role: "Full Stack Developer",
    motto: "Belajar tanpa henti, berkarya tanpa batas.",
  },
  {
    name: "Richou Alberto Ghani",
    initial: "RG",
    rayon: "Rayon Siliwangi",
    role: "Front End Developer",
    motto: "Desain yang baik adalah jembatan antara ide dan pengguna.",
  },
  {
    name: "Samuel Sayogo",
    initial: "SS",
    rayon: "Rayon Galuh",
    role: "Back End Developer",
    motto: "Kode yang rapi hari ini, ketenangan di masa depan.",
  },
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
          description="Proyek heritage ini dikerjakan bersama-sama oleh tiga anggota kelompok dengan peran masing-masing."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
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

              <h3 className="font-display text-2xl text-parchment mb-1 leading-tight">{m.name}</h3>
              <p className="text-xs uppercase tracking-[0.3em] text-copper mb-4">{m.rayon}</p>

              <div className="ornament-divider w-12" />

              <div className="mt-5 space-y-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-copper mb-1">Role</p>
                  <p className="font-display text-base text-gold">{m.role}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-copper mb-1">Motto Hidup</p>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">"{m.motto}"</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
