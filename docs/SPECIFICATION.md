# 📋 Specification: Plaza Kebun Sayur Web (Hybrid Company Profile & Business Directory)

> **Document Type:** System & Feature Specification (Spec-Driven Development)  
> **Status:** Draft for Review (Phase 1: Specify - Revision 5)  
> **Project:** `plazakebunsayur-web`  
> **Target Date:** Oktober 2026  
> **Dokumen Terkait:** `DESIGN.md` (aturan visual; menang atas dokumen ini untuk semua aspek visual), `CMS_EDITABLE_CONTENT_PLAN.md` (arsitektur CMS menyeluruh)  

---

## 1. Assumptions & Baseline Context

Sebelum spesifikasi ini dijalankan, berikut asumsi dasar yang disepakati:
1. **Target Pengguna:** Wisatawan lokal/luar Balikpapan (mengakses via smartphone 4G/3G) dan pengelola mall (desktop admin).
2. **Karier, Kemitraan, & Hubungan Investor:** Ditunda seluruhnya ke Fase 2. Profil manajemen disematkan ringkas pada halaman Panduan Kunjungan / Beranda.
3. **Pemisahan Belanja vs Kuliner:** Ditangani melalui kolom `type` pada tabel `categories`, sehingga kios mewarisi klasifikasinya dari kategori bisnis masing-masing.
4. **Pesan Kontak:** Model `SpaceEnquiry` (sewa kios) digantikan sepenuhnya oleh model `ContactMessage` (pesan umum pengunjung + hotline resmi).
5. **Identitas Visual:** Marun (`#8B1A1A`) adalah identitas Bunsay dan sudah final. Seluruh token, tipografi, komponen, dan aturan visual didefinisikan di `DESIGN.md`. Untuk aspek visual, `DESIGN.md` menang atas dokumen ini.
6. **Mock Data:** Murni hanya aktif pada environment development lokal saat menjalankan `npm run dev` (`import.meta.env.DEV === true`). Pada build produksi (`npm run build`), flag `import.meta.env.DEV` otomatis bernilai `false` dan aplikasi **wajib** mengonsumsi REST API nyata; tidak ada toleransi data mock di produksi.
7. **Arsitektur Frontend:** Clean-slate rewrite untuk komponen halaman publik guna memastikan hierarki tampilan baru yang segar, rapi, dan modular.
8. **Arsip Lama:** Folder `Insos_Bunsay` tetap merupakan arsip read-only dan tidak disentuh.
9. **Konten Situs Dinamis & CMS Menyeluruh:** Seluruh teks publik, foto aset, daftar dinamis (rute akses, tips belanja, tata tertib), menu navigasi (navbar header & footer), dan dokumen hukum (Kebijakan Privasi, Syarat Ketentuan) dapat diedit sepenuhnya oleh pengelola mall non-IT lewat panel Filament Admin (`/admin`). Kode frontend mempertahankan nilai bawaan (fallback hardcoded) di setiap komponen sehingga situs tetap tampil normal tanpa regresi visual jika backend offline.
10. **Klaim Faktual:** Status cagar budaya, jumlah kios, dan narasi sejarah hanya boleh tampil setelah dikonfirmasi pengelola. Sebelum itu, jangan ditampilkan.

---

## 2. Objective & Value Proposition

Membangun website modern hybrid **Company Profile & Commercial Business Directory** untuk **Plaza Kebun Sayur Balikpapan** (Pasar Inpres Kebun Sayur). Website ini mempromosikan sentra batu mulia/akik, perhiasan emas & perak, kerajinan etnik suku Dayak Kenyah, batik khas Balikpapan, cinderamata Kaltim, dan sentra kuliner khas, serta menghubungkan pengunjung langsung ke pedagang melalui **Direct WhatsApp Click-to-Chat**.

### Kebutuhan Pengguna (User Stories)
* **Wisatawan / Pengunjung:**
  * Dapat mencari kios cinderamata atau sentra kuliner berdasarkan kata kunci, kategori, dan lantai lengkap dengan penomoran halaman (pagination).
  * Dapat membuka halaman detail profil kios dan langsung mengklik tombol chat WhatsApp untuk bertanya ketersediaan barang atau harga.
  * Dapat membaca panduan informatif kunjungan (jam operasional terstruktur, rute dari bandara/pelabuhan, fasilitas ATM/Musholla/Toilet, tips belanja batu/cinderamata).
  * Dapat melihat agenda pameran budaya, bazar, atau promo terkini di mall.
  * Dapat mengirimkan pertanyaan umum atau masukan melalui formulir kontak resmi.
* **Pengelola Mall (Admin):**
  * Dapat mengelola data kios, kategori, lantai, fasilitas, dan agenda acara secara mandiri melalui Admin Panel GUI (Filament v5).
  * Dapat membaca dan mengelola status pesan masuk dari pengunjung.
  * Dapat mengubah informasi operasional (jam buka mall, hotline WhatsApp, telepon keamanan, alamat kantor) tanpa bantuan developer.

---

## 3. Desain Visual

Seluruh aturan visual (token warna, tipografi, bentuk, komponen, copywriting, larangan tampilan generik, dan checklist penerimaan) didefinisikan di **`DESIGN.md`**. Untuk aspek visual, `DESIGN.md` menang atas dokumen ini. Bagian ini hanya memuat catatan layout per halaman dan kriteria sukses visual. Bila ada perbedaan, ikuti `DESIGN.md`.

Referensi: `style-references/YasMall` untuk pola struktur direktori, dan prinsip disiplin visual dari anthropic.com. Hanya prinsip dan keputusan yang diadopsi, bukan kode, teks, aset, atau warna.

### A. Catatan Layout per Halaman
* **Beranda (`/`):** Hero (slider foto gedung, tombol jeda terlihat) → Tiga kartu aksi (Belanja dominan, Kuliner, Panduan Kunjungan) → Sorotan Kios Belanja → Sorotan Kuliner → Agenda Terkini → Informasi Lokasi & Peta → Footer. Ringkasan sejarah hanya sebagai blok teks faktual, dan hanya setelah dikonfirmasi pengelola.
* **Direktori Belanja (`/belanja`):** Header Halaman → Pencarian & Filter Lantai → Kategori (kapsul, `type=retail`) → Grid Kios (12 per halaman) → Pagination.
* **Detail Kios Belanja (`/belanja/:slug`):** Breadcrumb → Foto Kios (4:3) → Identitas (Nama, Kategori, Lantai, Unit) → Jam Buka & Status (hanya bila data tersedia) → Deskripsi → Tombol "Chat Penjual" → Lokasi (lantai dan unit, berupa teks).
* **Direktori Kuliner (`/kuliner`):** Header Sentra Kuliner → Pencarian & Filter Kategori (kapsul, `type=culinary`) → Grid Kios Kuliner (12 per halaman) → Pagination.
* **Detail Kios Kuliner (`/kuliner/:slug`):** Struktur identik dengan detail belanja.
* **Agenda (`/agenda`):** Daftar berupa baris dengan kolom tanggal, bukan grid kartu.
* **Detail Agenda (`/agenda/:slug`):** Banner 16:9 (bila ada), rentang tanggal, teks lengkap, lokasi acara.
* **Panduan Kunjungan (`/panduan-kunjungan`):** Halaman bacaan: Jam Buka Mall (dari `site_settings`), Akses (dari Bandara Sepinggan dan Pelabuhan Semayang), Tips Belanja, Tata Tertib (teks dari `src/content/`), dan Fasilitas (dari API).
* **Kontak (`/kontak`):** Informasi pengelola (dari `site_settings`) di satu kolom dan formulir pesan di kolom lain.
* **Not Found (`*`):** Pesan singkat dan tombol kembali ke Beranda atau Direktori Belanja.

### B. Kriteria Sukses Visual
* **Review Screenshot Wajib:** Setiap irisan (slice) implementasi visual diverifikasi pada dua breakpoint: `360px` (ponsel) dan `1024px` (desktop).
* **Zero Horizontal Scroll:** Tidak ada elemen yang meluap ke luar lebar layar pada 360px.
* **Touch Target:** Seluruh tombol, kapsul filter, dan tautan navigasi mobile berukuran minimal `44 x 44 px`.
* **Kontras Aksesibilitas:** Teks minimal 4,5:1 (WCAG AA); batas komponen UI seperti input minimal 3:1. Nilai terverifikasi ada di `DESIGN.md`.
* **Checklist Penerimaan:** Setiap irisan lolos checklist "Sebelum Hasil Diterima" di `DESIGN.md`.

---

## 4. Tech Stack & Keputusan Versi

| Layer | Pilihan Teknologi | Versi Terpilih | Bukti & Alasan Pemilihan |
| :--- | :--- | :--- | :--- |
| **Backend Framework** | Laravel Framework | **13.33.0** (`^13.17`) | Sudah aktif terpasang di environment (`composer.json`) bersama PHP 8.5.4; stabil, cepat, dan modern. |
| **Admin Panel (CMS)** | Filament | **v5.x** | Filament v5 mendukung Livewire 4 dan Laravel 12/13 menurut manifest paketnya. **Verifikasi saat instalasi:** pastikan `composer require filament/filament:^5.0` lolos tanpa konflik di Laravel 13, lalu kunci versi di `composer.lock`. |
| **PHP Runtime** | PHP CLI | **8.5.4** | Runtime native aktif di host environment. |
| **Frontend Framework** | React | **19.2.8** | Komponen reaktif modern dengan rendering performan. |
| **Frontend Tooling** | Vite | **8.3.0** | Bundling kilat dengan Hot Module Replacement. |
| **Styling** | Tailwind CSS | **v4.3.3** | Engine CSS performan tinggi via `@tailwindcss/vite` berbasis `@theme`. |
| **Routing** | React Router | **v7.18.4** | Navigasi multi-page client-side yang stabil. |
| **Icons** | Lucide React | **v1.48.0** | Set ikon modern dan ringan. |
| **Database** | SQLite / MySQL | - | SQLite untuk pengembangan lokal instan, siap switch ke MySQL di production. |

Versi di tabel dibaca dari `composer.json` dan `package.json` proyek. Bila manifest berbeda, manifest yang benar.

---

## 5. Commands

### Frontend (`frontend/`)
```bash
# Menjalankan server development lokal (Mock data aktif jika VITE_USE_MOCK=true)
npm run dev

# Membangun bundle produksi (Murni mengonsumsi live API, mock otomatis mati)
npm run build

# Menjalankan pemeriksaan linter
npm run lint

# Preview hasil build produksi secara lokal
npm run preview
```

### Backend (`backend/`)
```bash
# Menjalankan API server (Windows/WSL wrapper)
.\artisan.bat serve --port=8000

# Menjalankan migrasi database
.\artisan.bat migrate

# Mengisi data awal produksi (kategori, lantai, fasilitas, pengaturan situs)
.\artisan.bat db:seed

# Mengisi data demo (HANYA lokal; dilarang dijalankan di produksi)
.\artisan.bat db:seed --class=DemoSeeder

# Menghubungkan storage publik untuk media upload
.\artisan.bat storage:link

# Menjalankan pengujian backend
php artisan test
```

---

## 6. Site & Route Structure (10 Rute Lengkap)

Website publik terdiri dari **9 rute konten publik + 1 rute 404**:

```
1.  /                         → Beranda (Company Profile, Hero, Highlights, Sejarah, Quick Access)
2.  /belanja                  → Direktori Belanja (Kios Batu Mulia, Dayak, Batik, Emas; Search & Filter)
3.  /belanja/:slug            → Detail Profil Kios Belanja (Hanya tipe 'retail')
4.  /kuliner                  → Direktori Sentra Kuliner (Kios Makanan & Minuman Khas; Search & Filter)
5.  /kuliner/:slug            → Detail Profil Kios Kuliner (Hanya tipe 'culinary')
6.  /agenda                   → Daftar Agenda Pameran, Event Budaya, & Promo
7.  /agenda/:slug             → Detail Informasi Agenda
8.  /panduan-kunjungan        → Panduan Wisata & Fasilitas Mall Lengkap
9.  /kontak                   → Informasi Kontak Manajemen Mall & Formulir Pesan Pengunjung
10. *                         → Halaman 404 (Not Found)
```

### Aturan Slug Lintas Tipe (`/belanja/:slug` vs `/kuliner/:slug`)
* **Unique Slug Constraint:** Seluruh `slug` pada tabel `tenants` bersifat **unik secara global** di level database.
* **Type Validation & Auto-Redirect (Replace):**
  * Jika pengguna membuka `/belanja/:slug` namun kios tersebut memiliki kategori bertipe `culinary`, sistem secara otomatis mengalihkan navigasi menggunakan **client replace** (`navigate('/kuliner/' + slug, { replace: true })`) agar riwayat browser tidak menumpuk.
  * Jika pengguna membuka `/kuliner/:slug` namun kios tersebut bertipe `retail`, sistem secara otomatis mengalihkan menggunakan client replace ke `/belanja/:slug`.
  * Jika slug tidak ditemukan sama sekali di database, render halaman 404 (Not Found).

---

## 7. Project & Directory Structure

Struktur direktori proyek setelah clean-slate rewrite:

```
plazakebunsayur-web/
├── docs/
│   ├── SPECIFICATION.md     # Dokumen spesifikasi SDD ini (Rev. 5)
│   ├── DESIGN.md            # Aturan visual (menang atas dokumen ini); sesuaikan path dengan lokasi sebenarnya
│   ├── ARCHITECTURE.md      # Catatan arsitektur & keputusan teknis
│   ├── CMS_EDITABLE_CONTENT_PLAN.md # Blueprint implementasi CMS dinamis
│   ├── PANDUAN_ADMIN.md     # Panduan penggunaan dashboard Filament untuk pengelola non-IT
│   └── DEMO_PUBLISH.md      # Panduan demo & arsitektur deployment Netlify + DDEV
├── backend/
│   ├── app/
│   │   ├── Filament/Resources/
│   │   │   ├── CategoryResource.php
│   │   │   ├── FloorResource.php
│   │   │   ├── TenantResource.php
│   │   │   ├── FacilityResource.php
│   │   │   ├── WhatsOnResource.php
│   │   │   ├── ContactMessageResource.php
│   │   │   ├── SiteSettingResource.php
│   │   │   ├── PageContents/
│   │   │   │   └── PageContentResource.php # Key-value text & image editor per grup
│   │   │   ├── AccessRoutes/
│   │   │   │   └── AccessRouteResource.php # Manajemen rute panduan kunjungan
│   │   │   ├── ShoppingTips/
│   │   │   │   └── ShoppingTipResource.php # Tips berbelanja batu akik & kerajinan
│   │   │   ├── BuildingRules/
│   │   │   │   └── BuildingRuleResource.php # Tata tertib gedung mall
│   │   │   ├── NavItems/
│   │   │   │   └── NavItemResource.php     # Manajemen menu header & link footer
│   │   │   └── LegalPages/
│   │   │       └── LegalPageResource.php   # Rich-editor halaman privasi & syarat ketentuan
│   │   ├── Http/Controllers/Api/
│   │   │   ├── CategoryController.php
│   │   │   ├── TenantController.php
│   │   │   ├── FacilityController.php
│   │   │   ├── WhatsOnController.php
│   │   │   ├── ContactController.php
│   │   │   ├── SiteSettingController.php
│   │   │   ├── PageContentController.php   # Endpoint GET /api/page-contents
│   │   │   ├── VisitGuideController.php    # Endpoint GET /api/visit-guide
│   │   │   ├── NavItemController.php       # Endpoint GET /api/nav-items
│   │   │   └── LegalPageController.php     # Endpoint GET /api/legal-pages/{slug}
│   │   └── Models/
│   │       ├── Category.php     # Ditambah kolom `type` ('retail', 'culinary')
│   │       ├── Floor.php
│   │       ├── Tenant.php       # Structured hours, image_path, logo_path
│   │       ├── Facility.php
│   │       ├── WhatsOn.php      # banner_image_path
│   │       ├── ContactMessage.php
│   │       ├── SiteSetting.php
│   │       ├── PageContent.php  # Key-value dictionary dengan defaults
│   │       ├── AccessRoute.php
│   │       ├── ShoppingTip.php
│   │       ├── BuildingRule.php
│   │       ├── NavItem.php
│   │       └── LegalPage.php    # Sanitasi HTMLPurifier XSS guard
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/             # DatabaseSeeder, PageContentSeeder, VisitGuideSeeder, NavItemSeeder, LegalPageSeeder
│   ├── routes/
│   │   └── api.php
│   ├── artisan.bat
│   └── composer.json
└── frontend/
    ├── public/
    │   ├── assets/              # Logo resmi, foto fasad gedung asli
    │   └── _redirects           # Aturan SPA routing fallback hosting
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── layout/          # Navbar.jsx, Footer.jsx, PageHeader.jsx, Container.jsx
    │   │   ├── directory/       # TenantCard.jsx, CategoryFilter.jsx, FloorFilter.jsx, SearchBar.jsx, Pagination.jsx
    │   │   ├── ui/              # Button.jsx, Badge.jsx, Input.jsx, Modal.jsx, Alert.jsx, SkeletonCard.jsx
    │   │   └── home/            # HeroSection.jsx, FeaturedSection.jsx, HistorySection.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── ShoppingDirectory.jsx
    │   │   ├── ShopDetail.jsx
    │   │   ├── CulinaryDirectory.jsx
    │   │   ├── CulinaryDetail.jsx
    │   │   ├── EventsPage.jsx
    │   │   ├── EventDetail.jsx
    │   │   ├── PlanYourVisit.jsx
    │   │   ├── ContactPage.jsx
    │   │   ├── PrivacyPolicy.jsx  # Rich-text render dengan fallback
    │   │   ├── TermsConditions.jsx # Rich-text render dengan fallback
    │   │   └── NotFound.jsx
    │   ├── context/
    │   │   ├── contentContextInstance.js # Dedicated instance (Fast-refresh safe)
    │   │   └── ContentContext.jsx       # ContentProvider & fetch orchestration
    │   ├── hooks/
    │   │   ├── useContent.js            # useContent, useContentImage, useNavItems
    │   │   └── useDocumentMeta.js       # Runtime dynamic page title & meta description
    │   ├── services/
    │   │   └── api.js           # Fetch API wrapper + strict dev mock isolation + ngrok header
    │   ├── data/
    │   │   └── mockData.js      # Dataset lokal hanya untuk npm run dev
    │   ├── content/
    │   │   └── visitGuide.js    # Fallback lokal Panduan Kunjungan (rute akses, tips, tata tertib)
    │   ├── utils/
    │   │   └── whatsapp.js      # Generator tautan WhatsApp terformat
    │   ├── App.jsx              # React Router setup, ContentProvider wrapper, & scroll restoration
    │   ├── main.jsx
    │   └── index.css            # Tailwind v4 configuration (@theme tokens)
    ├── scripts/
    │   └── prerender.js         # Build-time SSG script dengan integrasi CMS meta injection
    ├── package.json
    └── vite.config.js
```

---

## 8. Skema Data & Pengolahan Gambar

### A. Skema Database

#### 1. Tabel `categories`
* `id`: BIGINT (PK)
* `name`: VARCHAR(255)
* `slug`: VARCHAR(255) (Unique)
* `type`: ENUM(`'retail'`, `'culinary'`), default: `'retail'`
* `icon_name`: VARCHAR(50), nullable
* `order_index`: INTEGER, default: 0
* Timestamps

#### 2. Tabel `floors`
* `id`: BIGINT (PK)
* `name`: VARCHAR(50) (misal: "Lantai Dasar (GF)", "Lantai 1", "Lantai 2")
* `code`: VARCHAR(10) (GF, L1, L2)
* `order_index`: INTEGER
* Timestamps

#### 3. Tabel `tenants`
* `id`: BIGINT (PK)
* `category_id`: BIGINT (FK ke `categories`)
* `floor_id`: BIGINT (FK ke `floors`)
* `name`: VARCHAR(255)
* `slug`: VARCHAR(255) (Unique)
* `unit_number`: VARCHAR(50) (misal: "Blok A No. 12")
* `description`: TEXT, nullable
* `phone_whatsapp`: VARCHAR(50)
* `instagram`: VARCHAR(100), nullable
* **`opening_time`**: TIME, nullable, tanpa nilai default (kosong bila data belum ada)
* **`closing_time`**: TIME, nullable, tanpa nilai default
* **`days_open`**: VARCHAR(100), nullable, tanpa nilai default (teks tampilan, misalnya "Setiap hari"; tidak dipakai untuk menghitung status)
* *Aturan jam buka:* status buka/tutup hanya dihitung bila `opening_time` dan `closing_time` terisi, memakai zona waktu `Asia/Makassar` (WITA), bukan jam perangkat pengunjung. Bila kosong, tampilkan "Jam buka belum tersedia".
* **`image_path`**: VARCHAR(255), nullable (Foto etalase/depan kios)
* **`logo_path`**: VARCHAR(255), nullable (Logo kios jika ada)
* `is_featured`: BOOLEAN, default: false
* `is_active`: BOOLEAN, default: true
* Timestamps

#### 4. Tabel `facilities`
* `id`: BIGINT (PK)
* `name`: VARCHAR(255)
* `icon_name`: VARCHAR(50)
* `location_note`: VARCHAR(255)
* `description`: TEXT, nullable
* `is_active`: BOOLEAN, default: true
* `order_index`: INTEGER
* Timestamps

#### 5. Tabel `whats_on`
* `id`: BIGINT (PK)
* `title`: VARCHAR(255)
* `slug`: VARCHAR(255) (Unique)
* `type`: ENUM(`'event'`, `'promo'`)
* `start_date`: DATE
* `end_date`: DATE, nullable
* **`banner_image_path`**: VARCHAR(255), nullable
* `summary`: TEXT
* `content`: TEXT
* `is_active`: BOOLEAN, default: true
* Timestamps

#### 6. Tabel `contact_messages` (Pengganti `space_enquiries`)
* `id`: BIGINT (PK)
* `full_name`: VARCHAR(255)
* `email`: VARCHAR(255), nullable
* `phone_number`: VARCHAR(50)
* `subject`: VARCHAR(255)
* `message`: TEXT
* `status`: ENUM(`'unread'`, `'read'`, `'responded'`), default: `'unread'`
* Timestamps

#### 7. Tabel `site_settings`
* `id`: BIGINT (PK)
* `key`: VARCHAR(100) (Unique)
* `value`: TEXT, nullable
* Timestamps
* Kunci operasional: `mall_opening_hours`, `management_whatsapp`, `security_phone`, `office_address`, `management_email`, `maps_url`.

#### 8. Tabel `page_contents` (CMS Konten Dinamis - Tingkat 1)
* `id`: BIGINT (PK)
* `key`: VARCHAR(100) (Unique, misal: `home.hero.title`, `brand.logo`)
* `value`: TEXT, nullable (teks, markdown, atau path relatif storage gambar)
* `type`: ENUM(`'text'`, `'textarea'`, `'image'`, `'url'`), default: `'text'`
* `group`: VARCHAR(50) (Pengelompokan tab form: `home`, `page_headers`, `footer`, `plan_visit`, `assets`, `seo`)
* `label`: VARCHAR(255) (Label ramah pengguna di form Filament)
* `help`: VARCHAR(255), nullable (Petunjuk & rekomendasi dimensi/karakter)
* `order_index`: INTEGER, default: 0
* Timestamps
* *Catatan:* Dikelola melalui custom page Filament dengan dictionary default lengkap di model `PageContent::defaults()`. Jika key kosong di DB, sistem otomatis merender default fallback hardcoded.

#### 9. Tabel `access_routes` (Panduan Akses Menuju Mall)
* `id`: BIGINT (PK)
* `title`: VARCHAR(255) (Contoh: "Dari Bandara SAMS Sepinggan (BPN)")
* `distance`: VARCHAR(100), nullable (Contoh: "±12 km · 25–35 menit")
* `description`: TEXT (Instruksi moda transportasi & rute)
* `order_index`: INTEGER, default: 0
* `is_active`: BOOLEAN, default: true
* Timestamps

#### 10. Tabel `shopping_tips` (Tips Belanja Cinderamata & Batu Akik)
* `id`: BIGINT (PK)
* `title`: VARCHAR(255)
* `description`: TEXT
* `order_index`: INTEGER, default: 0
* `is_active`: BOOLEAN, default: true
* Timestamps

#### 11. Tabel `building_rules` (Tata Tertib & Kenyamanan Mall)
* `id`: BIGINT (PK)
* `title`: VARCHAR(255)
* `description`: TEXT
* `order_index`: INTEGER, default: 0
* `is_active`: BOOLEAN, default: true
* Timestamps

#### 12. Tabel `nav_items` (Menu Header & Link Footer)
* `id`: BIGINT (PK)
* `label`: VARCHAR(100)
* `path`: VARCHAR(255) (Path internal misal `/belanja` atau URL eksternal)
* `location`: ENUM(`'header'`, `'footer'`), default: `'header'`
* `is_external`: BOOLEAN, default: false
* `order_index`: INTEGER, default: 0
* `is_active`: BOOLEAN, default: true
* `is_cta`: BOOLEAN, default: false (Penanda tombol sorot/CTA)
* Timestamps

#### 13. Tabel `legal_pages` (Dokumen Hukum Kebijakan Privasi & Syarat Ketentuan)
* `id`: BIGINT (PK)
* `slug`: VARCHAR(100) (Unique: `kebijakan-privasi`, `syarat-ketentuan`)
* `title`: VARCHAR(255)
* `intro`: TEXT, nullable
* `body`: LONGTEXT (Konten HTML dari RichEditor, wajib disanitasi HTMLPurifier)
* `updated_label`: VARCHAR(100), nullable (Contoh: "Oktober 2026")
* Timestamps
* *Keamanan:* Sanitasi mutator model membersihkan tag berbahaya (`<script>`, inline `on*` events, javascript URLs).

---

### B. Pengolahan Gambar saat Unggah & Kriteria Performa

1. **Pipeline Unggah & Pemotongan (Backend / Filament Form):**
   * **Batas Maksimal Berkas Mentah:** Dinaikkan menjadi **10 MB** (mengakomodasi jepretan kamera smartphone resolusi tinggi oleh admin). Konfigurasi PHP di hosting (`upload_max_filesize`, `post_max_size`) harus dinaikkan sesuai, karena nilai bawaan PHP lebih kecil dari 10 MB. `maxSize` pada form upload Filament disetel sama.
   * **Format Input:** `jpg`, `jpeg`, `png`, `webp`.
   * **Dependensi Pemrosesan:** Paket **`intervention/image` v3** (`composer require intervention/image`) dengan driver native PHP 8.5 **GD** (`ext-gd`) atau **Imagick**.
   * **Pemotongan Proporsional (Cropping 4:3):**
     * Foto Kios (`tenants.image_path`): Dipotong dan diubah ukurannya menggunakan crop tengah rasio 4:3 (`$image->cover(800, 600)`), lalu dikonversi ke format **WebP** dengan kualitas kompresi 82% (`$image->toWebp(82)`). Ukuran target berkas hasil olah: `< 150 KB`.
     * Banner Agenda (`whats_on.banner_image_path`): Dipotong rasio 16:9 (`$image->cover(1600, 900)`), dikonversi ke format **WebP** kualitas 80% (`$image->toWebp(80)`). Ukuran target berkas: `< 350 KB`.
     * Menghapus seluruh metadata EXIF kamera untuk keamanan privasi dan penghematan byte.
2. **Kriteria Performa Frontend:**
   * Seluruh tag gambar `<img>` wajib menyertakan atribut `loading="lazy"` dan `decoding="async"`, kecuali foto hero LCP di Beranda.
   * Kontainer gambar memiliki kelas aspect ratio eksplisit (`aspect-[4/3]` untuk kartu kios, `aspect-[16/9]` untuk banner) guna menghindari *Cumulative Layout Shift* (CLS < 0.1).

---

## 9. Kontrak API Publik (REST Endpoints)

Seluruh respons dibungkus dalam format standar JSON:
```json
{
  "success": true,
  "data": ...,
  "message": "Opsional"
}
```

### 1. `GET /api/categories`
* **Query Params:** `?type=retail|culinary`
* **Respons:** Array kategori terurut berdasarkan `order_index` beserta jumlah tenant aktif.

### 2. `GET /api/floors`
* **Respons:** Array data lantai (GF, L1, L2).

### 3. `GET /api/tenants` (Dengan Pagination & Filter)
* **Query Params:**
  * `type` (opsional): `'retail'` atau `'culinary'`
  * `category_id` (opsional): integer ID kategori
  * `category_slug` (opsional): string slug kategori
  * `floor_id` (opsional): integer ID lantai
  * `q` (opsional): string pencarian (nama kios, nomor unit, deskripsi)
  * `featured` (opsional): `1` untuk menampilkan tenant unggulan
  * `page` (opsional, default: 1): nomor halaman
  * `per_page` (opsional, default: 12, maksimum: 100): jumlah kios per halaman. Nilai di atas maksimum dipotong menjadi 100.
* **Respons:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Kios Contoh Batu Akik",
      "slug": "kios-contoh-batu-akik",
      "unit_number": "Blok A No. 12",
      "description": "Data contoh untuk demo. Bukan kios nyata.",
      "phone_whatsapp": "080000000000",
      "instagram": null,
      "opening_time": "09:00:00",
      "closing_time": "20:00:00",
      "days_open": "Setiap Hari (Senin - Minggu)",
      "image_url": "/storage/tenants/contoh.webp",
      "logo_url": null,
      "is_featured": true,
      "category": { "id": 1, "name": "Batu Mulia & Permata", "slug": "batu-mulia", "type": "retail" },
      "floor": { "id": 1, "name": "Lantai Dasar (GF)", "code": "GF" }
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 12,
    "total": 58
  }
}
```

### 4. `GET /api/tenants/{slug}`
* **Respons:** Data lengkap satu kios. Mengembalikan 404 jika slug tidak ditemukan.

### 5. `GET /api/facilities`
* **Respons:** Daftar 6 fasilitas umum aktif terurut berdasarkan `order_index`.

### 6. `GET /api/whats-on`
* **Query Params:** `?type=event|promo` (opsional)
* **Respons:** Daftar event & promo aktif terurut dari yang terbaru.

### 7. `GET /api/whats-on/{slug}`
* **Respons:** Detail lengkap agenda kegiatan / promo.

### 8. `POST /api/contact` (Pengiriman Pesan Pengunjung)
* **Rate Limiting:** Maksimal 5 permintaan per 10 menit per IP address.
* **Payload Request:**
```json
{
  "full_name": "Rian Pratama",
  "email": "rian@example.com",
  "phone_number": "080000000000",
  "subject": "Pertanyaan Jam Buka Hari Libur",
  "message": "Apakah saat hari libur nasional pasar tetap buka normal?",
  "bot_check": "" 
}
```
* *Catatan Keamanan:* Bidang `bot_check` adalah honeypot tersembunyi. Jika bidang ini terisi oleh bot spam, request langsung ditolak secara hening.
* **Respons (201 Created):**
```json
{
  "success": true,
  "message": "Pesan Anda berhasil dikirim. Tim pengelola akan segera menghubungi Anda."
}
```

### 9. `GET /api/site-settings`
* **Respons:** Objek key-value untuk kunci yang diizinkan (`mall_opening_hours`, `management_whatsapp`, `security_phone`, `office_address`, `management_email`, `maps_url`). Kunci selain itu tidak pernah dikembalikan.
```json
{
  "success": true,
  "data": { "mall_opening_hours": "...", "management_whatsapp": "...", "security_phone": "...", "office_address": "...", "management_email": "...", "maps_url": "..." }
}
```

### 10. `GET /api/page-contents` (Key-Value CMS Konten & Foto)
* **Respons:** Objek key-value seluruh konten teks dan URL gambar publik dari `page_contents` (hanya key yang terdaftar di dictionary `defaults()` yang diekspos). Gambar dikonversi ke URL storage publik absolut.
```json
{
  "success": true,
  "data": {
    "home.hero.title": "Sentra Batu Mulia, Etnik Dayak & Kerajinan Khas Kalimantan",
    "home.hero.image": "https://plazakebunsayur-backend.ddev.site/storage/page-contents/hero.webp",
    "brand.logo": "https://plazakebunsayur-backend.ddev.site/storage/page-contents/logo.webp",
    "footer.tagline": "Pusat Kerajinan, Permata & Kuliner Khas Kalimantan Timur"
  }
}
```

### 11. `GET /api/visit-guide` (Daftar Dinamis Panduan Kunjungan)
* **Respons:** Kumpulan tiga daftar terstruktur untuk halaman `/panduan-kunjungan` (`access_routes`, `shopping_tips`, `building_rules`), terurut berdasarkan `order_index` dengan filter `is_active = true`.
```json
{
  "success": true,
  "data": {
    "access_routes": [
      { "id": 1, "title": "Dari Bandara SAMS Sepinggan (BPN)", "distance": "±12 km · 25–35 menit", "description": "Taksi resmi bandara atau transportasi online..." }
    ],
    "shopping_tips": [
      { "id": 1, "title": "Pilih Kios Bereputasi & Minta Sertifikat", "description": "Pedagang batu permata terpercaya siap memberikan memo uji laboratorium..." }
    ],
    "building_rules": [
      { "id": 1, "title": "Kawasan Tertib & Bersih", "description": "Dilarang membuang sampah sembarangan dan menjaga kenyamanan bersama." }
    ]
  }
}
```

### 12. `GET /api/nav-items` (Menu Header & Link Footer)
* **Respons:** Navigasi dinamis terbagi atas `header` dan `footer`, hanya entri `is_active = true`, terurut berdasarkan `order_index`.
```json
{
  "success": true,
  "data": {
    "header": [
      { "id": 1, "label": "Beranda", "path": "/", "is_external": false, "is_cta": false },
      { "id": 2, "label": "Direktori Belanja", "path": "/belanja", "is_external": false, "is_cta": false }
    ],
    "footer": [
      { "id": 7, "label": "Direktori Belanja", "path": "/belanja", "is_external": false, "is_cta": false },
      { "id": 8, "label": "Kebijakan Privasi", "path": "/kebijakan-privasi", "is_external": false, "is_cta": false }
    ]
  }
}
```

### 13. `GET /api/legal-pages/{slug}` (Dokumen Hukum)
* **Parameter Slug:** `kebijakan-privasi` atau `syarat-ketentuan` (mengembalikan HTTP 404 jika tidak ditemukan).
* **Respons:** Konten HTML rich-text yang telah disanitasi bebas dari script berbahaya.
```json
{
  "success": true,
  "data": {
    "id": 1,
    "slug": "kebijakan-privasi",
    "title": "Kebijakan Privasi",
    "intro": "Plaza Kebun Sayur berkomitmen melindungi privasi pengunjung...",
    "body": "<h2>1. Informasi yang Kami Kumpulkan</h2><p>Kami hanya mengumpulkan informasi...</p>",
    "updated_label": "Oktober 2026"
  }
}
```

---

## 10. Code Style & Conventions

### A. Format Tautan WhatsApp (Standardized Helper)
Seluruh tombol chat WhatsApp wajib menggunakan helper terpusat `generateWhatsAppLink` di `src/utils/whatsapp.js`:
```javascript
export function generateWhatsAppLink(rawPhone, storeName) {
  if (!rawPhone) return '#';
  // Sanitasi nomor telepon ke format internasional Indonesia
  let cleanPhone = rawPhone.replace(/\D/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '62' + cleanPhone.slice(1);
  } else if (!cleanPhone.startsWith('62')) {
    cleanPhone = '62' + cleanPhone;
  }
  
  const text = `Halo ${storeName}, saya melihat profil toko Anda di Website Plaza Kebun Sayur dan ingin bertanya mengenai produk Anda.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
```

### B. Konvensi React & Tailwind v4
* **Komponen:** Functional components murni. Gunakan `useMemo` untuk komputasi filter daftar toko dan `useCallback` untuk event handler.
* **Clean Prop Types:** Destrukturisasi props secara aman dengan nilai default:
  ```jsx
  export function TenantCard({ tenant, onSelect }) {
    if (!tenant) return null;
    // ...
  }
  ```
* **Styling:** Hindari inline styles atau utility class sembarangan. Gunakan token semantik dari `@theme` (`bg-canvas`, `text-text-primary`, `border-border-subtle`, `bg-brand-primary`).

---

## 11. Alur Data Prerender & Aturan Hosting

### A. Alur Prerender (SEO)
1. **Sumber Data:** Script Node.js `scripts/prerender.js` memanggil `GET /api/tenants` secara berhalaman (`per_page=100`, ulangi sampai `last_page`) saat proses build untuk mengumpulkan seluruh slug kios aktif.
2. **Generasi Berkas:** Menghasilkan file statis `dist/belanja/:slug/index.html` dan `dist/kuliner/:slug/index.html` dengan HTML shell berisi `<title>`, meta description, dan Open Graph preview tags.
3. **Pemicu Build Ulang (Rebuild Triggers):**
   * **Webhook CMS:** Event `TenantSaved` / `TenantDeleted` di Filament dapat memicu Webhook URL deploy Netlify/Vercel.
   * **Nightly Scheduled Build:** Cron job CI/CD otomatis setiap pukul 02.00 WITA untuk memperbarui seluruh snapshot statis.
   * **Manual Trigger:** Tombol "Publikasikan Perubahan Web" di dashboard admin Filament.
4. **Usulan Penundaan:**
   > 💡 **Keputusan:** Implementasi skrip `prerender.js` **ditunda ke Irisan 2**. Pada Irisan 1, tim fokus menyelesaikan struktur multi-page, styling sistem desain Yas Mall, dan integrasi API fungsional.

### B. Aturan Hosting untuk Slug yang Belum Ter-build (SPA Fallback)
Untuk memastikan kios baru yang baru saja diinput admin langsung bisa diakses publik tanpa menunggu proses rebuild selesai:
* **Hosting Configuration (Netlify `_redirects` / Vercel `vercel.json`):**
  ```text
  # Netlify _redirects:
  /*    /index.html   200
  ```
* **Mekanisme Eksekusi:**
  1. Jika file statis `/belanja/:slug/index.html` sudah ada di hosting, server langsung menyajikannya (200 OK statis, super cepat untuk Googlebot).
  2. Jika file statis **belum dibuat** (kios baru), server melakukan rewrite ke `/index.html` (200 OK).
  3. React Router di browser membaca parameter `:slug` dari URL, menjalankan fetch client-side `GET /api/tenants/:slug` ke backend, dan merender profil toko secara dinamis tanpa jeda 404!
  4. Jika API mengonfirmasi kios tidak ditemukan di database, barulah React Router menampilkan komponen `NotFound` (404).

---

## 12. Testing Strategy

1. **Frontend Testing & Verification:**
   * **Linter:** `npm run lint` (`oxlint`) wajib menghasilkan zero error dan zero warnings.
   * **Build Check:** `npm run build` wajib selesai tanpa error kompilasi Vite dan menghasilkan bundle yang teroptimasi.
   * **Viewport Responsive Audit:** Pengujian tampilan wajib dilakukan pada dua ukuran layar:
     * `360px` (layar ponsel kecil): Verifikasi zero horizontal scrollbar dan kerapian drawer menu mobile.
     * `1024px` (layar desktop): Verifikasi kerapian grid direktori dan padding kontainer.
   * **Audit Performa Jaringan (4G Throttling):** Pengujian dengan simulasi jaringan 4G pada Chrome DevTools untuk memastikan LCP < 2.0 detik.
2. **Backend API Testing (PHPUnit / Pest):**
   * `test_can_fetch_categories_filtered_by_type`: Memastikan `GET /api/categories?type=retail` hanya mengembalikan kategori belanja.
   * `test_can_fetch_tenants_with_pagination`: Memastikan `GET /api/tenants?page=1&per_page=12` mengembalikan pagination metadata (`current_page`, `last_page`, `total`).
   * `test_contact_form_validation_and_rate_limiting`: Memastikan `POST /api/contact` memvalidasi input wajib dan memblokir request ke-6 dalam interval 10 menit (HTTP 429 Too Many Requests).
   * `test_image_upload_converts_to_webp_4_3`: Memastikan unggahan foto kios otomatis dipotong ke rasio 4:3 dan disimpan dalam format WebP.
   * `test_can_fetch_site_settings_whitelisted_keys`: Memastikan `GET /api/site-settings` hanya mengembalikan kunci yang diizinkan.
   * `test_production_seeder_has_no_demo_data`: Memastikan `DatabaseSeeder` tidak membuat kios, pedagang, atau nomor WhatsApp contoh.
   * `test_per_page_is_capped_at_100`: Memastikan `per_page=500` dipotong menjadi 100.

---

## 13. Boundaries (Guardrails)

* **ALWAYS (Selalu dilakukan):**
  * Utamakan tampilan responsif seluler (*Mobile-First*), lolos uji 360px dan 1024px per irisan.
  * Tautan WhatsApp terformat dengan kode negara Indonesia (`62`) menggunakan helper terpusat.
  * Terapkan konversi WebP dan crop 4:3 otomatis saat upload media.
  * Sanitasi dan batasi pengiriman pesan kontak (Rate Limit: 5 pesan / 10 menit per IP + Honeypot).
  * Matikan seluruh akses mock data pada build produksi.
  * Pisahkan data demo ke `DemoSeeder`; jangan panggil dari `DatabaseSeeder`.
* **ASK FIRST (Tanyakan terlebih dahulu):**
  * Mengunggah berkas gambar dengan ukuran mentah > 10 MB atau format selain JPG/PNG/WebP.
  * Mengubah skema tabel atau menambahkan kolom baru di luar yang telah ditentukan di spesifikasi ini.
  * Menambah library JavaScript eksternal yang melebihi ukuran bundle 50 KB.
  * Memindahkan penyimpanan media dari Laravel local public disk ke cloud storage eksternal (S3, Cloudinary).
* **NEVER (Dilarang keras):**
  * Mengutak-atik, menghapus, atau mengubah file di dalam folder arsip `Insos_Bunsay/`.
  * Menulis atau mengimplementasikan sistem pembayaran/kasir/Midtrans.
  * Memasukkan kredensial atau file `.env` produksi ke dalam version control git.
  * Mengizinkan kebocoran mock data ke lingkungan produksi.
  * Menjalankan `DemoSeeder` atau memasukkan kios, pedagang, atau nomor WhatsApp contoh ke database produksi.
  * Menyalin kode, teks, aset, atau warna dari situs referensi mana pun (Yas Mall, Anthropic, atau lainnya).
  * Menampilkan klaim faktual (status cagar budaya, jumlah kios, narasi sejarah) yang belum dikonfirmasi pengelola.

---

## 14. Success Criteria (Testable Acceptance)

1. [ ] **Verifikasi 10 Rute:** Seluruh 9 rute konten publik dan 1 rute 404 dapat diakses langsung via URL maupun navigasi internal tanpa error.
2. [ ] **Verifikasi Visual 360px & 1024px:** Setiap halaman lolos inspeksi screenshot pada lebar 360px (tanpa horizontal overflow, touch target ≥ 44 px) dan 1024px, serta lolos checklist penerimaan di `DESIGN.md`.
3. [ ] **Target Performa LCP:** Nilai LCP (Largest Contentful Paint) berada di bawah **2.0 detik** pada simulasi koneksi seluler 4G.
4. [ ] **Pemisahan Belanja vs Kuliner:** 
   * `/belanja` hanya menampilkan kategori & kios bertipe `retail`.
   * `/kuliner` hanya menampilkan kategori & kios bertipe `culinary`.
   * Akses silang tipe slug dialihkan otomatis via client replace ke URL yang sesuai.
5. [ ] **WhatsApp Click-to-Chat:** Tombol WhatsApp pada halaman detail membuka tautan `https://wa.me/62...` dengan pesan pembuka otomatis yang menyebutkan nama kios.
6. [ ] **Formulir Kontak Terproteksi:** Pengunjung dapat mengirim pesan melalui `/kontak`, tersimpan di tabel `contact_messages`, dan dibatasi oleh rate limiter (HTTP 429 setelah 5x kirim) serta terlindung honeypot.
7. [ ] **Admin Panel Filament v5:** Admin pengelola dapat login, melakukan CRUD pada Kios, Kategori, Fasilitas, Whats On, serta membaca Pesan Masuk.
8. [ ] **Optimasi Gambar Otomatis:** Foto kios yang diunggah terpotong rasio 4:3 dan banner agenda 16:9, keduanya tersimpan sebagai WebP dengan ukuran < 150 KB (kios) dan < 350 KB (banner).
9. [ ] **Isolasi Mock Data:** Pada build produksi (`npm run build`), web murni mengonsumsi API backend. Uji: `mockData.js` mengekspor konstanta penanda `MOCK_MARKER = '__MOCK_DATA_DEV_ONLY__'`, dan pencarian teks itu di folder `dist` setelah build tidak menemukan apa pun.
10. [ ] **SPA Hosting Fallback:** Kios baru yang belum ter-prerender tetap dapat dibuka secara langsung via URL melalui SPA fallback rewrite tanpa menampilkan halaman 404.
11. [x] **Konten Operasional dari Admin:** Admin dapat mengubah jam buka mall, hotline WhatsApp, telepon keamanan, dan alamat kantor lewat Filament, dan perubahannya muncul di halaman Kontak dan Panduan Kunjungan tanpa deploy ulang frontend.
12. [x] **Data Demo Terisolasi di Backend:** Database yang diisi dengan `db:seed` (tanpa `--class`) tidak berisi kios, pedagang, atau nomor WhatsApp contoh.
13. [x] **CMS Konten Publik Menyeluruh:** Setiap teks, gambar aset (logo, hero, sejarah), daftar panduan (rute, tips, aturan), menu navigasi (navbar & footer), dan dokumen legal (privasi & ketentuan) dapat diubah langsung dari Filament Admin (`/admin`) tanpa menyentuh kode.
14. [x] **Fallback Aman Saat Backend Offline:** Frontend mempertahankan hardcoded fallback di seluruh komponen publik; website statis tetap tampil sempurna tanpa regresi visual saat backend mati.
15. [x] **XSS Sanitizer Guard:** Dokumen hukum tersanitasi otomatis oleh HTMLPurifier di backend dengan whitelist tag semantik aman.
16. [x] **Rebuild Deploy Hook:** Admin dapat memicu pembaruan build SSG Netlify via tombol "Terbitkan Perubahan ke Website" pada Filament Admin.

---

## 15. Keputusan yang Perlu Dikonfirmasi

1. **Konten operasional dan editorial:** *SELESAI (Final).* Seluruh konten dikelola lewat arsitektur CMS bertingkat (`page_contents`, daftar dinamis, `legal_pages`, `nav_items`, `site_settings`) dengan fallback hardcoded aman di frontend.
2. **Status buka/tutup mengabaikan hari libur dan hari tutup.** `days_open` hanya teks tampilan.
3. **Agenda dan Panduan Kunjungan berupa daftar, bukan kartu** (mengikuti `DESIGN.md`).
4. **Klaim faktual** (status cagar budaya, jumlah kios, sejarah) menunggu konfirmasi pengelola.
5. **Hosting demo:** Menggunakan Netlify (Frontend gratis) + Local DDEV backend via `ddev share` (lihat `docs/DEMO_PUBLISH.md`).

