import { useEffect } from "react";
import AnimatedPage from "@/components/AnimatedPage";
import Galeri from "@/components/Galeri";

export default function GaleriPage() {
  useEffect(() => {
    document.title = "Galeri — Batu Tulis Heritage";
  }, []);
  return (
    <AnimatedPage>
      <Galeri />
    </AnimatedPage>
  );
}
