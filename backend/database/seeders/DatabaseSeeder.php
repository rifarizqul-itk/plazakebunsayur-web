<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Facility;
use App\Models\Floor;
use App\Models\SiteSetting;
use App\Models\Tenant;
use App\Models\User;
use App\Models\WhatsOn;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

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

        // 3. Categories (Retail vs Culinary)
        $catBatu = Category::create([
            'name' => 'Batu Mulia & Akik',
            'slug' => 'batu-mulia-dan-akik',
            'type' => 'retail',
            'icon_name' => 'Gem',
            'description' => 'Pusat koleksi batu akik Kalimantan, kecubung wulung, red borneo, dan aneka permata bersertifikat.',
            'order_index' => 1,
        ]);

        $catEmas = Category::create([
            'name' => 'Perhiasan Emas & Perak',
            'slug' => 'perhiasan-emas-dan-perak',
            'type' => 'retail',
            'icon_name' => 'Sparkles',
            'description' => 'Deretan toko emas terpercaya, perak bakar, dan custom cincin pernikahan khas Kaltim.',
            'order_index' => 2,
        ]);

        $catDayak = Category::create([
            'name' => 'Kerajinan Dayak & Souvenir',
            'slug' => 'kerajinan-dayak-dan-souvenir',
            'type' => 'retail',
            'icon_name' => 'ShoppingBag',
            'description' => 'Mandau bertuah, rompi manik motif Dayak Kenyah, gelang ulin, dan pernak-pernik khas Borneo.',
            'order_index' => 3,
        ]);

        $catBatik = Category::create([
            'name' => 'Batik & Songket Kaltim',
            'slug' => 'batik-dan-songket-kaltim',
            'type' => 'retail',
            'icon_name' => 'Shirt',
            'description' => 'Kain batik motif mangrove Balikpapan, sarung tenun Samarinda asli, dan baju etnik modern.',
            'order_index' => 4,
        ]);

        $catCinderamata = Category::create([
            'name' => 'Cinderamata & Aksesoris',
            'slug' => 'cinderamata-dan-aksesoris',
            'type' => 'retail',
            'icon_name' => 'Package',
            'description' => 'Miniatur khas Kaltim, gantungan kunci manik, kaos Balikpapan, dan gelang akar bahar.',
            'order_index' => 5,
        ]);

        // Categories (Culinary)
        $catOlehOleh = Category::create([
            'name' => 'Oleh-Oleh Khas Kaltim',
            'slug' => 'oleh-oleh-khas-kaltim',
            'type' => 'culinary',
            'icon_name' => 'PackageOpen',
            'description' => 'Amplang kuku macan renyah, mantau sapi lada hitam, lempok durian asli, dan abon kepiting.',
            'order_index' => 6,
        ]);

        $catKulinerBerat = Category::create([
            'name' => 'Makanan Berat & Soto',
            'slug' => 'makanan-berat-dan-soto',
            'type' => 'culinary',
            'icon_name' => 'UtensilsCrossed',
            'description' => 'Soto Banjar kuah kental ayam kampung, nasi kuning bumbu habang, dan olahan kepiting sedap.',
            'order_index' => 7,
        ]);

        $catKudapan = Category::create([
            'name' => 'Kudapan & Minuman Tradisional',
            'slug' => 'kudapan-dan-minuman-tradisional',
            'type' => 'culinary',
            'icon_name' => 'Coffee',
            'description' => 'Bingka kentang bakar, wadai tradisional Banjar, es kelapa muda, dan kopi Borneo harum.',
            'order_index' => 8,
        ]);

        // 4. Authentic Kebun Sayur Merchants (22 Kios)
        $tenants = [
            // Retail: Batu Mulia
            [
                'category_id' => $catBatu->id,
                'floor_id' => $gf->id,
                'name' => 'Permata Borneo Gems',
                'slug' => 'permata-borneo-gems',
                'unit_number' => 'Blok A No. 04',
                'description' => 'Menyediakan aneka batu akik asli Kalimantan, Red Borneo, Kecubung Pangkalan Bun, Giok Sojol, serta jasa ikat cincin perak titanium.',
                'phone_whatsapp' => '081234567801',
                'instagram' => '@permataborneo.bunsay',
                'opening_time' => '09:00:00',
                'closing_time' => '18:00:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => true,
            ],
            [
                'category_id' => $catBatu->id,
                'floor_id' => $gf->id,
                'name' => 'Galeri Mustika Safir',
                'slug' => 'galeri-mustika-safir',
                'unit_number' => 'Blok A No. 11',
                'description' => 'Spesialis batu mulia natural: Safir Ceylon, Zamrud Kolombia, Ruby Burma, dan pengujian keaslian lab gemologi.',
                'phone_whatsapp' => '081234567802',
                'instagram' => '@mustikasafir_kaltim',
                'opening_time' => '09:30:00',
                'closing_time' => '17:30:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => true,
            ],
            [
                'category_id' => $catBatu->id,
                'floor_id' => $gf->id,
                'name' => 'Kios Akik Tuah Borneo',
                'slug' => 'kios-akik-tuah-borneo',
                'unit_number' => 'Blok A No. 18',
                'description' => 'Koleksi akik antik, pirus Persia, badar besi kristal, dan jasa poles kilap batu mulia berkualitas tinggi.',
                'phone_whatsapp' => '081234567803',
                'instagram' => null,
                'opening_time' => '09:00:00',
                'closing_time' => '18:00:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => false,
            ],

            // Retail: Perhiasan Emas & Perak
            [
                'category_id' => $catEmas->id,
                'floor_id' => $gf->id,
                'name' => 'Toko Emas Sejahtera Sayur',
                'slug' => 'toko-emas-sejahtera-sayur',
                'unit_number' => 'Blok B No. 01 - 02',
                'description' => 'Pusat jual beli perhiasan emas kadar 700, 750, dan 999. Model kalung, gelang, dan cincin pengantin terkini dengan sertifikat resmi.',
                'phone_whatsapp' => '081234567804',
                'instagram' => '@emas_sejahterabunsay',
                'opening_time' => '08:30:00',
                'closing_time' => '17:00:00',
                'days_open' => 'Senin - Sabtu',
                'is_featured' => true,
            ],
            [
                'category_id' => $catEmas->id,
                'floor_id' => $gf->id,
                'name' => 'Toko Perak Borneo Silver',
                'slug' => 'toko-perak-borneo-silver',
                'unit_number' => 'Blok B No. 08',
                'description' => 'Kerajinan perak 925 khas pengrajin lokal, custom emban cincin ukir etnik, gelang perak rantai, dan liontin nama.',
                'phone_whatsapp' => '081234567805',
                'instagram' => '@borneosilver.craft',
                'opening_time' => '09:00:00',
                'closing_time' => '17:30:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => false,
            ],

            // Retail: Kerajinan Dayak
            [
                'category_id' => $catDayak->id,
                'floor_id' => $l1->id,
                'name' => 'Art Shop Dayak Kenyah',
                'slug' => 'art-shop-dayak-kenyah',
                'unit_number' => 'Blok C No. 08',
                'description' => 'Pusat kerajinan seni suku Dayak terlengkap: Mandau tradisional gagang tanduk rusa, tameng motif etnik, tas anyaman manik, dan gelang kayu ulin asli.',
                'phone_whatsapp' => '081234567806',
                'instagram' => '@dayakart_kebunsayur',
                'opening_time' => '09:00:00',
                'closing_time' => '18:00:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => true,
            ],
            [
                'category_id' => $catDayak->id,
                'floor_id' => $l1->id,
                'name' => 'Galeri Etnik Pedalaman Apo Kayan',
                'slug' => 'galeri-etnik-apo-kayan',
                'unit_number' => 'Blok C No. 12',
                'description' => 'Karya seni ukir kayu gaharu dan ulin asli suku Dayak Apo Kayan, kalung manik ba’ik, rompi tari tradisional, dan topi saung etnik.',
                'phone_whatsapp' => '081234567807',
                'instagram' => '@apokayan_craft',
                'opening_time' => '09:00:00',
                'closing_time' => '18:00:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => true,
            ],
            [
                'category_id' => $catDayak->id,
                'floor_id' => $l1->id,
                'name' => 'Mandau Pusaka Borneo',
                'slug' => 'mandau-pusaka-borneo',
                'unit_number' => 'Blok C No. 20',
                'description' => 'Koleksi mandau senjata pusaka khas Dayak berbagai ukuran, anak mandau penyerang, dan sarung kayu sungkai berhias bulu burung enggang.',
                'phone_whatsapp' => '081234567808',
                'instagram' => null,
                'opening_time' => '09:30:00',
                'closing_time' => '17:30:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => false,
            ],

            // Retail: Batik & Songket
            [
                'category_id' => $catBatik->id,
                'floor_id' => $l1->id,
                'name' => 'Batik Ampiek Khas Balikpapan',
                'slug' => 'batik-ampiek-khas-balikpapan',
                'unit_number' => 'Blok D No. 03',
                'description' => 'Pelopor batik khas Balikpapan bermotif kepiting, mangrove, dan corak etnik Kalimantan. Bahan katun primisima halus dan sutra ATBM.',
                'phone_whatsapp' => '081234567809',
                'instagram' => '@batikampiek.official',
                'opening_time' => '09:00:00',
                'closing_time' => '18:00:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => true,
            ],
            [
                'category_id' => $catBatik->id,
                'floor_id' => $l1->id,
                'name' => 'Tenun Mahakam Indah',
                'slug' => 'tenun-mahakam-indah',
                'unit_number' => 'Blok D No. 09',
                'description' => 'Sarung tenun Samarinda asli benang sutra, kain songket khas Kutai Kartanegara, dan kemeja tenun pria formal.',
                'phone_whatsapp' => '081234567810',
                'instagram' => '@tenunmahakam_bunsay',
                'opening_time' => '09:00:00',
                'closing_time' => '17:30:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => false,
            ],

            // Retail: Cinderamata
            [
                'category_id' => $catCinderamata->id,
                'floor_id' => $l1->id,
                'name' => 'Kios Cinderamata Mahakam',
                'slug' => 'kios-cinderamata-mahakam',
                'unit_number' => 'Blok C No. 15',
                'description' => 'Aneka miniatur rumah betang, gantungan kunci manik, kaos Balikpapan Beriman, dan gelang akar bahar asli laut Kaltim.',
                'phone_whatsapp' => '081234567811',
                'instagram' => '@souvenirs_kebunsayur',
                'opening_time' => '09:00:00',
                'closing_time' => '18:30:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => false,
            ],
            [
                'category_id' => $catCinderamata->id,
                'floor_id' => $l1->id,
                'name' => 'Borneo Souvenir Center',
                'slug' => 'borneo-souvenir-center',
                'unit_number' => 'Blok C No. 25',
                'description' => 'Grosir suvenir oleh-oleh pernak-pernik murah: dompet manik Dayak, tempelan kulkas IKN, topi rimba Borneo, dan tas anjat rotan.',
                'phone_whatsapp' => '081234567812',
                'instagram' => null,
                'opening_time' => '08:30:00',
                'closing_time' => '18:00:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => false,
            ],

            // Culinary: Oleh-Oleh Khas Kaltim
            [
                'category_id' => $catOlehOleh->id,
                'floor_id' => $gf->id,
                'name' => 'Oleh-Oleh Amplang Kuku Macan Ibu Ani',
                'slug' => 'oleh-oleh-amplang-ibu-ani',
                'unit_number' => 'Blok E No. 01',
                'description' => 'Amplang tenggiri khas Balikpapan gurih dan renyah tanpa bahan pengawet. Tersedia juga lempok durian asli kutai, mantau mini, dan abon kepiting.',
                'phone_whatsapp' => '081234567813',
                'instagram' => '@amplangkukumacani',
                'opening_time' => '08:00:00',
                'closing_time' => '20:00:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => true,
            ],
            [
                'category_id' => $catOlehOleh->id,
                'floor_id' => $gf->id,
                'name' => 'Mantau Sapi Rasa Borneo',
                'slug' => 'mantau-sapi-rasa-borneo',
                'unit_number' => 'Blok E No. 04',
                'description' => 'Mantau lembut khas Balikpapan dengan saus daging sapi lada hitam pekat. Dikemas frozen siap kukus atau goreng untuk bekal perjalanan pesawat.',
                'phone_whatsapp' => '081234567814',
                'instagram' => '@mantaurasaborneo',
                'opening_time' => '08:30:00',
                'closing_time' => '19:30:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => true,
            ],
            [
                'category_id' => $catOlehOleh->id,
                'floor_id' => $gf->id,
                'name' => 'Sentra Lempok Durian Paser',
                'slug' => 'sentra-lempok-durian-paser',
                'unit_number' => 'Blok E No. 07',
                'description' => 'Dodol lempok durian asli 100% daging durian legit tanpa campuran tepung. Sedia pula peyek kepiting dan stik cumi renyah.',
                'phone_whatsapp' => '081234567815',
                'instagram' => null,
                'opening_time' => '08:30:00',
                'closing_time' => '19:00:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => false,
            ],

            // Culinary: Makanan Berat & Soto (Food Court L2)
            [
                'category_id' => $catKulinerBerat->id,
                'floor_id' => $l2->id,
                'name' => 'Warung Soto Banjar H. Ridwan',
                'slug' => 'warung-soto-banjar-h-ridwan',
                'unit_number' => 'Food Court No. 02',
                'description' => 'Soto Banjar legendaris kuah susu rempah wangi dengan suwiran ayam kampung, telur bebek rebus, dan perkedel singkong renyah.',
                'phone_whatsapp' => '081234567816',
                'instagram' => '@sotobanjar.ridwan',
                'opening_time' => '08:00:00',
                'closing_time' => '18:00:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => true,
            ],
            [
                'category_id' => $catKulinerBerat->id,
                'floor_id' => $l2->id,
                'name' => 'Nasi Kuning Bumbu Habang Bu Maryam',
                'slug' => 'nasi-kuning-habang-bu-maryam',
                'unit_number' => 'Food Court No. 05',
                'description' => 'Nasi kuning harum santan pandan dengan lauk haruan (ikan gabus) masak habang pedas manis, serundeng kelapa, dan sambal goreng tempe.',
                'phone_whatsapp' => '081234567817',
                'instagram' => null,
                'opening_time' => '07:30:00',
                'closing_time' => '15:00:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => false,
            ],
            [
                'category_id' => $catKulinerBerat->id,
                'floor_id' => $l2->id,
                'name' => 'Dapur Kepiting Dandito Bunsay',
                'slug' => 'dapur-kepiting-dandito-bunsay',
                'unit_number' => 'Food Court No. 08',
                'description' => 'Olahan kepiting bakau segar saus dandito spesial asam manis pedas, kepiting lada hitam, dan sup jagung kepiting.',
                'phone_whatsapp' => '081234567818',
                'instagram' => '@dandito_kebunsayur',
                'opening_time' => '10:00:00',
                'closing_time' => '20:00:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => true,
            ],

            // Culinary: Kudapan & Minuman (Food Court L2 & GF)
            [
                'category_id' => $catKudapan->id,
                'floor_id' => $l2->id,
                'name' => 'Bingka Bakar Mahligai Selera',
                'slug' => 'bingka-bakar-mahligai-selera',
                'unit_number' => 'Food Court No. 11',
                'description' => 'Kue bingka kentang panggang tradisional lembut rasa original, pandan suji, dan keju. Cocok untuk teman minum teh sore.',
                'phone_whatsapp' => '081234567819',
                'instagram' => '@bingkamahligai',
                'opening_time' => '09:00:00',
                'closing_time' => '18:00:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => false,
            ],
            [
                'category_id' => $catKudapan->id,
                'floor_id' => $gf->id,
                'name' => 'Es Kelapa Jeruk Segar Bunsay',
                'slug' => 'es-kelapa-jeruk-segar-bunsay',
                'unit_number' => 'Blok Selasar Timur',
                'description' => 'Minuman pelepas dahaga es kelapa muda murni campur perasan jeruk pontianak manis alami dan es sirop selasih.',
                'phone_whatsapp' => '081234567820',
                'instagram' => null,
                'opening_time' => '09:00:00',
                'closing_time' => '18:30:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => false,
            ],
            [
                'category_id' => $catKudapan->id,
                'floor_id' => $l2->id,
                'name' => 'Kedai Kopi Khas Paser',
                'slug' => 'kedai-kopi-khas-paser',
                'unit_number' => 'Food Court No. 14',
                'description' => 'Seduhan kopi robusta biji lokal Kaltim racikan saring tradisional, pisang gapit sirup gula merah wangi pandan, dan singkong goreng sambal roa.',
                'phone_whatsapp' => '081234567821',
                'instagram' => '@kopipaser_bunsay',
                'opening_time' => '08:30:00',
                'closing_time' => '19:30:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => true,
            ],
        ];

        foreach ($tenants as $t) {
            Tenant::create($t);
        }

        // 5. Facilities
        $facilities = [
            [
                'name' => 'Musholla Nyaman',
                'icon_name' => 'Moon',
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
                'description' => 'Petugas keamanan (Satpam) siaga siap membantu arah denah kios dan kenyamanan pengunjung.',
                'order_index' => 5,
            ],
            [
                'name' => 'Food Court Kuliner Kaltim',
                'icon_name' => 'Utensils',
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
            'time' => '10.00 – 17.30 WITA',
            'location' => 'Atrium Utama (Lantai Dasar & Koridor Timur)',
            'admission' => 'Gratis (Terbuka untuk Umum)',
            'banner_image' => 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
            'summary' => 'Pameran akbar koleksi permata nusantara, kontes batu akik Borneo, dan pentas tari tradisional Dayak di Atrium Plaza Kebun Sayur.',
            'content' => 'Sambut semarak Festival Budaya Plaza Kebun Sayur! Dimeriahkan oleh puluhan kolektor batu akik se-Kalimantan, demonstrasi pembuatan ukiran mandau langsung oleh pengrajin pedalaman, serta promo diskon khusus perhiasan emas dan kerajinan.',
            'highlights' => [
                'Pameran lebih dari 500 koleksi batu akik & permata alam langka se-Borneo (Red Borneo, Kecubung, Jamrud).',
                'Kontes dan uji keaslian batu mulia dengan sertifikasi gemologi langsung di tempat.',
                'Pertunjukan musik petik Sape dan tarian tradisional Dayak Kenyah setiap sore.',
                'Demonstrasi langsung pembuatan ukiran kayu ulin dan pengrajin ikat cincin perak.',
            ],
            'is_active' => true,
        ]);

        WhatsOn::create([
            'title' => 'Promo Wisata Cinderamata IKN & Nusantara',
            'slug' => 'promo-wisata-cinderamata-ikn',
            'type' => 'promo',
            'start_date' => '2026-09-01',
            'end_date' => '2026-10-31',
            'time' => '09.00 – 18.00 WITA (Buka Setiap Hari)',
            'location' => 'Kios Cinderamata, Batik & Kuliner Berpartisipasi',
            'admission' => 'Promo Belanja Langsung',
            'banner_image' => 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
            'summary' => 'Dapatkan suvenir gantungan manik khas Dayak gratis untuk setiap pembelian kain batik atau perhiasan minimal Rp 500.000.',
            'content' => 'Menyambut para delegasi dan wisatawan Nusantara ke Kalimantan Timur, puluhan kios cinderamata di Plaza Kebun Sayur memberikan penawaran suvenir spesial selama bulan ini.',
            'highlights' => [
                'Gratis suvenir gantungan kunci manik Dayak eksklusif dengan belanja minimal Rp 500.000.',
                'Diskon spesial hingga 20% untuk pembelian kain tenun dan batik motif mangrove Balikpapan.',
                'Kemasan khusus dus siap bagasi pesawat untuk produk oleh-oleh khas dan kerajinan.',
            ],
            'is_active' => true,
        ]);

        // 7. Site Settings (Informasi Operasional Gedung)
        $settings = [
            'mall_opening_hours' => 'Setiap Hari 08.00 - 18.00 WITA',
            'management_whatsapp' => '080000000000',
            'security_phone' => '(0542) 734567',
            'office_address' => 'Lantai Dasar (Pintu Timur), Jl. Letjen Suprapto, Kebun Sayur, Balikpapan Barat 76131',
            'management_email' => 'pengelola@plazakebunsayur.com',
            'maps_url' => 'https://maps.google.com/?q=Plaza+Kebun+Sayur+Balikpapan',
        ];

        foreach ($settings as $key => $value) {
            SiteSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        // 8. Page Contents & Dynamic CMS Lists
        $this->call([
            PageContentSeeder::class,
            VisitGuideSeeder::class,
            NavItemSeeder::class,
            LegalPageSeeder::class,
        ]);
    }
}
