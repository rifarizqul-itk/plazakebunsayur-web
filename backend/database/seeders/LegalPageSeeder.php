<?php

namespace Database\Seeders;

use App\Models\LegalPage;
use Illuminate\Database\Seeder;

class LegalPageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $privacyBody = <<<'HTML'
<h2>1. Pendahuluan &amp; Prinsip Perlindungan Data</h2>
<p>Pengelola Plaza Kebun Sayur Balikpapan berkomitmen penuh untuk menghormati, menjaga kerahasiaan, dan melindungi hak privasi setiap pengunjung situs direktori resmi ini.</p>
<p>Dokumen Kebijakan Privasi ini menjelaskan bagaimana data dan informasi pribadi Anda dikumpulkan, digunakan, disimpan, dan dilindungi saat mengakses portal web serta layanan informasi digital kami, sejalan dengan prinsip transparansi hukum Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).</p>

<h2>2. Data Pribadi yang Kami Kumpulkan</h2>
<p>Kami hanya mengumpulkan data yang relevan dan terbatas sesuai tujuan operasional direktori:</p>
<ul>
    <li><strong>Data yang Diberikan Secara Sukarela:</strong> Saat Anda mengirimkan pesan melalui formulir pada halaman Kontak, data yang dikirimkan meliputi nama lengkap, nomor telepon (WhatsApp), alamat surat elektronik (email), dan isi pesan/pertanyaan Anda.</li>
    <li><strong>Data Teknis &amp; Akses:</strong> Informasi standar log peladen peramban web seperti alamat protokol internet (IP address), jenis perangkat keras, jenis peramban web, serta stempel waktu kunjungan untuk keperluan pemeliharaan stabilitas server dan keamanan infrastruktur situs.</li>
    <li><strong>Interaksi Tautan Eksternal WhatsApp:</strong> Saat Anda menekan tombol "Chat Penjual" atau "WhatsApp Pengelola", Anda akan dialihkan ke layanan pihak ketiga (WhatsApp by Meta). Kami tidak menyimpan isi percakapan pribadi atau rincian transaksi jual beli yang Anda lakukan secara langsung dengan pedagang.</li>
</ul>

<h2>3. Tujuan Pemrosesan Data</h2>
<p>Data yang dikumpulkan hanya diproses untuk tujuan-tujuan yang sah, yaitu:</p>
<ul>
    <li>Menanggapi pertanyaan, permintaan bantuan sewa ruang pameran, atau pengaduan fasilitas gedung yang Anda sampaikan.</li>
    <li>Memastikan keamanan teknis sistem situs dari percobaan serangan siber, akses tidak sah, dan aktivitas otomatis yang berbahaya (bot/spam).</li>
    <li>Menganalisis pola keterbacaan direktori kios dan kuliner secara agregat tanpa mengidentifikasi profil individu secara spesifik, guna meningkatkan kenyamanan navigasi pengunjung.</li>
</ul>

<h2>4. Keamanan &amp; Kerahasiaan Data</h2>
<p>Kami menerapkan langkah-langkah teknis dan organisasional yang memadai guna mencegah kehilangan, penyalahgunaan, atau pengubahan data pribadi:</p>
<ul>
    <li>Seluruh transmisi data dienkripsi menggunakan protokol aman Transport Layer Security (HTTPS/TLS).</li>
    <li>Akses terhadap pesan masuk pada sistem hanya diberikan kepada staf pengelola gedung yang berwenang.</li>
    <li>Kami tidak pernah memperjualbelikan, menyewakan, atau membagikan data kontak Anda kepada pihak ketiga mana pun untuk tujuan promosi komersial atau telemarketing.</li>
</ul>

<h2>5. Hak Anda sebagai Subjek Data Pribadi</h2>
<p>Sesuai Bab IV UU PDP Nomor 27 Tahun 2022, Anda memiliki hak-hak hukum berikut:</p>
<ul>
    <li><strong>Hak Akses:</strong> Mendapatkan konfirmasi dan informasi mengenai data pribadi Anda yang tersimpan di sistem kami.</li>
    <li><strong>Hak Koreksi:</strong> Meminta perbaikan data pribadi Anda jika terjadi kekeliruan atau ketidaklengkapan.</li>
    <li><strong>Hak Penghapusan (Right to Erasure):</strong> Meminta penghapusan riwayat data pesan atau kontak yang pernah Anda kirimkan.</li>
    <li><strong>Hak Penarikan Persetujuan:</strong> Menarik kembali persetujuan pemrosesan data pribadi yang sebelumnya telah diberikan.</li>
</ul>
<p>Untuk menggunakan hak-hak tersebut, Anda dapat menghubungi kantor manajemen pengelola melalui saluran kontak resmi yang tercantum di bagian akhir dokumen ini.</p>

<h2>6. Penggunaan Cookie &amp; Penyimpanan Lokal</h2>
<p>Situs ini hanya menggunakan cookie teknis esensial atau penyimpanan lokal peramban (Local Storage) untuk mengingat preferensi filter direktori kios dan kinerja navigasi. Situs ini tidak menggunakan cookie pelacak iklan pihak ketiga (third-party advertising trackers) yang memantau riwayat lintas situs Anda.</p>

<h2>7. Perubahan atas Kebijakan Privasi</h2>
<p>Pengelola Plaza Kebun Sayur dapat memperbarui dokumen kebijakan ini sewaktu-waktu guna menyesuaikan dengan perkembangan regulasi perundang-undangan atau penambahan fitur layanan situs. Setiap perubahan akan dicantumkan pada halaman ini dengan mencantumkan tanggal revisi terbaru di bagian atas.</p>
HTML;

        $termsBody = <<<'HTML'
<h2>1. Penerimaan Ketentuan</h2>
<p>Selamat datang di situs resmi Plaza Kebun Sayur (<a href="https://plazakebunsayur.com">plazakebunsayur.com</a>). Dengan mengakses, menjelajahi, atau memanfaatkan fitur direktori pada situs ini, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui untuk terikat oleh seluruh Syarat &amp; Ketentuan Penggunaan ini.</p>
<p>Jika Anda tidak menyetujui bagian mana pun dari ketentuan ini, Anda disarankan untuk tidak melanjutkan penggunaan situs ini.</p>

<h2>2. Peran &amp; Ruang Lingkup Layanan</h2>
<p>Situs ini dikelola sebagai portal profil komersial resmi dan direktori pedagang bagi pusat perniagaan Plaza Kebun Sayur, Balikpapan Barat. Fungsi utama situs ini adalah:</p>
<ul>
    <li>Menyediakan katalog informasi kios perhiasan, batu permata mulia, cinderamata etnik Dayak, kain batik khas Kalimantan, serta warung kuliner tradisional.</li>
    <li>Menyajikan informasi denah lantai, fasilitas umum gedung (toilet, musholla, pos satpam, ATM), dan panduan akses transportasi pengunjung.</li>
    <li>Mempublikasikan agenda pameran budaya, kontes batu akik Borneo, dan penawaran promo resmi gedung.</li>
    <li>Menghubungkan pengunjung secara langsung dengan kontak WhatsApp resmi masing-masing pedagang atau kantor pengelola gedung.</li>
</ul>

<h2>3. Ketentuan Transaksi &amp; Interaksi Kios (Pernyataan Pelepasan Tanggung Jawab)</h2>
<p>Harap diperhatikan dengan saksama mengenai batasan layanan komersial kami:</p>
<ul>
    <li><strong>Bukan Platform E-Commerce:</strong> Situs ini bukan toko daring (marketplace) dan tidak memproses pembayaran elektronik, rekening bersama (escrow), maupun jasa pengiriman barang secara langsung.</li>
    <li><strong>Transaksi Independen:</strong> Segala bentuk tawar-menawar, kesepakatan harga perhiasan, sertifikasi batu mulia, maupun metode pembayaran dilakukan secara mandiri antara pengunjung dan pemilik kios, baik saat bertatap muka di toko fisik maupun melalui percakapan WhatsApp.</li>
    <li><strong>Ketiadaan Komisi:</strong> Pengelola Plaza Kebun Sayur tidak memungut komisi atau bagian persentase dari transaksi jual-beli antara pedagang dan pembeli.</li>
</ul>

<h2>4. Hak Kekayaan Intelektual</h2>
<p>Seluruh materi yang terdapat pada situs ini, mencakup namun tidak terbatas pada struktur direktori, desain antarmuka, teks penjelasan, logo Plaza Kebun Sayur, dan dokumentasi foto adalah milik pengelola Plaza Kebun Sayur atau pemegang lisensi terkait yang dilindungi undang-undang hak cipta Republik Indonesia.</p>
<p>Pengguna dilarang menyalin, mendistribusikan ulang, mereproduksi, atau memanfaatkan konten situs ini untuk kepentingan komersial pihak ketiga tanpa persetujuan tertulis dari pihak pengelola.</p>

<h2>5. Batasan Penggunaan yang Wajar</h2>
<p>Dalam menggunakan situs ini, Anda setuju untuk tidak:</p>
<ul>
    <li>Melakukan penambangan data massal otomatis (automated scraping atau bot crawling) yang mengganggu stabilitas beban peladen situs.</li>
    <li>Mengirimkan pesan spam, muatan berbahaya, ancaman, atau pesan penipuan melalui formulir Kontak.</li>
    <li>Menyalahgunakan nomor kontak pedagang yang tertera untuk tujuan telemarketing tanpa izin, pelecehan, atau penipuan.</li>
    <li>Mencoba memperoleh akses tidak sah ke sistem peladen (server) atau basis data pengelola.</li>
</ul>

<h2>6. Batasan Tanggung Jawab (Limitation of Liability)</h2>
<p>Pengelola senantiasa berupaya menyajikan informasi direktori, nomor kios, dan jadwal operasional yang akurat serta mutakhir. Kendati demikian:</p>
<ul>
    <li>Pengelola tidak menjamin bahwa informasi jam buka kios atau ketersediaan stok barang tertentu selalu identik setiap hari, mengingat keputusan jam buka individual berada di bawah kendali masing-masing pedagang.</li>
    <li>Pengelola tidak bertanggung jawab atas kerugian materiil maupun immateriil yang timbul akibat perselisihan kesepakatan jual-beli independen antara pengunjung dan pedagang di luar gedung mall.</li>
</ul>

<h2>7. Hukum yang Berlaku &amp; Penyelesaian Sengketa</h2>
<p>Syarat &amp; Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum Negara Kesatuan Republik Indonesia. Setiap perselisihan yang timbul sehubungan dengan penggunaan situs ini akan diselesaikan secara musyawarah untuk mufakat terlebih dahulu, dan bila tidak tercapai titik temu, akan diselesaikan melalui yurisdiksi pengadilan yang berwenang di Kota Balikpapan.</p>
HTML;

        LegalPage::updateOrCreate(
            ['slug' => 'kebijakan-privasi'],
            [
                'title' => 'Kebijakan Privasi',
                'intro' => 'Komitmen Plaza Kebun Sayur dalam melindungi data pribadi pengunjung dan transparansi pemrosesan data sesuai Undang-Undang No. 27 Tahun 2022 (UU PDP).',
                'body' => $privacyBody,
                'updated_label' => '11 Oktober 2026',
            ]
        );

        LegalPage::updateOrCreate(
            ['slug' => 'syarat-ketentuan'],
            [
                'title' => 'Syarat & Ketentuan',
                'intro' => 'Ketentuan penggunaan portal direktori komersial dan layanan informasi publik Plaza Kebun Sayur Balikpapan.',
                'body' => $termsBody,
                'updated_label' => '11 Oktober 2026',
            ]
        );
    }
}
