# Cara Hosting Project Ini

Project ini dibangun dengan **TanStack Start** (SSR di atas Cloudflare Workers).
Karena Vercel & Netlify tidak menjalankan Cloudflare Worker, kita **prerender**
halaman utama ke HTML statis lalu serve sebagai **SPA**.

Konfigurasi sudah disiapkan — **tidak perlu mengubah apapun lagi**, tinggal
import repo ke Vercel/Netlify dan deploy.

---

## 🥇 Opsi 1: Lovable Publish (Termudah)

Klik tombol **Publish** di pojok kanan atas editor → live di `xxx.lovable.app`.

---

## 🥈 Opsi 2: Vercel

1. Push project ke GitHub
2. Buka [vercel.com](https://vercel.com) → **Add New Project** → Import repo
3. **Jangan ubah setting apapun** — Vercel akan baca `vercel.json` otomatis:
   - Build command: `vite build && node scripts/prerender.mjs`
   - Output directory: `dist/client`
   - SPA rewrite ke `index.html`
4. Klik **Deploy**

---

## 🥉 Opsi 3: Netlify

1. Push project ke GitHub
2. Buka [netlify.com](https://netlify.com) → **Add new site** → Import repo
3. **Jangan ubah setting apapun** — Netlify akan baca `netlify.toml` otomatis
4. Klik **Deploy site**

---

## 🟢 Opsi 4: Cloudflare Workers (Native, paling optimal)

```bash
npm install
npx wrangler login
npm run deploy
```

---

## Bagaimana cara kerjanya (Vercel/Netlify)?

1. `vite build` → menghasilkan bundle Worker + asset client di `dist/`
2. `scripts/prerender.mjs` → menjalankan Worker secara lokal (via Miniflare),
   lalu fetch route utama (`/`, `/batu-tulis`, `/museum-peta`, `/galeri`,
   `/jelajahi`, `/kelompok`) dan menyimpan HTML hasil render ke
   `dist/client/<route>/index.html` lengkap dengan path asset yang benar
3. Vercel/Netlify serve `dist/client` sebagai static site, dengan SPA fallback
   untuk semua route lain → router TanStack ambil alih di sisi client

**Catatan:** Server Functions (`createServerFn`) atau API routes
(`src/routes/api/*`) **tidak akan jalan** di Vercel/Netlify dengan setup ini —
hanya frontend (UI, animasi, galeri, navigasi) yang berfungsi. Untuk fitur
backend penuh, gunakan Lovable Publish atau Cloudflare Workers.
