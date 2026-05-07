import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, MotionStyle } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  offset?: number; // px range
  style?: MotionStyle;
}

export default function ParallaxY({ children, className, offset = 80, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y, ...style }} className={className}>
      {children}
    </motion.div>
  );
}
