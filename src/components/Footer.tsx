export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-gold/15 bg-heritage-950">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <h4 className="font-display text-gold text-lg mb-3">Batu Tulis</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Proyek dokumentasi heritage Prasasti Batu Tulis dan koleksi Museum Peta —
            sebuah penghormatan pada warisan Pajajaran.
          </p>
        </div>
        <div>
          <h4 className="font-display text-gold text-lg mb-3">Tautan</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Sejarah</li>
            <li>Koleksi</li>
            <li>Edukasi</li>
            <li>Kontak</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-gold text-lg mb-3">Lokasi</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Jl. Batutulis No. 54, Kota Bogor, Jawa Barat, Indonesia
          </p>
        </div>
      </div>
      <div className="ornament-divider" />
      <div className="container mx-auto px-6 py-5 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
        © {new Date().getFullYear()} Tugas Kelompok · Heritage Edition
      </div>
    </footer>
  );
}
