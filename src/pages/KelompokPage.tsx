import { useEffect } from "react";
import AnimatedPage from "@/components/AnimatedPage";
import Kelompok from "@/components/Kelompok";

export default function KelompokPage() {
  useEffect(() => {
    document.title = "Kelompok — Batu Tulis Heritage";
  }, []);
  return (
    <AnimatedPage>
      <Kelompok />
    </AnimatedPage>
  );
}
