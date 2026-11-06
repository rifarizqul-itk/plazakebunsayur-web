<?php

namespace App\Filament\Resources\ContactMessages\Pages;

use App\Filament\Resources\ContactMessages\ContactMessageResource;
use App\Models\PageContent;
use App\Models\SiteSetting;
use Filament\Actions\Action;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\ListRecords;
use Filament\Schemas\Components\Section;
use Filament\Support\Icons\Heroicon;

class ListContactMessages extends ListRecords
{
    protected static string $resource = ContactMessageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            static::getContactInfoAndSeoAction(),
        ];
    }

    protected static function getContactInfoAndSeoAction(): Action
    {
        return Action::make('contactInfoAndSeo')
            ->label('Info Kontak & SEO')
            ->icon(Heroicon::OutlinedCog6Tooth)
            ->color('primary')
            ->modalHeading('Pengaturan Info Kontak Resmi Gedung & SEO')
            ->modalDescription('Ubah nomor kontak pengelola, pos keamanan, alamat kantor, teks panduan kontak, dan metadata SEO halaman /kontak.')
            ->modalSubmitActionLabel('Simpan Perubahan Kontak')
            ->fillForm(fn (): array => static::getContactFormData())
            ->form(static::getContactFormSchema())
            ->action(function (array $data): void {
                static::saveContactData($data);
            });
    }

    protected static function getContactFormData(): array
    {
        $settings = SiteSetting::getAllSettings();
        $contentKeys = [
            'header.kontak.eyebrow',
            'header.kontak.title',
            'header.kontak.description',
            'contact.office_eyebrow',
            'contact.office_title',
            'contact.office_description',
            'contact.form_title',
            'contact.form_description',
            'seo.kontak.title',
            'seo.kontak.description',
        ];
        $defaults = PageContent::defaults();
        $savedContent = PageContent::whereIn('key', $contentKeys)->pluck('value', 'key')->toArray();

        return [
            'management_whatsapp' => $settings['management_whatsapp'] ?? '',
            'management_email' => $settings['management_email'] ?? '',
            'security_phone' => $settings['security_phone'] ?? '',
            'office_address' => $settings['office_address'] ?? '',
            'header_eyebrow' => $savedContent['header.kontak.eyebrow'] ?? $defaults['header.kontak.eyebrow']['default'] ?? 'Hubungi Pengelola',
            'header_title' => $savedContent['header.kontak.title'] ?? $defaults['header.kontak.title']['default'] ?? 'Layanan Pengunjung & Pengaduan',
            'header_description' => $savedContent['header.kontak.description'] ?? $defaults['header.kontak.description']['default'] ?? '',
            'office_title' => $savedContent['contact.office_title'] ?? $defaults['contact.office_title']['default'] ?? 'Kantor Pengelola Mall',
            'form_title' => $savedContent['contact.form_title'] ?? $defaults['contact.form_title']['default'] ?? 'Kirim Pesan / Pengaduan',
            'seo_title' => $savedContent['seo.kontak.title'] ?? $defaults['seo.kontak.title']['default'] ?? 'Kontak & Pengaduan | Plaza Kebun Sayur',
            'seo_description' => $savedContent['seo.kontak.description'] ?? $defaults['seo.kontak.description']['default'] ?? '',
        ];
    }

    protected static function getContactFormSchema(): array
    {
        return [
            Section::make('Kontak Resmi Pengelola & Keamanan')
                ->schema([
                    TextInput::make('management_whatsapp')
                        ->label('Nomor WhatsApp Pengelola')
                        ->placeholder('Contoh: 081234567890')
                        ->required(),
                    TextInput::make('management_email')
                        ->label('Email Resmi Pengelola')
                        ->email()
                        ->required(),
                    TextInput::make('security_phone')
                        ->label('Telepon Pos Keamanan Gedung')
                        ->placeholder('Contoh: (0542) 734567')
                        ->required(),
                    Textarea::make('office_address')
                        ->label('Alamat Kantor Pengelola')
                        ->rows(2)
                        ->required()
                        ->columnSpanFull(),
                ])->columns(3),

            Section::make('Teks Header Halaman Kontak')
                ->schema([
                    TextInput::make('header_eyebrow')
                        ->label('Teks Pembuka (Eyebrow)')
                        ->required(),
                    TextInput::make('header_title')
                        ->label('Judul Header Halaman')
                        ->required(),
                    Textarea::make('header_description')
                        ->label('Deskripsi Header')
                        ->rows(2)
                        ->columnSpanFull(),
                ])->columns(2),

            Section::make('SEO & Metadata Halaman Kontak')
                ->schema([
                    TextInput::make('seo_title')
                        ->label('Judul SEO (Meta Title)')
                        ->required(),
                    Textarea::make('seo_description')
                        ->label('Deskripsi SEO (Meta Description)')
                        ->rows(2)
                        ->required(),
                ]),
        ];
    }

    protected static function saveContactData(array $data): void
    {
        // Update SiteSettings
        SiteSetting::set('management_whatsapp', $data['management_whatsapp']);
        SiteSetting::set('management_email', $data['management_email']);
        SiteSetting::set('security_phone', $data['security_phone']);
        SiteSetting::set('office_address', $data['office_address']);

        // Update PageContents
        PageContent::updateOrCreate(
            ['key' => 'header.kontak.eyebrow'],
            ['value' => $data['header_eyebrow'], 'group' => 'header', 'type' => 'text', 'label' => 'Header Kontak Eyebrow']
        );
        PageContent::updateOrCreate(
            ['key' => 'header.kontak.title'],
            ['value' => $data['header_title'], 'group' => 'header', 'type' => 'text', 'label' => 'Header Kontak Title']
        );
        PageContent::updateOrCreate(
            ['key' => 'header.kontak.description'],
            ['value' => $data['header_description'], 'group' => 'header', 'type' => 'textarea', 'label' => 'Header Kontak Description']
        );
        PageContent::updateOrCreate(
            ['key' => 'seo.kontak.title'],
            ['value' => $data['seo_title'], 'group' => 'seo', 'type' => 'text', 'label' => 'SEO Kontak Title']
        );
        PageContent::updateOrCreate(
            ['key' => 'seo.kontak.description'],
            ['value' => $data['seo_description'], 'group' => 'seo', 'type' => 'textarea', 'label' => 'SEO Kontak Description']
        );

        Notification::make()
            ->title('Informasi Kontak & SEO Berhasil Disimpan')
            ->success()
            ->send();
    }
}
