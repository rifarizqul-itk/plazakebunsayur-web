<?php

namespace App\Filament\Resources\Tenants\Pages;

use App\Filament\Resources\Categories\CategoryResource;
use App\Filament\Resources\Floors\FloorResource;
use App\Filament\Resources\Tenants\TenantResource;
use App\Models\PageContent;
use Filament\Actions\Action;
use Filament\Actions\CreateAction;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\ListRecords;
use Filament\Support\Icons\Heroicon;

class ListTenants extends ListRecords
{
    protected static string $resource = TenantResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Action::make('manageCategories')
                ->label('Kelola Kategori')
                ->icon(Heroicon::OutlinedRectangleStack)
                ->color('gray')
                ->url(fn (): string => CategoryResource::getUrl()),

            Action::make('manageFloors')
                ->label('Kelola Lantai')
                ->icon(Heroicon::OutlinedBuildingOffice2)
                ->color('gray')
                ->url(fn (): string => FloorResource::getUrl()),

            Action::make('headerAndSeo')
                ->label('Header & SEO Belanja')
                ->icon(Heroicon::OutlinedDocumentText)
                ->color('primary')
                ->modalHeading('Pengaturan Header & SEO Direktori Belanja')
                ->modalDescription('Ubah teks tajuk header dan metadata SEO untuk halaman direktori belanja (/belanja).')
                ->modalSubmitActionLabel('Simpan Perubahan')
                ->fillForm(function (): array {
                    $defaults = PageContent::defaults();
                    $saved = PageContent::whereIn('key', [
                        'header.belanja.eyebrow',
                        'header.belanja.title',
                        'header.belanja.description',
                        'seo.belanja.title',
                        'seo.belanja.description',
                    ])->pluck('value', 'key')->toArray();

                    return [
                        'eyebrow' => $saved['header.belanja.eyebrow'] ?? $defaults['header.belanja.eyebrow']['default'] ?? 'Direktori Kios & Belanja',
                        'title' => $saved['header.belanja.title'] ?? $defaults['header.belanja.title']['default'] ?? 'Belanja Khas Kalimantan',
                        'description' => $saved['header.belanja.description'] ?? $defaults['header.belanja.description']['default'] ?? '',
                        'seo_title' => $saved['seo.belanja.title'] ?? $defaults['seo.belanja.title']['default'] ?? 'Direktori Belanja | Plaza Kebun Sayur',
                        'seo_description' => $saved['seo.belanja.description'] ?? $defaults['seo.belanja.description']['default'] ?? '',
                    ];
                })
                ->form([
                    TextInput::make('eyebrow')
                        ->label('Teks Pembuka Header (Eyebrow)')
                        ->required(),
                    TextInput::make('title')
                        ->label('Judul Header Halaman Belanja')
                        ->required(),
                    Textarea::make('description')
                        ->label('Deskripsi Header')
                        ->rows(3),
                    TextInput::make('seo_title')
                        ->label('Judul SEO (Meta Title)')
                        ->required(),
                    Textarea::make('seo_description')
                        ->label('Deskripsi SEO (Meta Description)')
                        ->rows(3)
                        ->required(),
                ])
                ->action(function (array $data): void {
                    PageContent::updateOrCreate(
                        ['key' => 'header.belanja.eyebrow'],
                        ['value' => $data['eyebrow'], 'group' => 'header', 'type' => 'text', 'label' => 'Header Belanja Eyebrow']
                    );
                    PageContent::updateOrCreate(
                        ['key' => 'header.belanja.title'],
                        ['value' => $data['title'], 'group' => 'header', 'type' => 'text', 'label' => 'Header Belanja Title']
                    );
                    PageContent::updateOrCreate(
                        ['key' => 'header.belanja.description'],
                        ['value' => $data['description'], 'group' => 'header', 'type' => 'textarea', 'label' => 'Header Belanja Description']
                    );
                    PageContent::updateOrCreate(
                        ['key' => 'seo.belanja.title'],
                        ['value' => $data['seo_title'], 'group' => 'seo', 'type' => 'text', 'label' => 'SEO Belanja Title']
                    );
                    PageContent::updateOrCreate(
                        ['key' => 'seo.belanja.description'],
                        ['value' => $data['seo_description'], 'group' => 'seo', 'type' => 'textarea', 'label' => 'SEO Belanja Description']
                    );

                    Notification::make()
                        ->title('Header & SEO Belanja Berhasil Diperbarui')
                        ->success()
                        ->send();
                }),

            CreateAction::make()
                ->label('Tambah Kios Baru')
                ->icon(Heroicon::OutlinedPlus),
        ];
    }
}
