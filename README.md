# Plaza Kebun Sayur - Official Website & Commercial Directory

Website Resmi Pusat Perbelanjaan & Direktori Komersial **Plaza Kebun Sayur (Balikpapan)**.  
Dirancang untuk mempromosikan komoditas khas (Batu Mulia, Perhiasan Emas, Kerajinan Tradisional Dayak, Batik Kaltim, dan Kuliner Tradisional) serta memfasilitasi penyewaan lahan komersial (*Space Enquiry*).

---

## 🏛️ Arsitektur Proyek

Proyek ini terbagi menjadi dua bagian utama:

1. **`backend/` (Laravel 11 + Filament v3 Admin + REST API)**
   - **Filament Admin Panel:** Dashboard modern khusus staf pengelola mall untuk mengelola data tenant/kios, fasilitas, dan membaca pengajuan sewa kios (*Space Enquiry*).
   - **Public REST API:** Endpoint JSON untuk menyajikan data direktori ke frontend publik.
   - **Database:** MySQL / SQLite relasional bersih (`categories`, `floors`, `tenants`, `facilities`, `whats_on`, `space_enquiries`).

2. **`frontend/` (React + Vite + Tailwind CSS)**
   - **Public Portal:** Website interaktif responsif bagi wisatawan dan pengunjung mall.
   - **Design System:** Nuansa Maroon (`#8B1A1A`), Gold Accent (`#C59B27`), Cream (`#FAF8F8`), dan font *Plus Jakarta Sans*.
   - **Fitur Unggulan:** Direktori pencarian toko, filter kategori & lantai, dan tombol *Direct WhatsApp ke Pedagang*.

---

## 🚀 Panduan Memulai Cepat (Quick Start)

### Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```
Akses Panel Admin: `http://localhost:8000/admin`

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
Akses Web Publik: `http://localhost:5173`

---

## 👥 Tim Pengembang
Dikembangkan untuk pengelola dan paguyuban pedagang **Plaza Kebun Sayur, Balikpapan**.
