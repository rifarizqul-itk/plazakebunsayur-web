<?php

namespace Database\Seeders;

use App\Models\AccessRoute;
use App\Models\BuildingRule;
use App\Models\ShoppingTip;
use Illuminate\Database\Seeder;

class VisitGuideSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $accessRoutes = [
            [
                'title' => 'Dari Bandara Internasional Sultan Aji Muhammad Sulaiman Sepinggan',
                'distance' => '± 15 km (25–35 menit perjalanan)',
                'description' => 'Dapat ditempuh menggunakan taksi resmi bandara atau transportasi daring. Rute tercepat melintasi koridor Jl. Marsma R. Iswahyudi menuju Jl. Jenderal Sudirman, berlanjut ke Jl. Minyak dan Jl. Letjen Suprapto.',
                'order_index' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Dari Pelabuhan Semayang Balikpapan',
                'distance' => '± 4 km (8–12 menit perjalanan)',
                'description' => 'Sangat dekat dengan kawasan pelabuhan penumpang. Akses langsung melalui jalur pesisir Jl. Yos Sudarso (Jl. Minyak) lurus ke arah utara menuju gerbang masuk Plaza Kebun Sayur.',
                'order_index' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Transportasi Publik / Angkutan Kota (Angkot)',
                'distance' => 'Tersedia setiap hari',
                'description' => 'Angkutan kota trayek No. 1 (Warna Putih) rute Terminal Batu Ampar – Kebun Sayur dan trayek No. 2A melintas tepat di depan halte gerbang timur Plaza Kebun Sayur.',
                'order_index' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($accessRoutes as $route) {
            AccessRoute::firstOrCreate(
                ['title' => $route['title']],
                $route
            );
        }

        $shoppingTips = [
            [
                'title' => 'Tawar-Menawar dengan Santun',
                'description' => 'Tradisi berniaga di Plaza Kebun Sayur mengedepankan keramahan dan kekeluargaan. Silakan berdiskusi dan menawar harga cinderamata secara wajar dengan para pedagang kios.',
                'order_index' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Uji Keaslian Batu Mulia',
                'description' => 'Pedagang batu akik dan permata umumnya menyediakan senter batu khusus dan tester kekerasan batu di tempat. Anda juga dapat menanyakan memo hasil uji laboratorium gemologi untuk permata bernilai tinggi.',
                'order_index' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Jasa Ikat dan Resize Cincin di Tempat',
                'description' => 'Bila Anda membeli batu lepasan (loose stone), beberapa kios di lantai dasar melayani jasa pemasangan ikat cincin berbahan perak bakar atau titanium yang selesai dalam 15–30 menit.',
                'order_index' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Kemasan Khusus untuk Penerbangan',
                'description' => 'Untuk pembelian oleh-oleh panganan seperti amplang atau mantau, mintalah kemasan dus khusus yang disegel rapi agar aman disimpan di bagasi kabin maupun bagasi terdaftar pesawat.',
                'order_index' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($shoppingTips as $tip) {
            ShoppingTip::firstOrCreate(
                ['title' => $tip['title']],
                $tip
            );
        }

        $buildingRules = [
            [
                'title' => 'Kenyamanan & Kebersihan',
                'description' => 'Jagalah kebersihan bersama dengan membuang sampah pada tempat pemilahan yang tersedia di setiap koridor dan lantai gedung.',
                'order_index' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Kawasan Tertib Merokok',
                'description' => 'Merokok hanya diperkenankan di area terbuka yang telah ditentukan di luar koridor utama berpendingin ruangan.',
                'order_index' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Keamanan Barang Bawaan',
                'description' => 'Selalu awasi barang bawaan dan tas pribadi Anda saat berada di keramaian sentra belanja. Laporkan segera ke Pos Keamanan jika menemui hal mencurigakan.',
                'order_index' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($buildingRules as $rule) {
            BuildingRule::firstOrCreate(
                ['title' => $rule['title']],
                $rule
            );
        }
    }
}
