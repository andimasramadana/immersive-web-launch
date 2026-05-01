import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import detailImg from "@/assets/batu-tulis-detail.jpg";

const facts = [
  { k: "Bahasa", v: "Sunda Kuno" },
  { k: "Aksara", v: "Sunda Kuno / Kawi" },
  { k: "Era", v: "Abad ke-16" },
  { k: "Pemilik", v: "Sri Baduga Maharaja" },
];

export default function BatuTulisSection() {
  return (
    <section id="batu-tulis" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative perspective-1000"
        >
          <div className="relative preserve-3d animate-float">
            <div className="absolute -inset-4 gradient-gold opacity-20 blur-3xl" />
            <img
              src={detailImg}
              alt="Detail aksara Sunda Kuno pada Prasasti Batu Tulis"
              loading="lazy"
              width={1024}
              height={1024}
              className="relative w-full aspect-square object-cover rounded-sm shadow-deep border border-gold/20"
            />
            <div className="absolute -bottom-6 -right-6 glass-heritage p-5 rounded-sm shadow-gold max-w-[220px]">
              <p className="text-[10px] uppercase tracking-[0.3em] text-copper mb-1">Inscription</p>
              <p className="font-display text-gold text-sm leading-snug">
                "Wangsit dari masa silam, terukir abadi di batu."
              </p>
            </div>
          </div>
        </motion.div>

        <div>
          <SectionHeading
            eyebrow="Prasasti Batu Tulis"
            title="Batu yang"
            highlight="mengingat"
            description="Prasasti Batu Tulis adalah salah satu peninggalan paling penting dari Kerajaan Sunda Pajajaran. Terletak di Bogor, prasasti ini memuat catatan tentang Sri Baduga Maharaja — raja yang dimuliakan dalam tradisi lisan Sunda."
          />

          <div className="mt-10 grid grid-cols-2 gap-5">
            {facts.map((f, i) => (
              <motion.div
                key={f.k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-heritage p-5 rounded-sm border-l-2 border-gold/60"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-copper mb-1">{f.k}</p>
                <p className="font-display text-lg text-parchment">{f.v}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
