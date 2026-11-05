<?php

namespace Database\Seeders;

use App\Models\Facility;
use Illuminate\Database\Seeder;

class FacilitySeeder extends Seeder
{
    public function run(): void
    {
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
    }
}
