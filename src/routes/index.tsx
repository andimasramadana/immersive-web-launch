import { createFileRoute } from "@tanstack/react-router";
import AnimatedPage from "@/components/AnimatedPage";
import HeroSection from "@/components/HeroSection";
import BatuTulisSection from "@/components/BatuTulisSection";
import MuseumPetaSection from "@/components/MuseumPetaSection";
import LocationSection from "@/components/LocationSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Beranda — Batu Tulis Heritage" },
      { name: "description", content: "Beranda proyek heritage Prasasti Batu Tulis & Museum Peta." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <AnimatedPage>
      <HeroSection />
      <BatuTulisSection />
      <MuseumPetaSection />
      <LocationSection />
    </AnimatedPage>
  );
}
