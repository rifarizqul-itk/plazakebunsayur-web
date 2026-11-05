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

    public function setValueAttribute($value): void
    {
        if (is_array($value)) {
            $this->attributes['value'] = json_encode(array_values($value));
        } else {
            $this->attributes['value'] = $value;
        }
    }

    public function getValueAttribute($value)
    {
        if ($this->type === 'images' && is_string($value)) {
            $decoded = json_decode($value, true);
            if (is_array($decoded)) {
                return $decoded;
            }
        }

        return $value;
    }

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
            // --- Group: Identitas & Logo Brand ---
            'brand.name' => [
                'type' => 'text',
                'group' => 'brand',
                'label' => 'Identitas: Nama Brand / Gedung',
                'help' => 'Nama brand utama mall.',
                'default' => 'PLAZA KEBUN SAYUR',
            ],
            'brand.sub_location' => [
                'type' => 'text',
                'group' => 'brand',
                'label' => 'Identitas: Sub-Lokasi Brand',
                'help' => 'Keterangan wilayah/kecamatan di bawah nama gedung.',
                'default' => 'Balikpapan Barat',
            ],
            'brand.logo' => [
                'type' => 'image',
                'group' => 'brand',
                'label' => 'Logo Mall Utama (Latar Terang)',
                'help' => 'Logo berformat PNG/WebP transparan.',
                'default' => '/assets/main_logo_transparent_for_light_bg.webp',
            ],

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
                'default' => 'Temukan koleksi batu akik, permata langka, kerajinan etnik Dayak, kain batik khas Kalimantan, dan busana tradisional di jantung Balikpapan Barat.',
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
                'help' => 'Label tombol aksi kedua (menuju sentra fashion & busana).',
                'default' => 'Sentra Fashion & Batik',
            ],
            'home.hero.building_tag' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Hero: Label Slide Gedung',
                'help' => 'Tag kecil pada slide utama gedung plaza.',
                'default' => 'Fasad Utama Gedung',
            ],
            'home.hero.building_cta' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Hero: Teks CTA Slide Gedung',
                'help' => 'Label tombol aksi pada slide utama gedung plaza.',
                'default' => 'Pelajari Panduan Kunjungan',
            ],
            'home.hero.image' => [
                'type' => 'image',
                'group' => 'home',
                'label' => 'Hero: Foto Latar / Gedung Plaza',
                'help' => 'Foto representasi gedung plaza (rasio lanskap 16:9 disarankan).',
                'default' => '/assets/Photograph_of_plaza_building.webp',
            ],
            'home.hero.images' => [
                'type' => 'images',
                'group' => 'home',
                'label' => 'Hero: Galeri Foto Gedung Plaza (Multi-Foto)',
                'help' => 'Unggah beberapa foto gedung plaza (tampak depan, lobby, suasana belanja). Ukuran berkas bebas, otomatis dikompres ke WebP.',
                'default' => json_encode([
                    '/assets/Photograph_of_plaza_building.webp',
                ]),
            ],

            // Hero Category Slides
            'home.hero.slide.batu_mulia.tag' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Hero Slide Batu Mulia: Tag',
                'help' => 'Tag kategori slide batu mulia.',
                'default' => 'Sentra Batu Mulia Borneo',
            ],
            'home.hero.slide.batu_mulia.title' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Hero Slide Batu Mulia: Judul',
                'help' => 'Judul slide batu mulia.',
                'default' => 'Koleksi Akik, Permata & Cangkang Perak',
            ],
            'home.hero.slide.batu_mulia.desc' => [
                'type' => 'textarea',
                'group' => 'home',
                'label' => 'Hero Slide Batu Mulia: Deskripsi',
                'help' => 'Deskripsi ringkas slide batu mulia.',
                'default' => 'Pengrajin ikat cincin dan ragam batu mulia khas Kalimantan terpercaya.',
            ],
            'home.hero.slide.batu_mulia.cta' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Hero Slide Batu Mulia: Teks Tombol',
                'help' => 'Label tombol CTA slide batu mulia.',
                'default' => 'Jelajahi Kios Batu Mulia',
            ],
            'home.hero.slide.batu_mulia.image' => [
                'type' => 'image',
                'group' => 'home',
                'label' => 'Hero Slide Batu Mulia: Foto',
                'help' => 'Foto latar slide batu mulia.',
                'default' => 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1800&q=80',
            ],
            'home.hero.slide.cinderamata.tag' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Hero Slide Cinderamata: Tag',
                'help' => 'Tag kategori slide cinderamata & kerajinan Dayak.',
                'default' => 'Cinderamata & Etnik Dayak',
            ],
            'home.hero.slide.cinderamata.title' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Hero Slide Cinderamata: Judul',
                'help' => 'Judul slide cinderamata & etnik Dayak.',
                'default' => 'Kerajinan Manik, Tenun & Suvenir Tradisional'
            ],
            'home.hero.slide.cinderamata.desc' => [
                'type' => 'textarea',
                'group' => 'home',
                'label' => 'Hero Slide Cinderamata: Deskripsi',
                'help' => 'Deskripsi ringkas slide cinderamata & kerajinan Dayak.',
                'default' => 'Karya seni ukir Dayak, manik-manik, mandau, dan cenderamata khas Borneo.',
            ],
            'home.hero.slide.cinderamata.cta' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Hero Slide Cinderamata: Teks Tombol',
                'help' => 'Label tombol CTA slide cinderamata.',
                'default' => 'Lihat Cinderamata & Tenun',
            ],
            'home.hero.slide.cinderamata.image' => [
                'type' => 'image',
                'group' => 'home',
                'label' => 'Hero Slide Cinderamata: Foto',
                'help' => 'Foto latar slide cinderamata & kerajinan Dayak.',
                'default' => 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1800&q=80',
            ],
            'home.hero.slide.fashion.tag' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Hero Slide Fashion: Tag',
                'help' => 'Tag kategori slide sentra fashion.',
                'default' => 'Sentra Fashion & Busana Kaltim',
            ],
            'home.hero.slide.fashion.title' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Hero Slide Fashion: Judul',
                'help' => 'Judul slide sentra fashion & busana.',
                'default' => 'Batik Balikpapan, Tenun Samarinda & Busana Adat',
            ],
            'home.hero.slide.fashion.desc' => [
                'type' => 'textarea',
                'group' => 'home',
                'label' => 'Hero Slide Fashion: Deskripsi',
                'help' => 'Deskripsi ringkas slide sentra fashion.',
                'default' => 'Koleksi pakaian etnik Kalimantan, kain tenun asli, dan busana modern pilihan.',
            ],
            'home.hero.slide.fashion.cta' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Hero Slide Fashion: Teks Tombol',
                'help' => 'Label tombol CTA slide sentra fashion.',
                'default' => 'Jelajahi Sentra Fashion',
            ],
            'home.hero.slide.fashion.image' => [
                'type' => 'image',
                'group' => 'home',
                'label' => 'Hero Slide Fashion: Foto',
                'help' => 'Foto latar slide sentra fashion.',
                'default' => 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1800&q=80',
            ],
            'home.hero.slide.suasana.tag' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Hero Slide Suasana: Tag',
                'help' => 'Tag kategori slide suasana mall.',
                'default' => 'Suasana Kios Plaza Kebun Sayur',
            ],
            'home.hero.slide.suasana.title' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Hero Slide Suasana: Judul',
                'help' => 'Judul slide suasana mall.',
                'default' => 'Ratusan Kios Resmi Pengrajin Lokal',
            ],
            'home.hero.slide.suasana.desc' => [
                'type' => 'textarea',
                'group' => 'home',
                'label' => 'Hero Slide Suasana: Deskripsi',
                'help' => 'Deskripsi ringkas slide suasana mall.',
                'default' => 'Keramahan interaksi perniagaan dan belanja cinderamata yang nyaman dan terpercaya.',
            ],
            'home.hero.slide.suasana.cta' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Hero Slide Suasana: Teks Tombol',
                'help' => 'Label tombol CTA slide suasana mall.',
                'default' => 'Buka Direktori Lengkap',
            ],
            'home.hero.slide.suasana.image' => [
                'type' => 'image',
                'group' => 'home',
                'label' => 'Hero Slide Suasana: Foto',
                'help' => 'Foto latar slide suasana mall.',
                'default' => 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1800&q=80',
            ],

            // Action Cards
            'home.quick_access.title' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Akses Cepat: Judul',
                'help' => 'Judul panel navigasi cepat di beranda.',
                'default' => 'Apa Yang Ada Di Plaza Kebun Sayur?',
            ],
            'home.quick_access.description' => [
                'type' => 'textarea',
                'group' => 'home',
                'label' => 'Akses Cepat: Deskripsi',
                'help' => 'Penjelasan ringkas panel akses cepat.',
                'default' => 'Temukan kios belanja favorit, sentra fashion & busana khas, jadwal kegiatan pameran, dan informasi rute kunjungan Anda.',
            ],
            'home.action.belanja.category' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Aksi Cepat Belanja: Kategori',
                'help' => 'Label kategori kartu aksi kios belanja.',
                'default' => 'KIOS BELANJA',
            ],
            'home.action.belanja.title' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Aksi Cepat Belanja: Judul',
                'help' => 'Judul kartu aksi kios belanja.',
                'default' => 'Batu Mulia, Perhiasan & Cinderamata',
            ],
            'home.action.belanja.btn_text' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Aksi Cepat Belanja: Teks Tombol',
                'help' => 'Teks tombol pada kartu aksi belanja.',
                'default' => 'LIHAT KIOS BELANJA',
            ],
            'home.action.belanja.image' => [
                'type' => 'image',
                'group' => 'home',
                'label' => 'Aksi Cepat Belanja: Foto Latar',
                'help' => 'Foto latar kartu aksi belanja.',
                'default' => 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
            ],
            'home.action.fashion.category' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Aksi Cepat Fashion: Kategori',
                'help' => 'Label kategori kartu aksi sentra fashion.',
                'default' => 'SENTRA FASHION',
            ],
            'home.action.fashion.title' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Aksi Cepat Fashion: Judul',
                'help' => 'Judul kartu aksi sentra fashion.',
                'default' => 'Batik, Busana Adat & Pakaian',
            ],
            'home.action.fashion.btn_text' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Aksi Cepat Fashion: Teks Tombol',
                'help' => 'Teks tombol pada kartu aksi fashion.',
                'default' => 'LIHAT SENTRA FASHION',
            ],
            'home.action.fashion.image' => [
                'type' => 'image',
                'group' => 'home',
                'label' => 'Aksi Cepat Fashion: Foto Latar',
                'help' => 'Foto latar kartu aksi fashion.',
                'default' => 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
            ],
            'home.action.panduan.category' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Aksi Cepat Panduan: Kategori',
                'help' => 'Label kategori kartu aksi panduan gedung.',
                'default' => 'INFORMASI GEDUNG',
            ],
            'home.action.panduan.title' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Aksi Cepat Panduan: Judul',
                'help' => 'Judul kartu aksi panduan gedung.',
                'default' => 'Panduan Kunjungan & Fasilitas',
            ],
            'home.action.panduan.btn_text' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Aksi Cepat Panduan: Teks Tombol',
                'help' => 'Teks tombol pada kartu aksi panduan gedung.',
                'default' => 'BUKA PANDUAN',
            ],
            'home.action.panduan.image' => [
                'type' => 'image',
                'group' => 'home',
                'label' => 'Aksi Cepat Panduan: Foto Latar',
                'help' => 'Foto latar kartu aksi panduan gedung.',
                'default' => 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
            ],

            // Promos & Oleh-Oleh
            'home.promos.eyebrow' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Promo: Eyebrow',
                'help' => 'Label kecil di atas judul promo.',
                'default' => 'Penawaran Spesial Kios & Gedung',
            ],
            'home.promos.title' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Promo: Judul Bagian',
                'help' => 'Judul bagian promo minggu ini / bulan ini.',
                'default' => 'Promo Minggu Ini / Bulan Ini',
            ],
            'home.promos.cta_label' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Promo: Teks Tautan CTA',
                'help' => 'Label teks tautan lihat semua promo.',
                'default' => 'Lihat semua promo & informasi',
            ],
            'home.oleh_oleh.eyebrow' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Oleh-Oleh: Eyebrow',
                'help' => 'Label kecil di atas judul oleh-oleh.',
                'default' => 'Batik, Busana Adat & Kerajinan Khas',
            ],
            'home.oleh_oleh.title' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Oleh-Oleh: Judul Bagian',
                'help' => 'Judul bagian oleh-oleh khas & cenderamata.',
                'default' => 'Oleh-Oleh Khas & Cenderamata',
            ],
            'home.oleh_oleh.cta_label' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Oleh-Oleh: Teks Tautan CTA',
                'help' => 'Label teks tautan lihat semua kios oleh-oleh.',
                'default' => 'Lihat semua kios belanja & oleh-oleh',
            ],

            // Kios Unggulan (Legacy / General)
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
                'default' => 'Rekomendasi Kios Pilihan',
            ],
            'home.featured.description' => [
                'type' => 'textarea',
                'group' => 'home',
                'label' => 'Kios Unggulan: Deskripsi',
                'help' => 'Keterangan section kios unggulan.',
                'default' => 'Rekomendasi kios kerajinan, perhiasan, cenderamata etnik, dan busana batik terfavorit yang wajib Anda kunjungi saat berada di Plaza Kebun Sayur.',
            ],

            // Sejarah
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
            'home.history.p3' => [
                'type' => 'textarea',
                'group' => 'home',
                'label' => 'Sejarah: Paragraf Ketiga',
                'help' => 'Paragraf ketiga penutup narasi sejarah.',
                'default' => 'Aktivitas perdagangan langsung dengan para pengrajin dan pedagang lokal menjadikan kawasan ini tujuan belanja cinderamata di Balikpapan.',
            ],
            'home.history.cta_label' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Sejarah: Teks Tombol CTA',
                'help' => 'Label tombol panduan kunjungan di bagian sejarah.',
                'default' => 'Pelajari Panduan Kunjungan Gedung',
            ],
            'home.history.image' => [
                'type' => 'image',
                'group' => 'home',
                'label' => 'Sejarah: Foto Sejarah / Gedung',
                'help' => 'Foto pelengkap narasi sejarah (rasio 4:3 atau 16:9).',
                'default' => '/assets/Photograph_of_plaza_building.webp',
            ],

            // Informasi Beranda
            'home.events.title' => [
                'type' => 'text',
                'group' => 'home',
                'label' => 'Informasi Beranda: Judul',
                'help' => 'Judul cuplikan informasi & promo di halaman utama.',
                'default' => 'Informasi & Promo Terkini',
            ],
            'home.events.description' => [
                'type' => 'textarea',
                'group' => 'home',
                'label' => 'Informasi Beranda: Deskripsi',
                'help' => 'Penjelasan cuplikan informasi & promo di halaman utama.',
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
            'header.fashion.eyebrow' => [
                'type' => 'text',
                'group' => 'header',
                'label' => 'Hal. Fashion: Eyebrow',
                'help' => 'Eyebrow header halaman fashion & busana.',
                'default' => 'Koleksi Busana Khas',
            ],
            'header.fashion.title' => [
                'type' => 'text',
                'group' => 'header',
                'label' => 'Hal. Fashion: Judul',
                'help' => 'Judul header halaman fashion & busana.',
                'default' => 'Sentra Fashion & Batik Kaltim',
            ],
            'header.fashion.description' => [
                'type' => 'textarea',
                'group' => 'header',
                'label' => 'Hal. Fashion: Deskripsi',
                'help' => 'Deskripsi header halaman fashion & busana.',
                'default' => 'Jelajahi koleksi busana etnik Dayak, batik khas Kalimantan Timur, kain tenun, dan aneka perlengkapan pakaian tradisional.',
            ],
            'header.kuliner.eyebrow' => [
                'type' => 'text',
                'group' => 'header',
                'label' => 'Hal. Fashion (Legacy): Eyebrow',
                'help' => 'Eyebrow header halaman fashion.',
                'default' => 'Koleksi Busana Khas',
            ],
            'header.kuliner.title' => [
                'type' => 'text',
                'group' => 'header',
                'label' => 'Hal. Fashion (Legacy): Judul',
                'help' => 'Judul header halaman fashion.',
                'default' => 'Sentra Fashion & Batik Kaltim',
            ],
            'header.kuliner.description' => [
                'type' => 'textarea',
                'group' => 'header',
                'label' => 'Hal. Fashion (Legacy): Deskripsi',
                'help' => 'Deskripsi header halaman fashion.',
                'default' => 'Jelajahi koleksi busana etnik Dayak, batik khas Kalimantan Timur, kain tenun, dan aneka perlengkapan pakaian tradisional.',
            ],
            'header.informasi.eyebrow' => [
                'type' => 'text',
                'group' => 'header',
                'label' => 'Hal. Informasi: Eyebrow',
                'help' => 'Eyebrow header halaman informasi & promo.',
                'default' => 'Informasi & Acara',
            ],
            'header.informasi.title' => [
                'type' => 'text',
                'group' => 'header',
                'label' => 'Hal. Informasi: Judul',
                'help' => 'Judul header halaman informasi & promo.',
                'default' => 'Informasi Kegiatan & Promo Plaza',
            ],
            'header.informasi.description' => [
                'type' => 'textarea',
                'group' => 'header',
                'label' => 'Hal. Informasi: Deskripsi',
                'help' => 'Deskripsi header halaman informasi & promo.',
                'default' => 'Temukan agenda kegiatan pameran, pentas seni budaya Dayak, serta berbagai promo menarik dari kios pedagang Plaza Kebun Sayur.',
            ],
            'header.agenda.eyebrow' => [
                'type' => 'text',
                'group' => 'header',
                'label' => 'Hal. Informasi (Legacy): Eyebrow',
                'help' => 'Eyebrow header halaman agenda/informasi.',
                'default' => 'Informasi & Acara',
            ],
            'header.agenda.title' => [
                'type' => 'text',
                'group' => 'header',
                'label' => 'Hal. Informasi (Legacy): Judul',
                'help' => 'Judul header halaman agenda/informasi.',
                'default' => 'Informasi Kegiatan & Promo Plaza',
            ],
            'header.agenda.description' => [
                'type' => 'textarea',
                'group' => 'header',
                'label' => 'Hal. Informasi (Legacy): Deskripsi',
                'help' => 'Deskripsi header halaman agenda/informasi.',
                'default' => 'Temukan agenda kegiatan pameran, pentas seni budaya Dayak, serta berbagai promo menarik dari kios pedagang Plaza Kebun Sayur.',
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
                'default' => 'Pusat perniagaan Plaza Kebun Sayur di Balikpapan Barat. Sentra batu mulia, perhiasan emas dan perak, kerajinan Dayak, sentra fashion & batik, dan cenderamata khas.',
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
                'default' => 'Situs resmi direktori kios Plaza Kebun Sayur Balikpapan. Sentra batu akik, kerajinan etnik Dayak, kain batik & busana khas Kalimantan Timur.',
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
            'seo.fashion.title' => [
                'type' => 'text',
                'group' => 'seo',
                'label' => 'SEO: Judul Halaman Fashion',
                'help' => 'Judul meta tab fashion & busana.',
                'default' => 'Katalog Fashion & Busana Tradisional | Plaza Kebun Sayur Balikpapan',
            ],
            'seo.fashion.description' => [
                'type' => 'textarea',
                'group' => 'seo',
                'label' => 'SEO: Deskripsi Halaman Fashion',
                'help' => 'Deskripsi meta halaman fashion & busana.',
                'default' => 'Koleksi lengkap busana etnik Dayak, batik khas Kalimantan Timur, dan kain tenun tradisional di Plaza Kebun Sayur Balikpapan.',
            ],
            'seo.kuliner.title' => [
                'type' => 'text',
                'group' => 'seo',
                'label' => 'SEO: Judul Halaman Fashion (Legacy)',
                'help' => 'Judul meta tab fashion.',
                'default' => 'Katalog Fashion & Busana Tradisional | Plaza Kebun Sayur Balikpapan',
            ],
            'seo.kuliner.description' => [
                'type' => 'textarea',
                'group' => 'seo',
                'label' => 'SEO: Deskripsi Halaman Fashion (Legacy)',
                'help' => 'Deskripsi meta halaman fashion.',
                'default' => 'Koleksi lengkap busana etnik Dayak, batik khas Kalimantan Timur, dan kain tenun tradisional di Plaza Kebun Sayur Balikpapan.',
            ],
            'seo.informasi.title' => [
                'type' => 'text',
                'group' => 'seo',
                'label' => 'SEO: Judul Halaman Informasi & Promo',
                'help' => 'Judul meta tab informasi & promo.',
                'default' => 'Informasi & Promo | Plaza Kebun Sayur Balikpapan',
            ],
            'seo.informasi.description' => [
                'type' => 'textarea',
                'group' => 'seo',
                'label' => 'SEO: Deskripsi Halaman Informasi & Promo',
                'help' => 'Deskripsi meta halaman informasi & promo.',
                'default' => 'Jadwal pameran batu akik, pentas seni budaya Dayak, dan promo menarik dari kios pedagang di Plaza Kebun Sayur.',
            ],
            'seo.agenda.title' => [
                'type' => 'text',
                'group' => 'seo',
                'label' => 'SEO: Judul Halaman Agenda (Legacy)',
                'help' => 'Judul meta tab agenda.',
                'default' => 'Informasi & Promo | Plaza Kebun Sayur Balikpapan',
            ],
            'seo.agenda.description' => [
                'type' => 'textarea',
                'group' => 'seo',
                'label' => 'SEO: Deskripsi Halaman Agenda (Legacy)',
                'help' => 'Deskripsi meta halaman agenda.',
                'default' => 'Jadwal pameran batu akik, pentas seni budaya Dayak, dan promo menarik dari kios pedagang di Plaza Kebun Sayur.',
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

            // --- Group: Panduan Kunjungan Gedung ---
            'panduan.hours_title' => [
                'type' => 'text',
                'group' => 'panduan',
                'label' => 'Panduan: Judul Jam Operasional & Lokasi',
                'help' => 'Judul bagian jam buka dan lokasi gedung.',
                'default' => 'Waktu Operasional & Lokasi Mall',
            ],
            'panduan.hours_detail' => [
                'type' => 'textarea',
                'group' => 'panduan',
                'label' => 'Panduan: Keterangan Jam Buka',
                'help' => 'Paragraf penjelasan jam buka dan operasional kios.',
                'default' => 'Kios cinderamata, batu mulia, pakaian adat, dan batik beroperasi optimal pukul 09.00 – 17.30 WITA. Kios depan dan pedagang oleh-oleh mulai melayani pengunjung sejak pagi hari.',
            ],
            'panduan.hours_tip' => [
                'type' => 'text',
                'group' => 'panduan',
                'label' => 'Panduan: Tips Waktu Kunjungan',
                'help' => 'Catatan waktu kunjungan yang paling nyaman.',
                'default' => 'Waktu kunjungan paling nyaman disarankan antara pukul 10.00 hingga 16.00 WITA.',
            ],
            'panduan.location_title' => [
                'type' => 'text',
                'group' => 'panduan',
                'label' => 'Panduan: Judul Titik Temu Lokasi',
                'help' => 'Subjudul alamat dan titik temu.',
                'default' => 'Alamat & Titik Temu',
            ],
            'panduan.location_detail' => [
                'type' => 'textarea',
                'group' => 'panduan',
                'label' => 'Panduan: Keterangan Titik Lokasi',
                'help' => 'Paragraf keterangan letak strategis gedung.',
                'default' => 'Terletak di pusat perniagaan Kebun Sayur, Balikpapan Barat, berhadapan langsung dengan koridor jalan raya utama dan dekat kawasan permukiman Kampung Baru.',
            ],
            'panduan.facilities_title' => [
                'type' => 'text',
                'group' => 'panduan',
                'label' => 'Panduan: Judul Fasilitas Gedung',
                'help' => 'Judul bagian fasilitas gedung plaza.',
                'default' => 'Fasilitas Gedung Plaza',
            ],
            'panduan.facilities_description' => [
                'type' => 'textarea',
                'group' => 'panduan',
                'label' => 'Panduan: Deskripsi Fasilitas Gedung',
                'help' => 'Keterangan pengantar fasilitas gedung.',
                'default' => 'Fasilitas penunjang kenyamanan belanja dan ibadah yang tersedia di lingkungan gedung Plaza Kebun Sayur.',
            ],
            'panduan.routes_title' => [
                'type' => 'text',
                'group' => 'panduan',
                'label' => 'Panduan: Judul Rute Akses Transportasi',
                'help' => 'Judul bagian rute perjalanan transportasi.',
                'default' => 'Akses Transportasi Menuju Lokasi',
            ],
            'panduan.routes_description' => [
                'type' => 'textarea',
                'group' => 'panduan',
                'label' => 'Panduan: Deskripsi Rute Transportasi',
                'help' => 'Keterangan pengantar panduan rute perjalanan.',
                'default' => 'Panduan rute perjalanan dari bandara, pelabuhan, dan angkutan kota menuju Plaza Kebun Sayur.',
            ],
            'panduan.tips_title' => [
                'type' => 'text',
                'group' => 'panduan',
                'label' => 'Panduan: Judul Tips Berbelanja',
                'help' => 'Judul bagian tips berbelanja.',
                'default' => 'Tips Berbelanja Cerdas',
            ],
            'panduan.tips_description' => [
                'type' => 'textarea',
                'group' => 'panduan',
                'label' => 'Panduan: Deskripsi Tips Berbelanja',
                'help' => 'Keterangan pengantar tips belanja suvenir dan kerajinan.',
                'default' => 'Praktik terbaik saat berbelanja suvenir, kerajinan etnik, dan batu mulia di Plaza Kebun Sayur.',
            ],
            'panduan.rules_title' => [
                'type' => 'text',
                'group' => 'panduan',
                'label' => 'Panduan: Judul Tata Tertib',
                'help' => 'Judul bagian tata tertib dan keamanan gedung.',
                'default' => 'Tata Tertib & Keamanan',
            ],
            'panduan.rules_description' => [
                'type' => 'textarea',
                'group' => 'panduan',
                'label' => 'Panduan: Deskripsi Tata Tertib',
                'help' => 'Keterangan pengantar tata tertib pengunjung.',
                'default' => 'Panduan ketertiban demi kenyamanan, kebersihan, dan keselamatan bersama selama berada di Plaza Kebun Sayur.',
            ],

            // --- Group: Informasi & Detail Event ---
            'event.callout.title' => [
                'type' => 'text',
                'group' => 'event',
                'label' => 'Event: Judul Callout Sewa Tempat',
                'help' => 'Judul kotak informasi sewa ruang event di sidebar.',
                'default' => 'Ingin Menggelar Event di Bunsay?',
            ],
            'event.callout.description' => [
                'type' => 'textarea',
                'group' => 'event',
                'label' => 'Event: Deskripsi Callout Sewa Tempat',
                'help' => 'Deskripsi kotak informasi sewa ruang event di sidebar.',
                'default' => 'Area Atrium dan Koridor Plaza Kebun Sayur terbuka untuk pameran batu mulia, pentas seni, maupun bazar UMKM.',
            ],
            'event.callout.cta_label' => [
                'type' => 'text',
                'group' => 'event',
                'label' => 'Event: Teks Tombol Callout',
                'help' => 'Label tombol hubungi pengelola di sidebar event.',
                'default' => 'Hubungi Manajemen Pengelola →',
            ],

            // --- Group: Halaman Kontak & Pengaduan ---
            'contact.office_eyebrow' => [
                'type' => 'text',
                'group' => 'contact',
                'label' => 'Kontak: Eyebrow Kantor Pengelola',
                'help' => 'Teks kecil di atas judul kantor pengelola.',
                'default' => 'Kantor Pengelola',
            ],
            'contact.office_title' => [
                'type' => 'text',
                'group' => 'contact',
                'label' => 'Kontak: Judul Kantor Pengelola',
                'help' => 'Judul kolom informasi kantor pengelola.',
                'default' => 'Informasi Kontak Resmi',
            ],
            'contact.office_description' => [
                'type' => 'textarea',
                'group' => 'contact',
                'label' => 'Kontak: Deskripsi Kantor Pengelola',
                'help' => 'Keterangan di bawah judul informasi kontak pengelola.',
                'default' => 'Kunjungi kantor manajemen mall di lantai dasar atau hubungi pusat layanan terpadu berikut.',
            ],
            'contact.form_title' => [
                'type' => 'text',
                'group' => 'contact',
                'label' => 'Kontak: Judul Formulir Pesan',
                'help' => 'Judul bagian formulir kirim pesan.',
                'default' => 'Kirim Pesan atau Pertanyaan',
            ],
            'contact.form_description' => [
                'type' => 'textarea',
                'group' => 'contact',
                'label' => 'Kontak: Deskripsi Formulir Pesan',
                'help' => 'Keterangan pengantar formulir pesan publik.',
                'default' => 'Sampaikan pertanyaan Anda kepada tim pengelola mall. Kami akan membalas pesan Anda sesegera mungkin.',
            ],

            // --- Group: Sistem & 404 ---
            'not_found.title' => [
                'type' => 'text',
                'group' => 'system',
                'label' => '404: Judul Halaman',
                'help' => 'Judul halaman tidak ditemukan (404).',
                'default' => 'Halaman Tidak Ditemukan',
            ],
            'not_found.description' => [
                'type' => 'textarea',
                'group' => 'system',
                'label' => '404: Deskripsi Halaman',
                'help' => 'Penjelasan halaman tidak ditemukan (404).',
                'default' => 'Halaman yang Anda tuju mungkin telah dipindahkan atau tautan yang Anda masukkan salah.',
            ],
            'not_found.cta_home' => [
                'type' => 'text',
                'group' => 'system',
                'label' => '404: Teks Tombol Beranda',
                'help' => 'Label tombol kembali ke beranda pada halaman 404.',
                'default' => 'Kembali ke Beranda',
            ],
            'not_found.cta_directory' => [
                'type' => 'text',
                'group' => 'system',
                'label' => '404: Teks Tombol Direktori',
                'help' => 'Label tombol menuju direktori belanja pada halaman 404.',
                'default' => 'Direktori Belanja',
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

                // Format multi-images array (JSON array of URLs/paths)
                if ($meta['type'] === 'images' && !empty($value)) {
                    $decoded = is_array($value) ? $value : json_decode($value, true);
                    if (is_array($decoded)) {
                        $value = array_values(array_map(function ($img) {
                            if (!empty($img) && !str_starts_with($img, 'http') && !str_starts_with($img, '/assets')) {
                                return Storage::disk('public')->url($img);
                            }
                            return $img;
                        }, $decoded));
                    }
                }

                $result[$key] = $value;
            }

            return $result;
        });
    }
}
