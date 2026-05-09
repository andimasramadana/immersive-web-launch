# Cara Hosting Project Ini

Project ini dibangun dengan **TanStack Start** + **Cloudflare Workers** (SSR).
Tidak ada `index.html` — HTML digenerate server-side oleh `src/routes/__root.tsx`.

---

## 🥇 Opsi 1: Lovable Publish (Termudah)

1. Klik tombol **Publish** di pojok kanan atas editor Lovable
2. Selesai — live di `xxx.lovable.app`

Tidak perlu akun/setup apapun. Cocok untuk demo dan production sederhana.

---

## 🥈 Opsi 2: Cloudflare Workers (Hosting Sendiri, Gratis)

Project ini **memang dibuat untuk Cloudflare**, jadi setup-nya minimal.

### Langkah:

1. **Buat akun gratis** di [cloudflare.com](https://cloudflare.com)
2. Download codebase (Code Editor → Download codebase) atau push ke GitHub
3. Di terminal lokal:
   ```bash
   npm install
   npx wrangler login          # login ke akun Cloudflare (sekali saja)
   npm run deploy              # build + deploy
   ```
4. Selesai — Cloudflare akan kasih URL `tanstack-start-app.<your-account>.workers.dev`

### Auto-deploy dari GitHub (opsional):
- Buka [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages → Create → Connect Git
- Pilih repo Anda
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Setiap push ke `main` akan auto-deploy

---

## ❌ Vercel / Netlify

**Tidak bisa langsung.** Vercel & Netlify tidak menjalankan Cloudflare Worker.
Untuk pakai mereka, harus ganti adapter di `vite.config.ts` dan `wrangler.jsonc`
harus dihapus — ini perubahan besar pada konfigurasi build.

Saran: pakai **Lovable Publish** atau **Cloudflare Workers** (Opsi 1 atau 2).

---

## Kenapa tidak ada `index.html`?

TanStack Start adalah framework **SSR (Server-Side Rendering)**. HTML-nya dibuat
oleh server (Worker) saat user request, dari `src/routes/__root.tsx` →
`shellComponent`. Menambahkan `index.html` manual akan bentrok dan justru
membuat halaman blank.
