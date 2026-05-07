import { motion, Variants } from "framer-motion";

interface Props {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const word: Variants = {
  hidden: { y: "110%", opacity: 0, rotateX: -45 },
  show: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

function RevealWords({
  text,
  highlight,
  className,
}: {
  text: string;
  highlight?: boolean;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      variants={container}
      className={`inline-flex flex-wrap ${highlight ? "" : ""}`}
      style={{ perspective: 800 }}
    >
      {words.map((w, i) => (
        <span key={i} className="overflow-hidden inline-block pb-[0.15em] mr-[0.25em]">
          <motion.span
            variants={word}
            className={`inline-block ${className ?? ""} ${
              highlight ? "gradient-text-gold italic" : ""
            }`}
            style={{ transformOrigin: "50% 100%" }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
}: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={container}
      className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}
    >
      {eyebrow && (
        <motion.p
          variants={word}
          className="text-xs uppercase tracking-[0.5em] text-copper mb-4"
        >
          — {eyebrow}
        </motion.p>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight mb-5">
        <RevealWords text={title} />
        {highlight && (
          <>
            {" "}
            <RevealWords text={highlight} highlight />
          </>
        )}
      </h2>
      {description && (
        <motion.p
          variants={word}
          className="text-base md:text-lg text-muted-foreground leading-relaxed"
        >
          {description}
        </motion.p>
      )}
      <motion.div
        variants={word}
        className={`ornament-divider w-24 mt-6 ${align === "center" ? "mx-auto" : ""}`}
      />
    </motion.div>
  );
}
