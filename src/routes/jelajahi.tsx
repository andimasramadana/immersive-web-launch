import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Scroll, Map } from "lucide-react";
import AnimatedPage from "@/components/AnimatedPage";
import SectionHeading from "@/components/SectionHeading";
import batuImg from "@/assets/batu-tulis-detail.jpg";
import petaImg from "@/assets/museum-peta.jpg";

export const Route = createFileRoute("/jelajahi")({
  head: () => ({
    meta: [
      { title: "Jelajahi Tempat — Heritage Bogor" },
      { name: "description", content: "Pilih tempat heritage yang ingin Anda jelajahi: Prasasti Batu Tulis atau Museum Peta." },
    ],
  }),
  component: JelajahiPage,
});

const places = [
  {
    to: "/batu-tulis" as const,
    title: "Prasasti Batu Tulis",
    eyebrow: "Peninggalan Pajajaran",
    desc: "Batu bertulis yang memuat catatan tentang Sri Baduga Maharaja — saksi Kerajaan Sunda Pajajaran.",
    img: batuImg,
    icon: Scroll,
  },
  {
    to: "/museum-peta" as const,
    title: "Museum Peta",
    eyebrow: "Kartografi Nusantara",
    desc: "Koleksi peta antik yang menggambarkan bagaimana Nusantara dipetakan oleh dunia berabad-abad lalu.",
    img: petaImg,
    icon: Map,
  },
];

function JelajahiPage() {
  return (
    <AnimatedPage>
      <section className="pt-32 pb-24 min-h-screen">
        <div className="container mx-auto px-6">
          <SectionHeading
            align="center"
            eyebrow="Jelajahi Tempat"
            title="Ingin menjelajahi"
            highlight="mana dulu?"
            description="Pilih satu dari dua tempat bersejarah di Bogor untuk mulai perjalanan Anda."
          />

          <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {places.map((p, i) => (
              <motion.div
                key={p.to}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
              >
                <Link
                  to={p.to}
                  className="group block relative overflow-hidden rounded-sm border border-gold/20 shadow-deep hover:shadow-gold transition-all duration-500"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      width={800}
                      height={1000}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-heritage-950 via-heritage-950/60 to-heritage-950/20" />
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <div className="w-12 h-12 rounded-full gradient-gold grid place-items-center mb-5 shadow-gold">
                      <p.icon size={20} className="text-heritage-950" />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-copper mb-2">{p.eyebrow}</p>
                    <h3 className="font-display text-3xl md:text-4xl gradient-text-gold mb-3">{p.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-5 max-w-md">{p.desc}</p>
                    <span className="inline-flex items-center gap-2 text-gold text-sm tracking-wide group-hover:gap-4 transition-all">
                      Mulai jelajahi
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
}
