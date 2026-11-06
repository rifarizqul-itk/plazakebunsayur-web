<?php

namespace App\Filament\Pages;

use App\Filament\Resources\LegalPages\LegalPageResource;
use App\Filament\Resources\NavItems\NavItemResource;
use App\Models\PageContent;
use App\Services\ImageOptimizerService;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Actions;
use Filament\Schemas\Components\EmbeddedSchema;
use Filament\Schemas\Components\Form;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class ManageIdentityLegalPage extends Page
{
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedShieldCheck;

    protected static ?string $navigationLabel = '6. Identitas, Menu & Hukum';

    protected static ?int $navigationSort = 6;

    protected static ?string $title = 'Identitas Brand, Menu & Dokumen Hukum';

    public ?array $data = [];

    public static function toFormFieldName(string $key): string
    {
        return str_replace('.', '___', $key);
    }

    public static function fromFormFieldName(string $field): string
    {
        return str_replace('___', '.', $field);
    }

    public function mount(): void
    {
        $this->fillForm();
    }

    protected function fillForm(): void
    {
        $keys = [
            'brand.name',
            'brand.sub_location',
            'brand.logo',
            'footer.mall_description',
            'footer.management_title',
            'footer.management_description',
            'header.privacy.eyebrow',
            'header.privacy.title',
            'header.privacy.description',
            'seo.privacy.title',
            'seo.privacy.description',
            'header.terms.eyebrow',
            'header.terms.title',
            'header.terms.description',
            'seo.terms.title',
            'seo.terms.description',
            'not_found.title',
            'not_found.description',
            'not_found.cta_home',
            'not_found.cta_directory',
            'seo.default_og_image',
        ];

        $defaults = PageContent::defaults();
        $savedContent = PageContent::whereIn('key', $keys)->pluck('value', 'key')->toArray();

        $formData = [];
        foreach ($keys as $key) {
            $defaultVal = $defaults[$key]['default'] ?? '';
            $formData[static::toFormFieldName($key)] = $savedContent[$key] ?? $defaultVal;
        }

        $this->form->fill($formData);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('IdentityTabs')
                    ->tabs([
                        $this->getBrandTab(),
                        $this->getNavTab(),
                        $this->getLegalTab(),
                        $this->getNotFoundTab(),
                    ]),
            ])
            ->statePath('data');
    }

    protected function getBrandTab(): Tab
    {
        return Tab::make('Identitas Brand & Logo')
            ->icon(Heroicon::OutlinedBuildingOffice)
            ->schema([
                Section::make('Identitas Utama Mall')
                    ->description('Nama brand resmi, sub-lokasi, dan berkas logo mall')
                    ->schema([
                        TextInput::make(static::toFormFieldName('brand.name'))
                            ->label('Nama Resmi Gedung Mall')
                            ->placeholder('Contoh: Plaza Kebun Sayur')
                            ->required(),
                        TextInput::make(static::toFormFieldName('brand.sub_location'))
                            ->label('Sub-Lokasi / Tagline Kota')
                            ->placeholder('Contoh: Balikpapan Barat, Kalimantan Timur')
                            ->required(),
                        FileUpload::make(static::toFormFieldName('brand.logo'))
                            ->label('Unggah Logo Gedung')
                            ->disk('public')
                            ->directory('page-contents')
                            ->image()
                            ->saveUploadedFileUsing(fn ($file) => app(ImageOptimizerService::class)->optimizeGeneralImage($file, 'page-contents'))
                            ->helperText('Format JPG, PNG, SVG, atau WebP. Otomatis dikompres.')
                            ->columnSpanFull(),
                    ])->columns(2),

                Section::make('Informasi Footer Gedung')
                    ->schema([
                        Textarea::make(static::toFormFieldName('footer.mall_description'))
                            ->label('Deskripsi Singkat Footer')
                            ->rows(2)
                            ->columnSpanFull(),
                        TextInput::make(static::toFormFieldName('footer.management_title'))
                            ->label('Judul Bagian Manajemen Footer'),
                        Textarea::make(static::toFormFieldName('footer.management_description'))
                            ->label('Keterangan Manajemen Footer')
                            ->rows(2),
                    ])->columns(2),
            ]);
    }

    protected function getNavTab(): Tab
    {
        return Tab::make('Menu Navigasi')
            ->icon(Heroicon::OutlinedBars3)
            ->schema([
                Section::make('Kelola Menu Navigasi Header & Footer')
                    ->description('Navigasi utama telah distandarkan menjadi 5 item (BERANDA, BELANJA, INFORMASI, PANDUAN, KONTAK). Anda dapat mengubah urutan dan tautan footer.')
                    ->schema([
                        Actions::make([
                            Action::make('manageNavItemsTable')
                                ->label('Buka Kelola Menu Navigasi Lengkap')
                                ->icon(Heroicon::OutlinedBars3)
                                ->color('primary')
                                ->url(fn (): string => NavItemResource::getUrl()),
                        ]),
                    ]),
            ]);
    }

    protected function getLegalTab(): Tab
    {
        return Tab::make('Dokumen Hukum & Privasi')
            ->icon(Heroicon::OutlinedDocumentCheck)
            ->schema([
                Section::make('Kelola Isi Dokumen Hukum')
                    ->description('Isi pasal-pasal Kebijakan Privasi dan Syarat & Ketentuan Penggunaan.')
                    ->schema([
                        Actions::make([
                            Action::make('manageLegalPagesTable')
                                ->label('Buka Editor Pasal Dokumen Hukum')
                                ->icon(Heroicon::OutlinedDocumentText)
                                ->color('primary')
                                ->url(fn (): string => LegalPageResource::getUrl()),
                        ]),
                    ]),

                Section::make('Header & SEO Kebijakan Privasi (/kebijakan-privasi)')
                    ->schema([
                        TextInput::make(static::toFormFieldName('header.privacy.eyebrow'))
                            ->label('Eyebrow Kebijakan Privasi'),
                        TextInput::make(static::toFormFieldName('header.privacy.title'))
                            ->label('Judul Header Kebijakan Privasi'),
                        Textarea::make(static::toFormFieldName('header.privacy.description'))
                            ->label('Deskripsi Header Kebijakan Privasi')
                            ->rows(2)
                            ->columnSpanFull(),
                        TextInput::make(static::toFormFieldName('seo.privacy.title'))
                            ->label('SEO Title Kebijakan Privasi')
                            ->required(),
                        Textarea::make(static::toFormFieldName('seo.privacy.description'))
                            ->label('SEO Description Kebijakan Privasi')
                            ->rows(2)
                            ->required(),
                    ])->columns(2),

                Section::make('Header & SEO Syarat Ketentuan (/syarat-ketentuan)')
                    ->schema([
                        TextInput::make(static::toFormFieldName('header.terms.eyebrow'))
                            ->label('Eyebrow Syarat Ketentuan'),
                        TextInput::make(static::toFormFieldName('header.terms.title'))
                            ->label('Judul Header Syarat Ketentuan'),
                        Textarea::make(static::toFormFieldName('header.terms.description'))
                            ->label('Deskripsi Header Syarat Ketentuan')
                            ->rows(2)
                            ->columnSpanFull(),
                        TextInput::make(static::toFormFieldName('seo.terms.title'))
                            ->label('SEO Title Syarat Ketentuan')
                            ->required(),
                        Textarea::make(static::toFormFieldName('seo.terms.description'))
                            ->label('SEO Description Syarat Ketentuan')
                            ->rows(2)
                            ->required(),
                    ])->columns(2),
            ]);
    }

    protected function getNotFoundTab(): Tab
    {
        return Tab::make('Halaman 404 & Sistem')
            ->icon(Heroicon::OutlinedExclamationTriangle)
            ->schema([
                Section::make('Teks Halaman Kesalahan 404 (Not Found)')
                    ->schema([
                        TextInput::make(static::toFormFieldName('not_found.title'))
                            ->label('Judul Halaman 404')
                            ->placeholder('Contoh: Halaman Tidak Ditemukan'),
                        Textarea::make(static::toFormFieldName('not_found.description'))
                            ->label('Deskripsi Kesalahan 404')
                            ->rows(2),
                        TextInput::make(static::toFormFieldName('not_found.cta_home'))
                            ->label('Teks Tombol Kembali ke Beranda'),
                        TextInput::make(static::toFormFieldName('not_found.cta_directory'))
                            ->label('Teks Tombol Buka Direktori Belanja'),
                    ])->columns(2),

                Section::make('Default OpenGraph & Metadata Media Sosial')
                    ->schema([
                        FileUpload::make(static::toFormFieldName('seo.default_og_image'))
                            ->label('Gambar Default Kartu Media Sosial (OG Image)')
                            ->disk('public')
                            ->directory('page-contents')
                            ->image()
                            ->saveUploadedFileUsing(fn ($file) => app(ImageOptimizerService::class)->optimizeGeneralImage($file, 'page-contents'))
                            ->helperText('Gambar rasio 1200x630px yang muncul saat tautan dibagikan ke WhatsApp, Facebook, dsb.')
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public function content(Schema $schema): Schema
    {
        return $schema
            ->components([
                Form::make([EmbeddedSchema::make('form')])
                    ->id('form')
                    ->livewireSubmitHandler('save')
                    ->footer([
                        Actions::make([
                            Action::make('save')
                                ->label('Simpan Perubahan Identitas & Hukum')
                                ->icon(Heroicon::OutlinedCheck)
                                ->submit('save')
                                ->keyBindings(['mod+s']),
                        ]),
                    ]),
            ]);
    }

    public function save(): void
    {
        $state = $this->form->getState();
        $defaults = PageContent::defaults();

        foreach ($state as $field => $val) {
            $key = static::fromFormFieldName($field);
            $meta = $defaults[$key] ?? [];

            $group = 'system';
            if (str_starts_with($key, 'brand.')) {
                $group = 'brand';
            } elseif (str_starts_with($key, 'footer.')) {
                $group = 'footer';
            } elseif (str_starts_with($key, 'header.')) {
                $group = 'header';
            } elseif (str_starts_with($key, 'seo.')) {
                $group = 'seo';
            }

            PageContent::updateOrCreate(
                ['key' => $key],
                [
                    'value' => $val,
                    'group' => $group,
                    'type' => $meta['type'] ?? 'text',
                    'label' => $meta['label'] ?? ucwords(str_replace(['.', '_'], ' ', $key)),
                    'help' => $meta['help'] ?? null,
                ]
            );
        }

        Notification::make()
            ->title('Identitas, Menu & Dokumen Hukum Berhasil Disimpan')
            ->success()
            ->send();
    }
}
