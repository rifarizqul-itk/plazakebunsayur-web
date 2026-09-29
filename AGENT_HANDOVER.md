# 📋 AGENT HANDOVER & CONTEXT GUIDE: PLAZA KEBUN SAYUR

> **Dokumen Panduan & Konteks untuk AI Agent / Developer Baru**  
> Dibuat: 29 September 2026  
> Workspace: `Z:\home\asus\projects\plazakebunsayur-web`

Dokumen ini ditujukan untuk **AI Agent baru** (Claude Code, Cursor, Windsurf, Codex, dll) yang akan melanjutkan proses pengembangan website **Plaza Kebun Sayur (Bunsay)**, Balikpapan.

---

## 🧭 1. Peta Direktori & Status Proyek

Ketika Anda mengakses folder induk `Z:\home\asus\projects`, Anda akan melihat dua folder utama:

```
Z:\home\asus\projects/
│
├── Insos_Bunsay/            # [ARSIP READ-ONLY] Sistem Pembayaran Kasir Lama (JANGAN DIUBAH/DIHAPUS)
└── plazakebunsayur-web/     # [ACTIVE WORKSPACE] Website Direktori & Profil Mall Baru
```

### 🔴 ATURAN MUTLAK:
1. **`Insos_Bunsay/` ADALAH ARSIP READ-ONLY:**
   - Proyek ini adalah sistem kasir, split-bill, dan pembayaran terintegrasi Midtrans yang dikembangkan selama berbulan-bulan.
   - Pihak mitra (pengelola Plaza Kebun Sayur) memutuskan membatalkan penerapan sistem pembayaran/kasir digital.
   - Folder ini **TIDAK BOLEH DIHAPUS, DIROMBAK, ATAU DIUBAH**. Ini adalah arsip portofolio tim yang telah dikunci pada Git Tag: `v1.0.0-payment-system-archive` dan branch `archive/payment-system-full`.
   - Gunakan folder ini **hanya untuk mengambil aset referensi** (seperti logo, audio notifikasi, atau dokumentasi lama).

2. **SEMUA PENGEMBANGAN DILAKUKAN DI `plazakebunsayur-web/`:**
   - Ini adalah repositori baru yang aktif dan bersih.

---

## 🎯 2. Konsep & Tujuan Proyek Baru (`plazakebunsayur-web`)

### Latar Belakang Pivot
Plaza Kebun Sayur (dikenal juga sebagai *Pasar Inpres Kebun Sayur Balikpapan*) adalah destinasi wisata belanja legendaris Kalimantan Timur sejak era 1980-an, terkenal sebagai sentra **Batu Mulia, Perhiasan Emas/Perak, Kerajinan Suku Dayak Kenyah, Batik Balikpapan, dan Kuliner Khas**.

Karena pengelola menolak sistem kasir/keuangan, proyek dipivot menjadi **Mall Profile & Commercial Directory Website** (terinspirasi dari konsep fitur `https://bigmall.co.id`, namun menggunakan identitas visual khas Plaza Kebun Sayur).

### 3 Target Pengguna Utama:
1. **Wisatawan & Pengunjung (Publik):** Mencari toko/kios permata, cinderamata Dayak, batik, mengecek fasilitas, dan **menghubungi pedagang langsung via WhatsApp** (*Direct WhatsApp Click-to-Chat*).
2. **Calon Penyewa Kios / Event Organizer:** Mengajukan minat sewa lapak permanen, atrium pameran, atau booth terbuka melalui formulir *Space Enquiry*.
3. **Staf Pengelola Mall (Admin):** Mengelola daftar toko/kios, fasilitas, event promo, dan membaca formulir pengajuan sewa masuk secara terpusat (*Centralized Admin*).

### Non-Goals (Hal yang DILARANG Dibuat):
* ❌ TIDAK ADA payment gateway, Midtrans, transaksi finansial, atau kasir.
* ❌ TIDAK ADA registrasi/login mandiri untuk pedagang pasar (semua dikelola terpusat oleh admin pengelola mall).
* ❌ TIDAK ADA denah interaktif kios rumit di Fase 1 (ditunda ke Fase 2 / Nice-to-Have karena denah arsitektur fisik kios belum siap dari pengelola).

---

## 🏗️ 3. Arsitektur Teknis (`plazakebunsayur-web`)

Proyek ini menggunakan pemisahan yang bersih antara Backend dan Frontend:

### A. Backend (`backend/`)
* **Framework:** Laravel 11 (PHP 8.3 / 8.5)
* **Database:** SQLite untuk dev lokal (`database/database.sqlite`), siap switch ke MySQL di `.env`.
* **Database Models:**
  - `Category` (Batu Mulia, Emas, Kerajinan Dayak, Batik, Kuliner, Jasa)
  - `Floor` (GF, L1, L2)
  - `Tenant` (name, slug, unit_number, description, phone_whatsapp, instagram, opening_hours, is_featured, is_active)
  - `Facility` (name, icon_name, location_note, description, is_active)
  - `WhatsOn` (title, slug, type ['event', 'promo'], start_date, end_date, summary, content)
  - `SpaceEnquiry` (full_name, company_name, phone_number, email, enquiry_type, preferred_floor, business_description, notes, status)
* **REST API Endpoints:** Terdaftar di `routes/api.php` dan terdaftar di `bootstrap/app.php`:
  - `GET /api/tenants` (mendukung filter `?category_id=`, `?floor_id=`, `?q=`, `?featured=1`)
  - `GET /api/tenants/{slug}`
  - `GET /api/categories`
  - `GET /api/floors`
  - `GET /api/facilities`
  - `GET /api/whats-on`
  - `POST /api/space-enquiry`
* **CORS:** Dikonfigurasi di `config/cors.php` (mengizinkan akses dari frontend).

> ⚠️ **PENTING: KRITIS UNTUK WINDOWS / WSL:**  
> Path `Z:\` adalah *network share* Windows yang mengarah ke WSL Ubuntu (`//wsl.localhost/Ubuntu/home/asus/projects`).  
> Di Windows, binary PHP Windows mengalami bug `is_writable() === false` pada folder WSL.  
> **JANGAN jalankan `php artisan` dari PHP Windows!**  
> Gunakan wrapper yang sudah kami buat:
> ```powershell
> # Di dalam folder backend/:
> .\artisan.bat <perintah>
> # Contoh:
> .\artisan.bat migrate
> .\artisan.bat db:seed
> .\artisan.bat serve --port=8000
> ```
> `artisan.bat` secara otomatis mendelegasikan eksekusi ke Linux WSL native yang 100x lebih cepat dan tanpa error perizinan file.

---

### B. Frontend (`frontend/`)
* **Stack:** React 19, Vite 8, Tailwind CSS v4 (`@tailwindcss/vite`), React Router, Lucide React.
* **Sistem Desain & Warna Identitas:**
  - `Red / Maroon`: `#8B1A1A`, Rich Maroon: `#6E1313`, Dark: `#4E0E0E`
  - `Gold Accent`: `#C59B27`, Gold Light: `#F7EFC8`
  - `Cream / Mono-50`: `#FAF8F8`, Warm Gray: `#F5EEEE`
  - `Font Family`: `Plus Jakarta Sans`
  - *Catatan Tailwind v4:* Semua token CSS diatur via `@theme` di `src/index.css`. Jangan membuat file `tailwind.config.js`.
* **Aset Resmi:** Berada di `frontend/public/assets/`:
  - `main_logo_transparent_for_light_bg.webp` (Logo resmi Plaza Kebun Sayur)
  - `Photograph_of_plaza_building.webp` (Foto asli fasad gedung Plaza Kebun Sayur)
* **Komponen yang Sudah Dibangun (`src/components/`):**
  - `Navbar.jsx`: Logo resmi, sticky blur, link menu, mobile drawer.
  - `Hero.jsx`: Foto gedung asli bergradasi maroon-gold, statistik (300+ kios, 3 lantai), tombol CTA.
  - `WhatsOnSection.jsx`: Agenda event budaya & promo kios.
  - `TenantDirectory.jsx`: Pencarian instan (live search), filter kategori, filter lantai, kartu toko, tombol **Direct WhatsApp**, dan modal detail.
  - `FacilitiesSection.jsx`: Grid 6 fasilitas gedung (Musholla, Toilet, ATM, Parkir, Satpam, Food Court).
  - `SpaceEnquirySection.jsx`: Tab pilihan sewa kios & formulir interaktif pengajuan sewa ke API backend.
  - `AboutSection.jsx`: Sejarah Pasar Inpres & embed Google Maps lokasi resmi.
  - `Footer.jsx`: Jam buka (08.30 – 21.00 WITA), info pengelola, kontak hotline.
* **Resiliensi Data (`src/services/api.js`):** Dilengkapi *fallback mock data* otomatis jika backend server sedang tidak aktif, sehingga web tidak akan pernah *crash* saat dipresentasikan offline.

---

## 📋 4. Roadmap & Backlog Tugas Berikutnya

Bagi AI Agent yang melanjutkan pekerjaan ini, berikut daftar prioritas tugas yang bisa dikerjakan:

1. **Implementasi Panel Admin Pengelola (Laravel Filament v3):**
   - Pasang Filament v3 di backend: `composer require filament/filament`
   - Setup `AdminPanelProvider` dengan tema warna Maroon `#8B1A1A` dan Gold `#C59B27`.
   - Buat Resource Filament untuk: `TenantResource`, `CategoryResource`, `FacilityResource`, `WhatsOnResource`, dan `SpaceEnquiryResource` (inbox pengajuan sewa).
2. **Media Upload & Storage:**
   - Konfigurasi `php artisan storage:link` agar upload logo toko dan banner event di Filament langsung dapat diakses URL-nya oleh web React.
3. **Pengayaan Data Toko Asli:**
   - Bersama tim mahasiswa dan mitra pengelola, tambahkan 15–30 data kios nyata beserta foto asli kios dari pedagang di Plaza Kebun Sayur.
4. **Deploy ke Production:**
   - Frontend React: Deploy ke Netlify / Vercel (gratis, build command: `npm run build`, publish dir: `dist`).
   - Backend Laravel: Deploy ke cPanel / VPS kampus atau mitra.
5. **Fase 2 (Nice-to-Have):**
   - Peta visual denah lantai (*Interactive Floor Plan*) jika pihak pengelola sudah menyediakan denah arsitektur resmi kios.

---

## ⚡ 5. Cara Menjalankan Project (Quick Command Cheat Sheet)

```powershell
# 1. Menjalankan Backend (Laravel API):
cd Z:\home\asus\projects\plazakebunsayur-web\backend
.\artisan.bat serve --port=8000
# Endpoint API: http://localhost:8000/api/tenants

# 2. Menjalankan Frontend (React):
cd Z:\home\asus\projects\plazakebunsayur-web\frontend
npm run dev
# URL Browser: http://localhost:5173

# 3. Build Production Frontend:
cd Z:\home\asus\projects\plazakebunsayur-web\frontend
npm run build
```
