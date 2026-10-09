---
name: Plaza Kebun Sayur
description: Profil perusahaan dan direktori komersial untuk Plaza Kebun Sayur Balikpapan (Bunsay)
colors:
# Skala monokrom marun Bunsay
  mono-50: "#FAF8F8"
  mono-100: "#F5EEEE"
  mono-200: "#E8DFDF"
  mono-300: "#D8CACA"
  mono-400: "#A89090"
  mono-500: "#7C4646"
  mono-600: "#8B1A1A"
  mono-700: "#6E1313"
  mono-800: "#4E0E0E"
  mono-900: "#1A0D0D"

# Alias semantik yang dipakai komponen
  canvas: "#ffffff"
  surface-subtle: "#FAF8F8"
  surface-muted: "#F5EEEE"
  surface-elevated: "#ffffff"
  surface-dark: "#1A0D0D"
  text-primary: "#1A0D0D"
  text-secondary: "#5A4545"
  text-muted: "#7A6A6A"

  border-subtle: "#E8DFDF"
  border-hover: "#D8CACA"
  border-strong: "#1A0D0D"

  brand-primary: "#8B1A1A"
  brand-primary-hover: "#6E1313"
  brand-primary-pressed: "#4E0E0E"
  brand-surface: "#FDF5F5"
  brand-surface-strong: "#F9EBEB"

  gold: "#C59B27"
  gold-text: "#8A6B13"

  whatsapp: "#059669"

typography:
  display:
    fontFamily: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "0em"
  headline:
    fontFamily: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0em"
  title-sentence-case:
    fontFamily: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.05em"

rounded:
  none: "0px"
  sm: "4px"
  md: "6px"
  pill: "9999px"

spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "64px"

components:
  button-primary:
    backgroundColor: "{colors.brand-primary}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.brand-primary-hover}"
  button-primary-pressed:
    backgroundColor: "{colors.brand-primary-pressed}"
  button-accent:
    backgroundColor: "{colors.gold-text}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  card-tenant:
    backgroundColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "16px"
  badge:
    backgroundColor: "{colors.brand-surface-strong}"
    textColor: "{colors.brand-primary}"
    rounded: "{rounded.pill}"
---

# Design System: Plaza Kebun Sayur

Dokumen ini adalah acuan desain target untuk situs `plazakebunsayur-web`. Jika ada bagian yang berbeda dengan kode saat ini, kode yang harus disesuaikan dengan dokumen ini. Jika ada hal yang ambigu, jangan menebak. Ikuti aturan di dokumen ini, terutama bagian Do's and Don'ts.

---

## Overview

Situs ini adalah profil perusahaan dan direktori komersial untuk Plaza Kebun Sayur, Pasar Inpres Kebun Sayur Balikpapan Barat. Fungsi utamanya adalah membantu pengunjung menemukan kios belanja, kuliner, agenda, panduan kunjungan, dan kontak pedagang melalui WhatsApp.

Informasi sejarah atau status cagar budaya hanya ditampilkan sebagai konteks faktual bila diperlukan. Jangan menjadikannya slogan, label dekoratif, atau identitas utama yang diulang-ulang.

### Prinsip Visual

1. **Identitas dari Bunsay, struktur dari referensi.**
   
   - Warna dan karakter merek berasal dari identitas Bunsay, yaitu marun yang sudah dipakai pada web versi pembayaran sebelumnya.
   - Struktur tata letak boleh mengambil inspirasi dari Yas Mall Abu Dhabi: grid tegas, layout lapang, frame foto 4:3, judul pendek uppercase, dan dark menu.
   - Warna, nama token, ornamen, dan nuansa Yas Mall tidak boleh diadopsi.

2. **Marun adalah warna utama.**
   
   - Marun dipakai untuk aksi utama, tombol utama, link aktif, highlight, dan elemen identitas.
   - Emas hanya aksen kecil dan terutama dipakai di atas latar gelap.
   - Semua warna netral harus bertint merah-hangat dari skala `mono`, bukan stone kekuningan, bukan abu netral, dan bukan hitam murni.

3. **Utility-first untuk pengunjung ponsel.**
   
   - Direktori kios belanja dan kuliner harus mudah digunakan dari ponsel.
   - Filter kategori, lantai, pencarian, dan tombol WhatsApp harus bekerja baik dengan sentuhan satu tangan.
   - Interaksi tidak boleh bergantung pada hover saja.

4. **Konten nyata, bukan dekorasi generik.**
   
   - Setiap section, kartu, tombol, foto, dan teks harus memiliki fungsi atau informasi nyata.
   - Jika sebuah elemen bisa dipindahkan ke website startup, mall lain, atau landing page generik tanpa kehilangan konteks, elemen itu harus dihapus.
   - Jika data tidak tersedia, jangan mengarang konten. Gunakan empty state atau placeholder yang disengaja.

---

## Colors

Semua warna didefinisikan lewat CSS Custom Properties di `@theme` pada `src/index.css` untuk Tailwind CSS v4. Komponen hanya memakai alias semantik. Skala `mono-*` adalah sumber warna.

### 1. Skala Monokrom Marun

| Token      | Hex       | Peran                                                 |
| ---------- | --------- | ----------------------------------------------------- |
| `mono-50`  | `#FAF8F8` | Krem: `surface-subtle`                                |
| `mono-100` | `#F5EEEE` | Warm gray: `surface-muted`, placeholder foto          |
| `mono-200` | `#E8DFDF` | `border-subtle`                                       |
| `mono-300` | `#D8CACA` | `border-hover`                                        |
| `mono-400` | `#A89090` | Ikon pasif dan state disabled. Bukan untuk teks       |
| `mono-500` | `#7C4646` | Aksen sekunder dan ikon                               |
| `mono-600` | `#8B1A1A` | Marun Bunsay: `brand-primary`                         |
| `mono-700` | `#6E1313` | `brand-primary-hover`                                 |
| `mono-800` | `#4E0E0E` | `brand-primary-pressed`, teks di atas `brand-surface` |
| `mono-900` | `#1A0D0D` | `text-primary`, `surface-dark`, `border-strong`       |

### 2. Permukaan

- `canvas`: `#ffffff` — latar utama.
- `surface-subtle`: `#FAF8F8` — latar kartu sekunder, section panduan, dan area lembut.
- `surface-muted`: `#F5EEEE` — placeholder foto, container filter, dan skeleton.
- `surface-dark`: `#1A0D0D` — satu-satunya warna gelap untuk footer, mega menu, drawer mobile, bilah buletin, dan overlay hero.
- `brand-surface`: `#FDF5F5` dan `#F9EBEB` — tint marun untuk badge, tag, atau highlight ringan.

Jangan memakai `#000000`, `#111111`, `#0c0c0c`, atau `#141414`.

### 3. Teks dan Garis Batas

- `text-primary`: `#1A0D0D` — teks utama.
- `text-secondary`: `#5A4545` — paragraf dan keterangan.
- `text-muted`: `#7A6A6A` — metadata, breadcrumb, caption kecil.
- `border-subtle`: `#E8DFDF` — border default.
- `border-hover`: `#D8CACA` — border saat hover/focus pada perangkat yang mendukung.
- `border-strong`: `#1A0D0D` — border aktif/selected dan interaksi utama.

Jangan memakai teks lebih terang dari `text-muted` untuk teks yang harus dibaca.

### 4. Marun dan Emas

- `brand-primary`: `#8B1A1A` — tombol utama, link, highlight, dan elemen aksi utama.
- `brand-primary-hover`: `#6E1313` — hover.
- `brand-primary-pressed`: `#4E0E0E` — pressed/active.
- `gold`: `#C59B27` — hanya dekoratif, terutama di atas latar gelap. Jangan dipakai sebagai teks atau tombol di atas latar terang.
- `gold-text`: `#8A6B13` — versi emas yang lebih gelap untuk teks atau tombol di atas latar terang bila benar-benar diperlukan.
- `whatsapp`: `#059669` — ikon dan aksi WhatsApp.

Aturan eyebrow:

- Di atas latar terang: pakai `brand-primary` atau `gold-text`.
- Di atas latar gelap: boleh pakai `gold`.

Catatan: perkiraan kontras di dokumen ini perlu diverifikasi ulang dengan alat kontras sebelum implementasi final.

---

## Typography

Situs memakai satu keluarga font.

### Font Family

Primary Sans:

```text
Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif
```

### Hierarki

1. **Display / Hero H1**
   
   - Ukuran: `text-3xl` sampai `text-6xl`.
   - Weight: 800.
   - Line height: `1.12`.
   - Untuk judul pendek boleh uppercase dengan tracking normal.
   - Untuk judul panjang pakai sentence case dengan tracking `-0.02em`.

2. **Section Heading H2**
   
   - Ukuran: `text-2xl` sampai `text-4xl`.
   - Weight: 800.
   - Gunakan sentence case untuk judul panjang.

3. **Card Title H3**
   
   - Ukuran: `text-base` sampai `text-xl`.
   - Weight: 700.
   - Nama kios boleh maksimal dua baris dengan `line-clamp-2`.

4. **Eyebrow / Kicker**
   
   - Ukuran: `text-xs`.
   - Weight: 700.
   - Uppercase.
   - Tracking: `0.05em`.
   - Warna mengikuti aturan eyebrow di bagian Colors.
   - Maksimal satu per halaman, dan hanya bila isinya menambah informasi yang tidak ada di judul. Jangan menaruh eyebrow di setiap H2.

5. **Body**
   
   - Ukuran: `text-sm` atau `text-base`.
   - Weight: 400.
   - Line height: `1.625`.
   - Warna: `text-secondary`.

6. **Caption dan Metadata**
   
   - Ukuran minimal: `text-xs`.
   - Weight: 500 atau 600.
   - Warna: `text-muted`.

### Aturan Huruf Kapital

- Uppercase hanya untuk judul pendek, kira-kira maksimal lima kata.
- Jangan memakai uppercase untuk judul panjang.
- Jangan memakai uppercase dengan `tracking-tight`.
- Judul panjang memakai sentence case.
- Ukuran teks minimum 12px. Jangan memakai `text-[11px]`.

---

## Bahasa dan Copywriting

Bahasa situs harus sederhana, konkret, dan informatif. Jangan menulis seperti landing page startup generik.

### Prinsip Copy

- Tulis apa yang benar-benar ada.
- Utamakan informasi yang berguna: nama kios, kategori, lantai, nomor unit, jam buka, lokasi, agenda, dan WhatsApp.
- Hindari klaim kosong dan kata sifat berlebihan.
- Hindari istilah pemasaran yang terasa generik.
- Jangan mengarang sejarah, testimoni, statistik, atau narasi budaya.

### Istilah yang Boleh Dipakai Bila Perlu

- Plaza Kebun Sayur
- Pasar Inpres Kebun Sayur
- Balikpapan Barat
- cagar budaya
- sejarah pasar
- paguyuban pedagang
- direktori kios
- panduan kunjungan

### Contoh Copy

Buruk:

```text
Destinasi heritage modern yang menghadirkan experience berbelanja tak terlupakan.
```

Baik:

```text
Plaza Kebun Sayur berada di kawasan Pasar Inpres Kebun Sayur, Balikpapan Barat. Temukan kios batu mulia, perhiasan, kerajinan, batik, dan kuliner, lalu hubungi pedagang lewat WhatsApp.
```

Buruk:

```text
Kami menghadirkan solusi digital terpercaya untuk pengalaman belanja yang seamless.
```

Baik:

```text
Cari kios berdasarkan kategori, lantai, atau nama kios. Hubungi pedagang langsung melalui WhatsApp.
```

---

## Layout

### Container dan Breakpoints

- Max width: `max-w-7xl` atau `1280px`.
- Posisi: terpusat.
- Padding: `px-4 sm:px-6 lg:px-8`.
- Breakpoints: Tailwind standar.
- Mobile-first: rancang layar 360–390px terlebih dahulu.

### Halaman dan Rute

- `/` — beranda.
- `/belanja` — direktori belanja.
- `/kuliner` — direktori kuliner.
- `/agenda` — daftar agenda, termasuk halaman detail.
- `/panduan-kunjungan` — panduan kunjungan dan fasilitas.
- `/kontak` — formulir pertanyaan umum dan hotline pengelola.

Detail kios hanya profil singkat. Tidak ada galeri produk, booking, rating, review, atau opsi sewa kios.

### Komposisi Utama

1. **Navbar**
   
   - Tinggi: `h-16` di mobile, `h-20` di desktop.
   - Sticky top.
   - Latar putih.
   - Border bawah halus.
   - Desktop: logo kiri, menu tengah-kanan, tombol WhatsApp pengelola.
   - Mobile: tombol menu membuka drawer `surface-dark` berisi Belanja, Kuliner, Agenda, Panduan Kunjungan, dan Kontak.
   - Tombol hotline WhatsApp harus tetap mudah diakses tanpa harus membuka menu.
   - Target sentuh minimal 44px.

2. **Hero Beranda**
   
   - Tinggi minimal sekitar 460px di mobile dan 580px di desktop.
   - Latar berupa foto slider yang bergerak otomatis (sekitar 5 detik per slide, berhenti saat hover). Slide pertama adalah foto gedung Plaza Kebun Sayur.
   - Slider punya tombol sebelumnya/berikutnya dan penanda slide, serta berhenti otomatis bila `prefers-reduced-motion` aktif.
   - Overlay memakai `mono-900`, bukan hitam murni.
   - Contoh overlay: dari `mono-900/75` ke `mono-900/40` ke transparan.
   - Gedung harus tetap terlihat.
   - Tombol utama harus marun.
   - Jika berada di atas foto, tombol marun boleh diberi border putih tipis agar terpisah dari latar.
   - Tombol sekunder boleh transparan dengan border putih.
   - Jangan membuat hero generik yang hanya berisi judul besar, subtitle kosong, dan dua tombol tanpa informasi spesifik.

3. **Trio Action Cards**
   
   - Grid bebas selama tiga kartu tidak identik (misalnya satu kartu `md:col-span-2`).
   - Kartu Belanja dominan (lebih lebar atau lebih tinggi). Dua kartu lain lebih kecil.
   - Rasio foto konsisten untuk kartu yang sejenis.
   - Setiap kartu harus punya tujuan nyata, misalnya Belanja, Kuliner, atau Panduan Kunjungan.
   - Jangan membuat tiga kartu generik hanya untuk mengisi layout.

4. **Direktori Belanja dan Kuliner**
   
   - Grid:
     - 1 kolom di mobile sempit.
     - 2 kolom di tablet.
     - 3–4 kolom di desktop.
   - Filter kategori berupa kapsul yang bisa digeser horizontal di mobile.
   - Beri petunjuk visual bahwa filter bisa digeser, misalnya kapsul terakhir terpotong atau fade di tepi kanan.
   - Sediakan dropdown lantai dan pencarian kata kunci.
   - Hasil kosong harus menampilkan pesan singkat dan tombol reset filter.

5. **Detail Kios**
   
   - Mobile: satu kolom.
   - Desktop: dua kolom `md:grid-cols-2`.
   - Konten utama:
     - foto depan kios rasio 4:3,
     - nama kios,
     - kategori,
     - lantai,
     - nomor unit,
     - jam buka jika tersedia,
     - tombol “Chat Penjual” ke WhatsApp.
   - Tidak ada galeri produk.
   - Tidak ada booking.
   - Tidak ada sewa kios.

6. **Panduan Kunjungan**
   
   - Grid informasi dua kolom di desktop.
   - Berisi informasi yang berguna untuk pengunjung.
   - Jangan membuat section dekoratif tanpa isi nyata.

---

## Elevation and Depth

Kedalaman visual mengandalkan garis batas tipis dan kontras tonal, bukan bayangan tebal.

### Bayangan

Gunakan basis warna `mono-900` atau `rgba(26, 13, 13, ...)`.

- Shadow Subtle:

```css
0 1px 2px 0 rgba(26, 13, 13, 0.04)
```

- Shadow Card:

```css
0 2px 4px -1px rgba(26, 13, 13, 0.04),
0 1px 2px -1px rgba(26, 13, 13, 0.03)
```

- Shadow Elevated:

```css
0 8px 16px -4px rgba(26, 13, 13, 0.06),
0 2px 4px -2px rgba(26, 13, 13, 0.03)
```

### Aturan Lapisan Latar

- Kanvas putih dilapisi permukaan krem atau warm gray bertint merah.
- Kartu dibatasi dengan border tipis `border-subtle`.
- `TenantCard` cukup memakai satu efek interaksi utama: border berubah menjadi `border-strong` saat aktif, dipilih, atau ditekan.
- Jangan menambahkan bayangan tebal di atas `TenantCard`.

---

## Shapes

Satu aturan bentuk, tanpa pengecualian per halaman.

1. **Radius kecil, dua tingkat saja**
   
   - `rounded-sm` (4px) untuk elemen kecil dan aksi:
     - tombol,
     - input,
     - dropdown,
     - tag kecil.
   - `rounded-md` (6px) untuk wadah:
     - kartu,
     - panel,
     - modal,
     - frame foto,
     - drawer.
   - Alasan: siku-siku penuh terasa kaku, radius besar terasa seperti hasil AI. Dua nilai kecil menjaga keseimbangan.

2. **Kapsul / `rounded-full`**
   
   - Hanya dipakai untuk:
     - filter kategori dan lantai,
     - badge status nyata (misalnya buka/tutup), bukan label dekoratif.

3. **Radius besar dilarang**
   
   - Jangan memakai `rounded-lg`, `rounded-xl`, `rounded-2xl`, atau `rounded-3xl`.
   - Dilarang memakai radius yang sama untuk semua elemen. Wadah memakai `rounded-md`, elemen di dalamnya `rounded-sm` atau tanpa radius.
   - Foto di dalam kartu dipotong mengikuti radius kartu (`overflow-hidden`). Jangan beri radius sendiri.
   - Jangan override per halaman hanya untuk mempertahankan radius lama.

---

## Interaksi dan Aksesibilitas

### Hover

- Hover hanya untuk perangkat yang mendukung.
- Jangan membuat fungsi penting yang hanya muncul saat hover.
- Di Tailwind, gunakan pola yang aman untuk perangkat sentuh.
- Efek hover boleh berupa perubahan border, warna teks, atau latar tipis.

### Pressed / Active

- Kartu tenant:
  - border menjadi `border-strong`,
  - latar boleh berubah tipis ke `surface-subtle`.
- Tombol primary:
  - hover: `brand-primary-hover`,
  - pressed: `brand-primary-pressed`,
  - boleh memakai `active:scale-[0.98]`.

### Focus

- `focus-visible` harus jelas.
- Outline minimal 2px dengan offset 2px.
- Di atas latar terang: outline `brand-primary`.
- Di atas latar gelap: outline `gold`.
- Jangan menghapus outline tanpa pengganti yang setara.

### Target Sentuh

- Aksi utama minimal 44px.
- Termasuk:
  - tombol,
  - filter kapsul,
  - tombol WhatsApp,
  - item menu mobile,
  - input form.

### Kontras

- Teks normal minimal kontras 4,5:1.
- Jangan memakai `mono-400` untuk teks bacaan.
- Jangan memakai `gold` sebagai teks di atas latar terang.
- Gunakan `gold-text` atau `brand-primary` untuk teks emas di atas latar terang.

### Gerak

- Transisi singkat 150–200ms.
- Gunakan untuk warna, border, dan opacity.
- Hormati `prefers-reduced-motion`.
- Jangan menambahkan animasi berlebihan.

### State Kosong, Loading, dan Error

- Hasil pencarian kosong:
  - tampilkan pesan singkat,
  - beri tombol “Reset filter”.
- Loading:
  - gunakan skeleton `surface-muted`,
  - pertahankan rasio foto 4:3.
- Error:
  - tampilkan pesan singkat,
  - beri aksi sederhana seperti coba lagi atau kembali ke direktori.
- Jangan memakai konten palsu untuk mengisi state kosong.

---

## Components

### 1. Navbar

- Navigasi global.
- Menyertakan kontak WhatsApp pengelola mall.
- Mobile drawer memakai `surface-dark`.
- Menu mobile harus jelas, besar, dan mudah ditekan.
- Jangan membuat mega menu rumit di mobile.

### 2. TenantCard

- Frame foto rasio 4:3.
- Foto memakai `object-cover`.
- Jika foto kosong:
  - latar `surface-muted`,
  - ikon kategori `mono-400` di tengah.
  - Ini adalah placeholder yang disengaja, bukan gambar rusak.
- Badge “Pilihan” boleh muncul di pojok kanan atas foto untuk tenant featured.
- Tag kategori kecil uppercase.
- Nama kios maksimal dua baris: `line-clamp-2`.
- Tampilkan lantai dan nomor unit.
- Bilah bawah berisi tombol “Chat Penjual”.
- Tombol WhatsApp:
  - tinggi minimal 44px,
  - latar `surface-subtle`,
  - border `border-subtle`,
  - ikon `whatsapp`.

### 3. Button

Varian:

- `primary`: marun.
- `accent`: `gold-text`, dipakai jarang, maksimal satu per halaman jika perlu.
- `dark`: `surface-dark`.
- `outline`: border netral, latar transparan atau putih.
- `ghost`: transparan tanpa border tebal.

Ukuran:

- `sm`: 36px, hanya untuk aksi sekunder di desktop.
- `md`: 44px, default untuk mobile dan aksi utama.
- `lg`: 48px, untuk CTA besar bila perlu.

Aturan:

- Radius `rounded-sm` (4px).
- Jangan memakai radius lebih besar dari `rounded-md`.
- Jangan memakai gradient.
- Jangan memakai glow.

### 4. Badge

Varian:

- `neutral`
- `brand`
- `gold` hanya di atas latar gelap
- `dark`
- `emerald` untuk WhatsApp/status komunikasi
- `muted`

Ukuran:

- `xs`: 12px
- `sm`: 12px
- `md`: 12px semibold

Bentuk:

- kapsul `rounded-full`, hanya untuk status nyata.
- Jangan memakai badge untuk label dekoratif (misalnya "Pilihan"), kategori, atau tipe agenda. Tampilkan sebagai teks biasa.

### 5. Footer

- Warna utama `surface-dark`.
- Bagian atas boleh berisi area agenda atau buletin hanya jika fiturnya benar-benar tersedia.
- Jika form atau endpoint belum tersedia, jangan menampilkan form dekoratif.
- Bagian utama berisi:
  - profil singkat Plaza Kebun Sayur,
  - tautan direktori,
  - jam dan lokasi,
  - informasi paguyuban atau kontak.
- Bagian bawah berisi hak cipta.
- Aksen emas hanya dipakai di atas latar gelap.

---

## Foto dan Ikonografi

### Foto

- Gunakan foto asli Plaza Kebun Sayur bila tersedia.
- Catatan fase demo & prototipe: Karena tim Inovasi Sosial belum turun ke lapangan untuk dokumentasi pemotretan langsung, penggunaan stok foto kurasi yang relevan (arsitektur pasar, batu permata Borneo, kerajinan Dayak, kuliner tradisional) diperbolehkan sebagai placeholder visual kebutuhan demo.
- Foto demo akan digantikan secara bertahap oleh foto dokumentasi riil begitu data visual lapangan telah dihimpun.
- Semua kartu tenant memakai rasio foto 4:3.

### Ikon

- Ikon hanya dipakai untuk fungsi yang jelas:
  - WhatsApp,
  - pencarian,
  - filter,
  - lokasi,
  - jam,
  - kategori placeholder.
- Jangan memakai ikon generik sebagai hiasan.
- Jangan membungkus ikon dalam kotak, lingkaran, atau border. Ikon selalu polos.
- Jangan memakai emoji sebagai ikon.
- Satu kartu maksimal satu ikon, dan hanya bila ikon itu menjelaskan fungsi.
- Jangan membuat ikon di dalam lingkaran berwarna untuk feature card generik.
- Jangan memakai ikon budaya generik tanpa sumber dan persetujuan.

---

## Identitas Lokal dan Batasan Ornamen

Identitas situs dibangun dari tiga hal nyata:

1. Warna marun Bunsay.
2. Fungsi direktori kios dan informasi kunjungan.
3. Konteks lokasi: Pasar Inpres Kebun Sayur, Balikpapan Barat.

### Aturan Konten Sejarah

- Informasi sejarah atau cagar budaya boleh tampil jika faktual dan relevan.
- Gunakan istilah konkret seperlunya, misalnya:
  - `Pasar Inpres Kebun Sayur`
  - `Balikpapan Barat`
  - `cagar budaya`
  - `sejarah pasar`
- Jangan menjadikannya slogan utama.
- Jangan mengarang narasi sejarah.
- Jangan membuat klaim budaya tanpa data.

### Aturan Ornamen

Saat ini belum ada keputusan mengenai ornamen visual tambahan.

Agent tidak boleh menambahkan:

- motif Dayak,
- motif batik,
- pattern etnik,
- foto arsip palsu,
- texture budaya,
- ornamen lokal generik,
- huruf serif dekoratif,
- elemen visual apa pun yang diklaim sebagai identitas lokal tanpa aset atau persetujuan tertulis.

Jika pemilik proyek belum memutuskan, lebih baik tidak menambahkan apa-apa.

---

## Hindari Tampilan Generic AI-Generated

Tujuan bagian ini adalah mencegah situs terlihat seperti template AI, landing page startup generik, atau website hasil generate otomatis yang kosong.

Referensi struktur dari Yas Mall hanya untuk tata letak. Hasil akhir tidak boleh terasa seperti website generik yang bisa dipakai untuk bisnis apa saja.

### Prinsip Anti-Generik

- Jangan menambah elemen hanya agar halaman terlihat lengkap.
- Setiap elemen harus membantu pengunjung:
  - mencari kios,
  - mencari kuliner,
  - melihat lokasi/lantai/unit,
  - melihat jam atau agenda,
  - menghubungi pedagang,
  - menghubungi pengelola,
  - membaca panduan kunjungan.
- Jika sebuah elemen bisa muncul di website startup, mall lain, atau landing page AI tanpa mengubah konteks, hapus.
- Jika ragu apakah sebuah elemen generik atau tidak, hapus.

### Ciri Visual yang Harus Dihindari

Jangan menambahkan:

1. Gradient mencolok.
2. Aurora background.
3. Blob dekoratif.
4. Latar blur yang tidak berfungsi.
5. Glassmorphism.
6. Glow atau neon shadow.
7. Shadow berwarna.
8. Gradient text.
9. Kartu `rounded-2xl` atau `rounded-3xl`.
10. Sudut membulat berlebihan.
11. Ikon generik dalam lingkaran berwarna.
12. Ilustrasi 3D.
13. Render AI.
14. Emoji di judul, tombol, atau section penting.
15. Foto stok.
16. Foto hasil AI.
17. Pattern budaya generik.
18. Badge berlebihan tanpa status nyata.
19. Animasi scroll berlebihan.
20. Parallax, tilt card, atau animated counter yang tidak diperlukan.

### Ciri Layout yang Harus Dihindari

Jangan membuat:

1. Hero generik dengan eyebrow + judul besar + subtitle kosong + dua CTA tanpa informasi spesifik.
2. Section tiga atau empat kartu identik yang isinya generik.
3. Section testimoni.
4. Section logo partner.
5. Statistik palsu.
6. Counter pengunjung, tenant, atau tahun tanpa data.
7. Section “Why Choose Us”.
8. Section “Keunggulan Kami”.
9. FAQ yang belum dibutuhkan.
10. Blog teaser.
11. Newsletter popup.
12. Pricing table.
13. Membership/loyalty palsu.
14. Card atau teaser yang tidak memiliki halaman tujuan.
15. Section berulang hanya untuk memperpanjang halaman.

### Pola Template yang Harus Dihindari (Tambahan)

Pola berikut sering dipakai sebagai tanda website hasil AI atau template. Berlaku untuk semua halaman dan komponen baru.

1. **Badge atau eyebrow kecil di atas judul hero.** Hero tidak boleh memakai badge di atas H1.
2. **Blok hero berisi angka besar, label kecil, tiga statistik pendukung, dan aksen gradien.**
3. **Tiga kartu berjejer dengan radius dan bayangan yang sama di semua elemen**, sehingga hierarki visual tidak terbaca. Beda fungsi harus beda perlakuan (ukuran, bobot, atau posisi).
4. **Kotak ikon kecil di atas atau di samping heading kartu**, baik membulat maupun siku-siku. Ikon hanya boleh polos dan sebaris dengan teks, tanpa kotak berlatar atau berborder.
5. **Kartu dengan garis kiri berwarna** dan **langkah bernomor 1-2-3** untuk konten yang tidak berurutan. Penomoran hanya untuk konten yang memang berurutan, misalnya proses atau timeline.
6. **Kartu bersarang** (kotak berborder di dalam kartu berborder). Satu level wadah saja.
7. **Label "Live"** atau titik berdenyut. Status buka/tutup boleh tampil sebagai teks biasa. Dilarang memakai `animate-ping` atau `animate-pulse` sebagai hiasan.
8. **Radius sangat besar** serta pill, badge, dan emoji yang tersebar di mana-mana.
9. **Eyebrow uppercase di atas hampir setiap H2.** Eyebrow hanya boleh dipakai bila isinya menambah informasi yang tidak ada di judul. Maksimal satu per halaman.
10. **Template section yang sama diulang** (eyebrow, H2, garis bawah, tautan "Lihat Semua →" di kanan) di semua section. Variasikan struktur sesuai isi.
11. **Efek hiasan yang sama di semua kartu**, misalnya sheen sweep, `backdrop-blur`, atau zoom gambar saat hover. Pakai paling banyak satu efek interaksi per komponen (lihat Aturan Lapisan Latar).
12. **Teks uppercase dengan tracking lebar di semua elemen** (tombol, H2, H4, label). Uppercase hanya untuk eyebrow, tombol pendek, dan judul sampai lima kata, sesuai Aturan Huruf Kapital.
13. **Emoji sebagai ikon** (misalnya 📍, 🍲). Gunakan ikon lucide fungsional atau teks.

### Ciri Copy yang Harus Dihindari

Hindari kata dan frasa yang terasa seperti AI marketing generik, antara lain:

- heritage
- landmark
- iconic
- experience
- seamless
- unlock
- discover
- explore
- vibrant
- hidden gem
- one-stop solution
- elevate
- empowering
- innovative
- terdepan
- solusi terbaik
- kami hadir
- ekosistem
- modern dan berbudaya
- perpaduan tradisi dan inovasi

Gunakan copy yang konkret:

- nama kios,
- kategori,
- lantai,
- nomor unit,
- jam buka,
- lokasi,
- WhatsApp,
- agenda,
- panduan kunjungan.

### Aturan Agent

Agent tidak boleh:

1. Mengarang tenant di luar data placeholder demo.
2. Mengarang nama kios di luar data placeholder demo.
3. Mengarang nama pedagang di luar data placeholder demo.
4. Mengarang foto.
5. Mengarang testimoni.
6. Mengarang statistik.
7. Mengarang narasi sejarah.
8. Mengarang motif budaya.
9. Menambah fitur yang belum disepakati.
10. Memakai foto stok untuk mengisi ruang.
11. Membuat section dekoratif tanpa fungsi.
12. Menyembunyikan data kosong dengan copy pemasaran.
13. Menambah komponen baru di luar kebutuhan situs.
14. Membuat situs terasa seperti landing page SaaS.

Jika data kosong:

- tampilkan empty state,
- jangan membuat konten palsu di luar data placeholder demo.

Jika foto kosong:

- pakai placeholder kategori,
- jangan memakai foto stok.

Jika fitur belum disepakati:

- jangan menambahkan form, booking, galeri, rating, review, sewa kios, atau marketplace.

### Aturan Data Demo

- Versi ini adalah demo internal. Data lengkap kios belum tersedia, jadi data placeholder (nama kios, kategori, lantai, unit, nomor WhatsApp contoh) diizinkan.
- Placeholder hanya di lapisan data (`mockData.js` dan seed backend), tidak ditulis langsung di komponen.
- Placeholder harus wajar sebagai contoh. Jangan memakai nama pedagang atau merek asli tanpa izin.
- Tetap dilarang, termasuk di demo: testimoni, statistik, logo partner, dan sejarah karangan.
- Sebelum dipublikasikan: semua placeholder diganti data nyata, dan foto stok diganti foto lapangan. Penyetuju: tim Inovasi Sosial.

### Checklist Sebelum Hasil Diterima

Sebelum hasil desain atau kode diterima, cek:

- [ ] Tidak ada istilah “heritage” yang dipakai sebagai slogan, judul, atau label dekoratif.
- [ ] Tidak ada gradient, glassmorphism, glow, blur blob, atau gradient text.
- [ ] Foto stok/kurasi hanya sebatas placeholder kebutuhan demo (akan digantikan foto lapangan Inovasi Sosial). Tidak ada ilustrasi 3D atau emoji.
- [ ] Tidak ada testimoni, statistik, logo partner, atau klaim kepercayaan tanpa data.
- [ ] Tidak ada section generik yang bisa dipakai website lain tanpa perubahan berarti.
- [ ] Semua teks berdasarkan data nyata atau placeholder kosong yang disengaja.
- [ ] Semua kartu, tombol, dan tautan memiliki tujuan jelas.
- [ ] Semua state kosong, loading, dan error mengikuti aturan desain.
- [ ] Tidak ada fitur baru yang belum disepakati.
- [ ] Situs tetap terasa sebagai direktori Pasar Inpres Kebun Sayur, bukan landing page startup generik.
- [ ] Tidak ada kotak ikon di atas atau di samping heading kartu.
- [ ] Tidak ada emoji di file `.jsx` (cek: `grep -rnP "[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]" frontend/src`).
- [ ] Tidak ada `animate-ping` atau `animate-pulse` selain skeleton loading.
- [ ] Tidak ada kartu bersarang dan tidak ada `border-l-*` berwarna.
- [ ] Eyebrow hanya dipakai bila menambah informasi, maksimal satu per halaman.
- [ ] Tiga kartu berjejer tidak identik. Jika berbeda fungsi, ukuran atau bobotnya berbeda.
- [ ] Semua varian `Badge` yang dipanggil ada di `Badge.jsx`.

---

## Do's and Don'ts

### Do's

- Pertahankan rasio foto 4:3 untuk semua kartu tenant.
- Pakai skala `mono` bertint merah untuk semua warna netral.
- Pakai marun sebagai warna utama untuk aksi utama.
- Sanitasi nomor ponsel sebelum membuat tautan WhatsApp.
- Tampilkan lantai dan nomor unit bersama nama kios.
- Pastikan setiap efek hover punya padanan untuk sentuhan.
- Gunakan bahasa Indonesia yang sederhana, konkret, dan informatif.
- Gunakan istilah lokasi dan pasar yang nyata.
- Tampilkan empty state jika data belum tersedia.
- Pastikan setiap section memiliki fungsi yang jelas.

### Don'ts

- Jangan mengadopsi warna, nama token, atau ornamen Yas Mall.
- Jangan memakai emas `#C59B27` untuk teks atau tombol di atas latar terang.
- Jangan memakai abu netral, stone kekuningan, atau hitam murni.
- Jangan memakai uppercase untuk judul panjang.
- Jangan memakai uppercase dengan `tracking-tight`.
- Jangan memakai teks di bawah 12px.
- Jangan memakai bayangan berwarna atau efek glow.
- Jangan memakai gradient text.
- Jangan mencampur rasio foto di grid tenant.
- Jangan menghapus informasi faktual tentang sejarah atau cagar budaya bila memang relevan.
- Jangan menambah galeri produk, booking, atau opsi sewa kios.
- Jangan memakai kata `Heritage` sebagai label, judul, eyebrow, slogan, atau hiasan copy.
- Jangan membuat testimonial, statistik, logo partner, atau section kepercayaan tanpa data.
- Jangan membuat feature card generik yang hanya berisi ikon, judul, dan deskripsi kosong.
- Jangan memakai foto di luar konteks budaya/komoditas Kalimantan (gunakan foto asli setelah tim lapangan mengumpulkannya).
- Jangan menambahkan motif budaya atau ornamen lokal tanpa persetujuan.
- Jangan membuat situs terasa seperti template AI atau landing page startup generik.
- Jangan membungkus ikon dalam kotak berlatar atau berborder.
- Jangan memakai emoji, label "Live", atau titik berdenyut sebagai hiasan.
- Jangan menaruh eyebrow di atas setiap H2.
- Jangan memakai kartu bersarang atau garis kiri berwarna.
- Jangan memakai penomoran untuk konten yang tidak berurutan.

---

## Riwayat perubahan

- 2026-10-10: Menambah bagian "Pola Template yang Harus Dihindari (Tambahan)" dari daftar tim. Menyelaraskan aturan Shapes, Badge, Eyebrow, dan Trio Action Cards dengan daftar itu. Backup versi sebelumnya: `docs/archive/DESIGN.md.bak-2026-10-10`.
- 2026-10-10 (2): Radius diubah dari siku-siku penuh menjadi dua tingkat (`rounded-sm` 4px, `rounded-md` 6px) karena hasil implementasi siku-siku penuh dinilai kaku. Hero ditegaskan sebagai slider otomatis. Ditambah "Aturan Data Demo" (placeholder diizinkan untuk demo internal).
