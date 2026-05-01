import { createFileRoute } from "@tanstack/react-router";
import AnimatedPage from "@/components/AnimatedPage";
import BatuTulisSection from "@/components/BatuTulisSection";
import LocationCard from "@/components/LocationCard";
import ExploreNav from "@/components/ExploreNav";

export const Route = createFileRoute("/batu-tulis")({
  head: () => ({
    meta: [
      { title: "Prasasti Batu Tulis — Heritage" },
      { name: "description", content: "Sejarah, aksara, dan lokasi Prasasti Batu Tulis di Bogor." },
    ],
  }),
  component: () => (
    <AnimatedPage>
      <div className="pt-24">
        <BatuTulisSection />
        <LocationCard
          name="Prasasti Batu Tulis"
          eyebrow="Situs Heritage Pajajaran"
          address="Jl. Batutulis No. 54, Batutulis, Kec. Bogor Selatan, Kota Bogor, Jawa Barat 16133"
          hours="Selasa – Minggu · 08.00 – 16.00 WIB"
          phone="+62 251 8323 644"
          mapsEmbed="https://www.google.com/maps?q=Prasasti+Batu+Tulis+Bogor&output=embed"
          mapsLink="https://maps.google.com/?q=Prasasti+Batu+Tulis+Bogor"
        />
        <ExploreNav nextTo="/museum-peta" nextLabel="Museum Peta" />
      </div>
    </AnimatedPage>
  ),
});
