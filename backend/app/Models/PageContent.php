<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class PageContent extends Model
{
    use HasFactory;

    protected $table = 'page_contents';

    protected $guarded = [];

    protected static function booted(): void
    {
        static::saved(function () {
            Cache::forget('api_page_contents');
        });

        static::deleted(function () {
            Cache::forget('api_page_contents');
        });
    }

    /**
     * Complete list of all supported CMS keys with metadata & hardcoded defaults.
     */
    public static function defaults(): array
    {
        return [
            // --- Group: Beranda ---
            'home.hero.eyebrow' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Hero: Label Atas (Eyebrow)',
                'help' => 'Teks kecil di atas judul utama beranda.',
                'default' => 'Sentra Kerajinan Tradisional & Batu Mulia Balikpapan',
            ],
            'home.hero.title' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Hero: Judul Utama',
                'help' => 'Judul besar pembuka beranda mall.',
                'default' => 'Pusat Cinderamata & Pesona Budaya Borneo',
            ],
            'home.hero.subtitle' => [
                'type' => 'textarea',
                'group' => 'home',
                'label' => 'Hero: Deskripsi Pembuka',
                'help' => 'Paragraf pengantar di bawah judul hero.',
                'default' => 'Temukan koleksi batu akik, permata langka, kerajinan etnik Dayak, kain batik khas, dan kuliner tradisional Kalimantan Timur di jantung Balikpapan Barat.',
            ],
            'home.hero.cta_primary' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Hero: Teks Tombol Utama',
                'help' => 'Label tombol aksi pertama (menuju direktori belanja).',
                'default' => 'Jelajahi Direktori Kios',
            ],
            'home.hero.cta_secondary' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Hero: Teks Tombol Kedua',
                'help' => 'Label tombol aksi kedua (menuju sentra kuliner).',
                'default' => 'Sentra Kuliner Khas',
            ],
            'home.hero.image' => [
                'type' => 'image',
                'group' => 'home',
                'label' => 'Hero: Foto Latar / Gedung Plaza',
                'help' => 'Foto representasi gedung plaza (rasio lanskap 16:9 disarankan).',
                'default' => '/assets/Photograph_of_plaza_building.webp',
            ],
            'home.featured.eyebrow' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Kios Unggulan: Eyebrow',
                'help' => 'Label kategori section unggulan di beranda.',
                'default' => 'Pilihan Pengunjung',
            ],
            'home.featured.title' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Kios Unggulan: Judul',
                'help' => 'Judul bagian kios pilihan beranda.',
                'default' => 'Kios Pilihan & Rekomendasi Unggulan',
            ],
            'home.featured.description' => [
                'type' => 'textarea',
                'group' => 'home',
                'label' => 'Kios Unggulan: Deskripsi',
                'help' => 'Keterangan section kios unggulan.',
                'default' => 'Rekomendasi kios kerajinan, perhiasan, dan kuliner terfavorit yang wajib Anda kunjungi saat berada di Plaza Kebun Sayur.',
            ],
            'home.history.eyebrow' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Sejarah: Eyebrow',
                'help' => 'Label atas bagian sejarah.',
                'default' => 'Warisan Budaya Balikpapan',
            ],
            'home.history.title' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Sejarah: Judul',
                'help' => 'Judul bagian cerita sejarah perniagaan gedung.',
                'default' => 'Sejarah & Perjalanan Plaza Kebun Sayur',
            ],
            'home.history.p1' => [
                'type' => 'textarea',
                'group' => 'home',
                'label' => 'Sejarah: Paragraf Pertama',
                'help' => 'Paragraf pembuka narasi sejarah.',
                'default' => 'Berdiri kokoh di kawasan perniagaan Kebun Sayur, Balikpapan Barat, Plaza Kebun Sayur telah tumbuh menjadi sentra belanja modern dan pusat cinderamata utama di Kalimantan Timur. Dikenal luas oleh wisatawan nusantara hingga mancanegara sebagai pusat perniagaan batu mulia, perhiasan emas, dan kerajinan otentik Dayak.',
            ],
            'home.history.p2' => [
                'type' => 'textarea',
                'group' => 'home',
                'label' => 'Sejarah: Paragraf Kedua',
                'help' => 'Paragraf kedua kelanjutan narasi modernisasi.',
                'default' => 'Menghadirkan kenyamanan berbelanja di dalam gedung bertingkat yang rapi dan terawat, Plaza Kebun Sayur tetap merawat denyut ekonomi rakyat dan keaslian tradisi lokal. Setiap sudut kios menyimpan cerita ketekunan para pengrajin dan pedagang yang setia melestarikan warisan bumi Borneo.',
            ],
            'home.history.image' => [
                'type' => 'image',
                'group' => 'home',
                'label' => 'Sejarah: Foto Sejarah / Gedung',
                'help' => 'Foto pelengkap narasi sejarah (rasio 4:3 atau 16:9).',
                'default' => '/assets/Photograph_of_plaza_building.webp',
            ],
            'home.quick_access.title' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Akses Cepat: Judul',
                'help' => 'Judul panel navigasi cepat di beranda.',
                'default' => 'Akses Cepat Direktori',
            ],
            'home.quick_access.description' => [
                'type' => 'textarea',
                'group' => 'home',
                'label' => 'Akses Cepat: Deskripsi',
                'help' => 'Penjelasan ringkas panel akses cepat.',
                'default' => 'Temukan kios belanja favorit, stan kuliner khas, jadwal kegiatan pameran, dan informasi rute kunjungan Anda.',
            ],
            'home.events.title' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Agenda Beranda: Judul',
                'help' => 'Judul cuplikan agenda di halaman utama.',
                'default' => 'Agenda & Kegiatan Mendatang',
            ],
            'home.events.description' => [
                'type' => 'textarea',
                'group' => 'home',
                'label' => 'Agenda Beranda: Deskripsi',
                'help' => 'Penjelasan cuplikan agenda di halaman utama.',
                'default' => 'Informasi pameran batu mulia, pentas seni budaya Dayak, dan promo menarik dari kios pedagang di Plaza Kebun Sayur.',
            ],

            // --- Group: Header Halaman ---
            'header.belanja.eyebrow' => [
                'type' => 'text',
                'group' => 'header',
                'label' => 'Hal. Belanja: Eyebrow',
                'help' => 'Eyebrow header halaman belanja.',
                'default' => 'Katalog Pedagang',
            ],
            'header.belanja.title' => [
                'type' => 'text',
                'group' => 'header',
                'label' => 'Hal. Belanja: Judul',
                'help' => 'Judul header halaman belanja.',
                'default' => 'Direktori Kios Belanja',
            ],
            'header.belanja.description' => [
                'type' => 'textarea',
                'group' => 'header',
                'label' => 'Hal. Belanja: Deskripsi',
                'help' => 'Deskripsi header halaman belanja.',
                'default' => 'Jelajahi kios batu mulia, perhiasan emas dan perak, cinderamata khas Dayak, serta batik Kalimantan di Plaza Kebun Sayur.',
            ],
            'header.kuliner.eyebrow' => [
                'type' => 'text',
                'group' => 'header',
                'label' => 'Hal. Kuliner: Eyebrow',
                'help' => 'Eyebrow header halaman kuliner.',
                'default' => 'Sentra Kuliner Lokal',
            ],
            'header.kuliner.title' => [
                'type' => 'text',
                'group' => 'header',
                'label' => 'Hal. Kuliner: Judul',
                'help' => 'Judul header halaman kuliner.',
                'default' => 'Pusat Jajanan & Oleh-Oleh Khas',
            ],
            'header.kuliner.description' => [
                'type' => 'textarea',
                'group' => 'header',
                'label' => 'Hal. Kuliner: Deskripsi',
                'help' => 'Deskripsi header halaman kuliner.',
                'default' => 'Nikmati aneka panganan tradisional Kalimantan Timur, mulai dari amplang renyah, bingka kentang, mantau, hingga kopi lokal.',
            ],
            'header.agenda.eyebrow' => [
                'type' => 'text',
                'group' => 'header',
                'label' => 'Hal. Agenda: Eyebrow',
                'help' => 'Eyebrow header halaman agenda.',
                'default' => 'Agenda & Pengumuman',
            ],
            'header.agenda.title' => [
                'type' => 'text',
                'group' => 'header',
                'label' => 'Hal. Agenda: Judul',
                'help' => 'Judul header halaman agenda.',
                'default' => 'Agenda Kegiatan & Promo Plaza',
            ],
            'header.agenda.description' => [
                'type' => 'textarea',
                'group' => 'header',
                'label' => 'Hal. Agenda: Deskripsi',
                'help' => 'Deskripsi header halaman agenda.',
                'default' => 'Temukan informasi pameran batu akik, pergelaran seni etnik Dayak, bazar diskon cinderamata, serta pengumuman resmi pengelola mall.',
            ],
            'header.panduan.eyebrow' => [
                'type' => 'text',
                'group' => 'header',
                'label' => 'Hal. Panduan: Eyebrow',
                'help' => 'Eyebrow header halaman panduan.',
                'default' => 'Panduan & Informasi Gedung',
            ],
            'header.panduan.title' => [
                'type' => 'text',
                'group' => 'header',
                'label' => 'Hal. Panduan: Judul',
                'help' => 'Judul header halaman panduan.',
                'default' => 'Rencanakan Kunjungan Anda',
            ],
            'header.panduan.description' => [
                'type' => 'textarea',
                'group' => 'header',
                'label' => 'Hal. Panduan: Deskripsi',
                'help' => 'Deskripsi header halaman panduan.',
                'default' => 'Panduan terpadu jam operasional, rute transportasi dari bandara dan pelabuhan, fasilitas umum, serta tata tertib di Plaza Kebun Sayur Balikpapan.',
            ],
            'header.kontak.eyebrow' => [
                'type' => 'text',
                'group' => 'header',
                'label' => 'Hal. Kontak: Eyebrow',
                'help' => 'Eyebrow header halaman kontak.',
                'default' => 'Pusat Bantuan & Pengaduan',
            ],
            'header.kontak.title' => [
                'type' => 'text',
                'group' => 'header',
                'label' => 'Hal. Kontak: Judul',
                'help' => 'Judul header halaman kontak.',
                'default' => 'Hubungi Pengelola Gedung',
            ],
            'header.kontak.description' => [
                'type' => 'textarea',
                'group' => 'header',
                'label' => 'Hal. Kontak: Deskripsi',
                'help' => 'Deskripsi header halaman kontak.',
                'default' => 'Layanan informasi sewa kios, informasi pameran, kehilangan barang, serta saran dan kritik untuk kenyamanan pengunjung Plaza Kebun Sayur.',
            ],
            'header.privacy.eyebrow' => [
                'type' => 'text',
                'group' => 'header',
                'label' => 'Hal. Kebijakan Privasi: Eyebrow',
                'help' => 'Eyebrow header halaman privasi.',
                'default' => 'Informasi Legal & Kepatuhan',
            ],
            'header.privacy.title' => [
                'type' => 'text',
                'group' => 'header',
                'label' => 'Hal. Kebijakan Privasi: Judul',
                'help' => 'Judul header halaman privasi.',
                'default' => 'Kebijakan Privasi',
            ],
            'header.privacy.description' => [
                'type' => 'textarea',
                'group' => 'header',
                'label' => 'Hal. Kebijakan Privasi: Deskripsi',
                'help' => 'Deskripsi header halaman privasi.',
                'default' => 'Komitmen Plaza Kebun Sayur dalam melindungi data pribadi pengunjung dan transparansi pemrosesan data sesuai Undang-Undang No. 27 Tahun 2022 (UU PDP).',
            ],
            'header.terms.eyebrow' => [
                'type' => 'text',
                'group' => 'header',
                'label' => 'Hal. Syarat & Ketentuan: Eyebrow',
                'help' => 'Eyebrow header halaman syarat & ketentuan.',
                'default' => 'Informasi Legal & Kepatuhan',
            ],
            'header.terms.title' => [
                'type' => 'text',
                'group' => 'header',
                'label' => 'Hal. Syarat & Ketentuan: Judul',
                'help' => 'Judul header halaman syarat & ketentuan.',
                'default' => 'Syarat & Ketentuan',
            ],
            'header.terms.description' => [
                'type' => 'textarea',
                'group' => 'header',
                'label' => 'Hal. Syarat & Ketentuan: Deskripsi',
                'help' => 'Deskripsi header halaman syarat & ketentuan.',
                'default' => 'Ketentuan penggunaan portal direktori komersial dan layanan informasi publik Plaza Kebun Sayur Balikpapan.',
            ],

            // --- Group: Footer ---
            'footer.mall_description' => [
                'type' => 'textarea',
                'group' => 'footer',
                'label' => 'Footer: Deskripsi Mall',
                'help' => 'Teks ringkas profil mall di kolom pertama footer.',
                'default' => 'Pusat perniagaan Plaza Kebun Sayur di Balikpapan Barat. Sentra batu mulia, perhiasan emas dan perak, kerajinan Dayak, batik, dan kuliner khas.',
            ],
            'footer.management_title' => [
                'type' => 'text',
                'group' => 'footer',
                'label' => 'Footer: Judul Kolom Manajemen',
                'help' => 'Judul kolom kantor pengelola di footer.',
                'default' => 'Kantor Pengelola',
            ],
            'footer.management_description' => [
                'type' => 'textarea',
                'group' => 'footer',
                'label' => 'Footer: Keterangan Layanan Manajemen',
                'help' => 'Deskripsi singkat layanan operasional pengelola di footer.',
                'default' => 'Kantor manajemen berlokasi di Lantai Dasar (Pintu Timur). Melayani informasi kios, ketertiban, dan layanan pengunjung.',
            ],

            // --- Group: Identitas & Logo Brand ---
            'brand.logo' => [
                'type' => 'image',
                'group' => 'brand',
                'label' => 'Logo Mall Utama (Latar Terang)',
                'help' => 'Logo berformat PNG/WebP transparan.',
                'default' => '/assets/main_logo_transparent_for_light_bg.webp',
            ],

            // --- Group: SEO & Metadata Meta Tags ---
            'seo.default_og_image' => [
                'type' => 'image',
                'group' => 'seo',
                'label' => 'SEO: Gambar Pratinjau Standar (OG Image)',
                'help' => 'Gambar yang muncul saat tautan dibagikan ke WhatsApp / media sosial (rasio 1200x630 px).',
                'default' => '/assets/Photograph_of_plaza_building.webp',
            ],
            'seo.home.title' => [
                'type' => 'text',
                'group' => 'seo',
                'label' => 'SEO: Judul Tab Beranda',
                'help' => 'Judul meta halaman beranda di browser.',
                'default' => 'Plaza Kebun Sayur Balikpapan | Sentra Kerajinan & Batu Mulia Borneo',
            ],
            'seo.home.description' => [
                'type' => 'textarea',
                'group' => 'seo',
                'label' => 'SEO: Deskripsi Google Beranda',
                'help' => 'Deskripsi pencarian halaman beranda di Google (maksimal 160 karakter disarankan).',
                'default' => 'Situs resmi direktori kios Plaza Kebun Sayur Balikpapan. Sentra batu akik, kerajinan etnik Dayak, kain batik, dan kuliner khas Kalimantan Timur.',
            ],
            'seo.belanja.title' => [
                'type' => 'text',
                'group' => 'seo',
                'label' => 'SEO: Judul Halaman Belanja',
                'help' => 'Judul meta tab belanja.',
                'default' => 'Direktori Kios Belanja | Plaza Kebun Sayur Balikpapan',
            ],
            'seo.belanja.description' => [
                'type' => 'textarea',
                'group' => 'seo',
                'label' => 'SEO: Deskripsi Halaman Belanja',
                'help' => 'Deskripsi meta halaman belanja.',
                'default' => 'Katalog lengkap kios batu mulia, perhiasan, suvenir Dayak, batik, dan kerajinan tradisional di Plaza Kebun Sayur Balikpapan.',
            ],
            'seo.kuliner.title' => [
                'type' => 'text',
                'group' => 'seo',
                'label' => 'SEO: Judul Halaman Kuliner',
                'help' => 'Judul meta tab kuliner.',
                'default' => 'Sentra Kuliner Tradisional | Plaza Kebun Sayur Balikpapan',
            ],
            'seo.kuliner.description' => [
                'type' => 'textarea',
                'group' => 'seo',
                'label' => 'SEO: Deskripsi Halaman Kuliner',
                'help' => 'Deskripsi meta halaman kuliner.',
                'default' => 'Daftar warung dan stan kuliner khas Balikpapan di Plaza Kebun Sayur: amplang, mantau, bingka kentang, dan aneka jajanan lokal.',
            ],
            'seo.agenda.title' => [
                'type' => 'text',
                'group' => 'seo',
                'label' => 'SEO: Judul Halaman Agenda',
                'help' => 'Judul meta tab agenda.',
                'default' => 'Agenda & Promo | Plaza Kebun Sayur Balikpapan',
            ],
            'seo.agenda.description' => [
                'type' => 'textarea',
                'group' => 'seo',
                'label' => 'SEO: Deskripsi Halaman Agenda',
                'help' => 'Deskripsi meta halaman agenda.',
                'default' => 'Jadwal pameran batu akik, bazar cinderamata, pentas seni budaya Dayak, dan promo pedagang di Plaza Kebun Sayur.',
            ],
            'seo.panduan.title' => [
                'type' => 'text',
                'group' => 'seo',
                'label' => 'SEO: Judul Halaman Panduan',
                'help' => 'Judul meta tab panduan kunjungan.',
                'default' => 'Panduan Kunjungan Gedung | Plaza Kebun Sayur Balikpapan',
            ],
            'seo.panduan.description' => [
                'type' => 'textarea',
                'group' => 'seo',
                'label' => 'SEO: Deskripsi Halaman Panduan',
                'help' => 'Deskripsi meta halaman panduan.',
                'default' => 'Rute transportasi bandara dan pelabuhan, jam operasional, fasilitas toilet dan mushola, serta tips belanja di Plaza Kebun Sayur.',
            ],
            'seo.kontak.title' => [
                'type' => 'text',
                'group' => 'seo',
                'label' => 'SEO: Judul Halaman Kontak',
                'help' => 'Judul meta tab kontak.',
                'default' => 'Kontak & Pengaduan | Plaza Kebun Sayur Balikpapan',
            ],
            'seo.kontak.description' => [
                'type' => 'textarea',
                'group' => 'seo',
                'label' => 'SEO: Deskripsi Halaman Kontak',
                'help' => 'Deskripsi meta halaman kontak.',
                'default' => 'Hubungi kantor manajemen Plaza Kebun Sayur Balikpapan untuk informasi sewa tempat, perizinan acara, dan layanan pengaduan.',
            ],
            'seo.privacy.title' => [
                'type' => 'text',
                'group' => 'seo',
                'label' => 'SEO: Judul Halaman Privasi',
                'help' => 'Judul meta tab kebijakan privasi.',
                'default' => 'Kebijakan Privasi | Plaza Kebun Sayur Balikpapan',
            ],
            'seo.privacy.description' => [
                'type' => 'textarea',
                'group' => 'seo',
                'label' => 'SEO: Deskripsi Halaman Privasi',
                'help' => 'Deskripsi meta halaman kebijakan privasi.',
                'default' => 'Kebijakan privasi dan perlindungan data pribadi pengunjung website resmi Plaza Kebun Sayur Balikpapan sesuai UU PDP No. 27/2022.',
            ],
            'seo.terms.title' => [
                'type' => 'text',
                'group' => 'seo',
                'label' => 'SEO: Judul Halaman Syarat & Ketentuan',
                'help' => 'Judul meta tab syarat & ketentuan.',
                'default' => 'Syarat & Ketentuan | Plaza Kebun Sayur Balikpapan',
            ],
            'seo.terms.description' => [
                'type' => 'textarea',
                'group' => 'seo',
                'label' => 'SEO: Deskripsi Halaman Syarat & Ketentuan',
                'help' => 'Deskripsi meta halaman syarat & ketentuan.',
                'default' => 'Syarat dan ketentuan penggunaan situs direktori dan layanan informasi Plaza Kebun Sayur Balikpapan.',
            ],
        ];
    }

    /**
     * Get all page contents resolved with defaults and asset URLs.
     */
    public static function getResolvedContents(): array
    {
        return Cache::remember('api_page_contents', 60, function () {
            $defaults = static::defaults();
            $records = static::all()->keyBy('key');

            $result = [];
            foreach ($defaults as $key => $meta) {
                $record = $records->get($key);
                $value = ($record && !is_null($record->value) && $record->value !== '')
                    ? $record->value
                    : $meta['default'];

                // Format image URLs
                if ($meta['type'] === 'image' && !empty($value)) {
                    if (!str_starts_with($value, 'http') && !str_starts_with($value, '/assets')) {
                        $value = Storage::disk('public')->url($value);
                    }
                }

                $result[$key] = $value;
            }

            return $result;
        });
    }
}
