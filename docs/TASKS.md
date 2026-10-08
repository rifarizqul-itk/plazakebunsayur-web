# 📋 Task Breakdown: Plaza Kebun Sayur Web

> **Document Type:** Implementation Tasks (Spec-Driven Development - Phase 3 & 4)  
> **Status:** Completed (Irisan 1A–1E & Irisan 2 Selesai & Terverifikasi)  
> **Based On:** [SPECIFICATION.md](file:///home/asus/projects/plazakebunsayur-web/docs/SPECIFICATION.md) (Rev. 3) & [PLAN.md](file:///home/asus/projects/plazakebunsayur-web/docs/PLAN.md)  
> **Project:** `plazakebunsayur-web`  

---

## 📦 Irisan 1A: Backend Core & Database Schema

- [x] **Task 1: Migrasi Database Skema Baru**
  - **Acceptance:** Seluruh tabel dan kolom baru terbuat tanpa error di database SQLite/MySQL; tabel `space_enquiries` lama didepresiasi.
  - **Verify:** `.\artisan.bat migrate` -> Done.
  - **Files:**
    - `backend/database/migrations/2026_10_07_180001_add_type_to_categories_table.php`
    - `backend/database/migrations/2026_10_07_180002_add_hours_and_images_to_tenants_table.php`
    - `backend/database/migrations/2026_10_07_180003_add_banner_to_whats_on_table.php`
    - `backend/database/migrations/2026_10_07_180004_create_contact_messages_table.php`

- [x] **Task 2: Pembaruan Model Eloquent & Database Seeder**
  - **Acceptance:** Model memiliki casting, fillable, dan relasi yang tepat; seeder mengisi kategori retail & culinary, lantai, fasilitas, whats-on, dan 22 tenant nyata.
  - **Verify:** `php artisan migrate:fresh --seed` -> 100% Berhasil.
  - **Files:**
    - `backend/app/Models/Category.php`
    - `backend/app/Models/Tenant.php`
    - `backend/app/Models/WhatsOn.php`
    - `backend/app/Models/ContactMessage.php`
    - `backend/database/seeders/DatabaseSeeder.php`

- [x] **Task 3: REST API Controllers & Routes**
  - **Acceptance:** Semua endpoint publik sesuai kontrak Seksi 9 SPECIFICATION.md; rate limiter mengembalikan HTTP 429 pada request berlebih.
  - **Verify:** `php artisan route:list` dan uji request API.
  - **Files:**
    - `backend/app/Http/Controllers/Api/CategoryController.php`
    - `backend/app/Http/Controllers/Api/TenantController.php`
    - `backend/app/Http/Controllers/Api/FacilityController.php`
    - `backend/app/Http/Controllers/Api/WhatsOnController.php`
    - `backend/app/Http/Controllers/Api/ContactController.php`
    - `backend/routes/api.php`

- [x] **Task 4: Backend Feature Tests**
  - **Acceptance:** Seluruh test case lulus dengan status hijau (200, pagination, type filter, detail slug, 404, validasi, honeypot).
  - **Verify:** `php tests/run_tests.php` -> ALL PASS (100%).
  - **Files:**
    - `backend/tests/Feature/TenantApiTest.php`
    - `backend/tests/Feature/ContactApiTest.php`
    - `backend/tests/run_tests.php`

---

## 🎨 Irisan 1B: Frontend Design System & Shared Primitives

- [x] **Task 5: Setup Token Desain `@theme` & Cleanup Monolitik Lama**
  - **Acceptance:** Token CSS terdaftar di `@theme` (Yas Mall palette & fonts); komponen monolitik lama dibersihkan.
  - **Verify:** `src/index.css` dikonfigurasi; komponen usang dihapus.
  - **Files:**
    - `frontend/src/index.css`

- [x] **Task 6: Utilities & API Service dengan Isolasi Strict Dev Mock**
  - **Acceptance:** Helper WhatsApp menghasilkan format tautan resmi; API client mengonsumsi backend nyata saat mode dev normal dan produksi.
  - **Verify:** Unit test helper dan isolasi dev mock di `services/api.js`.
  - **Files:**
    - `frontend/src/utils/whatsapp.js`
    - `frontend/src/services/api.js`
    - `frontend/src/data/mockData.js`

- [x] **Task 7: UI Primitives Atomik**
  - **Acceptance:** Komponen UI konsisten dengan token desain Yas Mall, mendukung state hover, focus ring, dan disabled.
  - **Verify:** Build & linting lulus tanpa warning.
  - **Files:**
    - `frontend/src/components/ui/Button.jsx`
    - `frontend/src/components/ui/Badge.jsx`
    - `frontend/src/components/ui/Input.jsx`
    - `frontend/src/components/ui/SkeletonCard.jsx`
    - `frontend/src/components/ui/PaginationControls.jsx`
    - `frontend/src/components/ui/InstagramIcon.jsx`

- [x] **Task 8: Layout Components (Navbar, Footer, Container, PageHeader)**
  - **Acceptance:** Navigasi responsif sempurna di layar 360px (mobile drawer) dan 1024px (desktop horizontal); touch target $\ge 44\times 44\text{ px}$.
  - **Verify:** `npm run build` berhasil mengompilasi layout.
  - **Files:**
    - `frontend/src/components/layout/Navbar.jsx`
    - `frontend/src/components/layout/Footer.jsx`
    - `frontend/src/components/layout/Container.jsx`
    - `frontend/src/components/layout/PageHeader.jsx`

---

## 🛍️ Irisan 1C: Direktori Belanja & Sentra Kuliner

- [x] **Task 9: Komponen Direktori Kios**
  - **Acceptance:** Kartu kios menampilkan informasi terstruktur 4:3 cover crop rapi; tombol WhatsApp memicu chat langsung dengan greeting resmi.
  - **Verify:** Komponen terintegrasi di halaman `/belanja` dan `/kuliner`.
  - **Files:**
    - `frontend/src/components/directory/TenantCard.jsx`
    - `frontend/src/components/directory/CategoryFilter.jsx`
    - `frontend/src/components/directory/FloorFilter.jsx`
    - `frontend/src/components/directory/SearchBar.jsx`

- [x] **Task 10: Halaman Direktori Belanja & Detail Toko**
  - **Acceptance:** Hanya toko bertipe `retail` yang muncul di `/belanja`; detail toko menyajikan profil lengkap; auto-redirect replace bekerja saat mengakses slug kuliner.
  - **Verify:** Terkompilasi bersih di Vite build; guard replace diuji di routing.
  - **Files:**
    - `frontend/src/pages/ShoppingDirectory.jsx`
    - `frontend/src/pages/ShopDetail.jsx`

- [x] **Task 11: Halaman Direktori Kuliner & Detail Stan**
  - **Acceptance:** Hanya stan bertipe `culinary` yang muncul di `/kuliner`; detail menyajikan info kuliner & WhatsApp pemesanan; auto-redirect replace bekerja saat mengakses slug retail.
  - **Verify:** Terkompilasi bersih di Vite build.
  - **Files:**
    - `frontend/src/pages/CulinaryDirectory.jsx`
    - `frontend/src/pages/CulinaryDetail.jsx`

---

## 🏛️ Irisan 1D: Halaman Profil Mall, Kontak, & Routing Lengkap

- [x] **Task 12: Halaman Beranda (Company Profile)**
  - **Acceptance:** Beranda menyajikan profil mall megah ala Yas Mall; tombol CTA mengarahkan ke `/belanja`, `/kuliner`, dan `/panduan-kunjungan`.
  - **Verify:** Kompilasi bundle sukses.
  - **Files:**
    - `frontend/src/pages/Home.jsx`
    - `frontend/src/components/home/HeroSection.jsx`
    - `frontend/src/components/home/FeaturedSection.jsx`
    - `frontend/src/components/home/HistorySection.jsx`

- [x] **Task 13: Halaman Agenda & Panduan Kunjungan**
  - **Acceptance:** Seluruh informasi kunjungan dan fasilitas tersaji informatif tanpa booking; agenda menampilkan rentang tanggal dan detail kegiatan.
  - **Verify:** Kompilasi bundle sukses.
  - **Files:**
    - `frontend/src/pages/EventsPage.jsx`
    - `frontend/src/pages/EventDetail.jsx`
    - `frontend/src/pages/PlanYourVisit.jsx`

- [x] **Task 14: Halaman Kontak Publik & 404**
  - **Acceptance:** Formulir kontak mengirimkan data ke backend, honeypot berfungsi; halaman 404 tampil ramah; file `_redirects` terpasang.
  - **Verify:** Kompilasi bundle sukses dan `_redirects` terpasang di `public/`.
  - **Files:**
    - `frontend/src/pages/ContactPage.jsx`
    - `frontend/src/pages/NotFound.jsx`
    - `frontend/public/_redirects`

- [x] **Task 15: Integrasi Router Lengkap, Linter, & Audit Performa**
  - **Acceptance:** 10 rute navigasi aktif lancar; zero linter errors; build produksi sukses tanpa kebocoran mock data; LCP $< 2.0\text{ detik}$.
  - **Verify:** `npm run lint` -> 0 errors, 0 warnings; `npm run build` -> Sukses (709ms, 376 kB bundle).
  - **Files:**
    - `frontend/src/App.jsx`

---

## ⚙️ Irisan 1E: Panel Admin Filament v5 & Pemrosesan Gambar

- [x] **Task 16: Setup Filament v5 Admin Panel**
  - **Description:** Konfigurasikan Filament v5 di backend Laravel 13; buat user admin pertama via seeder/command; sesuaikan tema warna panel admin.
  - **Acceptance:** Admin dapat login ke `/admin` dan melihat dashboard pengelola mall.
  - **Verify:** Buka browser ke `http://localhost:8000/admin`, login dengan kredensial admin. (Verified: HTTP 200).
  - **Files:**
    - `backend/app/Providers/Filament/AdminPanelProvider.php`

- [x] **Task 17: Service Pemrosesan Gambar WebP & Crop 4:3**
  - **Description:** Service pemrosesan media: foto kios di-crop tengah 4:3 (`cover(800, 600)`), konversi WebP kualitas 82% ($< 150\text{ KB}$), banner whats-on di-crop 16:9 (`cover(1600, 900)`), konversi WebP kualitas 80% ($< 350\text{ KB}$), dan buang EXIF.
  - **Acceptance:** Setiap file gambar yang diunggah otomatis tersimpan dalam format WebP terkompresi dengan rasio yang tepat.
  - **Verify:** Buat unit test pemrosesan gambar dan periksa ukuran file serta ekstensi file di `storage/app/public/`. (Verified in `run_tests.php`).
  - **Files:**
    - `backend/app/Services/ImageOptimizerService.php`

- [x] **Task 18: Resource Filament untuk Pengelola Mall**
  - **Description:** Buat Resource Filament untuk `CategoryResource` (input tipe retail/culinary), `FloorResource`, `TenantResource` (form lengkap, jam buka terstruktur, upload foto teroptimasi), `FacilityResource`, `WhatsOnResource` (upload banner), dan `ContactMessageResource` (inbox pesan masuk pengunjung).
  - **Acceptance:** Admin dapat melakukan operasi CRUD pada seluruh entitas dan membaca pesan kontak masuk.
  - **Verify:** Uji tambah/edit kios dari panel admin dan periksa apakah langsung muncul di API backend. (Verified: 20 routes active, HTTP 200).
  - **Files:**
    - `backend/app/Filament/Resources/Categories/`
    - `backend/app/Filament/Resources/Tenants/`
    - `backend/app/Filament/Resources/Floors/`
    - `backend/app/Filament/Resources/Facilities/`
    - `backend/app/Filament/Resources/WhatsOns/`
    - `backend/app/Filament/Resources/ContactMessages/`

---

## 🚀 Irisan 2: Advanced SEO Prerender & Webhook (Post-Slice 1)

- [x] **Task 19: Build-Time Prerender Script (`scripts/prerender.js`)**
  - **Description:** Generator HTML statis saat build untuk seluruh rute direktori (`/belanja`, `/kuliner`, `/agenda`, dll.) serta slug kios dinamis dengan meta tags Open Graph dan JSON-LD terinjeksi.
  - **Acceptance:** Menghasilkan file statis `dist/belanja/:slug/index.html` dan `dist/kuliner/:slug/index.html` lengkap.
  - **Verify:** `npm run build` mengeksekusi prerenderer tanpa error.
  - **Files:**
    - `frontend/scripts/prerender.js`
    - `frontend/package.json`

- [x] **Task 20: Webhook CMS Rebuild Trigger**
  - **Description:** Observer model Tenant di Laravel untuk otomatis memicu deploy webhook Netlify/Vercel saat data berubah, serta Artisan command `site:trigger-rebuild`.
  - **Acceptance:** Webhook terpicu otomatis pada event model `saved`/`deleted`.
  - **Verify:** `php artisan site:trigger-rebuild` sukses dijalankan.
  - **Files:**
    - `backend/app/Observers/TenantObserver.php`
    - `backend/app/Console/Commands/TriggerSiteRebuild.php`
    - `backend/app/Providers/AppServiceProvider.php`

