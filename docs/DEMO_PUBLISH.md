# 🌐 Panduan Publikasi & Demo: Netlify + Backend DDEV Share

> **Dokumen Teknis Operasional Demo**  
> Ditujukan untuk tim developer / technical presenter yang mendemonstrasikan integrasi website publik dan Admin Filament Plaza Kebun Sayur menggunakan hosting gratis **Netlify** dan backend lokal di WSL/laptop melalui **DDEV Share**.

---

## 🏗️ 1. Arsitektur Lingkungan Demo

Website Plaza Kebun Sayur menggunakan arsitektur *decoupled*:
1. **Frontend (Website Publik):**  
   - Dibangun dengan React 19 + Tailwind CSS v4 + Vite.
   - Di-hosting secara gratis di **Netlify** dengan fitur SSG Pre-rendering dan SPA Fallback (`_redirects`).
   - Sangat cepat, hemat bandwidth, dan terlindungi CDN global.
2. **Backend (Admin Panel & REST API):**  
   - Dibangun dengan Laravel 13 + Filament Admin v5.
   - Berjalan secara lokal di komputer laptop pengembang menggunakan container **DDEV** (WSL/Linux).
   - Dijembatani ke internet publik menggunakan tunneling **`ddev share`** (berbasis ngrok).
3. **Mekanisme Fallback Otomatis:**  
   - Jika laptop dimatikan atau koneksi tunnel terputus, website publik di Netlify **tidak akan rusak atau menampilkan layar putih**.
   - Sistem frontend secara otomatis beralih ke dataset lokal cadangan (*offline fallback*), sehingga situs demo selalu siap diuji kapan saja.

---

## 🚀 2. Langkah-Langkah Menjalankan Demo

### Langkah 1: Nyalakan Backend Lokal di Laptop
Buka terminal WSL pada direktori proyek, lalu jalankan:
```bash
cd /home/asus/projects/plazakebunsayur-web/backend
ddev start
```
Pastikan backend berjalan lancar di `https://plazakebunsayur-backend.ddev.site`.

### Langkah 2: Buka Akses Publik Menggunakan `ddev share`
Untuk membagikan API lokal ke internet agar dapat diakses oleh Netlify dan smartphone penguji:
```bash
ddev share
```
*DDEV akan membuka sesi tunneling ngrok dan menampilkan output seperti:*
```text
Forwarding                    https://a1b2-180-252-10-5.ngrok-free.app -> http://127.0.0.1:8080
```
👉 **Salin URL publik tersebut** (misal: `https://a1b2-180-252-10-5.ngrok-free.app`).  
*(Biarkan terminal ini tetap terbuka selama sesi presentasi/demo berlangsung).*

---

## ⚙️ 3. Konfigurasi di Akun Netlify

Karena sesi gratis ngrok dapat menghasilkan alamat domain baru setiap kali `ddev share` dijalankan ulang, ikuti 2 pengaturan berikut di dasbor Netlify:

### A. Mengatur Variabel Lingkungan API (`VITE_API_URL`)
1. Buka dasbor Netlify: **[app.netlify.com](https://app.netlify.com)**.
2. Pilih situs Plaza Kebun Sayur Anda.
3. Masuk ke **Site configuration** ➡️ **Environment variables**.
4. Cari variabel bernama `VITE_API_URL` (atau klik **Add a variable** jika belum ada):
   - **Key:** `VITE_API_URL`
   - **Value:** `https://[subdomain-ngrok-anda].ngrok-free.app/api`  
     *(Contoh: `https://a1b2-180-252-10-5.ngrok-free.app/api`)*
5. Klik **Save**.
6. Masuk ke tab **Deploys** ➡️ Klik tombol **Trigger deploy** ➡️ **Deploy site**.

### B. Membuat Build Hook Netlify (Tombol "Terbitkan Perubahan")
Agar pengelola mall dapat menekan tombol **"Terbitkan Perubahan ke Website"** langsung dari dashboard Filament tanpa perlu membuka dashboard Netlify:
1. Di Netlify, masuk ke **Site configuration** ➡️ **Build & deploy** ➡️ **Continuous deployment**.
2. Gulir ke bagian **Build hooks** ➡️ Klik **Add build hook**.
3. Beri nama hook: `Filament Admin Deploy Hook`.
4. Pilih branch: `main`.
5. Klik **Save**.
6. Netlify akan memberikan sebuah URL rahasia, contoh:  
   `https://api.netlify.com/build_hooks/670a1b2c3d4e5f6a7b8c9d0e`
7. Buka file `.env` di backend lokal Anda (`backend/.env`):
   ```env
   FRONTEND_DEPLOY_HOOK_URL=https://api.netlify.com/build_hooks/670a1b2c3d4e5f6a7b8c9d0e
   ```
8. Selesai! Kini tombol *"Terbitkan Perubahan ke Website"* di Filament Admin akan otomatis memicu build ulang situs Netlify.

---

## 🛡️ 4. Penanganan Khusus Sesi Ngrok Gratis

Kami telah menanamkan optimasi teknis berikut di dalam kode agar pengalaman demo berjalan mulus:

### A. Bypass Halaman Peringatan Ngrok (`ngrok-skip-browser-warning`)
Layanan gratis ngrok biasanya menampilkan halaman persetujuan (*warning interstitial*) saat API pertama kali dipanggil dari peramban web.
- **Solusi yang telah kami terapkan di codebase:**  
  File `frontend/src/services/api.js` secara otomatis menyertakan header HTTP:
  ```javascript
  headers: {
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': '1',
  }
  ```
- Backend Laravel (`backend/config/cors.php`) juga telah dikonfigurasi untuk mengizinkan header tersebut dan mengizinkan lintas domain (*Cross-Origin Resource Sharing*) dari Netlify.

### B. Pre-render Build Toleran Offline
Skrip pre-render kami (`frontend/scripts/prerender.js`) dirancang agar tidak menggagalkan proses build Netlify jika laptop Anda sedang offline saat Netlify melakukan kompilasi. Jika API tidak terjangkau, skrip pre-render otomatis menggunakan dataset cadangan lokal.

---

## 💡 5. Rekomendasi Menuju Produksi (Jangka Panjang)

Untuk lingkungan operasional resmi mall di masa mendatang setelah tahap demo:
1. **Pilihan A: Cloudflare Tunnel (Gratis & Domain Tetap)**  
   - Anda dapat menghubungkan server lokal kantor pengelola ke internet menggunakan Cloudflare Tunnel (*cloudflared*).
   - Menghasilkan subdomain tetap (misal: `api.plazakebunsayur.com`) tanpa biaya sewa IP publik dan tidak pernah berubah-ubah.
2. **Pilihan B: VPS Cloud Murah (Rekomendasi Terbaik)**  
   - Hosting backend Laravel & Filament di VPS Linux murah (seperti Biznet Gio, IDCloudHost, atau DigitalOcean mulai Rp 50.000–100.000/bulan).
   - Database tersimpan permanen di cloud dan online 24 jam sehari 7 hari seminggu tanpa bergantung pada laptop pengelola.
