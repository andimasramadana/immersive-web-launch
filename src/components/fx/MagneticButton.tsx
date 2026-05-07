import { useRef, useState, ReactNode, MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a" | "div";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  ariaLabel?: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 18,
  as = "button",
  href,
  target,
  rel,
  onClick,
  disabled,
  type = "button",
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) / (r.width / 2) * strength);
    y.set((e.clientY - cy) / (r.height / 2) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const spawnRipple = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples((p) => [...p, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    setTimeout(() => setRipples((p) => p.filter((r) => r.id !== id)), 700);
  };

  const inner = (
    <motion.span style={{ x: sx, y: sy }} className="relative z-[1] inline-flex items-center gap-2">
      {children}
    </motion.span>
  );

  const ripplesEl = (
    <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ scale: 0, opacity: 0.55 }}
          animate={{ scale: 8, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: r.x,
            top: r.y,
            background:
              "radial-gradient(circle, oklch(0.92 0.16 82 / 0.7), transparent 70%)",
          }}
        />
      ))}
    </span>
  );

  const handleClick = (e: MouseEvent) => {
    if (disabled) return;
    spawnRipple(e);
    onClick?.();
  };

  const wrapperProps = {
    ref,
    onMouseMove: onMove,
    onMouseLeave: reset,
    onClick: handleClick,
    className: `relative inline-flex items-center justify-center overflow-hidden ${className}`,
  };

  if (as === "a") {
    return (
      <a href={href} target={target} rel={rel} aria-label={ariaLabel} {...(wrapperProps as any)}>
        {inner}
        {ripplesEl}
      </a>
    );
  }
  if (as === "div") {
    return (
      <div {...(wrapperProps as any)}>
        {inner}
        {ripplesEl}
      </div>
    );
  }
  return (
    <button type={type} disabled={disabled} aria-label={ariaLabel} {...(wrapperProps as any)}>
      {inner}
      {ripplesEl}
    </button>
  );
}
