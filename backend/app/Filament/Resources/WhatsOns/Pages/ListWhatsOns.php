<?php

namespace App\Filament\Resources\WhatsOns\Pages;

use App\Filament\Resources\WhatsOns\WhatsOnResource;
use App\Models\PageContent;
use Filament\Actions\Action;
use Filament\Actions\CreateAction;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\ListRecords;
use Filament\Support\Icons\Heroicon;

class ListWhatsOns extends ListRecords
{
    protected static string $resource = WhatsOnResource::class;

    protected function getHeaderActions(): array
    {
        return [
            static::getHeaderCalloutSeoAction(),
            CreateAction::make()
                ->label('Tambah Info / Agenda Baru')
                ->icon(Heroicon::OutlinedPlus),
        ];
    }

    protected static function getHeaderCalloutSeoAction(): Action
    {
        return Action::make('headerCalloutSeo')
            ->label('Header, Callout & SEO')
            ->icon(Heroicon::OutlinedDocumentText)
            ->color('primary')
            ->modalHeading('Pengaturan Header, Banner Callout & SEO Informasi')
            ->modalDescription('Ubah teks tajuk header, banner callout event, dan metadata SEO untuk halaman informasi (/informasi).')
            ->modalSubmitActionLabel('Simpan Perubahan')
            ->fillForm(fn (): array => static::getCalloutFormData())
            ->form(static::getCalloutFormSchema())
            ->action(function (array $data): void {
                static::saveCalloutData($data);
            });
    }

    protected static function getCalloutFormData(): array
    {
        $defaults = PageContent::defaults();
        $saved = PageContent::whereIn('key', [
            'header.informasi.eyebrow',
            'header.informasi.title',
            'header.informasi.description',
            'event.callout.title',
            'event.callout.description',
            'event.callout.cta_label',
            'seo.informasi.title',
            'seo.informasi.description',
        ])->pluck('value', 'key')->toArray();

        return [
            'header_eyebrow' => $saved['header.informasi.eyebrow'] ?? $defaults['header.informasi.eyebrow']['default'] ?? 'Informasi & Agenda Mall',
            'header_title' => $saved['header.informasi.title'] ?? $defaults['header.informasi.title']['default'] ?? 'Seputar Plaza Kebun Sayur',
            'header_description' => $saved['header.informasi.description'] ?? $defaults['header.informasi.description']['default'] ?? '',
            'callout_title' => $saved['event.callout.title'] ?? $defaults['event.callout.title']['default'] ?? 'Punya Acara atau Ingin Buka Stan?',
            'callout_description' => $saved['event.callout.description'] ?? $defaults['event.callout.description']['default'] ?? '',
            'callout_cta_label' => $saved['event.callout.cta_label'] ?? $defaults['event.callout.cta_label']['default'] ?? 'Hubungi Pengelola',
            'seo_title' => $saved['seo.informasi.title'] ?? $defaults['seo.informasi.title']['default'] ?? 'Informasi & Agenda | Plaza Kebun Sayur',
            'seo_description' => $saved['seo.informasi.description'] ?? $defaults['seo.informasi.description']['default'] ?? '',
        ];
    }

    protected static function getCalloutFormSchema(): array
    {
        return [
            TextInput::make('header_eyebrow')
                ->label('Teks Pembuka Header (Eyebrow)')
                ->required(),
            TextInput::make('header_title')
                ->label('Judul Header Halaman Informasi')
                ->required(),
            Textarea::make('header_description')
                ->label('Deskripsi Header')
                ->rows(2),
            TextInput::make('callout_title')
                ->label('Judul Banner Callout Promosi/Event')
                ->required(),
            Textarea::make('callout_description')
                ->label('Deskripsi Banner Callout')
                ->rows(2),
            TextInput::make('callout_cta_label')
                ->label('Teks Tombol CTA Banner Callout')
                ->required(),
            TextInput::make('seo_title')
                ->label('Judul SEO (Meta Title)')
                ->required(),
            Textarea::make('seo_description')
                ->label('Deskripsi SEO (Meta Description)')
                ->rows(3)
                ->required(),
        ];
    }

    protected static function saveCalloutData(array $data): void
    {
        PageContent::updateOrCreate(
            ['key' => 'header.informasi.eyebrow'],
            ['value' => $data['header_eyebrow'], 'group' => 'header', 'type' => 'text', 'label' => 'Header Informasi Eyebrow']
        );
        PageContent::updateOrCreate(
            ['key' => 'header.informasi.title'],
            ['value' => $data['header_title'], 'group' => 'header', 'type' => 'text', 'label' => 'Header Informasi Title']
        );
        PageContent::updateOrCreate(
            ['key' => 'header.informasi.description'],
            ['value' => $data['header_description'], 'group' => 'header', 'type' => 'textarea', 'label' => 'Header Informasi Description']
        );
        PageContent::updateOrCreate(
            ['key' => 'event.callout.title'],
            ['value' => $data['callout_title'], 'group' => 'event', 'type' => 'text', 'label' => 'Event Callout Title']
        );
        PageContent::updateOrCreate(
            ['key' => 'event.callout.description'],
            ['value' => $data['callout_description'], 'group' => 'event', 'type' => 'textarea', 'label' => 'Event Callout Description']
        );
        PageContent::updateOrCreate(
            ['key' => 'event.callout.cta_label'],
            ['value' => $data['callout_cta_label'], 'group' => 'event', 'type' => 'text', 'label' => 'Event Callout CTA Label']
        );
        PageContent::updateOrCreate(
            ['key' => 'seo.informasi.title'],
            ['value' => $data['seo_title'], 'group' => 'seo', 'type' => 'text', 'label' => 'SEO Informasi Title']
        );
        PageContent::updateOrCreate(
            ['key' => 'seo.informasi.description'],
            ['value' => $data['seo_description'], 'group' => 'seo', 'type' => 'textarea', 'label' => 'SEO Informasi Description']
        );

        Notification::make()
            ->title('Header, Callout & SEO Informasi Berhasil Diperbarui')
            ->success()
            ->send();
    }
}
