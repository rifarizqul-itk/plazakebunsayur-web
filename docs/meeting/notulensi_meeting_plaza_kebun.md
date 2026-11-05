# Notulensi Meeting: Perancangan Fitur Aplikasi Plaza Kebun

|             |                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------- |
| **Tanggal** | Sabtu, 31 Oktober 2026                                                                            |
| **Topik**   | Presentasi dan review tampilan website publik serta portal admin Plaza Kebun (Plaza Kebun Sayur)  |
| **Pihak**   | Ibu dari pihak pengelola (pemberi masukan) dan tim pengembang (presenter)                         |
| **Sumber**  | Transkrip AI dari rekaman audio (dimulai di tengah pembahasan) dan catatan salah satu anggota tim |

> **Catatan sumber:** Rekaman dimulai setelah beberapa percakapan awal selesai, sehingga pembahasan bagian atas halaman Beranda mungkin tidak terekam penuh. Transkrip dibuat AI sehingga ada beberapa kemungkinan salah dengar (lihat bagian **Catatan Tambahan**).

---

## 1. Ringkasan Keputusan

1. **Sentra kuliner diganti fashion** (juga pada daftar kategori).
2. **Bagian kuliner di Beranda diganti oleh-oleh khas**, misalnya kain batik, pakaian adat, dan cenderamata.
3. **"Kios pilihan/rekomendasi unggulan" diganti promo** minggu ini atau bulan ini.
4. **Menu "Agenda" diganti nama menjadi "Informasi"**, karena isinya bukan hanya agenda, tapi juga promo.
5. **Foto di detail kios/produk dibuat bisa di-swipe**, dan jumlah fotonya ditambah.
6. **Fasilitas umum ditampilkan sebagai ikon** dengan label singkat dan tanpa penjelasan panjang.
7. **Upload foto perlu pembatasan resolusi** agar tampilan tidak lambat.
8. **Semua kios ditampilkan**, datanya diinput lewat portal admin.
9. **Versi final harus siap minggu depan**, dan sosialisasi dijadwalkan antara 14 dan 21 November.
10. **Edukasi portal admin dilakukan terpisah** dan khusus untuk Ibu.

---

## 2. Website Publik

### 2.1 Beranda

- **Cenderamata/oleh-oleh tradisional** berdiri sendiri, mencakup batu mulia, perhiasan, dan cenderamata.
- **Sentra kuliner diganti fashion.**
- **Informasi waktu dan petunjuk lokasi** tetap ada.
- **Bagian "kios pilihan/rekomendasi unggulan"** (rekomendasi toko per kategori) tidak dipakai. Gantinya adalah **promo minggu ini/bulan ini atau kegiatan**, karena tiap kios biasanya punya promo dan itu dinilai lebih menarik. Konten ini di-update bulanan atau mingguan.
- **Bagian kuliner di bagian bawah** diganti **oleh-oleh khas**: kain batik, pakaian adat, dan barang-barang yang dijual di kios depan.
- **Agenda/kegiatan mendatang** (event-event sebelumnya) tetap dipertahankan.
- **Sejarah dan perjalanan Plaza Kebun Sayur** tetap dipertahankan.

### 2.2 Menu Belanja

- **Daftar kios:** semua kios ditampilkan, bukan hanya kios inti.
- **Detail kios** berisi:
  - deskripsi singkat
  - lokasi (lantai dan blok)
  - chat penjual
  - **media sosial tetap ditampilkan** (TikTok, Instagram, atau lainnya). Kalau kios tidak punya, kolomnya dikosongkan atau tidak ditampilkan.
- **Kategori:** kategori kuliner diganti fashion. Isinya pakaian dan sejenisnya, dengan detail yang sama seperti kategori lain.
- **Foto:**
  - Saat ini baru satu foto per kios/produk.
  - **Perubahan:** foto bisa di-scroll atau di-swipe, dan Ibu menyetujui penambahan satu atau dua foto lagi.

### 2.3 Menu Informasi (sebelumnya "Agenda")

- **Nama menu diganti menjadi "Informasi."**
- **Isi:** agenda kegiatan dan promo Plaza yang sedang berlangsung, termasuk promo penjualan area.
- **Detail informasi** mencakup:
  - deskripsi
  - sorotan rangkaian acara (opsional)
  - tanggal, waktu, lokasi, dan ketentuan
  - narahubung acara
- **Pengelolaan:** menu ini yang paling sering di-update, misalnya untuk menambah informasi baru.

### 2.4 Menu Panduan

- **Informasi umum:** waktu dan alamat.
- **Aksesibilitas / panduan menuju lokasi** (dari bandara, pelabuhan, transportasi publik). Tim bertanya apakah perlu ditampilkan karena khawatir terlalu banyak konten. **Belum ada keputusan yang jelas** di rekaman.
- **Fasilitas umum** (toilet, area parkir, pos keamanan, food court, musala):
  - Ditampilkan dalam bentuk **ikon dengan label singkat** (misalnya "Musala", "Toilet").
  - Penjelasan tidak perlu panjang.
- **Tips berbelanja cerdas** (misalnya tawar-menawar) **tetap ada** sebagai edukasi pengunjung.
- **Tata tertib:** keamanan, kenyamanan dan kebersihan, kawasan tertib merokok, serta keamanan barang bawaan.
  - **Perubahan redaksi:** poin keamanan barang bawaan menekankan menjaga barang agar tidak tertinggal atau hilang.

### 2.5 Kontak

- **Informasi kontak resmi:** lokasi, nomor telepon, email, dan chat.
- **Form pesan/pertanyaan:** mengikuti kolom template (misalnya nama lengkap). Pesan yang dikirim **masuk ke portal admin**.
- **Email:**
  - Saat ini **hanya bisa satu email.** Ibu setuju memakai satu email dulu.
  - Pesan dari pengunjung yang mengirim lewat Gmail pribadi tetap masuk ke website/portal admin.
- **Footer:** halaman hukum dan privasi ada di pojok kanan bawah, dan Ibu menilai itu sudah sesuai kebiasaan.

### 2.6 Header dan Foto Gedung

- Header memuat foto Plaza Kebun Sayur dan **sudah ada foto gedung yang baru.**
- Tidak ada batasan dalam jumlah foto, diunggah terpisah lewat dashboard admin dan bisa diganti.

---

## 3. Portal Admin

Fitur yang didemokan:

| Bagian                                           | Fungsi                                                                            |
| ------------------------------------------------ | --------------------------------------------------------------------------------- |
| **Rute akses kunjungan** (panduan menuju lokasi) | Bisa diedit, misalnya hanya dua lokasi, dan bisa menambah rute.                   |
| **Tata tertib**                                  | Bisa diedit dan ditambah.                                                         |
| **Halaman hukum dan privasi**                    | Bisa diedit.                                                                      |
| **Menu navigasi** (header atas dan bawah)        | Urutan dan nama menu bisa diubah.                                                 |
| **Tips belanja**                                 | Bisa diedit.                                                                      |
| **Daftar kategori, lantai, dan kios**            | Bisa ditambah atau diubah.                                                        |
| **Pesan masuk**                                  | Bisa ditinjau dan dibalas.                                                        |
| **Daftar fasilitas**                             | Bisa diedit.                                                                      |
| **Daftar agenda dan acara**                      | Bisa ditambah, diedit, dan **dihapus** (misalnya berita lama yang sudah selesai). |
| **Pengaturan informasi gedung**                  | Nomor WhatsApp, jam operasional, alamat, email, dan tautan Google Maps.           |
| **Foto header, logo mall, dan deskripsi footer** | Diedit dari dashboard.                                                            |

**Kolom saat menambah/mengedit informasi:** judul, kategori informasi, tanggal mulai, tanggal selesai, banner kegiatan (jika ada foto), ringkasan singkat, dan detail lengkap.

**Masalah yang diketahui:**

- Edit "panduan menuju lokasi" di portal admin **belum ter-update ke website publik** karena ada error saat demo. Seharusnya hasil akhirnya bisa berubah, tapi masih perlu diperbaiki.

**Edukasi admin:**

- Portal admin punya banyak fitur sehingga perlu **edukasi/pelatihan lebih detail** atau portal admin UI atau UX-nya dapat dipermudah lagi tanpa harus mengurangi opsi editing website publik.
- Penerima edukasi adalah **Ibu langsung**, bukan staf atau pedagang.

---

## 4. Data Kios

- **Semua kios ditampilkan.**
- **Kendala data awal:** Excel sebelumnya (data ruangan) kebanyakan berisi nama pemilik, bukan penyewa atau jenis jualannya. Nomor kios sama, tapi jualannya kadang berbeda.
- **Cara input:** manual per kios lewat portal admin, **bukan lewat Excel.**
- **Siapa yang menginput:** tim pengembang atau Ibu, keduanya bisa.
- **Data yang perlu dicari bersama** untuk tiap kios: kontak, media sosial, dan jenis jualan.
- **Alasan urgensi:** data kios harus sudah ada saat sosialisasi agar pedagang bisa melihat sendiri.

---

## 5. Sosialisasi

- **Waktu:**
  - Tim awalnya mengusulkan **7 November** untuk input data dan sosialisasi dalam bulan ini. Ibu menyatakan **input data sempat** pada tanggal itu.
  - Ibu menyarankan sosialisasi tidak terburu-buru dan lebih baik dimaksimalkan, dengan **tanggal 14 November** dianggap aman.
  - Kesimpulan: tim akan menginformasikan lagi tanggalnya, **di antara 14 dan 21 November.**
- **Materi:** sosialisasi menampilkan **website publik**, yaitu upaya Plaza Kebun Sayur mempromosikan area ini dan apa saja yang ditampilkan. Portal admin tidak disosialisasikan ke umum.
- **Peserta:**
  - Undangan bersifat **umum untuk pedagang Plaza Kebun Sayur**, tanpa menyebut nama kios.
  - Semua pihak yang kemarin didatangi boleh diundang.
  - Undangan dibagikan bersama oleh **satu atau dua orang dari tim mahasiswa dan dari pengelola.**

---

## 6. Action Items

| #   | Tugas                                                                   | Penanggung jawab            | Target                          |
| --- | ----------------------------------------------------------------------- | --------------------------- | ------------------------------- |
| 1   | Ganti "sentra kuliner" jadi fashion (Beranda dan kategori)              | Tim pengembang              | Minggu depan                    |
| 2   | Ganti bagian kuliner bawah jadi oleh-oleh khas                          | Tim pengembang              | Minggu depan                    |
| 3   | Ganti "kios pilihan/rekomendasi" jadi promo minggu/bulan ini            | Tim pengembang              | Minggu depan                    |
| 4   | Ganti nama menu "Agenda" jadi "Informasi"                               | Tim pengembang              | Minggu depan                    |
| 5   | Foto detail kios bisa di-swipe, tambah 1–2 foto                         | Tim pengembang              | Minggu depan                    |
| 6   | Fasilitas jadi ikon + label singkat                                     | Tim pengembang              | Minggu depan                    |
| 7   | Revisi redaksi "keamanan barang bawaan"                                 | Tim pengembang              | Minggu depan                    |
| 8   | Batasi resolusi/ukuran upload foto                                      | Tim pengembang              | Minggu depan                    |
| 9   | Perbaiki bug: edit panduan lokasi belum ter-update di website publik    | Tim pengembang              | Minggu depan                    |
| 10  | Kumpulkan dan input data kios (kontak, media sosial, jualan)            | Tim pengembang dan Ibu      | Input data diusulkan 7 November |
| 11  | Siapkan versi final berisi hasil revisi dan data tenant untuk dicek Ibu | Tim pengembang              | Minggu depan                    |
| 12  | Tentukan dan informasikan tanggal sosialisasi                           | Tim pengembang              | Rentang 14–21 November          |
| 13  | Siapkan undangan umum untuk pedagang (maks. 50 peserta)                 | Tim mahasiswa dan pengelola | Sebelum sosialisasi             |
| 14  | Edukasi portal admin untuk Ibu                                          | Tim pengembang              | Setelah final                   |

---

## 7. Hal yang Belum Diputuskan

- **Panduan menuju lokasi** (dari bandara/pelabuhan/transportasi publik): apakah ditampilkan atau tidak.
- **Tanggal sosialisasi** yang pasti.
- **Dukungan lebih dari satu email kontak:** untuk sekarang tetap satu.

---

## 8. Catatan Tambahan: Kemungkinan Salah Dengar pada Transkrip

Transkrip dibuat otomatis oleh AI, jadi beberapa bagian di bawah ini sebaiknya dicek ulang ke rekaman audio. Isi notulensi di atas sudah memakai interpretasi yang paling masuk akal.

| Waktu | Teks di transkrip                                         | Kemungkinan maksud                                                                         |
| ----- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 01:53 | "event-event kemarin di **Bunsai**"                       | Mungkin "bonsai" atau nama event lain.                                                     |
| 03:45 | "**Selasa saja**" (soal media sosial kios yang tidak ada) | Mungkin "kosongkan saja".                                                                  |
| 09:37 | "**root** akses kunjungan"                                | Mungkin "rute akses kunjungan".                                                            |
| 04:34 | "**puternya** lagi di bawah"                              | Tidak jelas, kemungkinan istilah untuk bagian tampilan (misalnya "putar" atau "carousel"). |
| 16:30 | "**kode** punya media sosial"                             | Mungkin "kontak, punya media sosial".                                                      |
| 16:57 | "yang soal **AR** itu ya ruangan"                         | Tidak jelas. Konteksnya data Excel ruangan yang berisi nama pemilik.                       |
| 19:00 | "tanggal 14 oke. **Tanggal 11** oke"                      | Kemungkinan "21", karena setelahnya tim menyebut rentang 14–21.                            |
| 18:47 | "**Sabtu ini**" (setelah menyebut 7 November)             | Bisa berarti Sabtu minggu depan (7 November) atau hari meeting.                            |
| Umum  | "Plaza Kebun" dan "Plaza Kebun Sayur"                     | Dipakai bergantian. Nama resmi sebaiknya dikonfirmasi.                                     |

**Perbedaan dengan catatan anggota tim yang perlu diperhatikan:**

- Catatan "sosialisasi tanggal 14" sebenarnya masih berupa rentang 14–21 November yang akan dikonfirmasi lagi.
- Catatan "fasilitas bentuk icon saja" di transkrip masih disertai label teks singkat.
- Catatan "edukasi admin" di transkrip ditujukan khusus ke Ibu.
