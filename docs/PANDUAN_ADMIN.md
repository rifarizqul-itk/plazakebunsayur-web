# 📖 Panduan Pengelola: Dashboard Admin Plaza Kebun Sayur

> **Dokumen Panduan Operasional Pengelola Mall**  
> Dibuat khusus untuk tim pengelola, staf manajemen, dan administrator non-teknis (non-IT) Plaza Kebun Sayur Balikpapan.  
> Tidak memerlukan keahlian coding atau pemrograman.

---

## 🌟 1. Pengantar & Cara Akses Dashboard

Selamat datang di panel pengelola website resmi **Plaza Kebun Sayur Balikpapan**! Melalui dashboard ini, Anda memiliki kendali penuh untuk memperbarui isi website publik—mulai dari teks sambutan, foto hero gedung, direktori kios pedagang, kuliner, agenda pameran, rute transportasi, tips belanja, hingga dokumen legalitas—secara mandiri tanpa perlu bantuan tim programmer.

### Langkah Masuk (Login):
1. Buka peramban internet (Google Chrome, Microsoft Edge, Mozilla Firefox, atau Safari).
2. Kunjungi alamat dashboard admin:  
   👉 **`https://[alamat-domain]/admin`**  
   *(Pada tahap pengembangan/demo lokal: buka `https://plazakebunsayur-backend.ddev.site/admin`)*.
3. Masukkan **Email** dan **Kata Sandi (Password)** akun pengelola Anda.
4. Klik tombol **Sign in** / **Masuk**.

---

## 🧭 2. Mengenal Menu Navigasi Dashboard

Di sebelah kiri layar, Anda akan melihat panel navigasi yang terbagi menjadi beberapa grup kerja utama:

```
📊 Dashboard (Ringkasan sistem)

📂 KONTEN WEBSITE (Pengaturan tampilan web publik)
   ├── ✏️ Teks & Gambar Web (Teks halaman utama, slide hero, rute, tips, footer, logo, & SEO)
   ├── 🚗 Rute Akses (Panduan transportasi dari bandara, pelabuhan, & angkot)
   ├── 💡 Tips Belanja (Tips membeli batu mulia, perhiasan, cinderamata, & kuliner)
   ├── 📜 Tata Tertib (Aturan ketertiban, kebersihan, & keamanan gedung mall)
   ├── 🔗 Menu Navigasi (Pengaturan tombol navigasi header & footer, termasuk tombol CTA marun)
   └── ⚖️ Halaman Hukum (Kebijakan Privasi & Syarat Ketentuan lengkap dengan paragraf pengantar)

🏬 DIREKTORI & OPERASIONAL (Data kios, pedagang, & fasilitas)
   ├── 🏪 Kios & Stan (Kios batu mulia, batik, etnik, kerajinan, & kuliner)
   ├── 🏷️ Kategori Bisnis (Pengelompokan kios retail & kuliner dengan ikon Lucide kurasi)
   ├── 🏢 Lantai Mall (Denah lantai Lantai Dasar / GF, Lantai 1, Lantai 2)
   ├── 🚻 Fasilitas Umum (ATM, Musholla, Toilet, Parkir, dsb. dengan ikon Lucide kurasi)
   ├── 📅 Agenda & Promo (Pameran budaya, kontes batu mulia, bazar diskon)
   ├── 💬 Pesan Pengunjung (Kotak masuk pesan formulir kontak publik)
   └── ⚙️ Pengaturan Mall (Jam operasional, hotline WA, nomor sekuriti, alamat, & sematan Google Maps)
```

---

## ✏️ 3. Mengedit Teks & Foto Website (`Teks & Gambar Web`)

Menu ini adalah pusat kendali terpadu untuk mengganti seluruh teks sambutan, narasi cerita sejarah, informasi bagian beranda, teks pengantar halaman, hingga foto-foto utama. Formulir disusun dalam tab-tab kategori yang rapi:

### A. Tab "Beranda (Home)"
Mengatur teks dan visual halaman depan website:
1. **Identitas Merek Mall:**
   * **Nama Mall (`brand.name`):** Nama resmi gedung yang tampil di logo atas dan kaki halaman (Bawaan: *"PLAZA KEBUN SAYUR"*).
   * **Sub-lokasi Merek (`brand.sub_location`):** Keterangan wilayah di bawah logo (Bawaan: *"Balikpapan Barat"*).
2. **Slide Hero Gedung Utama:**
   * **Tag Slide Gedung (`home.hero.building_tag`):** Label kecil di atas judul hero (Bawaan: *"Pusat Perbelanjaan Ikonik Balikpapan"*).
   * **Judul Utama Hero (`home.hero.title`):** Sambutan utama mall (Bawaan: *"Sentra Batu Mulia, Etnik Dayak & Kerajinan Khas Kalimantan"*).
   * **Subjudul Hero (`home.hero.subtitle`):** Paragraf ringkas penjelasan daya tarik gedung.
   * **Teks Tombol Aksi Hero (`home.hero.cta_label` / `home.hero.building_cta`):** Teks tombol pintas (Bawaan: *"Jelajahi Direktori Kios"*).
3. **4 Slide Hero Kategori Tematik:**
   Pengunjung dapat menggeser 4 slide tematik dengan foto, judul, dan tautan aksi masing-masing:
   * **Slide Batu Mulia & Permata:** Tag, judul, deskripsi, teks tombol CTA, dan foto slide perhiasan akik khas Borneo.
   * **Slide Cinderamata Etnik:** Tag, judul, deskripsi, teks tombol CTA, dan foto kerajinan manik & mandau Dayak.
   * **Slide Sentra Fashion & Busana:** Tag, judul, deskripsi, teks tombol CTA, dan foto kain batik sutra khas Kalimantan Timur.
   * **Slide Suasana Perniagaan:** Tag, judul, deskripsi, teks tombol CTA, dan foto koridor perniagaan mall yang ramah.
4. **Kartu Tindakan Cepat (Quick Action Cards):**
   Blok *"Apa Yang Ada Di Plaza Kebun Sayur?"* yang mengarahkan pengunjung ke destinasi favorit:
   * **Kartu Belanja Cinderamata (`home.action.belanja.*`):** Kategori, judul, teks tombol, dan gambar latar kartu.
   * **Kartu Sentra Fashion (`home.action.fashion.*`):** Kategori, judul, teks tombol, dan gambar latar kartu.
   * **Kartu Panduan Kunjungan (`home.action.panduan.*`):** Kategori, judul, teks tombol, dan gambar latar kartu.
5. **Bagian Promo & Pusat Oleh-Oleh:**
   * **Blok Agenda & Promo (`home.promos.*`):** Eyebrow (label atas), judul utama, dan teks tombol menuju direktori promo.
   * **Blok Pusat Oleh-Oleh (`home.oleh_oleh.*`):** Eyebrow, judul utama, dan teks tombol jelajah kuliner/oleh-oleh.
6. **Narasi Sejarah Mall (`home.history.*`):**
   * **Eyebrow Sejarah:** Label atas (Bawaan: *"Warisan Perniagaan Balikpapan"*).
   * **Judul Sejarah:** Judul bagian kilas balik (Bawaan: *"Sejarah & Warisan Plaza Kebun Sayur"*).
   * **Paragraf Cerita (Paragraf 1, 2, dan 3):** Kisah perjalanan dari pasar tradisional masa lampau hingga menjadi sentra perniagaan permata dan cinderamata modern.
   * **Teks Tombol Sejarah (`home.history.cta_label`):** Teks tombol pintas baca selengkapnya.

### B. Tab "Header Halaman"
Mengatur judul utama, label atas (*eyebrow*), dan paragraf pengantar di bagian atas setiap halaman website:
* **Halaman Direktori Belanja** (`page_headers.shopping.*` / `header.shopping.*`)
* **Halaman Sentra Fashion** (`page_headers.fashion.*` / `header.fashion.*`)
* **Halaman Informasi & Agenda** (`page_headers.events.*` / `header.events.*`)
* **Halaman Panduan Kunjungan** (`page_headers.plan_visit.*` / `header.panduan.*`)
* **Halaman Kontak Pengelola** (`page_headers.contact.*` / `header.contact.*`)

### C. Tab "Panduan Kunjungan (Konten Teks)"
Mengatur teks pengantar bagian-bagian di halaman Panduan Kunjungan:
* **Jam Buka Gedung:** Judul bagian (`panduan.hours_title`), rincian jam ramai kios (`panduan.hours_detail`), dan rekomendasi waktu berkunjung terbaik (`panduan.hours_tip`).
* **Titik Lokasi Mall:** Judul bagian (`panduan.location_title`) dan narasi kemudahan akses (`panduan.location_detail`).
* **Fasilitas Gedung:** Judul bagian (`panduan.facilities_title`) dan paragraf pengantar fasilitas (`panduan.facilities_description`).
* **Akses Transportasi:** Judul bagian (`panduan.routes_title`) dan keterangan pengantar rute perjalanan (`panduan.routes_description`).
* **Tips Belanja Cerdas:** Judul bagian (`panduan.tips_title`) dan pengantar tips belanja suvenir (`panduan.tips_description`).
* **Tata Tertib & Keamanan:** Judul bagian (`panduan.rules_title`) dan keterangan ketertiban bersama (`panduan.rules_description`).

### D. Tab "Agenda & Kontak"
* **Kotak Kerjasama Sewa Ruang Event (`event.callout.*`):** Teks penawaran atrium atau area pameran pada halaman detail agenda, meliputi judul penawaran (*"Ingin Mengadakan Acara di Plaza Kebun Sayur?"*), narasi fasilitas, dan tombol hubungi pengelola.
* **Informasi Kantor Pengelola (`contact.office_*`):** Label eyebrow, judul, dan deskripsi pelayanan kantor operasional di halaman Kontak.
* **Formulir Pesan Masuk (`contact.form_*`):** Judul dan keterangan pengantar pada formulir pengiriman saran dan pertanyaan pengunjung.

### E. Tab "Halaman 404 (Tidak Ditemukan)"
Mengatur tampilan ramah ketika pengunjung membuka tautan yang keliru atau sudah tidak aktif:
* **Judul 404 (`not_found.title`):** Kalimat pemberitahuan (Bawaan: *"Halaman Tidak Ditemukan"*).
* **Deskripsi 404 (`not_found.description`):** Kalimat panduan ramah bagi pengunjung.
* **Tombol Beranda (`not_found.cta_home`):** Tombol kembali ke halaman depan.
* **Tombol Direktori (`not_found.cta_directory`):** Tombol pintas menuju daftar kios belanja.

### F. Tab "Footer (Kaki Halaman)"
* **Deskripsi Footer (`footer.description`):** Paragraf ringkas tentang mall di kaki halaman website.
* **Tagline Mall (`footer.tagline`):** Slogan resmi mall.
* **Teks Informasi Pengelola (`footer.office_text`):** Keterangan jam operasional kantor manajemen.

### G. Tab "Aset & Foto Gedung"
Gunakan tab ini untuk mengganti berkas visual beresolusi tinggi:
* **Logo Resmi (`brand.logo`):** File format PNG transparan dengan kontras yang jelas.
* **Foto Hero Gedung (`home.hero.image`):** Foto lanskap utama (rekomendasi rasio **16:9**, misal: 1920x1080 piksel).
* **Foto Sejarah Mall (`home.history.image`):** Foto dokumentasi arsip/arsitektur (rekomendasi rasio **4:3**, misal: 1200x900 piksel).
* **Foto Pratinjau Sosial Media / OG Image (`seo.default_og_image`):** Gambar pratinjau yang otomatis muncul saat tautan website dibagikan ke WhatsApp, Telegram, atau media sosial.

> [!TIP]
> **Panduan Unggah Foto:**
> - Sistem otomatis mengompresi dan mengonversi foto Anda ke format WebP super cepat.
> - Batas maksimal ukuran foto yang diunggah adalah **5 Megabyte (MB)**.
> - Jika Anda mengosongkan foto atau menghapusnya, website secara otomatis menampilkan foto cadangan bawaan mall.

---

## 🚗 4. Mengelola Panduan Kunjungan (Rute, Tips, & Aturan)

Halaman **Panduan Kunjungan** (`/panduan-kunjungan`) dirancang agar wisatawan dari dalam maupun luar kota Balikpapan merasa nyaman, aman, dan terbantu. Di panel admin, ada 3 menu khusus untuk mengelolanya:

### 1. Rute Akses (`Rute Akses`)
* Berisi panduan transportasi menuju gedung mall dari titik-titik kedatangan utama Kota Balikpapan.
* **Bidang yang diisi:**
  - **Judul Rute / Asal:** Misal *"Dari Bandara Internasional Sultan Aji Muhammad Sulaiman Sepinggan"* atau *"Transportasi Publik / Angkutan Kota (Angkot)"*.
  - **Jarak / Estimasi Waktu:** Misal *"± 15 km (25–35 menit perjalanan)"* atau *"Tersedia setiap hari"*.
  - **Petunjuk Jalan & Rekomendasi Moda:** Panduan detail mengenai rute tercepat, pilihan taksi resmi, atau trayek angkot yang melintas.
  - **Status Aktif:** Centang untuk langsung menampilkan rute ini di website publik.
  - **Urutan:** Atur angka prioritas (urutan 1, 2, 3) atau geser baris ke atas/bawah pada daftar tabel.

### 2. Tips Belanja (`Tips Belanja`)
* Memberikan tips praktis belanja cerdas batu mulia, perhiasan emas/perak, kain batik, atau mandau Dayak.
* **Bidang yang diisi:**
  - **Judul Tips Belanja:** Misal *"Uji Keaslian Batu Mulia"*, *"Tawar-Menawar dengan Santun"*, *"Jasa Ikat dan Resize Cincin di Tempat"*, atau *"Kemasan Khusus untuk Penerbangan"*.
  - **Uraian Tips Belanja:** Penjelasan ramah mengenai kebiasaan tawar-menawar yang sopan, ketersediaan alat senter kristal & tester kekerasan batu di kios pedagang, serta pembuatan kotak dus khusus bagasi pesawat.
  - **Status Aktif & Urutan:** Aktifkan atau sembunyikan tips sesuai musim wisata.

### 3. Tata Tertib Gedung (`Tata Tertib`)
* Aturan ketertiban, kebersihan, dan keselamatan bersama di area gedung Plaza Kebun Sayur.
* **Bidang yang diisi:** Judul aturan, uraian pedoman, serta status keaktifannya.

> [!NOTE]
> Seluruh data Rute Akses, Tips Belanja, dan Tata Tertib yang aktif akan **otomatis tersinkronisasi dan tampil dinamis** pada halaman publik `/panduan-kunjungan`. Jika server data sedang offline, sistem memiliki cadangan bawaan sehingga halaman panduan tidak akan pernah kosong.

---

## 🔗 5. Mengatur Menu Navigasi Website (`Menu Navigasi`)

Pengelola memiliki kendali penuh untuk menyusun urutan tombol menu di bilah navigasi atas (Navbar) maupun tautan di bilah bawah (Footer).

### Aturan Mengubah Menu:
1. **Lokasi Menu:** Pilih **Header (Navbar Atas)** atau **Footer (Navigasi Bawah)**.
2. **Label Menu:** Nama tombol yang dibaca pengunjung (misal: *"BERANDA"*, *"BELANJA"*, *"FASHION"*, *"INFORMASI"*, *"PANDUAN"*, *"KONTAK"*).
3. **Pilihan Alamat (Path):**
   - **Tautan Internal Website:** Pilih rute resmi:
     - `/` (Beranda)
     - `/belanja` (Direktori Kios Cinderamata & Batu Mulia)
     - `/fashion` (Sentra Fashion Batik Kalimantan)
     - `/informasi` (Informasi & Promo Mall)
     - `/panduan-kunjungan` (Panduan Lengkap Wisatawan)
     - `/kontak` (Kontak & Hotline Pengelola)
     - `/kebijakan-privasi` (Kebijakan Privasi)
     - `/syarat-ketentuan` (Syarat & Ketentuan)
   - **Tautan Eksternal:** Untuk mengarahkan pengunjung ke website dinas pemerintah atau kanal luar, masukkan URL lengkap diawali `https://`.
4. **Gaya Tombol Aksi (CTA) — `is_cta`:**
   - **Fitur Tombol Sorotan Khusus:** Centang toggle *"Gaya Tombol Aksi (CTA)"* jika Anda ingin menu tersebut tampil sebagai **tombol merah marun menonjol** (*high-visibility button*) dengan teks putih tebal.
   - Pada layar komputer/laptop (Desktop), tombol ini otomatis memiliki latar merah marun, sudut membulat rapi, bayangan halus, dan efek hover yang menarik perhatian pengunjung.
   - Pada layar HP (Mobile), tombol ini tampil melebar penuh (*full-width*) di dalam menu drawer samping.
   - **Rekomendasi Pemakaian:** Sangat efektif digunakan untuk tombol aksi prioritas seperti *"HUBUNGI KAMI"*, *"SEWA RUANG"*, atau *"LAYANAN HOTLINE"*.
   - Pada tabel daftar menu navigasi admin, terdapat kolom **"Tombol CTA"** berikon centang hijau yang dapat Anda klik untuk mengurutkan (*sortable*).
5. **Status Aktif & Urutan:**
   - Menu dapat dinonaktifkan sementara tanpa harus menghapus datanya.
   - Gunakan fitur seret (*drag-and-drop*) baris tabel atau ubah kolom urutan untuk menentukan letak tombol dari kiri ke kanan.

---

## ⚖️ 6. Mengedit Halaman Hukum (`Halaman Hukum`)

Untuk memenuhi kepatuhan regulasi perlindungan data pribadi (UU PDP No. 27/2022) dan transparansi operasional direktori, website menyediakan dua dokumen hukum resmi:
1. **Kebijakan Privasi (`kebijakan-privasi`)**
2. **Syarat & Ketentuan (`syarat-ketentuan`)**

### Fitur Pengeditan Halaman Hukum:
1. **Paragraf Pengantar Singkat (`intro`):**
   * Di atas editor dokumen, terdapat kolom **"Paragraf Pengantar Singkat"**.
   * Teks yang Anda masukkan di kolom ini akan **ditampilkan sebagai paragraf sorotan utama (*lead paragraph*)** di halaman website publik, tepat di atas pasal-pasal resmi.
   * Paragraf ini didesain khusus dengan kotak latar hangat bergaris batas merah marun di sebelah kiri (`border-l-4 border-brand-primary`), sehingga pengunjung dapat langsung memahami ringkasan kepatuhan dokumen dalam bahasa yang mudah dipahami sebelum membaca klausul hukum panjang.
2. **Label Tanggal Pembaruan:**
   * Masukkan keterangan tanggal pembaruan dokumen (contoh: *"11 Oktober 2026"*).
3. **Isi Lengkap Dokumen Hukum (Rich Editor):**
   * Gunakan tombol **Heading 2** atau **Heading 3** untuk judul bab/pasal.
   * Gunakan format **Tebal (Bold)** atau *Miring (Italic)* untuk penegasan kata.
   * Gunakan tombol **Daftar Poin (Bullet List / Numbered List)** untuk rincian hak subjek data atau kewajiban pengguna.
   * Gunakan tombol **Tautan (Link)** jika ingin menyematkan link eksternal atau email resmi.
4. **Proteksi Keamanan Otomatis:**
   * Sistem dilengkapi dengan penyaring otomatis (*HTML Purifier*). Seluruh kode jahat (skrip berbahaya) otomatis dibersihkan tanpa merusak tata letak tulisan Anda.

---

## 🏬 7. Mengelola Data Operasional & Kios Pedagang

### A. Kios & Stan Pedagang (`Kios & Stan`)
* **Tambah Kios Baru:** Masukkan nama kios, nomor blok/unit (misal: *Blok A No. 12*), pilih kategori bisnis dan lantai kios.
* **Jam Operasional Kios:** Masukkan jadwal buka-tutup harian kios (misal: *09:00 - 18:00 WITA*).
* **Nomor WhatsApp Pedagang:** Masukkan nomor WhatsApp pemilik kios (format diawali `08...` atau `628...`). Sistem otomatis menghasilkan tombol chat langsung *"Chat Penjual"* yang ramah bagi pembeli di website publik.
* **Foto Kios:** Unggah foto etalase toko tampak depan (rekomendasi rasio foto **4:3**).
* **Tandai Kios Unggulan:** Centang opsi *"Unggulan (Featured)"* agar stan tersebut dipromosikan di baris teratas halaman Beranda.

### B. Fasilitas Umum & Pemilih Ikon Kurasi (`Fasilitas Umum`)
* Atur fasilitas mall seperti Toilet Bersih, Musholla Al-Ikhlas, ATM Center, Area Parkir Kendaraan, Pos Keamanan, dsb.
* **Pemilih Ikon Kurasi (Curated Lucide Icons):**
  Untuk memastikan tampilan visual tetap seragam dan elegan sesuai standar desain, tersedia menu dropdown pencarian ikon dengan nama dan penjelasan Bahasa Indonesia yang mudah:
  - 🌙 **Moon** — *Bulan Sabit (Musholla / Tempat Ibadah)*
  - 👥 **Users** — *Pengguna / Orang (Toilet & Sanitasi)*
  - 💳 **CreditCard** — *Kartu Kredit (ATM Center & Bank Finansial)*
  - 🚗 **Car** — *Mobil (Area Parkir Kendaraan)*
  - 🛡️ **ShieldCheck** — *Perisai Centang (Pos Satpam / Keamanan)*
  - 🏢 **Building2** — *Gedung (Kantor Pengelola / Fasilitas Gedung)*
  - 📶 **Wifi** — *Sinyal Wifi (Akses Internet Gratis)*
  - ♿ **Accessibility** — *Aksesibilitas (Fasilitas Ramah Disabilitas / Kursi Roda)*
  - 👶 **Baby** — *Bayi (Ruang Menyusui / Laktasi & Anak)*
  - 🍴 **Utensils** — *Sendok Garpu (Restoran & Kantin)*
  - 🛍️ **ShoppingBag** — *Tas Belanja (Kios & Layanan Belanja)*
  - ✨ **Sparkles** — *Kilauan / Bintang (Layanan Khusus / Pengujian Batu)*
  - ℹ️ **Info** — *Informasi (Pos Informasi & Customer Care)*
  - 💓 **HeartPulse** — *Denyut Jantung (Pos P3K / Medis Darurat)*
  - 📍 **MapPin** — *Pin Peta (Titik Temu / Pick-up Point Transportasi)*

### C. Kategori Bisnis & Pemilih Ikon Kurasi (`Kategori Bisnis`)
* Mengelompokkan kios retail belanja dan sentra fashion/kuliner.
* **Pemilih Ikon Kurasi Kategori:**
  Pilih ikon yang mewakili kelompok barang dagangan pedagang:
  - 💎 **Gem** — *Batu Mulia (Batu Akik, Permata, Safir, Zamrud)*
  - ✨ **Sparkles** — *Kilauan (Perhiasan Emas, Perak, & Kristal)*
  - 🛍️ **ShoppingBag** — *Tas Belanja (Pusat Oleh-Oleh & Souvenir)*
  - 📦 **PackageOpen** — *Paket Terbuka (Aksesoris Etnik Dayak)*
  - 📦 **Package** — *Paket (Kerajinan Kayu & Manik-Manik)*
  - 👔 **Shirt** — *Kemeja / Baju (Batik Kalimantan & Fashion)*
  - 👑 **Crown** — *Mahkota (Pakaian Adat & Busana Tradisional)*
  - ✂️ **Scissors** — *Gunting (Penjahit, Modiste, & Reparasi Busana)*
  - ⌚ **Watch** — *Jam Tangan (Arloji & Jam Dinding)*
  - 🎁 **Gift** — *Kado (Hadiah, Cinderamata, & Parsel)*
  - 🎨 **Palette** — *Palet Lukis (Galeri Seni, Lukisan, & Ukiran)*
  - 🏪 **Store** — *Toko (Retail Komersial Umum)*
  - 🍴 **UtensilsCrossed** — *Sendok Garpu Bersilang (Sentra Kuliner Khas)*

### D. Agenda Kegiatan & Pameran (`Agenda & Promo`)
* Publikasikan jadwal festival budaya Dayak, pameran batu akik nusantara, bazar diskon kemerdekaan, atau peringatan hari besar.
* Masukkan tanggal mulai, tanggal berakhir, lokasi panggung/atrium, ringkasan acara, serta unggah banner promosi berukuran lanskap (rasio **16:9**).

### E. Pesan Masuk Pengunjung (`Pesan Pengunjung`)
* Setiap pesan yang dikirim wisatawan melalui formulir di halaman Kontak akan otomatis masuk ke menu ini.
* Anda dapat meninjau nama pengirim, email, nomor telepon, pokok pertanyaan/saran, serta menandai statusnya apakah sudah dihubungi kembali oleh pihak pengelola.

### F. Pengaturan Kontak & Peta Interaktif Mall (`Pengaturan Mall`)
Pusat pengaturan identitas operasional gedung:
* **Jam Buka Mall:** Misal *"Setiap Hari 08.00 - 18.00 WITA"*.
* **Nomor WhatsApp Pengelola:** Nomor layanan informasi resmi mall yang otomatis terhubung ke tombol *"Hotline Pengelola"* di navbar atas website.
* **Telepon Pos Keamanan:** Nomor telepon darurat pos satpam mall.
* **Alamat Kantor:** Alamat fisik kantor manajemen di dalam gedung.
* **Tautan Google Maps:** URL pin lokasi Google Maps saat pengunjung menekan tombol *"Buka Petunjuk Arah di Google Maps"*.
* **URL Sematan Google Maps (Embed Iframe — `maps_embed_url`):**
  - Kolom ini digunakan untuk menampilkan **peta interaktif Google Maps langsung di halaman Panduan Kunjungan**.
  - **Cara Mendapatkan URL Embed dari Google Maps:**
    1. Buka [Google Maps](https://maps.google.com) di peramban internet Anda dan cari *"Plaza Kebun Sayur Balikpapan"*.
    2. Klik tombol **Bagikan** (*Share*).
    3. Pilih tab **Sematkan peta** (*Embed a map*).
    4. Klik **Salin HTML** (*Copy HTML*).
    5. Ambil bagian tautan yang ada di dalam tanda kutip `src="..."` saja (contoh diawali `https://www.google.com/maps/embed?pb=...`).
    6. Tempelkan (*paste*) tautan tersebut ke kolom **URL Sematan Google Maps** pada formulir admin ini, lalu klik Simpan.
    7. Peta interaktif di website publik akan langsung otomatis memuat lokasi gedung yang dapat digeser dan diperbesar oleh pengunjung!

---

## 🚀 8. Tombol "Terbitkan Perubahan ke Website"

Di pojok kanan atas halaman **Teks & Gambar Web**, Anda akan menemukan tombol berwarna merah marun bertuliskan:  
👉 **"Terbitkan Perubahan ke Website"**

### Kapan Tombol Ini Perlu Ditekan?
1. **Perubahan Teks, Foto, Kios, Panduan, & Agenda SEHARI-HARI:**  
   ➡️ **Langsung tampil otomatis!** Pengunjung yang membuka website akan langsung melihat data terbaru saat memuat halaman tanpa Anda perlu menekan tombol ini.
2. **Perubahan Judul Mesin Pencari (Google SEO Meta Tags) & Snapshot Prerender Statis:**  
   ➡️ Jika Anda baru saja memperbarui judul/deskripsi mesin pencari Google pada tab **SEO Meta Tag**, tekan tombol ini.
3. **Cara Menggunakan:**
   - Klik tombol **"Terbitkan Perubahan ke Website"**.
   - Akan muncul jendela konfirmasi: *"Apakah Anda yakin ingin menerbitkan perubahan ke hosting publik?"*.
   - Klik **"Ya, Terbitkan Sekarang"**.
   - Sistem akan mengirimkan sinyal ke server hosting (Netlify) untuk menyegarkan file website statis dalam 1–2 menit.

---

## ⛔ 9. Apa yang TIDAK BISA Diubah dari Dashboard Admin?

Untuk menjaga estetika, performa kecepatan, dan integritas identitas visual Plaza Kebun Sayur yang telah dirancang secara profesional, hal-hal berikut **tetap terkunci di dalam kode sistem** dan tidak dapat diubah dari dashboard:
1. **Warna Dasar Desain:** Skala warna merah marun khas Kebun Sayur (`#8B1A1A`), aksen emas Borneo (`#C59B27`), dan warna kanvas bersih.
2. **Tata Letak (Layout) Halaman:** Penataan grid kios responsif, bilah samping, susunan container, dan animasi transisi halus.
3. **Jenis Huruf (Font):** Tipografi Plus Jakarta Sans yang sudah dioptimasi untuk keterbacaan di layar ponsel kecil.
4. **Pembuatan Halaman/Rute Baru di Luar Sistem:** Menambahkan URL baru yang sebelumnya tidak pernah ada di rancangan website.

*(Jika pengelola mall memiliki kebutuhan perubahan tata letak atau penambahan fitur baru di masa mendatang, silakan berkonsultasi dengan tim pengembang website).*

---

## ❓ 10. Pertanyaan yang Sering Diajukan (FAQ)

**T: Apa yang terjadi jika koneksi server admin sedang terputus atau offline?**  
*J: Website publik Plaza Kebun Sayur dirancang sangat tangguh dengan sistem pencadangan otomatis (Offline Fallback). Jika server backend tidak terhubung, website publik tetap dapat diakses normal 100% oleh masyarakat umum menggunakan data cadangan bawaan tanpa ada tampilan error.*

**T: Saya mengunggah foto tetapi ukurannya sangat besar dari kamera HP modern?**  
*J: Sistem mendukung foto asli hingga ukuran 5 MB per berkas. Sistem kami akan otomatis mengecilkan dan mengonversi foto Anda ke format WebP super ringan dan cepat dibuka pengunjung.*

**T: Bagaimana cara menghapus teks atau foto yang salah diinput dan ingin kembali ke bawaan semula?**  
*J: Cukup kosongkan kolom teks atau hapus foto tersebut lalu klik Simpan. Sistem secara cerdas akan otomatis memulihkan kalimat atau foto cadangan bawaan resmi mall.*

**T: Bagaimana cara membuat tombol menu di navbar menjadi tombol merah marun mencolok?**  
*J: Masuk ke menu **Menu Navigasi**, edit baris menu yang diinginkan (misal menu Kontak), lalu centang toggle **"Gaya Tombol Aksi (CTA)"**. Tombol tersebut akan langsung berubah menjadi tombol merah marun dengan gaya tombol ajakan bertindak.*
