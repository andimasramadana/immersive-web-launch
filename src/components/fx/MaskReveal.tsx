import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "left" | "right" | "up" | "down";
}

/**
 * Cinematic clip-path reveal — content stays intact, only the unveiling
 * animates. Pairs beautifully with images, retaining original src.
 */
export default function MaskReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const initialClip =
    direction === "left"
      ? "inset(0 100% 0 0)"
      : direction === "right"
        ? "inset(0 0 0 100%)"
        : direction === "down"
          ? "inset(0 0 100% 0)"
          : "inset(100% 0 0 0)";

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: initialClip, scale: 1.15 }}
        animate={inView ? { clipPath: "inset(0 0 0 0)", scale: 1 } : undefined}
        transition={{
          clipPath: { duration: 1.4, ease: [0.77, 0, 0.175, 1], delay },
          scale: { duration: 1.8, ease: [0.22, 1, 0.36, 1], delay },
        }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
      {/* Sweeping gold sheen as the mask passes */}
      <motion.div
        aria-hidden
        initial={{ x: "-110%", opacity: 0 }}
        animate={inView ? { x: "120%", opacity: [0, 0.6, 0] } : undefined}
        transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1], delay }}
        className="pointer-events-none absolute inset-y-0 w-1/2"
        style={{
          background:
            "linear-gradient(100deg, transparent, oklch(0.95 0.16 82 / 0.55), transparent)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
