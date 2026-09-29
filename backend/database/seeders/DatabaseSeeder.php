<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Facility;
use App\Models\Floor;
use App\Models\Tenant;
use App\Models\User;
use App\Models\WhatsOn;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin User
        User::updateOrCreate(
            ['email' => 'admin@plazakebunsayur.com'],
            [
                'name' => 'Pengelola Plaza Kebun Sayur',
                'password' => Hash::make('password123'),
            ]
        );

        // 2. Floors
        $gf = Floor::create([
            'name' => 'Lantai Dasar (Ground Floor)',
            'code' => 'GF',
            'order_index' => 1,
        ]);

        $l1 = Floor::create([
            'name' => 'Lantai 1',
            'code' => 'L1',
            'order_index' => 2,
        ]);

        $l2 = Floor::create([
            'name' => 'Lantai 2',
            'code' => 'L2',
            'order_index' => 3,
        ]);

        // 3. Categories
        $catBatu = Category::create([
            'name' => 'Batu Mulia & Akik',
            'slug' => 'batu-mulia-dan-akik',
            'icon' => 'Gem',
            'description' => 'Pusat koleksi batu akik Kalimantan, kecubung wulung, red borneo, dan aneka permata bersertifikat.',
            'order_index' => 1,
        ]);

        $catEmas = Category::create([
            'name' => 'Perhiasan Emas & Perak',
            'slug' => 'perhiasan-emas-dan-perak',
            'icon' => 'Sparkles',
            'description' => 'Deretan toko emas terpercaya, perak bakar, dan custom cincin pernikahan khas Kaltim.',
            'order_index' => 2,
        ]);

        $catDayak = Category::create([
            'name' => 'Kerajinan Dayak & Souvenir',
            'slug' => 'kerajinan-dayak-dan-souvenir',
            'icon' => 'ShoppingBag',
            'description' => 'Mandau bertuah, rompi manik motif Dayak Kenyah, gelang ulin, dan pernak-pernik khas Borneo.',
            'order_index' => 3,
        ]);

        $catBatik = Category::create([
            'name' => 'Batik & Songket Kaltim',
            'slug' => 'batik-dan-songket-kaltim',
            'icon' => 'Shirt',
            'description' => 'Kain batik motif mangrove Balikpapan, sarung tenun Samarinda asli, dan baju etnik modern.',
            'order_index' => 4,
        ]);

        $catKuliner = Category::create([
            'name' => 'Oleh-Oleh & Kuliner Tradisional',
            'slug' => 'oleh-oleh-dan-kuliner-tradisional',
            'icon' => 'UtensilsCrossed',
            'description' => 'Amplang kuku macan renyah, mantau sapi lada hitam, lempok durian asli, dan bingka kentang.',
            'order_index' => 5,
        ]);

        $catJasa = Category::create([
            'name' => 'Jasa & Reparasi',
            'slug' => 'jasa-dan-reparasi',
            'icon' => 'Wrench',
            'description' => 'Jasa gosok dan poles batu mulia, patri emas, cuci perhiasan, dan penjahit busana adat.',
            'order_index' => 6,
        ]);

        // 4. Sample Tenants (Authentic Kebun Sayur Merchants)
        $tenants = [
            [
                'category_id' => $catBatu->id,
                'floor_id' => $gf->id,
                'name' => 'Permata Borneo Gems',
                'slug' => 'permata-borneo-gems',
                'unit_number' => 'Blok A No. 04',
                'description' => 'Menyediakan aneka batu akik asli Kalimantan, Red Borneo, Kecubung Pangkalan Bun, Giok Sojol, serta jasa ikat cincin perak titanium.',
                'phone_whatsapp' => '6281234567801',
                'instagram' => '@permataborneo.bunsay',
                'opening_hours' => '09:00 - 18:00 WITA',
                'is_featured' => true,
            ],
            [
                'category_id' => $catBatu->id,
                'floor_id' => $gf->id,
                'name' => 'Galeri Mustika Safir',
                'slug' => 'galeri-mustika-safir',
                'unit_number' => 'Blok A No. 11',
                'description' => 'Spesialis batu mulia natural: Safir Ceylon, Zamrud Kolombia, Ruby Burma, dan pengujian keaslian lab gemologi.',
                'phone_whatsapp' => '6281234567802',
                'instagram' => '@mustikasafir_kaltim',
                'opening_hours' => '09:30 - 17:30 WITA',
                'is_featured' => true,
            ],
            [
                'category_id' => $catEmas->id,
                'floor_id' => $gf->id,
                'name' => 'Toko Emas Sejahtera Sayur',
                'slug' => 'toko-emas-sejahtera-sayur',
                'unit_number' => 'Blok B No. 01 - 02',
                'description' => 'Pusat jual beli perhiasan emas kadar 700, 750, dan 999. Model kalung, gelang, dan cincin pengantin terkini dengan sertifikat resmi.',
                'phone_whatsapp' => '6281234567803',
                'instagram' => '@emas_sejahterabunsay',
                'opening_hours' => '08:30 - 17:00 WITA',
                'is_featured' => true,
            ],
            [
                'category_id' => $catDayak->id,
                'floor_id' => $l1->id,
                'name' => 'Art Shop Dayak Kenyah',
                'slug' => 'art-shop-dayak-kenyah',
                'unit_number' => 'Blok C No. 08',
                'description' => 'Pusat kerajinan seni suku Dayak terlengkap: Mandau tradisional gagang tanduk, tameng motif etnik, tas anyaman manik, dan gelang kayu ulin asli.',
                'phone_whatsapp' => '6281234567804',
                'instagram' => '@dayakart_kebunsayur',
                'opening_hours' => '09:00 - 18:00 WITA',
                'is_featured' => true,
            ],
            [
                'category_id' => $catDayak->id,
                'floor_id' => $l1->id,
                'name' => 'Kios Cinderamata Mahakam',
                'slug' => 'kios-cinderamata-mahakam',
                'unit_number' => 'Blok C No. 15',
                'description' => 'Aneka miniatur rumah betang, gantungan kunci manik, kaos Balikpapan Beriman, dan gelang akar bahar.',
                'phone_whatsapp' => '6281234567805',
                'instagram' => '@souvenirs_kebunsayur',
                'opening_hours' => '09:00 - 18:30 WITA',
                'is_featured' => false,
            ],
            [
                'category_id' => $catBatik->id,
                'floor_id' => $l1->id,
                'name' => 'Batik Ampiek Khas Balikpapan',
                'slug' => 'batik-ampiek-khas-balikpapan',
                'unit_number' => 'Blok D No. 03',
                'description' => 'Pelopor batik khas Balikpapan bermotif kepiting, mangrove, dan corak etnik Kalimantan. Bahan katun halus dan sutra premium.',
                'phone_whatsapp' => '6281234567806',
                'instagram' => '@batikampiek.official',
                'opening_hours' => '09:00 - 18:00 WITA',
                'is_featured' => true,
            ],
            [
                'category_id' => $catKuliner->id,
                'floor_id' => $gf->id,
                'name' => 'Oleh-Oleh Amplang Kuku Macan Ibu Ani',
                'slug' => 'oleh-oleh-amplang-ibu-ani',
                'unit_number' => 'Blok E No. 01',
                'description' => 'Amplang tenggiri khas Balikpapan gurih dan renyah. Sedia juga mantau kukus, lempok durian asli kutai, dan abon kepiting.',
                'phone_whatsapp' => '6281234567807',
                'instagram' => '@amplangkukumacani',
                'opening_hours' => '08:00 - 20:00 WITA',
                'is_featured' => true,
            ],
            [
                'category_id' => $catJasa->id,
                'floor_id' => $l2->id,
                'name' => 'Bengkel Poles Batu Borneo',
                'slug' => 'bengkel-poles-batu-borneo',
                'unit_number' => 'Blok F No. 05',
                'description' => 'Melayani potong bongkahan batu, asah mata cincin cabochon/faceted, serta pasang cangkang perak perhiasan.',
                'phone_whatsapp' => '6281234567808',
                'instagram' => null,
                'opening_hours' => '10:00 - 17:00 WITA',
                'is_featured' => false,
            ],
        ];

        foreach ($tenants as $t) {
            Tenant::create($t);
        }

        // 5. Facilities
        $facilities = [
            [
                'name' => 'Musholla Nyaman',
                'icon_name' => 'Home',
                'location_note' => 'Lantai 2 Barat',
                'description' => 'Tempat ibadah yang bersih dan terawat dengan area wudhu terpisah untuk kenyamanan pengunjung muslim.',
                'order_index' => 1,
            ],
            [
                'name' => 'Toilet Bersih & Difabel',
                'icon_name' => 'Users',
                'location_note' => 'Lantai Dasar & Lantai 1',
                'description' => 'Fasilitas sanitasi yang rutin dibersihkan setiap jam, dilengkapi akses toilet ramah disabilitas.',
                'order_index' => 2,
            ],
            [
                'name' => 'ATM Center Terpadu',
                'icon_name' => 'CreditCard',
                'location_note' => 'Lantai Dasar Pintu Timur',
                'description' => 'Kemudahan transaksi tunai dan non-tunai dengan ATM Bank Mandiri, BCA, BRI, dan Bank Kaltimtara.',
                'order_index' => 3,
            ],
            [
                'name' => 'Area Parkir Luas',
                'icon_name' => 'Car',
                'location_note' => 'Halaman Depan & Belakang',
                'description' => 'Lahan parkir kendaraan roda 2 dan roda 4 yang luas dengan sistem karcis dan penjagaan keamanan terpadu.',
                'order_index' => 4,
            ],
            [
                'name' => 'Pos Keamanan & Informasi',
                'icon_name' => 'ShieldCheck',
                'location_note' => 'Lobby Utama Gedung',
                'description' => 'Petugas keamanan (Satpam) siaga 24 jam siap membantu arah denah kios dan kenyamanan pengunjung.',
                'order_index' => 5,
            ],
            [
                'name' => 'Food Court Kuliner Kaltim',
                'icon_name' => 'Coffee',
                'location_note' => 'Lantai 2 Sisi Timur',
                'description' => 'Pusat istirahat bersantap dengan aneka pilihan es kelapa, soto banjar, nasi kuning, dan camilan khas Balikpapan.',
                'order_index' => 6,
            ],
        ];

        foreach ($facilities as $f) {
            Facility::create($f);
        }

        // 6. Whats On (Events & Promos)
        WhatsOn::create([
            'title' => 'Festival Pesona Budaya & Batu Mulia Balikpapan 2026',
            'slug' => 'festival-pesona-budaya-batu-mulia-2026',
            'type' => 'event',
            'start_date' => '2026-10-10',
            'end_date' => '2026-10-15',
            'summary' => 'Pameran akbar koleksi permata nusantara, kontes batu akik Borneo, dan pentas tari tradisional Dayak di Atrium Plaza Kebun Sayur.',
            'content' => 'Sambut semarak Festival Budaya Plaza Kebun Sayur! Dimeriahkan oleh puluhan kolektor batu akik se-Kalimantan, demonstrasi pembuatan ukiran mandau langsung oleh pengrajin pedalaman, serta promo diskon khusus perhiasan emas dan kerajinan.',
            'is_active' => true,
        ]);

        WhatsOn::create([
            'title' => 'Promo Wisata Cinderamata IKN & Nusantara',
            'slug' => 'promo-wisata-cinderamata-ikn',
            'type' => 'promo',
            'start_date' => '2026-09-01',
            'end_date' => '2026-10-31',
            'summary' => 'Dapatkan suvenir gantungan manik khas Dayak gratis untuk setiap pembelian kain batik atau perhiasan minimal Rp 500.000.',
            'content' => 'Menyambut para delegasi dan wisatawan Nusantara ke Kalimantan Timur, puluhan kios cinderamata di Plaza Kebun Sayur memberikan penawaran suvenir spesial selama bulan ini.',
            'is_active' => true,
        ]);
    }
}
