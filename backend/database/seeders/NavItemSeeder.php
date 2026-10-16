<?php

namespace Database\Seeders;

use App\Models\NavItem;
use Illuminate\Database\Seeder;

class NavItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            // Header items
            [
                'label' => 'BERANDA',
                'path' => '/',
                'location' => 'header',
                'is_external' => false,
                'is_cta' => false,
                'order_index' => 1,
                'is_active' => true,
            ],
            [
                'label' => 'BELANJA',
                'path' => '/belanja',
                'location' => 'header',
                'is_external' => false,
                'is_cta' => false,
                'order_index' => 2,
                'is_active' => true,
            ],
            [
                'label' => 'KULINER',
                'path' => '/kuliner',
                'location' => 'header',
                'is_external' => false,
                'is_cta' => false,
                'order_index' => 3,
                'is_active' => true,
            ],
            [
                'label' => 'AGENDA',
                'path' => '/agenda',
                'location' => 'header',
                'is_external' => false,
                'is_cta' => false,
                'order_index' => 4,
                'is_active' => true,
            ],
            [
                'label' => 'PANDUAN',
                'path' => '/panduan-kunjungan',
                'location' => 'header',
                'is_external' => false,
                'is_cta' => false,
                'order_index' => 5,
                'is_active' => true,
            ],
            [
                'label' => 'KONTAK',
                'path' => '/kontak',
                'location' => 'header',
                'is_external' => false,
                'is_cta' => false,
                'order_index' => 6,
                'is_active' => true,
            ],

            // Footer items
            [
                'label' => 'Direktori Kios Belanja',
                'path' => '/belanja',
                'location' => 'footer',
                'is_external' => false,
                'is_cta' => false,
                'order_index' => 1,
                'is_active' => true,
            ],
            [
                'label' => 'Sentra Kuliner Tradisional',
                'path' => '/kuliner',
                'location' => 'footer',
                'is_external' => false,
                'is_cta' => false,
                'order_index' => 2,
                'is_active' => true,
            ],
            [
                'label' => 'Agenda & Promo Plaza',
                'path' => '/agenda',
                'location' => 'footer',
                'is_external' => false,
                'is_cta' => false,
                'order_index' => 3,
                'is_active' => true,
            ],
            [
                'label' => 'Panduan Kunjungan Gedung',
                'path' => '/panduan-kunjungan',
                'location' => 'footer',
                'is_external' => false,
                'is_cta' => false,
                'order_index' => 4,
                'is_active' => true,
            ],
            [
                'label' => 'Kontak & Pengaduan',
                'path' => '/kontak',
                'location' => 'footer',
                'is_external' => false,
                'is_cta' => false,
                'order_index' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($items as $item) {
            NavItem::updateOrCreate(
                [
                    'location' => $item['location'],
                    'path' => $item['path'],
                ],
                $item
            );
        }
    }
}
