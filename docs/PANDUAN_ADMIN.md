# 📖 Panduan Pengelola: Dashboard Admin Plaza Kebun Sayur

> **Dokumen Panduan Operasional Pengelola Mall**  
> Dibuat khusus untuk tim pengelola, staf manajemen, dan administrator non-teknis (non-IT) Plaza Kebun Sayur Balikpapan.  
> Tidak memerlukan keahlian coding atau pemrograman.

---

## 🌟 1. Pengantar & Cara Akses Dashboard

Selamat datang di panel pengelola website resmi **Plaza Kebun Sayur Balikpapan**! Melalui dashboard ini, Anda memiliki kendali penuh untuk memperbarui isi website publik—mulai dari teks informasi, foto-foto gedung, direktori kios pedagang, kuliner, agenda kegiatan, tips belanja, hingga aturan tata tertib gedung—secara mandiri tanpa perlu bantuan tim programmer.

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
   ├── ✏️ Teks & Gambar Web (Halaman utama, teks judul, logo, dan SEO)
   ├── 🚗 Rute Akses (Panduan transportasi dari bandara/pelabuhan)
   ├── 💡 Tips Belanja (Tips beli batu akik, kerajinan, & cinderamata)
   ├── 📜 Tata Tertib (Aturan ketertiban gedung mall)
   ├── 🔗 Menu Navigasi (Pengaturan tombol navigasi header & footer)
   └── ⚖️ Halaman Hukum (Kebijakan Privasi & Syarat Ketentuan)

🏬 DIREKTORI & OPERASIONAL (Data kios, pedagang, & fasilitas)
   ├── 🏪 Kios & Stan (Kios batu mulia, batik, etnik, kuliner)
   ├── 🏷️ Kategori Bisnis (Pengelompokan kios retail & kuliner)
   ├── 🏢 Lantai Mall (Denah lantai GF, Lantai 1, Lantai 2)
   ├── 🚻 Fasilitas Umum (ATM, Musholla, Toilet, Parkir, dsb.)
   ├── 📅 Agenda & Promo (Pameran budaya, bazar, festival kuliner)
   ├── 💬 Pesan Pengunjung (Kotak masuk pesan formulir kontak)
   └── ⚙️ Pengaturan Mall (Jam buka operasional, nomor hotline WhatsApp resmi)
```

---

## ✏️ 3. Mengedit Teks & Foto Website (`Teks & Gambar Web`)

Menu ini adalah pusat kendali untuk mengganti teks sambutan, deskripsi sejarah, dan foto utama di website. Formulir disusun rapi dalam tab-tab kategori:

### A. Tab "Beranda (Home)"
* **Judul Utama Hero (`home.hero.title`):** Kalimat sambutan paling atas di halaman utama.  
  *Contoh:* *"Sentra Batu Mulia, Etnik Dayak & Kerajinan Khas Kalimantan"*.
* **Subjudul Hero (`home.hero.subtitle`):** Penjelasan singkat di bawah judul utama mall.
* **Teks Tombol Aksi Hero (`home.hero.cta_label`):** Teks pada tombol tombol pintas (misal: *"Jelajahi Direktori Kios"*).
* **Judul & Narasi Sejarah (`home.history.title`, `home.history.body`):** Cerita kilas balik dan sejarah perniagaan Plaza Kebun Sayur.
* **Judul & Deskripsi Bagian Unggulan (`home.featured.title`, `home.featured.description`):** Teks pengantar untuk blok kios dan stan pilihan.

### B. Tab "Header Halaman"
Mengatur judul dan teks pembuka di bagian atas setiap halaman website:
* **Halaman Direktori Belanja** (`page_headers.shopping.*`)
* **Halaman Sentra Kuliner** (`page_headers.culinary.*`)
* **Halaman Agenda & Acara** (`page_headers.events.*`)
* **Halaman Panduan Kunjungan** (`page_headers.plan_visit.*`)
* **Halaman Kontak Pengelola** (`page_headers.contact.*`)

### C. Tab "Footer (Kaki Halaman)"
* **Deskripsi Footer (`footer.description`):** Paragraf ringkas tentang mall di bagian bawah website.
* **Tagline Mall (`footer.tagline`):** Slogan resmi mall.
* **Teks Informasi Pengelola (`footer.office_text`):** Keterangan jam layanan kantor pengelola.

### D. Tab "Aset & Foto Gedung"
Gunakan tab ini untuk mengganti foto gedung dan logo:
* **Logo Resmi (`brand.logo`):** Gunakan file format PNG transparan dengan kontras yang jelas.
* **Foto Hero Gedung (`home.hero.image`):** Foto utama lanskap beresolusi tinggi (rekomendasi rasio **16:9**, misal: 1920x1080 piksel).
* **Foto Sejarah Mall (`home.history.image`):** Foto dokumentasi gedung/arsip sejarah (rekomendasi rasio **4:3**, misal: 1200x900 piksel).
* **Foto Pratinjau Sosial Media / OG Image (`seo.default_og_image`):** Gambar pratinjau yang otomatis muncul saat link website dibagikan ke WhatsApp, Facebook, atau Twitter.

> [!TIP]
> **Panduan Unggah Foto:**
> - Sistem otomatis mengubah ukuran dan mengompresi foto agar website tetap dibuka super cepat oleh pengunjung dengan HP 3G/4G.
> - Batas maksimal ukuran foto yang diunggah adalah **5 Megabyte (MB)**.
> - Jika Anda mengosongkan foto atau menghapusnya, website secara otomatis menampilkan foto cadangan bawaan mall.

---

## 🚗 4. Mengelola Panduan Kunjungan (Rute, Tips, & Aturan)

Halaman **Panduan Kunjungan** dirancang agar wisatawan dari luar kota Balikpapan merasa nyaman berkunjung. Di panel admin, ada 3 menu khusus untuk mengelolanya:

### 1. Rute Akses (`Rute Akses`)
* Berisi panduan perjalanan menuju mall (misal: dari Bandara SAMS Sepinggan atau Pelabuhan Semayang).
* **Bidang yang diisi:**
  - **Judul Rute:** Misal *"Dari Bandara SAMS Sepinggan (BPN)"*.
  - **Jarak & Estimasi Waktu:** Misal *"±12 km · 25–35 menit"*.
  - **Deskripsi Rute:** Pilihan transportasi umum, taksi bandara, atau rute ojek online.
  - **Status Aktif:** Centang untuk menampilkan di website.
  - **Urutan:** Anda dapat menggeser urutan kartu ke atas/bawah sesuai prioritas.

### 2. Tips Belanja (`Tips Belanja`)
* Memberikan tips praktis belanja batu akik, perhiasan emas/perak, kain batik, atau mandau Dayak.
* **Contoh Tips:** *"Pilih Kios Bereputasi & Minta Sertifikat"*, *"Tanyakan Asal-Usul Batu Permata"*.
* Anda dapat menambah tips baru kapan saja saat ada panduan baru bagi wisatawan.

### 3. Tata Tertib Gedung (`Tata Tertib`)
* Aturan ketertiban, kebersihan, dan keselamatan bersama di area gedung Plaza Kebun Sayur.
* **Contoh:** *"Dilarang merokok di area tertutup"*, *"Jaga barang bawaan berharga Anda"*.

---

## 🔗 5. Mengatur Menu Navigasi Website (`Menu Navigasi`)

Pengelola dapat menyusun urutan menu di bagian atas website (Header) maupun tautan di bagian bawah (Footer).

### Aturan Mengubah Menu:
1. **Lokasi Menu:** Pilih apakah menu ini tampil di **Atas (Header)** atau di **Bawah (Footer)**.
2. **Label Menu:** Nama tombol yang dibaca pengunjung (misal: *"Sentra Kuliner"* atau *"Agenda Acara"*).
3. **Pilihan Alamat (Path):**
   - **Tautan Internal Website:** Pilih rute resmi yang sudah tersedia pada menu dropdown:
     - `/` (Beranda)
     - `/belanja` (Direktori Belanja Cinderamata)
     - `/kuliner` (Sentra Kuliner Khas)
     - `/agenda` (Agenda Kegiatan & Pameran)
     - `/panduan-kunjungan` (Panduan Wisatawan)
     - `/kontak` (Kontak & Lokasi Pengelola)
     - `/kebijakan-privasi` (Kebijakan Privasi)
     - `/syarat-ketentuan` (Syarat & Ketentuan)
   - **Tautan Eksternal:** Jika ingin mengarahkan pengunjung ke website instansi pemerintah atau media sosial resmi luar, masukkan alamat lengkap diawali `https://` (contoh: `https://balikpapan.go.id`).
4. **Status Aktif:** Jika sebuah menu dinonaktifkan, menu tersebut akan langsung hilang dari tampilan tanpa perlu menghapus datanya.

> [!WARNING]
> **Perhatian Khusus Menu:**  
> Menu navigasi **tidak dapat digunakan untuk membuat halaman baru** di luar rute yang sudah dirancang pengembang. Jika ada kebutuhan menambah halaman profil baru yang belum pernah ada, hubungi tim developer.

---

## ⚖️ 6. Mengedit Halaman Hukum (`Halaman Hukum`)

Untuk keperluan legalitas, kredibilitas, dan perlindungan privasi data pengunjung, website menyediakan dua dokumen resmi:
1. **Kebijakan Privasi (`kebijakan-privasi`)**
2. **Syarat & Ketentuan (`syarat-ketentuan`)**

### Cara Mengedit:
1. Masuk ke menu **Halaman Hukum**, lalu klik tombol **Edit / Ubah** pada baris dokumen yang ingin diperbarui.
2. Anda akan menemukan editor tulisan (*Rich Editor*) yang mudah digunakan seperti Microsoft Word:
   - Gunakan **Heading 2** atau **Heading 3** untuk judul pasal/bab.
   - Gunakan format **Tebal (Bold)** atau *Miring (Italic)* untuk penekanan kalimat.
   - Gunakan tombol **Daftar Poin (Bullet)** untuk rincian pasal.
3. Ubah **Keterangan Pembaruan** (misal: *"Oktober 2026"*).
4. Klik **Simpan Perubahan**.

> [!NOTE]
> Sistem dilengkapi proteksi keamanan otomatis (*HTML Purifier*). Seluruh format penulisan yang Anda buat akan otomatis disaring agar aman dari serangan virus atau kode berbahaya internet tanpa merusak kerapian tata letak tulisan.

---

## 🏬 7. Mengelola Data Operasional & Kios Pedagang

Selain teks tampilan halaman, Anda juga mengelola data transaksi informasi sehari-hari:

### A. Kios & Stan Pedagang (`Kios & Stan`)
* **Tambah Kios Baru:** Masukkan nama kios, nomor blok/unit (misal: *Blok A No. 12*), pilih kategori dan lantai.
* **Jam Operasional Kios:** Masukkan jam buka dan jam tutup kios (misal: 09:00 - 18:00 WITA).
* **Nomor WhatsApp Pedagang:** Masukkan nomor WhatsApp pemilik kios (bisa diawali `08...` atau `628...`). Sistem otomatis membuatkan tombol chat langsung ke penjual tersebut di website publik!
* **Foto Kios:** Unggah foto tampak depan stan kios (rekomendasi rasio foto 4:3).
* **Tandai Kios Unggulan:** Centang *"Unggulan (Featured)"* agar kios tersebut muncul di baris teratas halaman Beranda.

### B. Fasilitas Mall (`Fasilitas Umum`)
* Atur data fasilitas seperti Toilet Bersih, Musholla Al-Ikhlas, ATM Center, Area Parkir Luas, Pos Keamanan, dan Titik Penjemputan Online.
* Tuliskan lantai lokasi fasilitas dan petunjuk arah ringkas bagi pengunjung.

### C. Agenda Kegiatan & Pameran (`Agenda & Promo`)
* Tambahkan informasi festival, diskon akhir tahun pedagang, atau pameran seni budaya Dayak.
* Masukkan tanggal mulai, tanggal selesai, lokasi acara, ringkasan, dan unggah banner promosi berukuran memanjang (rasio 16:9).

### D. Pesan Masuk Pengunjung (`Pesan Pengunjung`)
* Pengunjung yang mengisi formulir di halaman Kontak akan otomatis tercatat di menu ini.
* Anda dapat membaca nama lengkap, email, nomor telepon pengunjung, serta pokok pesan yang disampaikan, lalu menandai status pesan apakah sudah dibalas atau belum.

### E. Pengaturan Kontak Resmi Mall (`Pengaturan Mall`)
* Atur nomor resmi pengelola:
  - **Jam Buka Mall:** Misal *"Setiap Hari (Senin - Minggu) 09:00 - 21:00 WITA"*.
  - **Hotline WhatsApp Pengelola:** Nomor layanan informasi kantor mall.
  - **Telepon Pos Keamanan:** Nomor darurat pos sekuriti plaza.
  - **Alamat Kantor:** Alamat fisik pengelola di Balikpapan.
  - **Tautan Google Maps:** Tautan pin lokasi resmi Google Maps.

---

## 🚀 8. Tombol "Terbitkan Perubahan ke Website"

Di pojok kanan atas halaman **Teks & Gambar Web**, Anda akan menemukan tombol berwarna merah marun bertuliskan:  
👉 **"Terbitkan Perubahan ke Website"**

### Kapan Tombol Ini Perlu Ditekan?
1. **Perubahan Teks, Foto, Kios, & Agenda SEHARI-HARI:**  
   ➡️ **Langsung tampil otomatis!** Pengunjung yang membuka website akan langsung melihat data terbaru saat memuat halaman tanpa Anda perlu menekan tombol ini.
2. **Perubahan Judul Mesin Pencari (Google SEO Meta Tags) & Snapshot Statis:**  
   ➡️ Jika Anda baru saja memperbarui judul/deskripsi mesin pencari Google pada tab **SEO Meta Tag**, tekan tombol ini.
3. **Cara Menggunakan:**
   - Klik tombol **"Terbitkan Perubahan ke Website"**.
   - Akan muncul jendela konfirmasi: *"Apakah Anda yakin ingin menerbitkan perubahan ke hosting publik?"*.
   - Klik **"Ya, Terbitkan Sekarang"**.
   - Sistem akan mengirimkan sinyal ke server hosting (Netlify) untuk menyegarkan file website statis dalam 1–2 menit.

---

## ⛔ 9. Apa yang TIDAK BISA Diubah dari Dashboard Admin?

Untuk menjaga estetika, kecepatan performa, dan integritas identitas merek Plaza Kebun Sayur yang telah dirancang secara profesional, hal-hal berikut **tetap terkunci di dalam kode sistem** dan tidak dapat diubah dari dashboard:
1. **Warna Dasar Desain:** Warna merah marun khas Kebun Sayur (`#8B1A1A`), warna emas aksen, dan warna latar kanvas alami.
2. **Tata Letak (Layout) Halaman:** Penempatan grid kios 4 kolom, tata letak menu samping, dan animasi kartu.
3. **Jenis Huruf (Font):** Kombinasi tipografi profesional yang sudah dioptimasi untuk keterbacaan di layar ponsel kecil.
4. **Pembuatan Rute/Halaman Baru di Luar Sistem:** Menambahkan URL baru yang sebelumnya tidak pernah ada di website.

*(Jika pengelola mall memiliki kebutuhan perubahan tata letak atau penambahan fitur baru di masa mendatang, silakan berkonsultasi dengan tim developer).*

---

## ❓ 10. Pertanyaan yang Sering Diajukan (FAQ)

**T: Apa yang terjadi jika koneksi backend atau server admin sedang mati?**  
*J: Website publik Plaza Kebun Sayur dirancang sangat tangguh dengan sistem pencadangan otomatis (Offline Fallback). Jika server admin tidak terhubung, website publik tetap dapat diakses normal 100% oleh masyarakat umum menggunakan data cadangan bawaan.*

**T: Saya mengunggah foto tetapi ukurannya terlalu besar dari kamera ponsel?**  
*J: Sistem mendukung foto asli hingga ukuran 5 MB per berkas. Sistem kami akan otomatis mengecilkan dan mengonversi foto Anda ke format WebP super ringan.*

**T: Bagaimana cara menghapus teks atau foto yang salah diinput?**  
*J: Cukup kosongkan kolom teks tersebut lalu klik Simpan. Sistem akan otomatis memulihkan kalimat bawaan resmi yang telah disediakan oleh pengelola.*
