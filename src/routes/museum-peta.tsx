import { createFileRoute } from "@tanstack/react-router";
import AnimatedPage from "@/components/AnimatedPage";
import MuseumPetaSection from "@/components/MuseumPetaSection";

export const Route = createFileRoute("/museum-peta")({
  head: () => ({
    meta: [
      { title: "Museum Peta — Heritage" },
      { name: "description", content: "Koleksi peta antik Nusantara di Museum Peta Bogor." },
    ],
  }),
  component: () => (
    <AnimatedPage>
      <div className="pt-24 bg-heritage-950">
        <MuseumPetaSection />
      </div>
    </AnimatedPage>
  ),
});
