<?php

namespace App\Filament\Resources\PageContents\Pages;

use App\Filament\Resources\PageContents\PageContentResource;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\ListRecords;
use Filament\Support\Icons\Heroicon;
use Illuminate\Support\Facades\Http;

class ListPageContents extends ListRecords
{
    protected static string $resource = PageContentResource::class;

    protected function getHeaderActions(): array
    {
        $hookUrl = config('services.frontend.deploy_hook_url') ?: env('FRONTEND_DEPLOY_HOOK_URL');

        if (empty($hookUrl)) {
            return [];
        }

        return [
            Action::make('deploy')
                ->label('Terbitkan Perubahan ke Website')
                ->icon(Heroicon::OutlinedCloudArrowUp)
                ->color('primary')
                ->requiresConfirmation()
                ->modalHeading('Konfirmasi Penerbitan Website')
                ->modalDescription('Tindakan ini akan memicu pembangunan ulang (rebuild SSG) website publik di Netlify untuk menyegarkan metadata SEO dan konten statis.')
                ->modalSubmitActionLabel('Ya, Terbitkan Sekarang')
                ->action(function () use ($hookUrl) {
                    try {
                        $response = Http::timeout(10)->post($hookUrl);
                        if ($response->successful()) {
                            Notification::make()
                                ->title('Penerbitan Berhasil Dimulai')
                                ->body('Sinyal build hook telah dikirim ke Netlify. Website publik sedang dibangun ulang.')
                                ->success()
                                ->send();
                        } else {
                            Notification::make()
                                ->title('Gagal Memicu Build')
                                ->body('Server hosting mengembalikan status: ' . $response->status())
                                ->danger()
                                ->send();
                        }
                    } catch (\Throwable $e) {
                        Notification::make()
                            ->title('Kesalahan Koneksi Deploy')
                            ->body($e->getMessage())
                            ->danger()
                            ->send();
                    }
                }),
        ];
    }
}
