import { useEffect, useState } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import PageTransitionLoader from "@/components/PageTransitionLoader";
import UserGuide from "@/components/UserGuide";

import HomePage from "@/pages/HomePage";
import BatuTulisPage from "@/pages/BatuTulisPage";
import MuseumPetaPage from "@/pages/MuseumPetaPage";
import GaleriPage from "@/pages/GaleriPage";
import JelajahiPage from "@/pages/JelajahiPage";
import KelompokPage from "@/pages/KelompokPage";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-heritage-950 px-4">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.5em] text-copper mb-4">— Tersesat</p>
        <h1 className="font-display text-7xl gradient-text-gold">404</h1>
        <h2 className="mt-4 font-display text-2xl text-parchment">Halaman tidak ditemukan</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Mungkin halaman ini sudah hilang seperti naskah kuno yang lapuk dimakan waktu.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-sm gradient-gold px-6 py-3 text-sm font-medium text-heritage-950 shadow-gold"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      <LoadingScreen onFinish={() => setLoading(false)} duration={3500} />
      <PageTransitionLoader />
      <UserGuide start={!loading} />
      <Navbar />
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/batu-tulis" element={<BatuTulisPage />} />
            <Route path="/museum-peta" element={<MuseumPetaPage />} />
            <Route path="/galeri" element={<GaleriPage />} />
            <Route path="/jelajahi" element={<JelajahiPage />} />
            <Route path="/kelompok" element={<KelompokPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
