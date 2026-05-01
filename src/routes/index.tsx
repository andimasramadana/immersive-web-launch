import { createFileRoute } from "@tanstack/react-router";
import AnimatedPage from "@/components/AnimatedPage";
import HeroSection from "@/components/HeroSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Beranda — Batu Tulis Heritage" },
      { name: "description", content: "Beranda proyek heritage — dua tempat bersejarah berpengaruh di Bogor." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <AnimatedPage>
      <HeroSection />
    </AnimatedPage>
  );
}
