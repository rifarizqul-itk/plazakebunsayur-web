<?php

namespace App\Filament\Widgets;

use App\Filament\Resources\ContactMessages\ContactMessageResource;
use App\Models\ContactMessage;
use App\Models\Tenant;
use App\Models\WhatsOn;
use Filament\Support\Icons\Heroicon;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverviewWidget extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $tenantCount = Tenant::count();
        $whatsOnCount = WhatsOn::where('is_active', true)->count();
        $unreadContactCount = ContactMessage::where('status', 'unread')->count();

        return [
            Stat::make('Total Kios & Stan', (string) $tenantCount)
                ->description('Kios terdaftar di direktori belanja')
                ->descriptionIcon(Heroicon::OutlinedBuildingStorefront)
                ->color('primary'),

            Stat::make('Agenda & Info Aktif', (string) $whatsOnCount)
                ->description('Event & promo aktif di halaman informasi')
                ->descriptionIcon(Heroicon::OutlinedCalendarDays)
                ->color('success'),

            Stat::make('Pesan Belum Dibaca', (string) $unreadContactCount)
                ->description($unreadContactCount > 0 ? 'Pesan kontak membutuhkan respon' : 'Semua pesan telah ditindaklanjuti')
                ->descriptionIcon(Heroicon::OutlinedInboxArrowDown)
                ->color($unreadContactCount > 0 ? 'danger' : 'gray')
                ->url(ContactMessageResource::getUrl()),
        ];
    }
}
