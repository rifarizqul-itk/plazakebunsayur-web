# 🗺️ Implementation Plan: Plaza Kebun Sayur Web

> **Document Type:** Technical Implementation Plan (Spec-Driven Development - Phase 2)  
> **Status:** Pending Human Review  
> **Based On:** [SPECIFICATION.md](file:///home/asus/projects/plazakebunsayur-web/docs/SPECIFICATION.md) (Revision 3)  
> **Project:** `plazakebunsayur-web`  

---

## 1. Overview & Strategy

Rencana implementasi ini dirancang menggunakan pendekatan **Vertical Slicing** bertahap agar setiap irisan menghasilkan kapabilitas yang teruji, fungsional, dan dapat diverifikasi secara visual maupun teknis.

Sesuai kesepakatan spesifikasi:
* **Irisan 1 (Core Multi-Page & Backend MVP):** Membangun fondasi arsitektur database, REST API, sistem desain Yas Mall `@theme`, seluruh 10 rute publik, integrasi WhatsApp, dan panel admin Filament v5.
* **Irisan 2 (Advanced SEO Prerender & Automation):** Membangun skrip post-build prerender SSG dan webhook otomatisasi rebuild setelah seluruh fungsionalitas dan estetika halaman di Irisan 1 tervalidasi.

---

## 2. Dependency Graph & Arsitektur Komponen

```
┌────────────────────────────────────────────────────────────────────────┐
│                        GRAFIK DEPENDENSI TEKNIS                        │
└────────────────────────────────────────────────────────────────────────┘

  [Backend Database & Migrations]
     │ (Kategori type, Tenant hours & images, ContactMessage)
     ▼
  [Database Seeders & Eloquent Models]
     │
     ├──────────────────────────────────────────┐
     ▼                                          ▼
  [Public REST API Controllers]            [Filament v5 Resources]
     │ (Pagination, Type filter, Contact)       │ (Admin CRUD, Image Pipeline)
     ▼                                          │
  [Frontend API Service & WhatsApp Helper]      │
     │ (Strict dev-only mock isolation)         │
     ▼                                          │
  [Frontend Design System (@theme YasMall)]     │
     │ (Tokens, Layouts, UI Primitives)         │
     ▼                                          │
  [Public Directory & Informational Pages] ◄────┘
     │ (10 Rute: Belanja, Kuliner, Agenda, Panduan, Kontak)
     ▼
  [Irisan 2: Build-Time Prerender SSG & Webhook]
```

---

## 3. Tahapan Implementasi (Irisan Bertahap)

### 🔹 Irisan 1A: Backend Core & Database Schema
*Tujuan: Memastikan struktur data, migrasi, model, dan REST API publik siap melayani kebutuhan frontend multi-page.*

1. **Migrasi Database:**
   * Menambahkan kolom `type` (`enum: ['retail', 'culinary']`, default: `'retail'`) dan `icon_name` pada tabel `categories`.
   * Menambahkan kolom `opening_time` (TIME), `closing_time` (TIME), `days_open` (VARCHAR), `image_path` (VARCHAR), dan `logo_path` (VARCHAR) pada tabel `tenants`.
   * Menambahkan kolom `banner_image_path` pada tabel `whats_on`.
   * Membuat tabel baru `contact_messages` (`full_name`, `email`, `phone_number`, `subject`, `message`, `status`) dan mendepresiasi `space_enquiries`.
2. **Model Eloquent & Seeder:**
   * Memperbarui `Category`, `Tenant`, `WhatsOn`, dan membuat `ContactMessage`.
   * Memperbarui `DatabaseSeeder` dengan 20+ kios nyata (terpisah antara Belanja Cinderamata/Batu dan Sentra Kuliner) beserta data jam buka terstruktur.
3. **REST API Controllers (`app/Http/Controllers/Api/`):**
   * `CategoryController`: Mendukung filter `?type=retail|culinary`.
   * `TenantController`: Mendukung filter `?type=`, `?category_id=`, `?floor_id=`, `?q=`, dan pagination `?page=&per_page=12`.
   * `ContactController`: Menyediakan `POST /api/contact` dengan rate limiting 5 req/10 menit dan validasi honeypot `bot_check`.
4. **Verifikasi Checkpoint 1A:**
   * Menjalankan `php artisan test` / pengujian API endpoint via curl/artisan untuk memastikan respons JSON terformat sesuai kontrak Seksi 9 [SPECIFICATION.md](file:///home/asus/projects/plazakebunsayur-web/docs/SPECIFICATION.md).

---

### 🔹 Irisan 1B: Frontend Design System & Shared Primitives
*Tujuan: Membersihkan kode lama, menyiapkan token desain berbasis Yas Mall, dan membangun komponen UI atomik.*

1. **Clean-Slate Cleanup & Token Setup:**
   * Menghapus file komponen monolitik lama di `src/components/` yang terikat layout single-page scroll lama.
   * Mengonfigurasi variabel `@theme` di `src/index.css` sesuai token Yas Mall (kanvas putih `#ffffff`, teks `#111827`, border `#e5e7eb`, aksen emas sand `#b6a171` dan maroon `#8b1a1a` yang ditinjau ulang).
2. **Utilities & Services:**
   * Membuat `src/utils/whatsapp.js`: Implementasi fungsi terstandarisasi `generateWhatsAppLink(phone, storeName)`.
   * Memperbarui `src/services/api.js`: Menghubungkan client HTTP ke backend, dengan aturan ketat: mock data hanya aktif jika `import.meta.env.DEV === true` dan `VITE_USE_MOCK === 'true'`.
3. **Layout & Komponen Atomik (UI Primitives):**
   * `src/components/ui/`: `Button`, `Badge`, `Input`, `SkeletonCard`, `PaginationControls`, `Alert`.
   * `src/components/layout/`:
     * `Navbar.jsx`: Sticky backdrop blur, menu navigasi multi-page (Beranda, Belanja, Kuliner, Agenda, Panduan Kunjungan, Kontak), tombol WhatsApp pengelola, dan mobile sheet drawer.
     * `Footer.jsx`: Informasi jam operasional mall, kontak pengelola, navigasi cepat, dan hak cipta.
     * `Container.jsx` & `PageHeader.jsx`: Wrapper responsif standar untuk seluruh halaman.
4. **Verifikasi Checkpoint 1B:**
   * Inspeksi screenshot Navbar dan Footer pada viewport **360px (mobile)** dan **1024px (desktop)**: zero horizontal overflow, touch target $\ge 44\times 44\text{ px}$.

---

### 🔹 Irisan 1C: Direktori Belanja & Sentra Kuliner (Core Directory)
*Tujuan: Membangun direktori komersial terpisah untuk Belanja dan Kuliner lengkap dengan filter, pagination, dan halaman profil kios.*

1. **Komponen Direktori (`src/components/directory/`):**
   * `TenantCard.jsx`: Kartu kios dengan aspect ratio 4:3 (crop cover), tag pill kategori, nama toko, lokasi unit/lantai, jadwal jam operasional, dan tombol Direct WhatsApp.
   * `CategoryFilter.jsx`: Barisan tombol pill kategori dengan fitur *horizontal scrollable* di layar ponsel.
   * `FloorFilter.jsx`: Filter dropdown/segmented kontrol lantai (Semua, GF, L1, L2).
   * `SearchBar.jsx`: Input pencarian debounced dengan ikon kaca pembesar dan tombol reset.
2. **Halaman Publik Direktori:**
   * `ShoppingDirectory.jsx` (`/belanja`): Menampilkan hanya kategori & tenant bertipe `retail`.
   * `ShopDetail.jsx` (`/belanja/:slug`): Profil lengkap kios belanja.
   * `CulinaryDirectory.jsx` (`/kuliner`): Menampilkan hanya kategori & tenant bertipe `culinary`.
   * `CulinaryDetail.jsx` (`/kuliner/:slug`): Profil lengkap kios kuliner.
3. **Type Guard & Auto-Redirect (Client Replace):**
   * Jika slug kuliner dibuka pada rute `/belanja/:slug`, otomatis jalankan `navigate('/kuliner/' + slug, { replace: true })`.
   * Jika slug retail dibuka pada rute `/kuliner/:slug`, otomatis jalankan `navigate('/belanja/' + slug, { replace: true })`.
4. **Verifikasi Checkpoint 1C:**
   * Uji filter kategori, pencarian teks, penomoran halaman (pagination), tombol WhatsApp click-to-chat, serta auto-redirect slug lintas tipe.
   * Inspeksi screenshot pada 360px dan 1024px.

---

### 🔹 Irisan 1D: Halaman Profil Mall & Kontak Publik
*Tujuan: Melengkapi seluruh 10 rute publik website.*

1. **Halaman Beranda (`Home.jsx` - `/`):**
   * Hero editorial Yas Mall style dengan quick-stats (300+ Kios, Sentra Resmi Kaltim, 3 Lantai).
   * Quick Category Navigator (jalan pintas ke Belanja & Kuliner).
   * Sorotan Kios Pilihan (Featured Tenants) & Sentra Kuliner Unggulan.
   * Agenda & Promo Terkini.
   * Ringkasan Sejarah Cagar Budaya & Google Maps Embed.
2. **Halaman Agenda (`EventsPage.jsx` - `/agenda` & `EventDetail.jsx` - `/agenda/:slug`):**
   * Daftar event budaya, pameran batu permata, dan promo pedagang dengan badge kalender.
3. **Halaman Panduan Kunjungan (`PlanYourVisit.jsx` - `/panduan-kunjungan`):**
   * Grid informasi terpadu: Jadwal Buka Mall, Akses Transportasi (rute bandara SAMS Sepinggan & pelabuhan Semayang), Tips Belanja Cerdas, Tata Tertib Pasar, dan Direktori 6 Fasilitas Mall (Musholla, ATM, Toilet, Parkir, Pos Keamanan).
4. **Halaman Kontak (`ContactPage.jsx` - `/kontak`):**
   * Layout dua kolom: Informasi kantor pengelola, nomor darurat/hotline WhatsApp, alamat gedung; serta formulir pengiriman pesan publik yang terhubung ke `POST /api/contact`.
5. **Halaman 404 (`NotFound.jsx` - `*`):**
   * Pesan informatif dengan tautan kembali ke Beranda atau Direktori.
6. **Hosting SPA Fallback (`public/_redirects`):**
   * Menambahkan berkas `_redirects` (`/* /index.html 200`) untuk menjamin direct link URL tidak menghasilkan 404 pada hosting static seperti Netlify/Vercel.
7. **Verifikasi Checkpoint 1D:**
   * Uji seluruh 10 rute halaman publik dari browser.
   * Uji pengiriman formulir kontak: pesan berhasil tersimpan, honeypot berfungsi, dan rate limiting memblokir request beruntun.
   * Uji audit jaringan 4G throttling: LCP $< 2.0\text{ detik}$.
   * Inspeksi screenshot 360px dan 1024px pada seluruh halaman baru.

---

### 🔹 Irisan 1E: Panel Admin Filament v5 & Pemrosesan Gambar
*Tujuan: Membangun sistem manajemen konten (CMS) bagi staf pengelola mall.*

1. **Instalasi & Konfigurasi Filament v5:**
   * Setup Filament v5 Panel Provider.
   * Menyesuaikan tema panel dengan warna identitas manajemen.
2. **Pemrosesan Gambar Otomatis (`intervention/image` v3):**
   * Pasang paket `intervention/image` v3 via Composer.
   * Buat helper/pipeline pemrosesan gambar saat upload di Filament:
     * Foto Kios: Center crop rasio 4:3 (`cover(800, 600)`), konversi WebP kualitas 82%, hapus EXIF.
     * Banner Agenda: Center crop rasio 16:9 (`cover(1600, 900)`), konversi WebP kualitas 80%, hapus EXIF.
3. **Filament Resources:**
   * `CategoryResource`: Form CRUD kategori + pilihan tipe (`retail` / `culinary`).
   * `FloorResource`: CRUD data lantai.
   * `TenantResource`: Form CRUD kios lengkap dengan pemilihan kategori, lantai, jam buka/tutup terstruktur, input nomor WhatsApp, dan upload foto kios.
   * `FacilityResource`: Form fasilitas mall.
   * `WhatsOnResource`: Form agenda kegiatan dengan upload banner.
   * `ContactMessageResource`: Halaman inbox pesan masuk pengunjung (view-only dengan tombol tandai sudah direspons).
4. **Verifikasi Checkpoint 1E:**
   * Uji coba upload foto kios mentah berukuran 3–8 MB melalui Filament; pastikan file tersimpan sebagai file `.webp` berukuran $< 150\text{ KB}$ dengan rasio 4:3.

---

### 🔹 Irisan 2: Advanced SEO Prerender & Webhook Rebuild (Post-Slice 1)
*Tujuan: Mengoptimalkan SEO direktori bisnis melalui pre-rendering HTML statis.*

1. **Skrip Prerender (`frontend/scripts/prerender.js`):**
   * Skrip Node.js yang membaca data kios dan menghasilkan `dist/belanja/:slug/index.html` serta `dist/kuliner/:slug/index.html` dengan meta tag SEO lengkap saat `npm run build`.
2. **Webhook & Rebuild Automation:**
   * Konfigurasi webhook CI/CD saat ada perubahan tenant di Filament untuk memicu rebuild otomatis di hosting.

---

## 4. Matriks Risiko & Mitigasi

| Risiko Potensial | Dampak | Strategi Mitigasi Terencana |
| :--- | :--- | :--- |
| **Foto resolusi tinggi memperlambat loading mobile** | LCP membengkak $> 3\text{ detik}$ | Backend otomatis mengompresi dan memotong foto ke WebP 4:3 $< 150\text{ KB}$; frontend menggunakan `loading="lazy"` dan aspect ratio statis. |
| **Akses silang tipe slug (`/belanja/kios-kuliner`)** | Kebingungan navigasi pengguna | Type guard client-side langsung mengeksekusi `replace` redirect ke `/kuliner/:slug`. |
| **Spam bot pada formulir kontak publik** | Inbox admin kebanjiran sampah | Proteksi berlapis: Honeypot field tak terlihat (`bot_check`) + Laravel IP Rate Limiter (5 req / 10 menit). |
| **Kebocoran mock data dev ke lingkungan produksi** | Informasi fiktif dilihat pengunjung | Pemeriksaan kompilator ketat `import.meta.env.DEV`; bundler Vite membuang kode mock saat build produksi. |
| **Direct link slug kios baru menghasilkan 404** | Pengunjung gagal membuka link share WA | Fallback rewrite hosting (`/* /index.html 200`) memastikan browser menjalankan CSR dan fetch API dinamis untuk slug baru. |

---

## 5. Rencana Pengujian Antar-Tahap (Checkpoints)

```
[Checkpoint 1A] Backend API Tests (PHPUnit) ──► PASS
       │
[Checkpoint 1B] Visual Audit Navbar & Footer (360px & 1024px) ──► PASS
       │
[Checkpoint 1C] Directory Functional (Filter, Pagination, WA Chat, Redirect) ──► PASS
       │
[Checkpoint 1D] 10 Rute Publik & Form Kontak (Rate limit, LCP < 2.0s) ──► PASS
       │
[Checkpoint 1E] Filament v5 CMS & WebP 4:3 Image Processing ──► PASS
```
