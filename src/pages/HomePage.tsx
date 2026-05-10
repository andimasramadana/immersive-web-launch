import { useEffect } from "react";
import AnimatedPage from "@/components/AnimatedPage";
import HeroSection from "@/components/HeroSection";

export default function HomePage() {
  useEffect(() => {
    document.title = "Beranda — Batu Tulis Heritage";
  }, []);
  return (
    <AnimatedPage>
      <HeroSection />
    </AnimatedPage>
  );
}
