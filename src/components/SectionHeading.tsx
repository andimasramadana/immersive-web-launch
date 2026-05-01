import { motion } from "framer-motion";

interface Props {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}
    >
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.5em] text-copper mb-4">— {eyebrow}</p>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight mb-5">
        {title}{" "}
        {highlight && <span className="gradient-text-gold italic">{highlight}</span>}
      </h2>
      {description && (
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      <div className={`ornament-divider w-24 mt-6 ${align === "center" ? "mx-auto" : ""}`} />
    </motion.div>
  );
}
