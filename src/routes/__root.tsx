import { Outlet, Link, createRootRoute, HeadContent, Scripts, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import appCss from "../styles.css?url";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import PageTransitionLoader from "@/components/PageTransitionLoader";
import UserGuide from "@/components/UserGuide";

function NotFoundComponent() {
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

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Batu Tulis — Heritage Pajajaran" },
      { name: "description", content: "Proyek heritage Prasasti Batu Tulis & Museum Peta — menelusuri jejak Pajajaran." },
      { name: "author", content: "Tugas Kelompok" },
      { property: "og:title", content: "Batu Tulis — Heritage Pajajaran" },
      { property: "og:description", content: "Menelusuri jejak prasasti & peta kuno Nusantara." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const [loading, setLoading] = useState(true);
  const routerState = useRouterState();

  useEffect(() => {
    // prevent scroll while loading
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
          <div key={routerState.location.pathname}>
            <Outlet />
          </div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
