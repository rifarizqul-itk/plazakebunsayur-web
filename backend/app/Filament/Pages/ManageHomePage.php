<?php

namespace App\Filament\Pages;

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

class ManageHomePage extends Page
{
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedHome;

    protected static ?string $navigationLabel = '1. Halaman Beranda';

    protected static ?int $navigationSort = 1;

    protected static ?string $title = 'Kelola Konten Halaman Beranda';

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
            'home.hero.eyebrow',
            'home.hero.title',
            'home.hero.subtitle',
            'home.hero.cta_primary',
            'home.hero.cta_secondary',
            'home.hero.building_tag',
            'home.hero.building_cta',
            'home.hero.image',
            'home.quick_access.title',
            'home.quick_access.description',
            'home.action.belanja.category',
            'home.action.belanja.title',
            'home.action.belanja.btn_text',
            'home.action.belanja.image',
            'home.action.fashion.category',
            'home.action.fashion.title',
            'home.action.fashion.btn_text',
            'home.action.fashion.image',
            'home.action.panduan.category',
            'home.action.panduan.title',
            'home.action.panduan.btn_text',
            'home.action.panduan.image',
            'home.promos.eyebrow',
            'home.promos.title',
            'home.promos.cta_label',
            'home.oleh_oleh.eyebrow',
            'home.oleh_oleh.title',
            'home.oleh_oleh.cta_label',
            'home.featured.eyebrow',
            'home.featured.title',
            'home.featured.description',
            'home.history.eyebrow',
            'home.history.title',
            'home.history.p1',
            'home.history.p2',
            'home.history.p3',
            'home.history.cta_label',
            'home.history.image',
            'home.events.title',
            'home.events.description',
            'seo.home.title',
            'seo.home.description',
        ];

        $defaults = PageContent::defaults();
        $saved = PageContent::whereIn('key', $keys)->pluck('value', 'key')->toArray();

        $formData = [];
        foreach ($keys as $key) {
            $defaultVal = $defaults[$key]['default'] ?? '';
            $formData[static::toFormFieldName($key)] = $saved[$key] ?? $defaultVal;
        }

        $this->form->fill($formData);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('HomeTabs')
                    ->tabs([
                        Tab::make('Hero & Banner')
                            ->icon(Heroicon::OutlinedPhoto)
                            ->schema([
                                Section::make('Teks Banner Utama')
                                    ->description('Teks hero banner yang pertama kali dilihat pengunjung di halaman beranda')
                                    ->schema([
                                        TextInput::make(static::toFormFieldName('home.hero.eyebrow'))
                                            ->label('Teks Pembuka (Eyebrow)')
                                            ->placeholder('Contoh: Pusat Kerajinan & Cinderamata Khas Balikpapan'),
                                        TextInput::make(static::toFormFieldName('home.hero.title'))
                                            ->label('Judul Utama Banner')
                                            ->placeholder('Contoh: Plaza Kebun Sayur'),
                                        Textarea::make(static::toFormFieldName('home.hero.subtitle'))
                                            ->label('Subjudul Banner')
                                            ->rows(2)
                                            ->columnSpanFull(),
                                        TextInput::make(static::toFormFieldName('home.hero.cta_primary'))
                                            ->label('Label Tombol Utama (CTA 1)'),
                                        TextInput::make(static::toFormFieldName('home.hero.cta_secondary'))
                                            ->label('Label Tombol Sekunder (CTA 2)'),
                                    ])->columns(2),

                                Section::make('Badge Status & Gambar Utama')
                                    ->schema([
                                        TextInput::make(static::toFormFieldName('home.hero.building_tag'))
                                            ->label('Tag Status Gedung'),
                                        TextInput::make(static::toFormFieldName('home.hero.building_cta'))
                                            ->label('Teks CTA Status'),
                                        FileUpload::make(static::toFormFieldName('home.hero.image'))
                                            ->label('Foto Utama Hero Gedung')
                                            ->disk('public')
                                            ->directory('page-contents')
                                            ->image()
                                            ->saveUploadedFileUsing(fn ($file) => app(ImageOptimizerService::class)->optimizeGeneralImage($file, 'page-contents'))
                                            ->helperText('Format JPG, PNG, atau WebP. Otomatis dikompres ke WebP.')
                                            ->columnSpanFull(),
                                    ])->columns(2),
                            ]),

                        Tab::make('Akses Cepat & Aksi')
                            ->icon(Heroicon::OutlinedCursorArrowRays)
                            ->schema([
                                Section::make('Pengantar Akses Cepat')
                                    ->schema([
                                        TextInput::make(static::toFormFieldName('home.quick_access.title'))
                                            ->label('Judul Bagian Akses Cepat'),
                                        TextInput::make(static::toFormFieldName('home.quick_access.description'))
                                            ->label('Deskripsi Singkat'),
                                    ])->columns(2),

                                Section::make('Kartu 1: Kios Belanja (Batu Mulia & Cinderamata)')
                                    ->description('Kartu aksi pertama yang mengarah ke direktori belanja')
                                    ->schema([
                                        TextInput::make(static::toFormFieldName('home.action.belanja.category'))
                                            ->label('Label Kategori (Eyebrow)')
                                            ->placeholder('KIOS BELANJA'),
                                        TextInput::make(static::toFormFieldName('home.action.belanja.title'))
                                            ->label('Judul Kartu'),
                                        TextInput::make(static::toFormFieldName('home.action.belanja.btn_text'))
                                            ->label('Teks Tombol Aksi'),
                                        FileUpload::make(static::toFormFieldName('home.action.belanja.image'))
                                            ->label('Foto Latar Kartu Belanja (Batu Mulia / Cinderamata)')
                                            ->disk('public')
                                            ->directory('page-contents')
                                            ->image()
                                            ->saveUploadedFileUsing(fn ($file) => app(ImageOptimizerService::class)->optimizeGeneralImage($file, 'page-contents'))
                                            ->helperText('Format JPG, PNG, atau WebP. Otomatis dikompres ke WebP.')
                                            ->columnSpanFull(),
                                    ])->columns(3),

                                Section::make('Kartu 2: Sentra Fashion & Kerajinan')
                                    ->description('Kartu aksi kedua yang menyorot busana & batik khas')
                                    ->schema([
                                        TextInput::make(static::toFormFieldName('home.action.fashion.category'))
                                            ->label('Label Kategori (Eyebrow)')
                                            ->placeholder('SENTRA FASHION'),
                                        TextInput::make(static::toFormFieldName('home.action.fashion.title'))
                                            ->label('Judul Kartu'),
                                        TextInput::make(static::toFormFieldName('home.action.fashion.btn_text'))
                                            ->label('Teks Tombol Aksi'),
                                        FileUpload::make(static::toFormFieldName('home.action.fashion.image'))
                                            ->label('Foto Latar Kartu Fashion (Batik / Busana)')
                                            ->disk('public')
                                            ->directory('page-contents')
                                            ->image()
                                            ->saveUploadedFileUsing(fn ($file) => app(ImageOptimizerService::class)->optimizeGeneralImage($file, 'page-contents'))
                                            ->helperText('Format JPG, PNG, atau WebP. Otomatis dikompres ke WebP.')
                                            ->columnSpanFull(),
                                    ])->columns(3),

                                Section::make('Kartu 3: Informasi Gedung & Panduan')
                                    ->description('Kartu aksi ketiga yang mengarah ke panduan kunjungan & fasilitas')
                                    ->schema([
                                        TextInput::make(static::toFormFieldName('home.action.panduan.category'))
                                            ->label('Label Kategori (Eyebrow)')
                                            ->placeholder('INFORMASI GEDUNG'),
                                        TextInput::make(static::toFormFieldName('home.action.panduan.title'))
                                            ->label('Judul Kartu'),
                                        TextInput::make(static::toFormFieldName('home.action.panduan.btn_text'))
                                            ->label('Teks Tombol Aksi'),
                                        FileUpload::make(static::toFormFieldName('home.action.panduan.image'))
                                            ->label('Foto Latar Kartu Panduan (Suasana / Fasilitas)')
                                            ->disk('public')
                                            ->directory('page-contents')
                                            ->image()
                                            ->saveUploadedFileUsing(fn ($file) => app(ImageOptimizerService::class)->optimizeGeneralImage($file, 'page-contents'))
                                            ->helperText('Format JPG, PNG, atau WebP. Otomatis dikompres ke WebP.')
                                            ->columnSpanFull(),
                                    ])->columns(3),
                            ]),

                        Tab::make('Sorotan & Promosi')
                            ->icon(Heroicon::OutlinedSparkles)
                            ->schema([
                                Section::make('Header Bagian Promosi & Tenant')
                                    ->schema([
                                        TextInput::make(static::toFormFieldName('home.promos.eyebrow'))
                                            ->label('Eyebrow Promosi'),
                                        TextInput::make(static::toFormFieldName('home.promos.title'))
                                            ->label('Judul Promosi'),
                                        TextInput::make(static::toFormFieldName('home.promos.cta_label'))
                                            ->label('Label Tombol Promosi'),
                                        TextInput::make(static::toFormFieldName('home.oleh_oleh.eyebrow'))
                                            ->label('Eyebrow Oleh-Oleh'),
                                        TextInput::make(static::toFormFieldName('home.oleh_oleh.title'))
                                            ->label('Judul Oleh-Oleh'),
                                        TextInput::make(static::toFormFieldName('home.oleh_oleh.cta_label'))
                                            ->label('Label Tombol Oleh-Oleh'),
                                    ])->columns(3),

                                Section::make('Kios & Stan Pilihan')
                                    ->schema([
                                        TextInput::make(static::toFormFieldName('home.featured.eyebrow'))
                                            ->label('Eyebrow Kios Pilihan'),
                                        TextInput::make(static::toFormFieldName('home.featured.title'))
                                            ->label('Judul Kios Pilihan'),
                                        Textarea::make(static::toFormFieldName('home.featured.description'))
                                            ->label('Deskripsi Kios Pilihan')
                                            ->rows(2)
                                            ->columnSpanFull(),
                                    ])->columns(2),
                            ]),

                        Tab::make('Sejarah Gedung')
                            ->icon(Heroicon::OutlinedBuildingLibrary)
                            ->schema([
                                Section::make('Cerita & Narasi Sejarah')
                                    ->schema([
                                        TextInput::make(static::toFormFieldName('home.history.eyebrow'))
                                            ->label('Eyebrow Sejarah'),
                                        TextInput::make(static::toFormFieldName('home.history.title'))
                                            ->label('Judul Bagian Sejarah'),
                                        Textarea::make(static::toFormFieldName('home.history.p1'))
                                            ->label('Paragraf 1')
                                            ->rows(3)
                                            ->columnSpanFull(),
                                        Textarea::make(static::toFormFieldName('home.history.p2'))
                                            ->label('Paragraf 2')
                                            ->rows(3)
                                            ->columnSpanFull(),
                                        Textarea::make(static::toFormFieldName('home.history.p3'))
                                            ->label('Paragraf 3')
                                            ->rows(3)
                                            ->columnSpanFull(),
                                        TextInput::make(static::toFormFieldName('home.history.cta_label'))
                                            ->label('Label Tombol Pelajari'),
                                        FileUpload::make(static::toFormFieldName('home.history.image'))
                                            ->label('Foto Sejarah Gedung')
                                            ->disk('public')
                                            ->directory('page-contents')
                                            ->image()
                                            ->saveUploadedFileUsing(fn ($file) => app(ImageOptimizerService::class)->optimizeGeneralImage($file, 'page-contents'))
                                            ->helperText('Format JPG, PNG, atau WebP. Otomatis dikompres ke WebP.')
                                            ->columnSpanFull(),
                                    ])->columns(2),
                            ]),

                        Tab::make('Event & Agenda')
                            ->icon(Heroicon::OutlinedCalendarDays)
                            ->schema([
                                Section::make('Pengantar Event & Agenda')
                                    ->schema([
                                        TextInput::make(static::toFormFieldName('home.events.title'))
                                            ->label('Judul Bagian Agenda'),
                                        Textarea::make(static::toFormFieldName('home.events.description'))
                                            ->label('Deskripsi Agenda')
                                            ->rows(2),
                                    ]),
                            ]),

                        Tab::make('SEO & Metadata')
                            ->icon(Heroicon::OutlinedGlobeAlt)
                            ->schema([
                                Section::make('Pengaturan SEO Beranda')
                                    ->description('Digunakan oleh mesin pencari Google dan kartu bagikan media sosial')
                                    ->schema([
                                        TextInput::make(static::toFormFieldName('seo.home.title'))
                                            ->label('Meta Title')
                                            ->required()
                                            ->columnSpanFull(),
                                        Textarea::make(static::toFormFieldName('seo.home.description'))
                                            ->label('Meta Description')
                                            ->rows(3)
                                            ->required()
                                            ->columnSpanFull(),
                                    ]),
                            ]),
                    ]),
            ])
            ->statePath('data');
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
                                ->label('Simpan Perubahan Beranda')
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

            PageContent::updateOrCreate(
                ['key' => $key],
                [
                    'value' => $val,
                    'group' => str_starts_with($key, 'seo.') ? 'seo' : 'home',
                    'type' => $meta['type'] ?? (is_array($val) ? 'images' : 'text'),
                    'label' => $meta['label'] ?? ucwords(str_replace(['.', '_'], ' ', $key)),
                    'help' => $meta['help'] ?? null,
                ]
            );
        }

        Notification::make()
            ->title('Konten Halaman Beranda Berhasil Disimpan')
            ->success()
            ->send();
    }
}
