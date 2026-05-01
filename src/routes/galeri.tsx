import { createFileRoute } from "@tanstack/react-router";
import AnimatedPage from "@/components/AnimatedPage";
import Galeri from "@/components/Galeri";

export const Route = createFileRoute("/galeri")({
  head: () => ({
    meta: [
      { title: "Galeri — Batu Tulis Heritage" },
      { name: "description", content: "Galeri visual prasasti, naskah, dan peta kuno Nusantara." },
    ],
  }),
  component: () => (
    <AnimatedPage>
      <Galeri />
    </AnimatedPage>
  ),
});
