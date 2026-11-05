<?php

namespace App\Support;

class HomeContentDefaults
{
    public static function all(): array
    {
        return array_merge(
            static::brandDefaults(),
            static::homeHeroDefaults(),
            static::heroCategorySlidesPart1(),
            static::heroCategorySlidesPart2(),
            static::actionCardsPart1(),
            static::actionCardsPart2(),
            static::promosAndFeatured(),
            static::historyAndInfo(),
        );
    }

    public static function brandDefaults(): array
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
        ]
        ];
    }

    public static function homeHeroDefaults(): array
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
        ]
        ];
    }

    public static function heroCategorySlidesPart1(): array
    {
        return [
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
        ]
        ];
    }

    public static function heroCategorySlidesPart2(): array
    {
        return [
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
        ]
        ];
    }

    public static function actionCardsPart1(): array
    {
        return [
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
        ]
        ];
    }

    public static function actionCardsPart2(): array
    {
        return [
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
        ]
        ];
    }

    public static function promosAndFeatured(): array
    {
        return [
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
        ]
        ];
    }

    public static function historyAndInfo(): array
    {
        return [
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
        ]
        ];
    }
}
