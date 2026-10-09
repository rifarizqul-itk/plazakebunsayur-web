# DESIGN_FIXES.md — Perbaikan Desain Frontend

Dokumen tugas sekali jalan. Setelah semua selesai, pindahkan ke `docs/archive/`.

## Instruksi untuk agent eksekutor

1. Baca `DESIGN.md` di root dulu. Bagian wajib: **Hindari Tampilan Generic AI-Generated**, termasuk **Pola Template yang Harus Dihindari (Tambahan)**, serta **Shapes**, **Ikonografi**, dan **Bahasa dan Copywriting**.
2. Kerjakan sesuai urutan fase di bawah. Satu fase satu commit.
3. Hanya ubah `frontend/src`. Jangan sentuh `backend/`, `frontend/dist/`, atau frontmatter `DESIGN.md`.
4. Jangan menambah fitur, section, atau data baru. Tugas ini hanya **mengurangi** dan **merapikan**.
5. Jangan mengubah token di `index.css` kecuali disebut eksplisit (Fase 7 mengubah token radius).
6. Jangan mengarang copy faktual (sejarah, statistik, nama). Jika ragu, pakai teks yang sudah ada atau tanya pemilik proyek.
7. Setelah tiap fase, jalankan `cd frontend && npm run lint && npm run build`, lalu centang kriteria selesai.

Prioritas: **P1** wajib, **P2** sebaiknya, **P3** opsional.

---

## Fase 1 — Bug dan sampah cepat (P1)

- [x] **1.1 Varian `Badge` tidak ada.** `EventsPage.jsx` (~L89) dan `EventDetail.jsx` (~L81) memakai `variant="accent"`, padahal [`Badge.jsx`](../frontend/src/components/ui/Badge.jsx) tidak punya varian itu. Ganti ke varian yang ada (`neutral` untuk promo). Jangan menambah varian baru.
- [x] **1.2 Hapus emoji.** `ShopDetail.jsx` ~L241 (📍) dan `CulinaryDetail.jsx` ~L241 (🍲). Ganti dengan teks biasa atau ikon lucide `MapPin` polos sebaris dengan teks (tanpa kotak).
- [x] **1.3 Hapus `text-[11px]`.** Aturan minimum 12px. Lokasi: `HeroSection.jsx` (badge Buka/Tutup dan tombol Salin Alamat), `HistorySection.jsx` (tombol Google Maps). Ganti ke `text-xs`.

**Selesai bila:**
- `grep -rnP "[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]" frontend/src` kosong
- `grep -rn 'variant="accent"' frontend/src` kosong
- `grep -rn "text-\[11px\]" frontend/src` kosong

## Fase 2 — Hapus kotak ikon di atas heading (P1)

Pola: kotak berbingkai berisi ikon di dekat heading kartu. Ikon boleh tetap ada hanya bila menjelaskan fungsi, polos dan sebaris dengan judul.

- [x] **2.1 `HeroSection.jsx` ~L337-L340 dan ~L384-L386.** Hapus pembungkus `p-3 bg-canvas border ...` di sekitar `Clock` dan `MapPin`. Hapus ikonnya juga bila judul sudah jelas.
- [x] **2.2 `PlanYourVisit.jsx` ~L80 dan ~L96.** Hapus kotak ikon `Clock` dan `MapPin` di atas H2.
- [x] **2.3 `PlanYourVisit.jsx` ~L172-L175.** Kotak ikon di kartu fasilitas. Hapus kotaknya. Ikon boleh dibuang karena `iconMap` memetakan beberapa nama ke ikon yang sama (`Home` ke `Moon`, `Coffee` ke `Utensils`), jadi tidak informatif. Jika ikon dibuang, hapus `iconMap` dan import yang tidak terpakai.
- [x] **2.4 `PlanYourVisit.jsx` ~L121-L149.** Tiga kartu transportasi punya ikon `Plane`, `Anchor`, `Car` di samping judul. Boleh dipertahankan **hanya** bila polos (sudah polos). Tidak perlu diubah.
- [x] **2.5 Ikon eyebrow di tiga kartu aksi Home** (`Gem`, `Utensils`, `Sparkles`, ~L242, L278, L314). `Sparkles` adalah ikon dekoratif generik, hapus. Dua lainnya hapus juga agar konsisten.

**Selesai bila:**
- `grep -rn "p-[0-9.]* bg-canvas border" frontend/src` tidak menemukan pembungkus ikon
- Tidak ada import `Sparkles` di `frontend/src`

## Fase 3 — Tiga kartu aksi dan hierarki (P1)

Sekarang tiga kartu di `HeroSection.jsx` ~L224-L331 identik 100% (ukuran, foto buram, tombol penuh). Selain itu `shadow-subtle` dipakai 39 kali.

- [ ] **3.1 Bedakan kartu.** Jadikan **Belanja** kartu dominan (mis. `md:col-span-2` atau lebih tinggi) dan **Kuliner** serta **Panduan Kunjungan** lebih kecil. Rasio foto konsisten untuk kartu yang sejenis.
- [ ] **3.2 Ekstrak jadi data.** Tiga blok JSX hampir kembar, pindahkan isinya ke array dan `map`. Jangan mengubah teks.
- [ ] **3.3 Turunkan sheen.** Hapus efek `animate-sheen-sweep` dari tiga kartu aksi. Sisakan paling banyak di `TenantCard`, lalu pertimbangkan hapus juga (aturan: satu efek interaksi per komponen; `TenantCard` sudah punya perubahan border dan zoom foto).
- [ ] **3.4 Shadow.** Hapus `shadow-subtle` dari elemen yang sudah berborder (kartu, tombol, panel info). Sisakan hanya pada elemen yang mengambang di atas konten lain (mis. tombol overlay di peta). Target: `shadow-subtle` turun dari 39 menjadi kurang dari 10.
- [ ] **3.5 Hapus kartu bersarang.** Setelah Fase 2 tidak boleh ada kotak berborder di dalam kartu berborder. Periksa panel "Layanan Kios" di `HistorySection.jsx` ~L31-L39. Jika berada langsung di section (bukan di dalam kartu), biarkan.

**Selesai bila:**
- Tiga kartu aksi tidak identik secara ukuran.
- `grep -rc "shadow-subtle" frontend/src` total kurang dari 10.
- `grep -rn "animate-sheen-sweep" frontend/src` hanya muncul di `TenantCard.jsx` atau nol.

## Fase 4 — Eyebrow dan template section berulang (P2)

Eyebrow uppercase muncul sekitar 9 kali, sering mengulang judul. Contoh: "Agenda & Kegiatan" di atas "Agenda dan Kegiatan Pasar".

- [ ] **4.1 `Home.jsx` ~L51-L56.** Hapus eyebrow. Judul H2 cukup "Agenda dan kegiatan pasar" (sentence case).
- [ ] **4.2 `FeaturedSection.jsx` ~L18 dan ~L45.** Hapus eyebrow "Koleksi Pilihan" dan "Sentra Makanan & Minuman". Judul sudah jelas.
- [ ] **4.3 `HistorySection.jsx` ~L13.** Hapus "Sejarah Pasar" atau jadikan judul dan hapus H2 yang mengulang.
- [ ] **4.4 `PlanYourVisit.jsx` ~L112 dan ~L156.** Hapus eyebrow "Akses Transportasi" dan "Kenyamanan & Layanan".
- [ ] **4.5 `PageHeader.jsx`.** Biarkan prop `eyebrow` ada tetapi pastikan halaman yang memakainya hanya menaruh informasi baru, bukan pengulangan judul. Maksimal satu eyebrow per halaman.
- [ ] **4.6 Variasikan header section.** Pola eyebrow + H2 + garis bawah + "Lihat Semua →" diulang di `FeaturedSection` (2x) dan `Home`. Biarkan pola ini hanya di satu tempat, ubah yang lain: tautan "Lihat semua" jadi teks biasa di bawah grid, tanpa garis bawah dan uppercase.
- [ ] **4.7 Uppercase.** Judul H2 dan H4 di `PlanYourVisit.jsx` dan `HeroSection.jsx` (mis. "Waktu Operasional Mall") memakai `uppercase tracking-wider`. Ganti ke sentence case sesuai aturan huruf kapital.

**Selesai bila:**
- Jumlah eyebrow: `grep -rn "uppercase tracking-wider text-brand-primary" frontend/src` kurang dari 3.
- Tidak ada `h2`/`h4` dengan kelas `uppercase` untuk judul lebih dari 5 kata.

## Fase 5 — Label Live dan pill (P2)

- [ ] **5.1 `HeroSection.jsx` ~L346-L362.** Hapus `animate-ping` dan pill berlatar. Ganti dengan teks biasa: "Buka sekarang" atau "Tutup sekarang" (warna teks `emerald-700` atau `text-muted`), tanpa titik berdenyut. Logika jam operasional tetap dipakai.
- [ ] **5.2 Kurangi pill.** Pill (`rounded-full`) hanya untuk filter kategori/lantai dan status nyata (buka/tutup). Label "Pilihan" di `TenantCard.jsx` ~L44 dan `Badge` untuk tipe agenda (`Home.jsx`, `EventsPage.jsx`, `EventDetail.jsx`) jadikan teks biasa tanpa latar dan border. Komponen `Badge` boleh tetap ada untuk status nyata.
- [ ] **5.3 Filter di `EventsPage.jsx` ~L45-L67** memakai pill mirip `CategoryFilter`. Biarkan, tapi pakai komponen filter bersama agar tidak ada duplikasi.

**Selesai bila:**
- `grep -rn "animate-ping" frontend/src` kosong.
- `grep -rn "rounded-full" frontend/src` hanya di filter, skeleton, dan avatar jika ada.

## Fase 6 — Copy generik (P3, butuh persetujuan pemilik)

Jangan menulis ulang tanpa konfirmasi. Ajukan usulan di PR, jangan langsung diganti.

- [ ] **6.1** "Layanan dan Komoditas Pasar" (`HeroSection.jsx` ~L216) terlalu umum. Usul: "Apa yang ada di Plaza Kebun Sayur".
- [ ] **6.2** Deskripsi di bawahnya ("... dalam satu kawasan terpadu") memakai frasa generik. Usul: sebut kategori kios yang benar-benar ada.
- [ ] **6.3** Tombol "Baca Selengkapnya" di agenda. Usul: "Lihat detail agenda".
- [ ] **6.4** Periksa kata terlarang di `DESIGN.md` (heritage, explore, discover, dll.): `grep -rniE "heritage|landmark|iconic|seamless|discover|explore|vibrant" frontend/src` harus kosong.

---

## Fase 7 — Radius dua tingkat (P1, kerjakan paling akhir)

Keputusan baru: siku-siku penuh dinilai kaku, radius besar terasa AI. Pakai `rounded-sm` (4px) dan `rounded-md` (6px). Kerjakan setelah Fase 1-6 supaya diff tidak bertabrakan.

- [ ] **7.1 Token** di `index.css`: `--radius-button` jadi `4px`, `--radius-card` jadi `6px`, tambah `--radius-sm: 4px` dan `--radius-md: 6px` bila perlu. Biarkan `--radius-pill`.
- [ ] **7.2 `Button.jsx`**: default `rounded-sm`.
- [ ] **7.3 Ganti `rounded-none`** (sekitar 94 tempat di `frontend/src`):
  - wadah (kartu, panel, modal, frame foto, drawer, kotak peta) jadi `rounded-md` dan tambahkan `overflow-hidden` bila ada gambar di dalamnya
  - tombol, input, dropdown, tag kecil jadi `rounded-sm`
  - elemen di dalam wadah (mis. tombol di dalam kartu) tetap `rounded-sm`, jangan `rounded-md`
  - overlay penuh (scrim gradient di hero) dan elemen yang menempel ke tepi layar tetap tanpa radius
- [ ] **7.4** Foto di dalam kartu tidak diberi radius sendiri.
- [ ] **7.5** Hero slider: tombol panah dan penanda slide `rounded-sm`, hero sendiri tetap tanpa radius (full-bleed).

**Selesai bila:**
- `grep -rn "rounded-lg\|rounded-xl\|rounded-2xl\|rounded-3xl" frontend/src` kosong.
- `grep -rn "rounded-none" frontend/src` hanya untuk elemen full-bleed.
- Cek visual: kartu dan tombol tidak terlihat identik radius, dan tidak ada sudut tajam yang janggal di dalam kartu bersudut.

## Fase 8 — Slider hero (P3)

Slider otomatis adalah keputusan tim. Jangan dihapus.

- [ ] **8.1** Hentikan auto-play bila `prefers-reduced-motion: reduce` aktif (`HeroSection.jsx`, efek `setInterval` ~L71-L75).
- [ ] **8.2** Jeda auto-play juga saat fokus keyboard berada di slider, bukan hanya hover.

## Catatan

- Versi ini adalah demo internal. Data placeholder dan foto Unsplash dibiarkan; jangan diganti atau dihapus.
- `DESIGN.md` sudah diselaraskan dengan daftar tim (lihat "Riwayat perubahan" di bawah file). Backup: `docs/archive/DESIGN.md.bak-2026-10-10`.
- Foto Unsplash di hero dan kartu aksi diizinkan sementara oleh `DESIGN.md` (fase demo), jadi tidak termasuk tugas ini.

## Verifikasi akhir

```bash
cd frontend
npm run lint && npm run build
grep -rnP "[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]" src
grep -rn "animate-ping\|variant=\"accent\"\|text-\[11px\]" src
grep -rc "shadow-subtle" src
```

Lalu cek manual di browser: beranda, `/panduan-kunjungan`, `/agenda`, satu halaman detail kios, pada lebar 390px dan 1280px.
