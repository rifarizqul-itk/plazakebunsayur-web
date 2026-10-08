# 📋 Specification: Plaza Kebun Sayur Web (Hybrid Company Profile & Business Directory)

> **Document Type:** System & Feature Specification (Spec-Driven Development)  
> **Status:** Draft Approved for Plan (Phase 1: Specify - Revision 3)  
> **Project:** `plazakebunsayur-web`  
> **Target Date:** Oktober 2026  

---

## 1. Assumptions & Baseline Context

Sebelum spesifikasi ini dijalankan, berikut asumsi dasar yang disepakati:
1. **Target Pengguna:** Wisatawan lokal/luar Balikpapan (mengakses via smartphone 4G/3G) dan pengelola mall (desktop admin).
2. **Karier, Kemitraan, & Hubungan Investor:** Ditunda seluruhnya ke Fase 2. Profil manajemen disematkan ringkas pada halaman Panduan Kunjungan / Beranda.
3. **Pemisahan Belanja vs Kuliner:** Ditangani melalui kolom `type` pada tabel `categories`, sehingga kios mewarisi klasifikasinya dari kategori bisnis masing-masing.
4. **Pesan Kontak:** Model `SpaceEnquiry` (sewa kios) digantikan sepenuhnya oleh model `ContactMessage` (pesan umum pengunjung + hotline resmi).
5. **Palet Warna:** Palet Maroon (`#8B1A1A`) & Gold (`#C59B27`) berstatus **"DITINJAU ULANG"** (didefinisikan seluruhnya sebagai variabel `@theme` agar palet mudah diganti saat proses evaluasi visual).
6. **Mock Data:** Murni hanya aktif pada environment development lokal saat menjalankan `npm run dev` (`import.meta.env.DEV === true`). Pada build produksi (`npm run build`), flag `import.meta.env.DEV` otomatis bernilai `false` dan aplikasi **wajib** mengonsumsi REST API nyata; tidak ada toleransi data mock di produksi.
7. **Arsitektur Frontend:** Clean-slate rewrite untuk komponen halaman publik guna memastikan hierarki tampilan baru yang segar, rapi, dan modular.
8. **Arsip Lama:** Folder `Insos_Bunsay` tetap merupakan arsip read-only dan tidak disentuh.

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

---

## 3. Design System (Berbasis `style-references/YasMall`)

Desain mengadaptasi estetika modern, lapang, dan terstruktur dari referensi Yas Mall, disesuaikan dengan karakter cagar budaya & wisata belanja Plaza Kebun Sayur.

### A. Asal Nilai Token dari File Yas Mall & Pemetaan ke `@theme`
Seluruh token didefinisikan sebagai CSS Custom Variables di dalam blok `@theme` Tailwind CSS v4 (`src/index.css`) agar seluruh tema dan palet warna dapat diganti secara instan:

```css
@theme {
  /* 1. Kanvas & Permukaan (Dari YasMall Landing.htm & Plan_Your_Visit.htm) */
  /* Asal: body, .whatsNew-content-box { background-color: #fff } */
  --color-canvas: #ffffff;
  /* Asal: .search-popup, custom-control { background-color: #f8f9fa / #e9ecef } */
  --color-surface-subtle: #f8f9fa;
  --color-surface-muted: #f1f3f5;

  /* 2. Teks & Garis Batas (Dari YasMall Landing.htm & Plan_Your_Visit.htm) */
  /* Asal: body, .top-links, .header { color: #212529 / #000000 } */
  --color-text-primary: #111827;
  /* Asal: .form-control, .contact-links { color: #495057 / #6c757d } */
  --color-text-secondary: #4b5563;
  --color-text-muted: #9ca3af;
  /* Asal: .top-links, .category-dropdown { border-color: #e5e7eb / #000000 } */
  --color-border-subtle: #e5e7eb;
  --color-border-strong: #111827;

  /* 3. Aksen & Brand (STATUS: DITINJAU ULANG) */
  /* Asal: Warisan identitas awal Kaltim (Ditinjau ulang untuk evaluasi modern) */
  --color-brand-primary: #8b1a1a;
  --color-brand-primary-hover: #731515;
  --color-brand-surface: #fdf6f6;
  /* Asal: YasMall Landing.htm .footer-bottom { background-color: #b6a171 } (Ditinjau ulang) */
  --color-brand-accent: #b6a171;
  --color-brand-accent-hover: #a38d5d;
  --color-brand-accent-light: #f7f3ea;

  /* 4. Tipografi (Dari YasMall Gotham-Medium, Gotham-Bold) */
  --font-sans: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  
  /* 5. Radius Sudut */
  --radius-card: 1rem;       /* 16px untuk kartu kios ala YasMall */
  --radius-pill: 9999px;     /* Pill badge & tombol pencarian */
}
```

### B. Tipografi & Hierarki Teks
* **Headings (`h1`, `h2`, `h3`):** Bobot SemiBold (600) hingga Bold (700), dengan `tracking-tight` (-0.025em) untuk headline display editorial.
* **Pre-headers / Eyebrows:** Huruf kapital (`uppercase`), ukuran `text-xs` (12px), `tracking-widest` (0.1em), bobot Medium (500) atau SemiBold (600) untuk label kategori dan penanda seksi.
* **Body Text:** Ukuran 14px–16px (`text-sm` / `text-base`), bobot Regular (400), `leading-relaxed` (1.625) untuk kemudahan membaca di layar seluler.

### C. Komponen Utama
1. **Header / Navbar:** Sticky dengan backdrop blur (`backdrop-blur-md bg-canvas/90 border-b border-border-subtle`), tautan navigasi desktop bersih, tombol CTA WhatsApp pengelola, dan hamburger drawer mobile.
2. **Hero Section:** Banner editorial dengan tipografi tegas, deskripsi ringkas, penanda cagar budaya resmi, dan *quick-stats bar* (300+ Kios, Sentra Resmi Kaltim, 3 Lantai).
3. **Directory Card (Belanja & Kuliner):** Rasio aspek foto 4:3 yang seragam (crop center), tag pill kategori di sudut atas, nama kios tebal, nomor unit & lantai kontras, jam buka terstruktur, serta tombol aksi cepat Direct WhatsApp.
4. **Filter & Search Bar:** Input pencarian bersih berikon kaca pembesar dengan tombol reset, dipadukan barisan tombol kapsul kategori (*category pills*) yang dapat digeser mendatar (*horizontal swipe*) di perangkat seluler.
5. **Panduan Kunjungan (Structured Grid):** Kartu terpisah untuk Jam Operasional Gedung, Akses Rute & Transportasi, Fasilitas Umum, dan Etika/Tips Belanja Cerdas.
6. **Formulir Kontak (Two-Column Layout):** Kolom kiri memuat informasi kantor pengelola, alamat, jam kerja, nomor darurat WhatsApp pengelola; kolom kanan memuat formulir input pesan pengunjung.

### D. Catatan Layout per Halaman
* **Beranda (`/`):** Hero editorial → Quick Category Navigator → Sorotan Kios Belanja Pilihan → Sorotan Kuliner Khas → Agenda Terkini → Sejarah Ringkas Cagar Budaya → Peta Lokasi → Footer.
* **Direktori Belanja (`/belanja`):** Header Halaman → Search Bar & Filter Lantai → Kategori Pills (`type=retail`) → Grid Kios (12 per halaman) → Pagination Controls.
* **Detail Kios Belanja (`/belanja/:slug`):** Breadcrumb navigasi → Galeri Foto Utama (4:3) → Identitas Kios (Nama, Lantai, Unit) → Jadwal Operasional Terstruktur → Deskripsi Profil Toko → Tombol Utama "Chat Penjual via WhatsApp" → Lokasi Lantai.
* **Direktori Kuliner (`/kuliner`):** Header Sentra Kuliner → Search & Filter Kategori Kuliner (`type=culinary`) → Grid Kios Kuliner (12 per halaman) → Pagination Controls.
* **Detail Kios Kuliner (`/kuliner/:slug`):** Struktur identik detail belanja, disesuaikan untuk profil stan makanan/minuman khas dan pemesanan WhatsApp.
* **Agenda (`/agenda`):** Daftar pameran, bazar UMKM, dan promo mall dengan kartu tanggal bergaya kalender Yas Mall.
* **Detail Agenda (`/agenda/:slug`):** Banner agenda (16:9), rentang tanggal, teks pengumuman lengkap, dan lokasi acara.
* **Panduan Kunjungan (`/panduan-kunjungan`):** Informasi terpadu: Jam Buka Mall, Panduan Akses (dari Bandara Sepinggan & Pelabuhan Semayang), Tips Belanja Cerdas, Tata Tertib, serta Direktori Fasilitas Lengkap (Musholla, ATM, Toilet, Parkir, Pos Satpam).
* **Kontak (`/kontak`):** Alamat kantor pengelola di mall, nomor telepon keamanan, hotline WhatsApp pengelola, dan formulir pengiriman pesan publik.
* **Not Found (`*`):** Tampilan 404 ramah pengguna dengan tombol kembali ke Beranda atau Direktori Belanja.

### E. Kriteria Sukses Visual
* **Review Screenshot Wajib:** Setiap irisan (slice) implementasi visual wajib diverifikasi tampilannya pada 2 breakpoint:
  * **Mobile Viewport:** `360px` (standar smartphone Android/iPhone).
  * **Desktop Viewport:** `1024px` (layar laptop/desktop).
* **Zero Horizontal Scroll:** Tidak ada elemen yang meluap ke luar lebar layar pada 360px.
* **Touch Target:** Seluruh tombol, pill filter, dan link navigasi mobile memiliki area sentuh minimal `44 x 44 px`.
* **Kontras Aksesibilitas:** Rasio kontras teks terhadap latar belakang minimal 4.5:1 (WCAG AA).

---

## 4. Tech Stack & Keputusan Versi

| Layer | Pilihan Teknologi | Versi Terpilih | Bukti & Alasan Pemilihan |
| :--- | :--- | :--- | :--- |
| **Backend Framework** | Laravel Framework | **13.33.0** (`^13.17`) | Sudah aktif terpasang di environment (`composer.json`) bersama PHP 8.5.4; stabil, cepat, dan modern. |
| **Admin Panel (CMS)** | Filament | **v5.x** | **Bukti Kompatibilitas:** Filament v5 adalah rilis mayor resmi yang dirancang khusus untuk mendukung Laravel 13 (Packagist 2026), mendukung Livewire 4, serta Tailwind CSS v4 native. |
| **PHP Runtime** | PHP CLI | **8.5.4** | Runtime native aktif di host environment. |
| **Frontend Framework** | React | **19.2.8** | Komponen reaktif modern dengan rendering performan. |
| **Frontend Tooling** | Vite | **8.3.0** | Bundling kilat dengan Hot Module Replacement. |
| **Styling** | Tailwind CSS | **v4.3.3** | Engine CSS performan tinggi via `@tailwindcss/vite` berbasis `@theme`. |
| **Routing** | React Router | **v7.18.4** | Navigasi multi-page client-side yang stabil. |
| **Icons** | Lucide React | **v1.48.0** | Set ikon modern dan ringan. |
| **Database** | SQLite / MySQL | - | SQLite untuk pengembangan lokal instan, siap switch ke MySQL di production. |

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

# Mengisi data awal (seeding)
.\artisan.bat db:seed

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
│   ├── SPECIFICATION.md     # Dokumen spesifikasi SDD ini
│   └── ARCHITECTURE.md      # Catatan arsitektur & keputusan teknis
├── backend/
│   ├── app/
│   │   ├── Filament/Resources/
│   │   │   ├── CategoryResource.php
│   │   │   ├── FloorResource.php
│   │   │   ├── TenantResource.php
│   │   │   ├── FacilityResource.php
│   │   │   ├── WhatsOnResource.php
│   │   │   └── ContactMessageResource.php
│   │   ├── Http/Controllers/Api/
│   │   │   ├── CategoryController.php
│   │   │   ├── TenantController.php
│   │   │   ├── FacilityController.php
│   │   │   ├── WhatsOnController.php
│   │   │   └── ContactController.php
│   │   └── Models/
│   │       ├── Category.php     # Ditambah kolom `type` ('retail', 'culinary')
│   │       ├── Floor.php
│   │       ├── Tenant.php       # Structured hours, image_path, logo_path
│   │       ├── Facility.php
│   │       ├── WhatsOn.php      # banner_image_path
│   │       └── ContactMessage.php
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
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
    │   │   └── NotFound.jsx
    │   ├── services/
    │   │   └── api.js           # Fetch API wrapper + strict dev mock isolation
    │   ├── data/
    │   │   └── mockData.js      # Dataset lokal hanya untuk npm run dev
    │   ├── utils/
    │   │   └── whatsapp.js      # Generator tautan WhatsApp terformat
    │   ├── App.jsx              # React Router setup & scroll restoration
    │   ├── main.jsx
    │   └── index.css            # Tailwind v4 configuration (@theme tokens)
    ├── scripts/
    │   └── prerender.js         # Build-time SSG script (Tahap Irisan 2)
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
* **`opening_time`**: TIME, nullable, default: `'09:00:00'`
* **`closing_time`**: TIME, nullable, default: `'20:00:00'`
* **`days_open`**: VARCHAR(100), default: `'Setiap Hari (Senin - Minggu)'`
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

---

### B. Pengolahan Gambar saat Unggah & Kriteria Performa

1. **Pipeline Unggah & Pemotongan (Backend / Filament Form):**
   * **Batas Maksimal Berkas Mentah:** Dinaikkan menjadi **10 MB** (mengakomodasi jepretan kamera smartphone resolusi tinggi oleh admin).
   * **Format Input:** `jpg`, `jpeg`, `png`, `webp`.
   * **Dependensi Pemrosesan:** Paket **`intervention/image` v3** (`composer require intervention/image`) dengan driver native PHP 8.5 **GD** (`ext-gd`) atau **Imagick**.
   * **Pemotongan Proporsional (Cropping 4:3):**
     * Foto Kios (`tenants.image_path`): Dipotong dan diubah ukurannya menggunakan crop tengah rasio 4:3 (`$image->cover(800, 600)`), lalu dikonversi ke format **WebP** dengan kualitas kompresi 82% (`$image->toWebp(82)`). Ukuran target berkas hasil olah: `< 150 KB`.
     * Banner Agenda (`whats_on.banner_image_path`): Dipotong rasio 16:9 (`$image->cover(1600, 900)`), dikonversi ke format **WebP** kualitas 80% (`$image->toWebp(80)`). Ukuran target berkas: `< 350 KB`.
     * Menghapus seluruh metadata EXIF kamera untuk keamanan privasi dan penghematan byte.
2. **Kriteria Performa Frontend:**
   * Seluruh tag gambar `<img>` wajib menyertakan atribut `loading="lazy"` dan `decoding="async"`, kecuali foto hero LCP di Beranda.
   * Kontainer gambar memiliki kelas aspect ratio eksplisit (`aspect-[4/3]` untuk kartu kios, `aspect-[16/9]` untuk banner) guna menghindari *Cumulative Layout Shift* (CLS $< 0.1$).

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
  * `per_page` (opsional, default: 12): jumlah kios per halaman
* **Respons:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Permata Borneo Gemstone",
      "slug": "permata-borneo-gemstone",
      "unit_number": "Blok A No. 12",
      "description": "Spesialis batu mulia kecubung, akik khas Kalimantan, dan ikat perak pesanan khusus.",
      "phone_whatsapp": "081234567890",
      "instagram": "permataborneo",
      "opening_time": "09:00:00",
      "closing_time": "20:00:00",
      "days_open": "Setiap Hari (Senin - Minggu)",
      "image_url": "/storage/tenants/permata-borneo.webp",
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
  "phone_number": "081298765432",
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
1. **Sumber Data:** Script Node.js `scripts/prerender.js` memanggil endpoint backend `GET /api/tenants?per_page=500` saat proses build untuk mengumpulkan seluruh slug kios aktif.
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
   * **Audit Performa Jaringan (4G Throttling):** Pengujian dengan simulasi jaringan 4G pada Chrome DevTools untuk memastikan LCP $< 2.0$ detik.
2. **Backend API Testing (PHPUnit / Pest):**
   * `test_can_fetch_categories_filtered_by_type`: Memastikan `GET /api/categories?type=retail` hanya mengembalikan kategori belanja.
   * `test_can_fetch_tenants_with_pagination`: Memastikan `GET /api/tenants?page=1&per_page=12` mengembalikan pagination metadata (`current_page`, `last_page`, `total`).
   * `test_contact_form_validation_and_rate_limiting`: Memastikan `POST /api/contact` memvalidasi input wajib dan memblokir request ke-6 dalam interval 10 menit (HTTP 429 Too Many Requests).
   * `test_image_upload_converts_to_webp_4_3`: Memastikan unggahan foto kios otomatis dipotong ke rasio 4:3 dan disimpan dalam format WebP.

---

## 13. Boundaries (Guardrails)

* **ALWAYS (Selalu dilakukan):**
  * Utamakan tampilan responsif seluler (*Mobile-First*), lolos uji 360px dan 1024px per irisan.
  * Tautan WhatsApp terformat dengan kode negara Indonesia (`62`) menggunakan helper terpusat.
  * Terapkan konversi WebP dan crop 4:3 otomatis saat upload media.
  * Sanitasi dan batasi pengiriman pesan kontak (Rate Limit: 5 pesan / 10 menit per IP + Honeypot).
  * Matikan seluruh akses mock data pada build produksi.
* **ASK FIRST (Tanyakan terlebih dahulu):**
  * Mengunggah berkas gambar dengan ukuran mentah $> 10\text{ MB}$ atau format selain JPG/PNG/WebP.
  * Mengubah skema tabel atau menambahkan kolom baru di luar yang telah ditentukan di spesifikasi ini.
  * Menambah library JavaScript eksternal yang melebihi ukuran bundle 50 KB.
  * Memindahkan penyimpanan media dari Laravel local public disk ke cloud storage eksternal (S3, Cloudinary).
* **NEVER (Dilarang keras):**
  * Mengutak-atik, menghapus, atau mengubah file di dalam folder arsip `Insos_Bunsay/`.
  * Menulis atau mengimplementasikan sistem pembayaran/kasir/Midtrans.
  * Memasukkan kredensial atau file `.env` produksi ke dalam version control git.
  * Mengizinkan kebocoran mock data ke lingkungan produksi.

---

## 14. Success Criteria (Testable Acceptance)

1. [ ] **Verifikasi 10 Rute:** Seluruh 9 rute konten publik dan 1 rute 404 dapat diakses langsung via URL maupun navigasi internal tanpa error.
2. [ ] **Verifikasi Visual 360px & 1024px:** Setiap halaman lolos inspeksi screenshot pada lebar 360px (tanpa horizontal overflow, touch target $\ge 44\text{ px}$) dan 1024px (tata letak grid lapang ala Yas Mall).
3. [ ] **Target Performa LCP:** Nilai LCP (Largest Contentful Paint) berada di bawah **2.0 detik** pada simulasi koneksi seluler 4G.
4. [ ] **Pemisahan Belanja vs Kuliner:** 
   * `/belanja` hanya menampilkan kategori & kios bertipe `retail`.
   * `/kuliner` hanya menampilkan kategori & kios bertipe `culinary`.
   * Akses silang tipe slug dialihkan otomatis via client replace ke URL yang sesuai.
5. [ ] **WhatsApp Click-to-Chat:** Tombol WhatsApp pada halaman detail membuka tautan `https://wa.me/62...` dengan pesan pembuka otomatis yang menyebutkan nama kios.
6. [ ] **Formulir Kontak Terproteksi:** Pengunjung dapat mengirim pesan melalui `/kontak`, tersimpan di tabel `contact_messages`, dan dibatasi oleh rate limiter (HTTP 429 setelah 5x kirim) serta terlindung honeypot.
7. [ ] **Admin Panel Filament v5:** Admin pengelola dapat login, melakukan CRUD pada Kios, Kategori, Fasilitas, Whats On, serta membaca Pesan Masuk.
8. [ ] **Optimasi Gambar Otomatis:** Foto kios yang diunggah terpotong rasio 4:3 dan tersimpan dalam format WebP dengan ukuran $< 150\text{ KB}$.
9. [ ] **Isolasi Mock Data:** Pada build produksi (`npm run build`), web murni mengonsumsi API backend tanpa ada kebocoran mock data dev.
10. [ ] **SPA Hosting Fallback:** Kios baru yang belum ter-prerender tetap dapat dibuka secara langsung via URL melalui SPA fallback rewrite tanpa menampilkan halaman 404.
