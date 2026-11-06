<?php

namespace App\Filament\Widgets;

use App\Filament\Pages\ManageHomePage;
use App\Filament\Pages\ManageIdentityLegalPage;
use App\Filament\Pages\ManagePanduanPage;
use App\Filament\Resources\ContactMessages\ContactMessageResource;
use App\Filament\Resources\Tenants\TenantResource;
use App\Filament\Resources\WhatsOns\WhatsOnResource;
use Filament\Widgets\Widget;

class QuickActionsWidget extends Widget
{
    protected static ?int $sort = 2;

    protected int|string|array $columnSpan = 'full';

    protected string $view = 'filament.widgets.quick-actions-widget';

    /**
     * @return array<string, mixed>
     */
    protected function getViewData(): array
    {
        return [
            'quickLinks' => $this->getQuickLinks(),
        ];
    }

    /**
     * @return array<int, array<string, string>>
     */
    public function getQuickLinks(): array
    {
        $frontendUrl = rtrim(config('app.frontend_url', env('FRONTEND_URL', '')), '/');

        return array_merge(
            $this->getMainPagesLinks($frontendUrl),
            $this->getUtilityPagesLinks($frontendUrl),
        );
    }

    /**
     * @return array<int, array<string, string>>
     */
    protected function getMainPagesLinks(string $frontendUrl): array
    {
        return [
            [
                'number' => '1',
                'title' => 'Halaman Beranda',
                'path' => '/',
                'description' => 'Hero banner, promosi, sejarah, dan sorotan utama mall',
                'admin_url' => ManageHomePage::getUrl(),
                'public_url' => $frontendUrl.'/',
                'icon' => 'home',
                'badge' => 'Beranda',
                'badge_color' => 'primary',
            ],
            [
                'number' => '2',
                'title' => 'Halaman Belanja',
                'path' => '/belanja',
                'description' => 'Daftar kios, tenant, kategori belanja, dan pembagian lantai',
                'admin_url' => TenantResource::getUrl(),
                'public_url' => $frontendUrl.'/belanja',
                'icon' => 'building-storefront',
                'badge' => 'Belanja',
                'badge_color' => 'info',
            ],
            [
                'number' => '3',
                'title' => 'Halaman Informasi',
                'path' => '/informasi',
                'description' => 'Event mall, agenda tahunan, promo spesial, dan berita',
                'admin_url' => WhatsOnResource::getUrl(),
                'public_url' => $frontendUrl.'/informasi',
                'icon' => 'calendar-days',
                'badge' => 'Informasi',
                'badge_color' => 'success',
            ],
        ];
    }

    /**
     * @return array<int, array<string, string>>
     */
    protected function getUtilityPagesLinks(string $frontendUrl): array
    {
        return [
            [
                'number' => '4',
                'title' => 'Halaman Panduan',
                'path' => '/panduan-kunjungan',
                'description' => 'Jam buka, peta lokasi, rute akses, fasilitas, tips, dan tata tertib',
                'admin_url' => ManagePanduanPage::getUrl(),
                'public_url' => $frontendUrl.'/panduan-kunjungan',
                'icon' => 'map',
                'badge' => 'Panduan',
                'badge_color' => 'warning',
            ],
            [
                'number' => '5',
                'title' => 'Halaman Kontak',
                'path' => '/kontak',
                'description' => 'Form pesan pengunjung, nomor darurat pos keamanan, dan info kantor',
                'admin_url' => ContactMessageResource::getUrl(),
                'public_url' => $frontendUrl.'/kontak',
                'icon' => 'inbox-arrow-down',
                'badge' => 'Kontak',
                'badge_color' => 'danger',
            ],
            [
                'number' => '6',
                'title' => 'Identitas, Menu & Hukum',
                'path' => '/kebijakan-privasi',
                'description' => 'Logo brand, navigasi header/footer, dokumen hukum, dan halaman 404',
                'admin_url' => ManageIdentityLegalPage::getUrl(),
                'public_url' => $frontendUrl.'/kebijakan-privasi',
                'icon' => 'shield-check',
                'badge' => 'Pengaturan',
                'badge_color' => 'gray',
            ],
        ];
    }
}
