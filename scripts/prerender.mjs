// Prerender "/" from the built Cloudflare Worker into dist/client/index.html
// so that static hosts (Vercel / Netlify) can serve the app as an SPA with
// the correct hashed asset URLs injected by Vite.
//
// Runs after `vite build`. Uses wrangler's local Miniflare runtime — does NOT
// require a Cloudflare account or login.

import { unstable_dev } from "wrangler";
import { writeFile, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROUTES = ["/", "/batu-tulis", "/museum-peta", "/galeri", "/jelajahi", "/kelompok"];
const OUT_DIR = "dist/client";

async function findWorkerEntry() {
  // Vite + @cloudflare/vite-plugin emits the worker bundle. Try common paths.
  const candidates = [
    "dist/tanstack-start-app/index.js",
    "dist/_worker.js/index.js",
    "dist/_worker.js",
  ];
  for (const c of candidates) if (existsSync(c)) return c;
  // Fallback: scan dist/ for any *_worker* dir
  const entries = await readdir("dist", { withFileTypes: true });
  for (const e of entries) {
    if (e.isDirectory()) {
      const p = path.join("dist", e.name, "index.js");
      if (existsSync(p)) return p;
    }
  }
  throw new Error("Could not find built worker entry in dist/");
}

const entry = await findWorkerEntry();
console.log("[prerender] worker entry:", entry);

const worker = await unstable_dev(entry, {
  experimental: { disableExperimentalWarning: true, disableDevRegistry: true },
  logLevel: "warn",
  compatibilityDate: "2025-09-24",
  compatibilityFlags: ["nodejs_compat"],
});

try {
  if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });
  for (const route of ROUTES) {
    const res = await worker.fetch(route);
    if (!res.ok) {
      console.warn(`[prerender] ${route} -> ${res.status}, skipping`);
      continue;
    }
    const html = await res.text();
    const file =
      route === "/"
        ? path.join(OUT_DIR, "index.html")
        : path.join(OUT_DIR, route.replace(/^\//, ""), "index.html");
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html, "utf8");
    console.log("[prerender] wrote", file);
  }
} finally {
  await worker.stop();
}
