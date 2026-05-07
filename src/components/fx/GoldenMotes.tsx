import { useEffect, useRef } from "react";

/**
 * Floating gold motes — cinematic ambience. Pure canvas, GPU-friendly.
 */
export default function GoldenMotes({
  count = 28,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = ref.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = cvs.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      cvs.width = w * dpr;
      cvs.height = h * dpr;
      ctx.scale(dpr, dpr);
    };

    type Mote = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      a: number;
      phase: number;
    };
    const motes: Mote[] = Array.from({ length: count }, () => ({
      x: Math.random() * 800,
      y: Math.random() * 600,
      r: Math.random() * 2.4 + 0.6,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -Math.random() * 0.25 - 0.05,
      a: Math.random() * 0.6 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }));

    resize();
    window.addEventListener("resize", resize);

    const tick = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.x += m.vx + Math.sin((t + m.phase * 1000) / 1800) * 0.2;
        m.y += m.vy;
        if (m.y < -10) {
          m.y = h + 10;
          m.x = Math.random() * w;
        }
        if (m.x < -10) m.x = w + 10;
        if (m.x > w + 10) m.x = -10;

        const flicker = 0.5 + 0.5 * Math.sin((t + m.phase * 600) / 600);
        const alpha = m.a * (0.55 + flicker * 0.45);
        const grd = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 6);
        grd.addColorStop(0, `oklch(0.92 0.16 82 / ${alpha})`);
        grd.addColorStop(1, "oklch(0.92 0.16 82 / 0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r * 6, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
    />
  );
}
