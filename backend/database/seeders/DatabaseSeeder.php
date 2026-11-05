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

        // 3. Categories (Retail & Fashion)
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

        $catOlehOleh = Category::create([
            'name' => 'Oleh-Oleh Khas Kaltim',
            'slug' => 'oleh-oleh-khas-kaltim',
            'type' => 'retail',
            'icon_name' => 'PackageOpen',
            'description' => 'Amplang kuku macan renyah, mantau sapi lada hitam, lempok durian asli, dan abon kepiting khas kios depan.',
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

        // Categories: Fashion (Busana, Batik & Pakaian Adat)
        $catBatik = Category::create([
            'name' => 'Batik & Tenun Kaltim',
            'slug' => 'batik-dan-tenun-kaltim',
            'type' => 'fashion',
            'icon_name' => 'Shirt',
            'description' => 'Kain batik motif mangrove Balikpapan, sarung tenun Samarinda asli sutra, dan songket khas Kalimantan.',
            'order_index' => 6,
        ]);

        $catBusanaAdat = Category::create([
            'name' => 'Busana Adat & Etnik Dayak',
            'slug' => 'busana-adat-dan-etnik-dayak',
            'type' => 'fashion',
            'icon_name' => 'Sparkles',
            'description' => 'Pakaian adat Dayak bordir manik, rompi etnik, mahkota bulu burung enggang, dan kelengkapan tari tradisional.',
            'order_index' => 7,
        ]);

        $catFashionModern = Category::create([
            'name' => 'Pakaian & Aksesoris Modern',
            'slug' => 'pakaian-dan-aksesoris-modern',
            'type' => 'fashion',
            'icon_name' => 'ShoppingBag',
            'description' => 'Koleksi busana etnik modern, kemeja batik pria kantor, gamis pesta Kalimantan, dan aksesoris fashion terkini.',
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
                'tiktok' => '@permataborneo',
                'facebook' => 'Permata Borneo Gems Balikpapan',
                'website' => null,
                'images' => [
                    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
                ],
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
                'tiktok' => null,
                'facebook' => null,
                'website' => null,
                'images' => [
                    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
                ],
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
                'tiktok' => null,
                'facebook' => null,
                'website' => null,
                'images' => [
                    'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=800&q=80',
                ],
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
                'tiktok' => null,
                'facebook' => 'Toko Emas Sejahtera Balikpapan',
                'website' => null,
                'images' => [
                    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
                ],
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
                'tiktok' => null,
                'facebook' => null,
                'website' => null,
                'images' => [
                    'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
                ],
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
                'tiktok' => '@dayakartkenyah',
                'facebook' => null,
                'website' => null,
                'images' => [
                    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
                ],
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
                'tiktok' => null,
                'facebook' => null,
                'website' => null,
                'images' => [
                    'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80',
                ],
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
                'tiktok' => null,
                'facebook' => null,
                'website' => null,
                'images' => [
                    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
                ],
                'opening_time' => '09:30:00',
                'closing_time' => '17:30:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => false,
            ],

            // Retail: Oleh-Oleh Khas Kaltim (Kios Depan / GF)
            [
                'category_id' => $catOlehOleh->id,
                'floor_id' => $gf->id,
                'name' => 'Oleh-Oleh Amplang Kuku Macan Ibu Ani',
                'slug' => 'oleh-oleh-amplang-ibu-ani',
                'unit_number' => 'Blok E No. 01',
                'description' => 'Amplang tenggiri khas Balikpapan gurih dan renyah tanpa bahan pengawet. Tersedia juga lempok durian asli kutai, mantau mini, dan abon kepiting.',
                'phone_whatsapp' => '081234567813',
                'instagram' => '@amplangkukumacani',
                'tiktok' => '@amplangibuani',
                'facebook' => 'Amplang Ibu Ani Balikpapan',
                'website' => null,
                'images' => [
                    'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
                ],
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
                'tiktok' => '@mantauborneo',
                'facebook' => null,
                'website' => null,
                'images' => [
                    'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
                ],
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
                'tiktok' => null,
                'facebook' => null,
                'website' => null,
                'images' => [
                    'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
                ],
                'opening_time' => '08:30:00',
                'closing_time' => '19:00:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => false,
            ],

            // Retail: Cinderamata & Aksesoris
            [
                'category_id' => $catCinderamata->id,
                'floor_id' => $l1->id,
                'name' => 'Kios Cinderamata Mahakam',
                'slug' => 'kios-cinderamata-mahakam',
                'unit_number' => 'Blok C No. 15',
                'description' => 'Aneka miniatur rumah betang, gantungan kunci manik, kaos Balikpapan Beriman, dan gelang akar bahar asli laut Kaltim.',
                'phone_whatsapp' => '081234567811',
                'instagram' => '@souvenirs_kebunsayur',
                'tiktok' => null,
                'facebook' => null,
                'website' => null,
                'images' => [
                    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
                ],
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
                'tiktok' => null,
                'facebook' => null,
                'website' => null,
                'images' => [
                    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
                ],
                'opening_time' => '08:30:00',
                'closing_time' => '18:00:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => false,
            ],

            // Fashion: Batik & Tenun Kaltim
            [
                'category_id' => $catBatik->id,
                'floor_id' => $l1->id,
                'name' => 'Batik Ampiek Khas Balikpapan',
                'slug' => 'batik-ampiek-khas-balikpapan',
                'unit_number' => 'Blok D No. 03',
                'description' => 'Pelopor batik khas Balikpapan bermotif kepiting, mangrove, dan corak etnik Kalimantan. Bahan katun primisima halus dan sutra ATBM.',
                'phone_whatsapp' => '081234567809',
                'instagram' => '@batikampiek.official',
                'tiktok' => '@batikampiek',
                'facebook' => 'Batik Ampiek Balikpapan',
                'website' => 'https://batikampiek.id',
                'images' => [
                    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=800&q=80',
                ],
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
                'tiktok' => '@tenunmahakam',
                'facebook' => null,
                'website' => null,
                'images' => [
                    'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
                ],
                'opening_time' => '09:00:00',
                'closing_time' => '17:30:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => false,
            ],
            [
                'category_id' => $catBatik->id,
                'floor_id' => $l1->id,
                'name' => 'Batik Mahakam Jaya',
                'slug' => 'batik-mahakam-jaya',
                'unit_number' => 'Blok D No. 14',
                'description' => 'Koleksi busana batik tulis dan cap Kalimantan motif batang garing Dayak, selendang sutra, dan seragam batik kantor elegan.',
                'phone_whatsapp' => '081234567822',
                'instagram' => '@batikmahakam_jaya',
                'tiktok' => '@batikmahakam',
                'facebook' => 'Batik Mahakam Jaya Plaza Bunsay',
                'website' => null,
                'images' => [
                    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=800&q=80',
                ],
                'opening_time' => '09:00:00',
                'closing_time' => '18:00:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => true,
            ],

            // Fashion: Busana Adat & Etnik Dayak
            [
                'category_id' => $catBusanaAdat->id,
                'floor_id' => $l1->id,
                'name' => 'Galeri Busana Dayak Kenyah',
                'slug' => 'galeri-busana-dayak-kenyah',
                'unit_number' => 'Blok D No. 18',
                'description' => 'Pakaian adat Dayak Kenyah lengkap dengan rompi manik, ikat kepala bulu enggang, gelang taring, dan kain cawat etnik untuk acara festival.',
                'phone_whatsapp' => '081234567823',
                'instagram' => '@busanadayak.kenyah',
                'tiktok' => '@busanadayak',
                'facebook' => 'Galeri Busana Dayak Kenyah Balikpapan',
                'website' => null,
                'images' => [
                    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
                ],
                'opening_time' => '09:00:00',
                'closing_time' => '18:00:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => true,
            ],
            [
                'category_id' => $catBusanaAdat->id,
                'floor_id' => $l1->id,
                'name' => 'Pakaian Tradisional Adat Kutai',
                'slug' => 'pakaian-tradisional-adat-kutai',
                'unit_number' => 'Blok D No. 22',
                'description' => 'Busana pengantin adat Kutai (Baju Kustin), baju antakusuma, kain songket berhias benang emas, dan perlengkapan pakaian adat resmi.',
                'phone_whatsapp' => '081234567824',
                'instagram' => '@busana_adatkutai',
                'tiktok' => '@adatkutai',
                'facebook' => null,
                'website' => null,
                'images' => [
                    'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
                ],
                'opening_time' => '09:00:00',
                'closing_time' => '17:30:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => false,
            ],

            // Fashion: Pakaian & Aksesoris Modern
            [
                'category_id' => $catFashionModern->id,
                'floor_id' => $l1->id,
                'name' => 'Butik Etnik Borneo Modern',
                'slug' => 'butik-etnik-borneo-modern',
                'unit_number' => 'Blok D No. 26',
                'description' => 'Kombinasi rancangan modern dengan sentuhan kain etnik Dayak dan batik Balikpapan: blazer etnik, outer tenun wanita, dan dress santai.',
                'phone_whatsapp' => '081234567825',
                'instagram' => '@borneoetnik.modern',
                'tiktok' => '@borneomodern',
                'facebook' => 'Butik Etnik Borneo Modern',
                'website' => null,
                'images' => [
                    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80',
                ],
                'opening_time' => '09:30:00',
                'closing_time' => '18:30:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => true,
            ],
            [
                'category_id' => $catFashionModern->id,
                'floor_id' => $l1->id,
                'name' => 'Gamis & Busana Modest Etnik',
                'slug' => 'gamis-busana-modest-etnik',
                'unit_number' => 'Blok D No. 30',
                'description' => 'Busana muslimah motif batik Kaltim, gamis syari tenun, jilbab bordir etnik, dan aneka perlengkapan busana muslimah elegan.',
                'phone_whatsapp' => '081234567826',
                'instagram' => '@modest_etnikkaltim',
                'tiktok' => null,
                'facebook' => null,
                'website' => null,
                'images' => [
                    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
                ],
                'opening_time' => '09:00:00',
                'closing_time' => '18:00:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => false,
            ],
            [
                'category_id' => $catFashionModern->id,
                'floor_id' => $l1->id,
                'name' => 'Kemeja & Busana Pria Borneo',
                'slug' => 'kemeja-busana-pria-borneo',
                'unit_number' => 'Blok D No. 34',
                'description' => 'Kemeja pria lengan panjang dan pendek motif batik mangrove, kemeja tenun ikat Samarinda, dan rompi formal kantor.',
                'phone_whatsapp' => '081234567827',
                'instagram' => '@pria_borneofashion',
                'tiktok' => '@kemejaborneo',
                'facebook' => null,
                'website' => null,
                'images' => [
                    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
                ],
                'opening_time' => '09:00:00',
                'closing_time' => '18:00:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => false,
            ],
            [
                'category_id' => $catFashionModern->id,
                'floor_id' => $l1->id,
                'name' => 'Kios Aksesoris & Manik Busana',
                'slug' => 'kios-aksesoris-manik-busana',
                'unit_number' => 'Blok D No. 38',
                'description' => 'Aneka sabuk tenun, bros etnik manik Dayak, selendang songket, kancing ukir kayu ulin, dan pernak-pernik pelengkap busana adat.',
                'phone_whatsapp' => '081234567828',
                'instagram' => null,
                'tiktok' => null,
                'facebook' => null,
                'website' => null,
                'images' => [
                    'https://images.unsplash.com/photo-1611591475155-426c043e4042?auto=format&fit=crop&w=800&q=80',
                ],
                'opening_time' => '09:30:00',
                'closing_time' => '17:30:00',
                'days_open' => 'Setiap Hari (Senin - Minggu)',
                'is_featured' => false,
            ],
        ];

        foreach ($tenants as $t) {
            Tenant::create($t);
        }

        // 5. Facilities (Short labels, Food Court removed)
        $facilities = [
            [
                'name' => 'Musala',
                'icon_name' => 'Moon',
                'location_note' => 'Lantai 2 Sisi Barat',
                'description' => 'Tempat ibadah yang bersih dan terawat dengan area wudhu terpisah untuk kenyamanan pengunjung muslim.',
                'order_index' => 1,
            ],
            [
                'name' => 'Toilet',
                'icon_name' => 'Users',
                'location_note' => 'Lantai Dasar & Lantai 1',
                'description' => 'Fasilitas sanitasi yang rutin dibersihkan setiap jam, dilengkapi akses toilet ramah disabilitas.',
                'order_index' => 2,
            ],
            [
                'name' => 'ATM Center',
                'icon_name' => 'CreditCard',
                'location_note' => 'Lantai Dasar Pintu Timur',
                'description' => 'Kemudahan transaksi tunai dan non-tunai dengan ATM Bank Mandiri, BCA, BRI, dan Bank Kaltimtara.',
                'order_index' => 3,
            ],
            [
                'name' => 'Area Parkir',
                'icon_name' => 'Car',
                'location_note' => 'Halaman Depan & Belakang',
                'description' => 'Lahan parkir kendaraan roda 2 dan roda 4 yang luas dengan sistem karcis dan penjagaan keamanan terpadu.',
                'order_index' => 4,
            ],
            [
                'name' => 'Pos Keamanan',
                'icon_name' => 'ShieldCheck',
                'location_note' => 'Lobby Utama Gedung',
                'description' => 'Petugas keamanan (Satpam) siaga siap membantu arah denah kios dan kenyamanan pengunjung.',
                'order_index' => 5,
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
            'terms' => 'Terbuka untuk umum tanpa biaya pendaftaran. Pengunjung wajib menjaga ketertiban, kebersihan, dan keselamatan barang bawaan masing-masing.',
            'contact_person' => 'Bpk. Syahril (Koordinator Acara)',
            'contact_phone' => '081234567890',
            'is_active' => true,
        ]);

        WhatsOn::create([
            'title' => 'Promo Wisata Cinderamata IKN & Nusantara',
            'slug' => 'promo-wisata-cinderamata-ikn',
            'type' => 'promo',
            'start_date' => '2026-09-01',
            'end_date' => '2026-10-31',
            'time' => '09.00 – 18.00 WITA (Buka Setiap Hari)',
            'location' => 'Kios Cinderamata, Batik & Kios Depan Berpartisipasi',
            'admission' => 'Promo Belanja Langsung',
            'banner_image' => 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
            'summary' => 'Dapatkan suvenir gantungan manik khas Dayak gratis untuk setiap pembelian kain batik atau perhiasan minimal Rp 500.000.',
            'content' => 'Menyambut para delegasi dan wisatawan Nusantara ke Kalimantan Timur, puluhan kios cinderamata di Plaza Kebun Sayur memberikan penawaran suvenir spesial selama bulan ini.',
            'highlights' => [
                'Gratis suvenir gantungan kunci manik Dayak eksklusif dengan belanja minimal Rp 500.000.',
                'Diskon spesial hingga 20% untuk pembelian kain tenun dan batik motif mangrove Balikpapan.',
                'Kemasan khusus dus siap bagasi pesawat untuk produk oleh-oleh khas dan kerajinan.',
            ],
            'terms' => 'Berlaku selama persediaan suvenir bonus masih ada di kios mitra berpartisipasi. Cukup tunjukkan nota belanja transaksi hari yang sama.',
            'contact_person' => 'Kantor Pengelola Plaza Kebun Sayur',
            'contact_phone' => '080000000000',
            'is_active' => true,
        ]);

        WhatsOn::create([
            'title' => 'Promo Diskon Kios Fashion & Batik Mahakam',
            'slug' => 'promo-diskon-kios-fashion-batik-mahakam',
            'type' => 'promo',
            'start_date' => '2026-11-01',
            'end_date' => '2026-11-30',
            'time' => '09.00 – 18.00 WITA',
            'location' => 'Lantai 1 Sentra Busana & Batik',
            'admission' => 'Potongan Langsung di Kios',
            'banner_image' => 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
            'summary' => 'Diskon belanja hingga 20% untuk pembelian kain batik motif mangrove, sarung tenun, dan baju etnik Dayak di kios berpartisipasi.',
            'content' => 'Kunjungi sentra busana lantai 1 Plaza Kebun Sayur dan nikmati penawaran istimewa sepanjang bulan ini. Setiap transaksi busana adat dan kain tenun berkesempatan mendapatkan voucher suvenir cenderamata.',
            'highlights' => [
                'Diskon langsung 15-20% untuk kain batik motif mangrove khas Balikpapan.',
                'Gratis masker etnik kain tenun untuk pembelanjaan minimal Rp 300.000.',
                'Layanan ukur baju dan jahit custom pakaian adat di tempat.',
            ],
            'terms' => 'Berlaku di seluruh kios batik & busana lantai 1 bertanda khusus promo. Tidak dapat digabungkan dengan promo lain.',
            'contact_person' => 'Ibu Rahmawati (Koordinator Kios Fashion)',
            'contact_phone' => '08125557788',
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
            'maps_embed_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8924495252077!2d116.82160367496476!3d-1.234368035571572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x55155145b04a009%3A0xd023fb431afb2027!2sPlaza%20Kebun%20Sayur!5e0!3m2!1sen!2sid!4v1791731211789!5m2!1sen!2sid',
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
