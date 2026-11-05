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
        // Clean up legacy paths
        NavItem::whereIn('path', ['/kuliner', '/agenda'])->delete();

        $items = array_merge(
            $this->getHeaderNavItems(),
            $this->getFooterNavItems(),
        );

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

    protected function getHeaderNavItems(): array
    {
        return [
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
                'label' => 'FASHION',
                'path' => '/fashion',
                'location' => 'header',
                'is_external' => false,
                'is_cta' => false,
                'order_index' => 3,
                'is_active' => true,
            ],
            [
                'label' => 'INFORMASI',
                'path' => '/informasi',
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
        ];
    }

    protected function getFooterNavItems(): array
    {
        return [
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
                'label' => 'Sentra Fashion & Batik',
                'path' => '/fashion',
                'location' => 'footer',
                'is_external' => false,
                'is_cta' => false,
                'order_index' => 2,
                'is_active' => true,
            ],
            [
                'label' => 'Informasi & Promo Plaza',
                'path' => '/informasi',
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
    }
}
