import { createFileRoute } from "@tanstack/react-router";
import AnimatedPage from "@/components/AnimatedPage";
import LocationSection from "@/components/LocationSection";

export const Route = createFileRoute("/lokasi")({
  head: () => ({
    meta: [
      { title: "Lokasi — Batu Tulis Heritage" },
      { name: "description", content: "Lokasi situs Prasasti Batu Tulis di Bogor, Jawa Barat." },
    ],
  }),
  component: () => (
    <AnimatedPage>
      <div className="pt-24">
        <LocationSection />
      </div>
    </AnimatedPage>
  ),
});
