import { useEffect } from "react";
import AnimatedPage from "@/components/AnimatedPage";
import MuseumPetaSection from "@/components/MuseumPetaSection";
import LocationCard from "@/components/LocationCard";
import ExploreNav from "@/components/ExploreNav";

export default function MuseumPetaPage() {
  useEffect(() => {
    document.title = "Museum Peta — Heritage";
  }, []);
  return (
    <AnimatedPage>
      <div className="pt-24 bg-heritage-950">
        <MuseumPetaSection />
        <LocationCard
          name="Museum Peta"
          eyebrow="Museum Pembela Tanah Air"
          address="Jl. Jenderal Sudirman No. 35, Sempur, Kec. Bogor Tengah, Kota Bogor, Jawa Barat 16129"
          hours="Selasa – Minggu · 08.00 – 15.00 WIB"
          phone="+62 251 8324 945"
          mapsEmbed="https://www.google.com/maps?q=Museum+PETA+Bogor&output=embed"
          mapsLink="https://maps.google.com/?q=Museum+PETA+Bogor"
        />
        <ExploreNav nextTo="/batu-tulis" nextLabel="Prasasti Batu Tulis" />
      </div>
    </AnimatedPage>
  );
}
