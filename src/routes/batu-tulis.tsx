import { createFileRoute } from "@tanstack/react-router";
import AnimatedPage from "@/components/AnimatedPage";
import BatuTulisSection from "@/components/BatuTulisSection";
import ExploreNav from "@/components/ExploreNav";

export const Route = createFileRoute("/batu-tulis")({
  head: () => ({
    meta: [
      { title: "Prasasti Batu Tulis — Heritage" },
      { name: "description", content: "Sejarah, aksara, dan makna Prasasti Batu Tulis dari era Pajajaran." },
    ],
  }),
  component: () => (
    <AnimatedPage>
      <div className="pt-24">
        <BatuTulisSection />
        <ExploreNav nextTo="/museum-peta" nextLabel="Museum Peta" />
      </div>
    </AnimatedPage>
  ),
});
