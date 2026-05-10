# Cara Hosting Project Ini

Project ini sekarang menggunakan **React + Vite (SPA murni)** dengan
`react-router-dom`. Sudah ada `index.html` di root, jadi bisa langsung di-host
di mana saja tanpa konfigurasi tambahan.

## 🥇 Lovable Publish
Klik tombol **Publish** di pojok kanan atas editor.

## 🥈 Vercel
1. Push project ke GitHub
2. [vercel.com](https://vercel.com) → **Add New Project** → Import repo
3. Vercel otomatis baca `vercel.json` (framework: Vite, output: `dist`, SPA rewrite)
4. **Deploy**

## 🥉 Netlify
1. Push project ke GitHub
2. [netlify.com](https://netlify.com) → **Add new site** → Import repo
3. Netlify otomatis baca `netlify.toml`
4. **Deploy site**

Build command: `vite build` · Output: `dist`
