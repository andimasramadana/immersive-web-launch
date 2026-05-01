import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, Stars, Sphere } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { TextureLoader } from "three";
import mapTextureUrl from "@/assets/museum-peta.jpg";

function HeritageGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, mapTextureUrl);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.35;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (glowRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.04;
      glowRef.current.scale.set(s, s, s);
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.65, 48, 48]} />
        <meshBasicMaterial color="#d4a24a" transparent opacity={0.06} />
      </mesh>
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[1.5, 48, 48]} />
        <meshBasicMaterial color="#f4c870" transparent opacity={0.10} />
      </mesh>
      {/* The heritage globe */}
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[1.35, 96, 96]} />
        <meshStandardMaterial
          map={texture}
          metalness={0.55}
          roughness={0.4}
          emissive="#a85a1f"
          emissiveIntensity={0.18}
        />
      </mesh>
      {/* Equator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.55, 0.012, 16, 100]} />
        <meshStandardMaterial color="#f4c870" emissive="#d4a24a" emissiveIntensity={0.8} metalness={1} roughness={0.2} />
      </mesh>
      {/* Tilted ring */}
      <mesh rotation={[Math.PI / 2.5, 0.3, 0]}>
        <torusGeometry args={[1.75, 0.006, 16, 100]} />
        <meshStandardMaterial color="#c2783a" emissive="#a85a1f" emissiveIntensity={0.6} metalness={1} roughness={0.3} />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[5, 4, 5]} intensity={1.8} color="#f4c870" />
      <pointLight position={[-5, -3, -2]} intensity={0.9} color="#a85a1f" />
      <directionalLight position={[0, 5, 8]} intensity={0.6} color="#fff5d6" />

      <Stars radius={50} depth={30} count={1500} factor={3} fade speed={0.5} />
      <HeritageGlobe />

      {/* Floating particles */}
      <Float speed={2} floatIntensity={2}>
        <Sphere args={[0.025, 8, 8]} position={[2.5, 1.2, -1]}>
          <meshBasicMaterial color="#f4c870" />
        </Sphere>
      </Float>
      <Float speed={1.5} floatIntensity={2.5}>
        <Sphere args={[0.018, 8, 8]} position={[-2.2, -0.8, 0.5]}>
          <meshBasicMaterial color="#d4a24a" />
        </Sphere>
      </Float>
      <Float speed={2.5} floatIntensity={1.8}>
        <Sphere args={[0.02, 8, 8]} position={[1.8, -1.5, 1.2]}>
          <meshBasicMaterial color="#c2783a" />
        </Sphere>
      </Float>
    </>
  );
}

interface LoadingScreenProps {
  onFinish?: () => void;
  duration?: number;
}

export default function LoadingScreen({ onFinish, duration = 3500 }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, (elapsed / duration) * 100);
      setProgress(p);
      if (p >= 100) clearInterval(tick);
    }, 40);

    const t = setTimeout(() => {
      setVisible(false);
      onFinish?.();
    }, duration);

    return () => {
      clearInterval(tick);
      clearTimeout(t);
    };
  }, [duration, onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
          transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-heritage-950"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.22 0.04 60 / 0.6), transparent 70%)",
          }}
        >
          {/* Vignette grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, transparent 0%, oklch(0 0 0 / 0.7) 100%)",
            }}
          />

          {/* 3D Canvas */}
          <div className="absolute inset-0">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
            >
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>
          </div>

          {/* Foreground content */}
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-end pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center px-6"
            >
              <p className="text-xs uppercase tracking-[0.5em] text-copper mb-3">
                Heritage of Pajajaran
              </p>
              <h1 className="font-display text-4xl md:text-6xl shimmer-text mb-2">
                Project Sejarah
              </h1>
              <p className="text-sm md:text-base text-muted-foreground italic">
                Menyusuri jejak prasasti & peta kuno Nusantara
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 w-64 md:w-80"
            >
              <div className="relative h-[2px] w-full overflow-hidden bg-heritage-800/60">
                <motion.div
                  className="absolute inset-y-0 left-0 gradient-gold"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
                <div className="absolute inset-y-0 left-0 w-full opacity-40 animate-glow gradient-gold" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span>Loading Heritage</span>
                <span className="text-gold">{Math.floor(progress)}%</span>
              </div>
            </motion.div>
          </div>

          {/* Top ornament */}
          <div className="pointer-events-none absolute top-8 left-1/2 -translate-x-1/2">
            <div className="ornament-divider w-32" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
