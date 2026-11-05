<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Batu Mulia & Akik',
                'slug' => 'batu-mulia-dan-akik',
                'type' => 'retail',
                'icon_name' => 'Gem',
                'description' => 'Pusat koleksi batu akik Kalimantan, kecubung wulung, red borneo, dan aneka permata bersertifikat.',
                'order_index' => 1,
            ],
            [
                'name' => 'Perhiasan Emas & Perak',
                'slug' => 'perhiasan-emas-dan-perak',
                'type' => 'retail',
                'icon_name' => 'Sparkles',
                'description' => 'Deretan toko emas terpercaya, perak bakar, dan custom cincin pernikahan khas Kaltim.',
                'order_index' => 2,
            ],
            [
                'name' => 'Kerajinan Dayak & Souvenir',
                'slug' => 'kerajinan-dayak-dan-souvenir',
                'type' => 'retail',
                'icon_name' => 'ShoppingBag',
                'description' => 'Mandau bertuah, rompi manik motif Dayak Kenyah, gelang ulin, dan pernak-pernik khas Borneo.',
                'order_index' => 3,
            ],
            [
                'name' => 'Oleh-Oleh Khas Kaltim',
                'slug' => 'oleh-oleh-khas-kaltim',
                'type' => 'retail',
                'icon_name' => 'PackageOpen',
                'description' => 'Amplang kuku macan renyah, mantau sapi lada hitam, lempok durian asli, dan abon kepiting khas kios depan.',
                'order_index' => 4,
            ],
            [
                'name' => 'Cinderamata & Aksesoris',
                'slug' => 'cinderamata-dan-aksesoris',
                'type' => 'retail',
                'icon_name' => 'Package',
                'description' => 'Miniatur khas Kaltim, gantungan kunci manik, kaos Balikpapan, dan gelang akar bahar.',
                'order_index' => 5,
            ],
            [
                'name' => 'Batik & Tenun Kaltim',
                'slug' => 'batik-dan-tenun-kaltim',
                'type' => 'fashion',
                'icon_name' => 'Shirt',
                'description' => 'Kain batik motif mangrove Balikpapan, sarung tenun Samarinda asli sutra, dan songket khas Kalimantan.',
                'order_index' => 6,
            ],
            [
                'name' => 'Busana Adat & Etnik Dayak',
                'slug' => 'busana-adat-dan-etnik-dayak',
                'type' => 'fashion',
                'icon_name' => 'Sparkles',
                'description' => 'Pakaian adat Dayak bordir manik, rompi etnik, mahkota bulu burung enggang, dan kelengkapan tari tradisional.',
                'order_index' => 7,
            ],
            [
                'name' => 'Pakaian & Aksesoris Modern',
                'slug' => 'pakaian-dan-aksesoris-modern',
                'type' => 'fashion',
                'icon_name' => 'ShoppingBag',
                'description' => 'Koleksi busana etnik modern, kemeja batik pria kantor, gamis pesta Kalimantan, dan aksesoris fashion terkini.',
                'order_index' => 8,
            ],
        ];

        foreach ($categories as $cat) {
            Category::create($cat);
        }
    }
}
