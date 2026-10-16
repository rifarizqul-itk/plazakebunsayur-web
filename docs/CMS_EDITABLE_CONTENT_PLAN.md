# Plan: Semua Konten Web Publik Bisa Diedit dari Dashboard Admin

> Dokumen ini ditulis untuk dieksekusi oleh AI/developer lain. Jangan mengerjakan di luar scope ini.
> Baca dulu: `DESIGN.md`, `docs/SPECIFICATION.md`, `backend/app/Models/SiteSetting.php`, `backend/app/Filament/Resources/SiteSettings/`.

## 0. Tujuan & Prinsip

**Tujuan:** Pengelola (non-IT) dapat mengubah setiap teks, gambar, daftar, dan dokumen hukum di web publik hanya lewat Filament (`/admin`), tanpa menyentuh codebase.

**Prinsip wajib:**
1. **Default di kode tetap ada.** Setiap nilai CMS punya fallback hardcoded. Jika API mati / key kosong, situs tetap tampil normal.
2. **Tata letak, warna, font, struktur menu tetap di kode** (di luar scope).
3. **Form admin harus aman untuk orang awam:** label Bahasa Indonesia, helper text, `maxLength`, validasi rasio/ukuran gambar, preview bila memungkinkan.
4. **Ikuti DESIGN.md** (token, tanpa gaya generik). Tidak boleh mengubah tampilan visual saat data = default.
5. Lint 0 error/0 warning (`npm run lint`), build sukses (`npm run build`), `ddev artisan test` hijau.
6. Semua perintah backend lewat DDEV: `ddev artisan ...` dijalankan dari folder `backend/` (Filament **v5**: `Filament\Schemas\Schema`, `Filament\Tables\Table`).
7. Jangan hapus komentar/docstring yang tidak terkait perubahan.

## 1. Inventaris Hardcoded (hasil audit)

| Area | Berkas | Yang dipindah ke CMS |
|---|---|---|
| Hero Beranda | `frontend/src/components/home/HeroSection.jsx` (388 baris) | eyebrow, judul, subjudul, label tombol CTA, foto latar |
| Sejarah | `.../home/HistorySection.jsx` | judul, paragraf, foto |
| Unggulan | `.../home/FeaturedSection.jsx` | judul & deskripsi section |
| Beranda lain | `frontend/src/pages/Home.jsx` | judul/deskripsi section & quick access |
| Header halaman | `PageHeader` di tiap page (Belanja, Kuliner, Agenda, Kontak, Panduan, dst.) | eyebrow, title, description |
| Footer | `components/layout/Footer.jsx` | deskripsi mall, tagline, teks kantor pengelola |
| Panduan Kunjungan | `frontend/src/content/visitGuide.js` (`ACCESS_ROUTES`, `SHOPPING_TIPS`, `BUILDING_RULES`) + paragraf di `PlanYourVisit.jsx` | semua daftar + paragraf jam buka/alamat |
| Privasi | `pages/PrivacyPolicy.jsx` | seluruh pasal + tanggal pembaruan |
| Syarat & Ketentuan | `pages/TermsConditions.jsx` | seluruh pasal + tanggal pembaruan |
| Aset statis | `frontend/public/assets/*` (logo, foto gedung) | logo, foto hero, foto sejarah, OG image |
| SEO meta | `frontend/scripts/prerender.js` + `<title>` per halaman | title & description per halaman |
| Mock | `frontend/src/data/mockData.js` | hanya DEV; tambah mock untuk endpoint baru |

> Catatan: `prerender.js` hanya menyuntik **meta tag/JSON-LD** ke HTML statis; body dirender di klien. Jadi dampak SEO konten CMS hanya pada meta.

Sudah editable (jangan diulang): tenants, categories, floors, facilities, whats_on (+time/location/admission/highlights), contact_messages, `site_settings` (6 key).

## 2. Arsitektur

### 2.1 Tingkat 1 — `page_contents` (key-value teks & gambar)
Tabel baru `page_contents`:
- `id`, `key` (string, unique, mis. `home.hero.title`), `value` (text nullable), `type` (`text|textarea|image|url`), `group` (string, mis. `home`, `footer`), `label` (string, label tampil di admin), `help` (string nullable), `order_index`, timestamps.
- Model `App\Models\PageContent` dengan `defaults()` statis: array lengkap semua key beserta `type/group/label/help/default value` (nilai default = teks hardcoded saat ini, **disalin persis**). Pola mengikuti `SiteSetting`.
- Seeder idempotent (`updateOrCreate` hanya mengisi key yang belum ada; tidak menimpa edit admin).
- Endpoint `GET /api/page-contents` → `{ success, data: { "home.hero.title": "...", ... } }`. Gambar dikembalikan sebagai URL absolut (`Storage::disk('public')->url`). Hanya key yang terdaftar di `defaults()` yang dikembalikan. Cache 60 dtk + invalidate saat save.
- Filament: `PageContentResource` (grup menu **"Konten Website"**). Pendekatan UX: halaman edit satu form per `group` (Tabs: Beranda, Header Halaman, Footer, Panduan, Aset). Komponen per `type`: `TextInput` (maxLength), `Textarea`, `FileUpload` (disk `public`, dir `page-contents`, `image()`, maxSize 5 MB, `imageEditor`, helper rasio). Gunakan custom Filament Page dengan Schema dinamis dari `PageContent::defaults()`, bukan CRUD per baris.
- Frontend: `frontend/src/services/api.js` tambah `fetchPageContents()` (pola sama dengan `fetchSiteSettings`: mock saat DEV, throw di prod). Buat `ContentProvider` (context) di `App.jsx` yang fetch sekali, plus hook `useContent(key, fallback)` dan helper `useContentImage(key, fallback)`. Ganti string hardcoded di komponen pada tabel §1 dengan `useContent('home.hero.title', 'Teks lama')`. **Fallback wajib = teks lama persis.**

### 2.2 Tingkat 2 — Daftar dinamis (resource sendiri, bisa tambah/hapus/urut)
Tabel + model + Filament Resource + API (pola sama dengan `Facility`; `order_index`, `is_active`, `->reorderable('order_index')`):
- `access_routes` (title, distance, description) → menggantikan `ACCESS_ROUTES`
- `shopping_tips` (title, description) → `SHOPPING_TIPS`
- `building_rules` (title, description) → `BUILDING_RULES`
- `home_highlights` (title, description, icon/gambar opsional, link opsional) — hanya jika Home.jsx memang memuat daftar sorotan; verifikasi dulu di `Home.jsx`/`FeaturedSection.jsx`, jangan mengada-ada.
- Endpoint publik: `GET /api/visit-guide` → `{ access_routes: [], shopping_tips: [], building_rules: [] }` (satu request untuk halaman Panduan) dan `GET /api/home-highlights` bila dipakai.
- Seeder mengisi dari isi `visitGuide.js` saat ini. Setelah frontend terhubung, `visitGuide.js` dijadikan **fallback saja** (jangan dihapus).

### 2.3 Tingkat 3 — Halaman hukum (rich text)
Tabel `legal_pages`: `id`, `slug` (`kebijakan-privasi`, `syarat-ketentuan`, unique), `title`, `intro` (text), `body` (longText, HTML dari RichEditor), `updated_label` (date, "terakhir diperbarui"), timestamps.
- Filament `LegalPageResource` dengan `RichEditor` (toolbar dibatasi: heading h2/h3, bold, italic, bullet/ordered list, link, undo/redo). Tidak ada tombol hapus; hanya Edit. Seed dua halaman dengan isi dari `PrivacyPolicy.jsx` / `TermsConditions.jsx` yang sekarang dikonversi ke HTML.
- `GET /api/legal-pages/{slug}`.
- **Keamanan XSS (wajib):** sanitasi HTML di backend saat simpan atau saat output (mis. `mews/purifier` / `HTMLPurifier`, whitelist tag sesuai toolbar). Di frontend render dengan `dangerouslySetInnerHTML` hanya pada HTML yang sudah disanitasi; tambahkan class tipografi yang sesuai DESIGN.md (`max-w-3xl`, `text-text-secondary`, heading `text-text-primary`, dst.) lewat wrapper, bukan inline style dari editor.
- Frontend: `PrivacyPolicy.jsx` & `TermsConditions.jsx` fetch via `fetchLegalPage(slug)`; fallback = konten hardcoded saat ini (pertahankan sebagai konstanta). Kotak kontak di bawah tetap memakai `site_settings`.

### 2.4 Aset & logo
Key `page_contents` bertipe `image`: `brand.logo`, `home.hero.image`, `home.history.image`, `seo.default_og_image`. Frontend memakai URL CMS bila ada, jika tidak jatuh ke `/assets/...` saat ini. Logo di footer memakai filter `brightness-0 invert`; pertahankan.

### 2.5 SEO meta per halaman
Key `seo.<page>.title` & `seo.<page>.description` untuk: home, belanja, kuliner, agenda, panduan-kunjungan, kontak, kebijakan-privasi, syarat-ketentuan.
- Runtime: komponen kecil `useDocumentMeta` (set `document.title` + meta description) membaca key tersebut.
- Build-time: `frontend/scripts/prerender.js` fetch `GET /api/page-contents` (pola sama dengan `fetchTenants` di file itu, fallback ke default bila API tak terjangkau) dan memakai nilainya di `injectMeta`.

### 2.6 Rebuild statis setelah edit (hosting demo: Netlify gratis; backend DDEV di laptop via `ddev share`)
- Tambah ke `.env.example` backend: `FRONTEND_DEPLOY_HOOK_URL=` (opsional; untuk Netlify = **Build Hook URL**, `https://api.netlify.com/build_hooks/<id>`, dibuat di Netlify → Site settings → Build & deploy → Build hooks).
- Filament: tombol header **"Terbitkan Perubahan ke Website"** di halaman Konten Website, `requiresConfirmation()`, melakukan `Http::post(FRONTEND_DEPLOY_HOOK_URL)` dan menampilkan notifikasi sukses/gagal. Bila env kosong, tombol disembunyikan dan helper text menjelaskan bahwa perubahan konten (selain meta SEO) sudah langsung tampil tanpa rebuild.
- **Batasan arsitektur demo (wajib didokumentasikan di `PANDUAN_ADMIN.md` dan README):**
  1. `VITE_API_URL` ditanam saat build Netlify. URL `ddev share` berubah tiap sesi (terutama ngrok gratis), sehingga setiap URL baru → update env `VITE_API_URL` di Netlify lalu trigger build ulang. Sediakan `docs/DEMO_PUBLISH.md` berisi langkah: `ddev share` → salin URL → set env Netlify (UI atau `netlify env:set`) → trigger build hook.
  2. Build Netlify memanggil API saat prerender; jika laptop mati, `prerender.js` harus **fallback ke default tanpa gagal** (pola sudah ada untuk tenants — pertahankan, build tidak boleh error).
  3. Jika `ddev share` memakai ngrok gratis, fetch dari browser dapat terblokir halaman peringatan ngrok. Frontend harus mengirim header `ngrok-skip-browser-warning: 1` pada semua fetch ke API (satu helper fetch di `api.js`; tidak mengubah perilaku produksi) dan CORS backend (`config/cors.php`) harus mengizinkan origin Netlify + header tersebut.
  4. Saat laptop/backend mati, web publik menampilkan **konten default (fallback)**, bukan hasil edit admin. Wajar untuk demo; catat di panduan.
  5. Rekomendasi jangka menengah (cukup dicatat di docs, jangan dikerjakan sekarang): URL backend stabil (Cloudflare Tunnel dengan subdomain tetap, atau VPS murah) agar tidak perlu update env tiap sesi.

## 3. Urutan Pengerjaan (fase, tiap fase = commit terpisah)

**Fase A — Fondasi `page_contents`**
1. Migration, model `PageContent` + `defaults()` lengkap (salin teks dari komponen di §1; buka tiap berkas untuk inventaris akurat).
2. Seeder idempotent + daftarkan di `DatabaseSeeder`.
3. Controller + route `GET /api/page-contents` + cache.
4. Filament custom page "Konten Website" (tab per group, field per type, upload gambar).
5. Test: `PageContentApiTest` (defaults dikembalikan, update tercermin, key asing tidak bocor, gambar jadi URL absolut).

**Fase B — Frontend binding Tingkat 1**
1. `fetchPageContents`, mock di `mockData.js`, `ContentProvider`, `useContent`.
2. Ganti string di Hero, History, Featured, Home, Footer, semua `PageHeader`, aset logo/hero/sejarah.
3. Verifikasi visual identik dengan default (screenshot sebelum/sesudah via Puppeteer MCP).

**Fase C — Daftar dinamis (Tingkat 2)**
Migration/model/resource/seeder/API untuk 3 daftar (+ highlights jika terverifikasi), `GET /api/visit-guide`, refactor `PlanYourVisit.jsx` (fallback ke `visitGuide.js`). Test API per endpoint.

**Fase D — Halaman hukum (Tingkat 3)**
`legal_pages` + sanitasi HTML + RichEditor + API + refactor dua halaman. Test: HTML berbahaya (`<script>`, `onerror`) dibersihkan.

**Fase E — SEO & publish**
Key `seo.*`, `useDocumentMeta`, update `prerender.js`, tombol "Terbitkan Perubahan", dokumentasi hook.

**Fase F — Dokumentasi & QA**
1. Update `docs/SPECIFICATION.md` (skema DB, endpoint baru §9+, struktur direktori) dan `docs/TASKS.md`.
2. Buat `docs/PANDUAN_ADMIN.md` berbahasa Indonesia untuk pengelola non-IT: login, tiap menu, cara ganti teks/foto/agenda, batasan ukuran gambar, tombol Terbitkan, apa yang TIDAK bisa diubah.
3. Jalankan: `ddev artisan test`, `npm run lint`, `npm run build`. Uji manual: ubah tiap grup di admin → muncul di web; kosongkan nilai → fallback tampil; matikan backend → situs produksi tetap tampil dengan default.

## 4. Kriteria Selesai (Definition of Done)
- [ ] Tidak ada teks/gambar konten di komponen yang tidak melalui `useContent`/API/fallback (cek dengan grep string lama).
- [ ] Mengubah nilai di admin tercermin di web publik tanpa deploy kode (kecuali meta SEO statis → tombol Terbitkan).
- [ ] Nilai default = tampilan sekarang (tidak ada regresi visual).
- [ ] Backend test hijau; lint 0/0; build + prerender sukses.
- [ ] HTML halaman hukum tersanitasi dan teruji.
- [ ] `docs/PANDUAN_ADMIN.md` selesai, dapat dipahami non-IT.

## 5. Risiko & Mitigasi
| Risiko | Mitigasi |
|---|---|
| Admin salah input (teks kepanjangan, gambar salah rasio) | `maxLength`, validasi, helper text, image editor, rasio terdokumentasi |
| Backend mati → halaman kosong | fallback hardcoded di semua `useContent`/fetch |
| XSS dari rich text | sanitasi whitelist di backend + toolbar dibatasi |
| Admin merusak kata kunci sistem | key tidak bisa diedit/dihapus; hanya `value` |
| Meta SEO usang | tombol Terbitkan + deploy hook |
| Scope melebar ke desain/layout | di luar scope; tolak, catat di `docs/TASKS.md` |

## 6. Keputusan User (sudah final, tidak perlu ditanyakan lagi)
- Hosting demo: **Netlify gratis**; backend dinyalakan manual di laptop via `ddev share` (lihat §2.6).
- **Menu navbar harus bisa diedit** (lihat §2.7).

### 2.7 Menu Navbar (& link footer) bisa diedit
Tabel `nav_items`: `id`, `label`, `path` (mis. `/belanja` atau URL eksternal), `location` (`header|footer`), `is_external` (bool), `order_index`, `is_active`, `is_cta` (bool, untuk tombol sorot di navbar bila ada), timestamps.
- Filament `NavItemResource` (grup "Konten Website"): reorderable, toggle aktif, validasi `path` (harus diawali `/` untuk internal, atau `https://` untuk eksternal). **Peringatan di helper text:** path internal hanya boleh salah satu rute yang ada (`/`, `/belanja`, `/kuliner`, `/agenda`, `/panduan-kunjungan`, `/kontak`, `/kebijakan-privasi`, `/syarat-ketentuan`); gunakan `Select` berisi rute valid + opsi "URL eksternal". Menu **tidak bisa membuat halaman baru** (halaman baru = kerja developer).
- `GET /api/nav-items` → `{ header: [...], footer: [...] }` (hanya aktif, terurut).
- Frontend: `Navbar.jsx` & kolom link di `Footer.jsx` membaca dari `ContentProvider`; fallback = daftar link hardcoded sekarang (pertahankan sebagai konstanta). Link internal pakai `<Link>`; eksternal `<a target="_blank" rel="noopener noreferrer">`. Perilaku mobile menu & state aktif tidak boleh berubah.
- Seeder mengisi dari link yang ada di `Navbar.jsx`/`Footer.jsx` saat ini (baca file untuk daftar akurat).
- Tambahkan ke Fase C. Test: urutan, filter aktif, validasi path.
