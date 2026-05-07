import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Tilt3D from "./fx/Tilt3D";
import ParallaxY from "./fx/ParallaxY";
import MaskReveal from "./fx/MaskReveal";
import GoldenMotes from "./fx/GoldenMotes";
import detailImg from "@/assets/batu-tulis-detail.jpg";

const facts = [
  { k: "Bahasa", v: "Sunda Kuno" },
  { k: "Aksara", v: "Sunda Kuno / Kawi" },
  { k: "Era", v: "Abad ke-16" },
  { k: "Pemilik", v: "Sri Baduga Maharaja" },
];

export default function BatuTulisSection() {
  return (
    <section id="batu-tulis" className="relative py-24 md:py-32 overflow-hidden">
      <GoldenMotes count={22} />
      <ParallaxY
        offset={120}
        className="pointer-events-none absolute -top-20 -left-20 h-[420px] w-[420px] rounded-full bg-gold/10 blur-3xl"
      >
        <span />
      </ParallaxY>
      <ParallaxY
        offset={-90}
        className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-copper/10 blur-3xl"
      >
        <span />
      </ParallaxY>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative perspective-1000"
        >
          <Tilt3D className="rounded-sm" max={14}>
            <div className="absolute -inset-4 gradient-gold-animated opacity-25 blur-3xl" />
            <MaskReveal className="rounded-sm aspect-square">
              <img
                src={detailImg}
                alt="Detail aksara Sunda Kuno pada Prasasti Batu Tulis"
                loading="lazy"
                width={1024}
                height={1024}
                className="relative w-full aspect-square object-cover rounded-sm shadow-deep border border-gold/20"
              />
            </MaskReveal>
            <div
              className="absolute -bottom-6 -right-6 glass-heritage p-5 rounded-sm shadow-gold max-w-[220px]"
              style={{ transform: "translateZ(60px)" }}
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-copper mb-1">Inscription</p>
              <p className="font-display text-gold text-sm leading-snug">
                "Wangsit dari masa silam, terukir abadi di batu."
              </p>
            </div>
          </Tilt3D>
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
                whileHover={{ y: -4 }}
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
