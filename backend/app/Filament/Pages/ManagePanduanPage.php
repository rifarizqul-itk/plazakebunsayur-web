<?php

namespace App\Filament\Pages;

use App\Filament\Resources\AccessRoutes\AccessRouteResource;
use App\Filament\Resources\BuildingRules\BuildingRuleResource;
use App\Filament\Resources\Facilities\FacilityResource;
use App\Filament\Resources\ShoppingTips\ShoppingTipResource;
use App\Models\PageContent;
use App\Models\SiteSetting;
use BackedEnum;
use Filament\Actions\Action;
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

class ManagePanduanPage extends Page
{
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedMap;

    protected static ?string $navigationLabel = '4. Halaman Panduan';

    protected static ?int $navigationSort = 4;

    protected static ?string $title = 'Kelola Panduan Kunjungan Gedung';

    public ?array $data = [];

    public static function extractMapEmbedUrl(?string $input): ?string
    {
        if (blank($input)) {
            return null;
        }

        if (preg_match('/src=["\']([^"\']+)["\']/', $input, $matches)) {
            return $matches[1];
        }

        return trim($input);
    }

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
        $settings = SiteSetting::getAllSettings();

        $pageContentKeys = [
            'panduan.hours_title',
            'panduan.hours_detail',
            'panduan.hours_tip',
            'panduan.location_title',
            'panduan.location_detail',
            'panduan.facilities_title',
            'panduan.facilities_description',
            'panduan.routes_title',
            'panduan.routes_description',
            'panduan.tips_title',
            'panduan.tips_description',
            'panduan.rules_title',
            'panduan.rules_description',
            'header.panduan.eyebrow',
            'header.panduan.title',
            'header.panduan.description',
            'seo.panduan.title',
            'seo.panduan.description',
        ];

        $defaults = PageContent::defaults();
        $savedContent = PageContent::whereIn('key', $pageContentKeys)->pluck('value', 'key')->toArray();

        $formData = [
            'setting_mall_opening_hours' => $settings['mall_opening_hours'] ?? '',
            'setting_security_phone' => $settings['security_phone'] ?? '',
            'setting_management_whatsapp' => $settings['management_whatsapp'] ?? '',
            'setting_management_email' => $settings['management_email'] ?? '',
            'setting_office_address' => $settings['office_address'] ?? '',
            'setting_maps_url' => $settings['maps_url'] ?? '',
            'setting_maps_embed_url' => $settings['maps_embed_url'] ?? '',
        ];

        foreach ($pageContentKeys as $key) {
            $defaultVal = $defaults[$key]['default'] ?? '';
            $formData[static::toFormFieldName($key)] = $savedContent[$key] ?? $defaultVal;
        }

        $this->form->fill($formData);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('PanduanTabs')
                    ->tabs([
                        $this->getHoursTab(),
                        $this->getLocationTab(),
                        $this->getResourceManagementTab([
                            'tab_label' => 'Fasilitas Gedung',
                            'tab_icon' => Heroicon::OutlinedSparkles,
                            'key_prefix' => 'panduan.facilities',
                            'section_desc' => 'Kelola daftar fasilitas gedung (Musholla, Parkir, Toilet, Kursi Roda, dll.)',
                            'btn_label' => 'Buka Kelola Daftar Fasilitas Lengkap',
                            'btn_icon' => Heroicon::OutlinedSparkles,
                            'resource_url' => FacilityResource::getUrl(),
                        ]),
                        $this->getResourceManagementTab([
                            'tab_label' => 'Rute Akses Mall',
                            'tab_icon' => Heroicon::OutlinedTruck,
                            'key_prefix' => 'panduan.routes',
                            'section_desc' => 'Kelola panduan rute dari Bandara Sepinggan, Pelabuhan Semayang, Terminal Batu Ampar, dll.',
                            'btn_label' => 'Buka Kelola Daftar Rute Akses Lengkap',
                            'btn_icon' => Heroicon::OutlinedMapPin,
                            'resource_url' => AccessRouteResource::getUrl(),
                        ]),
                        $this->getResourceManagementTab([
                            'tab_label' => 'Tips Belanja',
                            'tab_icon' => Heroicon::OutlinedLightBulb,
                            'key_prefix' => 'panduan.tips',
                            'section_desc' => 'Kelola kiat memilih batu mulia, tawar-menawar santun, dan rekomendasi waktu belanja.',
                            'btn_label' => 'Buka Kelola Daftar Tips Belanja Lengkap',
                            'btn_icon' => Heroicon::OutlinedLightBulb,
                            'resource_url' => ShoppingTipResource::getUrl(),
                        ]),
                        $this->getResourceManagementTab([
                            'tab_label' => 'Tata Tertib',
                            'tab_icon' => Heroicon::OutlinedShieldCheck,
                            'key_prefix' => 'panduan.rules',
                            'section_desc' => 'Kelola aturan kawasan tertib rokok, kebersihan, parkir, dan ketertiban gedung.',
                            'btn_label' => 'Buka Kelola Tata Tertib Lengkap',
                            'btn_icon' => Heroicon::OutlinedShieldCheck,
                            'resource_url' => BuildingRuleResource::getUrl(),
                        ]),
                        $this->getHeaderAndSeoTab(),
                    ]),
            ])
            ->statePath('data');
    }

    protected function getHoursTab(): Tab
    {
        return Tab::make('Jam & Keamanan')
            ->icon(Heroicon::OutlinedClock)
            ->schema([
                Section::make('Jam Operasional & Pos Pengamanan')
                    ->description('Informasi jam buka mall dan nomor kontak darurat pengelola')
                    ->schema([
                        TextInput::make('setting_mall_opening_hours')
                            ->label('Jam Operasional Mall')
                            ->placeholder('Contoh: Setiap Hari 08.00 - 18.00 WITA')
                            ->required(),
                        TextInput::make('setting_security_phone')
                            ->label('Nomor Telepon Pos Keamanan Gedung')
                            ->placeholder('Contoh: (0542) 734567, 081234567890')
                            ->helperText('Dapat memasukkan lebih dari satu nomor telepon, pisahkan dengan koma (,).')
                            ->required(),
                        TextInput::make('setting_management_whatsapp')
                            ->label('WhatsApp Resmi Pengelola')
                            ->placeholder('Contoh: 081234567890'),
                        TextInput::make('setting_management_email')
                            ->label('Email Resmi Pengelola')
                            ->placeholder('Contoh: pengelola@plazakebunsayur.com, info@plazakebunsayur.com')
                            ->helperText('Dapat memasukkan lebih dari satu alamat email, pisahkan dengan koma (,).'),
                    ])->columns(2),

                Section::make('Teks Panduan Jam Buka di Website')
                    ->schema([
                        TextInput::make(static::toFormFieldName('panduan.hours_title'))
                            ->label('Judul Blok Jam Operasional'),
                        Textarea::make(static::toFormFieldName('panduan.hours_detail'))
                            ->label('Rincian Jadwal Buka')
                            ->rows(2),
                        Textarea::make(static::toFormFieldName('panduan.hours_tip'))
                            ->label('Catatan / Tips Waktu Kunjungan')
                            ->rows(2),
                    ]),
            ]);
    }

    protected function getLocationTab(): Tab
    {
        return Tab::make('Lokasi & Google Maps')
            ->icon(Heroicon::OutlinedMapPin)
            ->schema([
                Section::make('Alamat & Peta Google Maps')
                    ->description('Alamat kantor dan integrasi peta interaktif. Mendukung Smart Extraction jika menempelkan kode iframe dari Google Maps.')
                    ->schema([
                        Textarea::make('setting_office_address')
                            ->label('Alamat Lengkap Gedung & Kantor')
                            ->rows(2)
                            ->required(),
                        TextInput::make('setting_maps_url')
                            ->label('Tautan Google Maps Langsung (URL Pin)')
                            ->url()
                            ->helperText('Tautan langsung ke Google Maps saat pengunjung klik tombol Buka di Maps.'),
                        TextInput::make('setting_maps_embed_url')
                            ->label('URL Embed Peta Google Maps (Iframe)')
                            ->helperText('Tempel URL embed (https://www.google.com/maps/embed?...) atau kode <iframe src="..."> dari Google Maps. Sistem akan otomatis mengekstrak URL src.')
                            ->dehydrateStateUsing(fn (?string $state): ?string => static::extractMapEmbedUrl($state))
                            ->columnSpanFull(),
                    ]),

                Section::make('Teks Pengantar Lokasi di Website')
                    ->schema([
                        TextInput::make(static::toFormFieldName('panduan.location_title'))
                            ->label('Judul Bagian Lokasi'),
                        Textarea::make(static::toFormFieldName('panduan.location_detail'))
                            ->label('Keterangan Panduan Arah Lokasi')
                            ->rows(2),
                    ]),
            ]);
    }

    /**
     * @param array{
     *     tab_label: string,
     *     tab_icon: BackedEnum|string,
     *     key_prefix: string,
     *     section_desc: string,
     *     btn_label: string,
     *     btn_icon: BackedEnum|string,
     *     resource_url: string
     * } $config
     */
    protected function getResourceManagementTab(array $config): Tab
    {
        $tabLabel = $config['tab_label'];
        $actionName = 'manage'.str_replace(' ', '', $tabLabel).'Table';

        return Tab::make($tabLabel)
            ->icon($config['tab_icon'])
            ->schema([
                Section::make("Teks Pengantar {$tabLabel}")
                    ->schema([
                        TextInput::make(static::toFormFieldName("{$config['key_prefix']}_title"))
                            ->label("Judul Bagian {$tabLabel}"),
                        Textarea::make(static::toFormFieldName("{$config['key_prefix']}_description"))
                            ->label("Deskripsi Bagian {$tabLabel}")
                            ->rows(2),
                    ]),

                Section::make("Manajemen Data {$tabLabel}")
                    ->description($config['section_desc'])
                    ->schema([
                        Actions::make([
                            Action::make($actionName)
                                ->label($config['btn_label'])
                                ->icon($config['btn_icon'])
                                ->color('primary')
                                ->url($config['resource_url']),
                        ]),
                    ]),
            ]);
    }

    protected function getHeaderAndSeoTab(): Tab
    {
        return Tab::make('Header & SEO Panduan')
            ->icon(Heroicon::OutlinedGlobeAlt)
            ->schema([
                Section::make('Header Halaman Panduan')
                    ->schema([
                        TextInput::make(static::toFormFieldName('header.panduan.eyebrow'))
                            ->label('Teks Pembuka Header (Eyebrow)')
                            ->required(),
                        TextInput::make(static::toFormFieldName('header.panduan.title'))
                            ->label('Judul Header Halaman Panduan')
                            ->required(),
                        Textarea::make(static::toFormFieldName('header.panduan.description'))
                            ->label('Deskripsi Header Panduan')
                            ->rows(2),
                    ]),

                Section::make('Pengaturan SEO Panduan')
                    ->schema([
                        TextInput::make(static::toFormFieldName('seo.panduan.title'))
                            ->label('Meta Title')
                            ->required(),
                        Textarea::make(static::toFormFieldName('seo.panduan.description'))
                            ->label('Meta Description')
                            ->rows(3)
                            ->required(),
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
                                ->label('Simpan Seluruh Panduan & Pengaturan')
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
        $this->saveSiteSettings($state);
        $this->savePageContents($state);

        Notification::make()
            ->title('Panduan Kunjungan & Pengaturan Lokasi Berhasil Disimpan')
            ->success()
            ->send();
    }

    protected function saveSiteSettings(array $state): void
    {
        $settingFields = [
            'setting_mall_opening_hours' => 'mall_opening_hours',
            'setting_security_phone' => 'security_phone',
            'setting_management_whatsapp' => 'management_whatsapp',
            'setting_management_email' => 'management_email',
            'setting_office_address' => 'office_address',
            'setting_maps_url' => 'maps_url',
            'setting_maps_embed_url' => 'maps_embed_url',
        ];

        foreach ($settingFields as $field => $settingKey) {
            if (!array_key_exists($field, $state)) {
                continue;
            }
            $val = $state[$field];
            $val = ($settingKey === 'maps_embed_url') ? static::extractMapEmbedUrl($val) : $val;
            SiteSetting::set($settingKey, $val);
        }
    }

    protected function savePageContents(array $state): void
    {
        $defaults = PageContent::defaults();

        foreach ($state as $field => $val) {
            if (str_starts_with($field, 'setting_')) {
                continue;
            }

            $key = static::fromFormFieldName($field);
            $meta = $defaults[$key] ?? [];

            PageContent::updateOrCreate(
                ['key' => $key],
                [
                    'value' => $val,
                    'group' => str_starts_with($key, 'seo.') ? 'seo' : (str_starts_with($key, 'header.') ? 'header' : 'panduan'),
                    'type' => $meta['type'] ?? 'text',
                    'label' => $meta['label'] ?? ucwords(str_replace(['.', '_'], ' ', $key)),
                    'help' => $meta['help'] ?? null,
                ]
            );
        }
    }
}
