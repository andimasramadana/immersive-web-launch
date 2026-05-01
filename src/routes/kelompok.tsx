import { createFileRoute } from "@tanstack/react-router";
import AnimatedPage from "@/components/AnimatedPage";
import Kelompok from "@/components/Kelompok";

export const Route = createFileRoute("/kelompok")({
  head: () => ({
    meta: [
      { title: "Kelompok — Batu Tulis Heritage" },
      { name: "description", content: "Anggota kelompok dan peran masing-masing dalam proyek heritage." },
    ],
  }),
  component: () => (
    <AnimatedPage>
      <Kelompok />
    </AnimatedPage>
  ),
});
