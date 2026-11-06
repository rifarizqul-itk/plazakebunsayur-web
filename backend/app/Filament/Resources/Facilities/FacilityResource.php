<?php

namespace App\Filament\Resources\Facilities;

use App\Filament\Resources\Facilities\Pages\CreateFacility;
use App\Filament\Resources\Facilities\Pages\EditFacility;
use App\Filament\Resources\Facilities\Pages\ListFacilities;
use App\Models\Facility;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use UnitEnum;

class FacilityResource extends Resource
{
    protected static ?string $model = Facility::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedSparkles;

    protected static UnitEnum|string|null $navigationGroup = 'Informasi Pengunjung';

    protected static ?string $modelLabel = 'Fasilitas Mall';

    protected static ?string $pluralModelLabel = 'Daftar Fasilitas';

    public static function shouldRegisterNavigation(): bool
    {
        return false;
    }

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nama Fasilitas')
                    ->placeholder('Contoh: Musholla Al-Hidayah, Parkir Luas')
                    ->required(),
                Select::make('icon_name')
                    ->label('Ikon Fasilitas (Lucide)')
                    ->searchable()
                    ->options([
                        'Moon' => 'Musholla / Tempat Ibadah (Moon)',
                        'Users' => 'Toilet / Fasilitas Umum (Users)',
                        'CreditCard' => 'ATM Center / Finansial (CreditCard)',
                        'Car' => 'Area Parkir (Car)',
                        'ShieldCheck' => 'Pos Keamanan / Satpam (ShieldCheck)',
                        'Building2' => 'Gedung / Pengelola (Building2)',
                        'Wifi' => 'Wi-Fi Area (Wifi)',
                        'Accessibility' => 'Akses Disabilitas / Kursi Roda (Accessibility)',
                        'Baby' => 'Ruang Laktasi / Ibu & Anak (Baby)',
                        'Utensils' => 'Area Kuliner / Kantin (Utensils)',
                        'ShoppingBag' => 'Kios Belanja (ShoppingBag)',
                        'Sparkles' => 'Layanan Khusus (Sparkles)',
                        'Info' => 'Pusat Informasi (Info)',
                        'HeartPulse' => 'P3K / Pos Kesehatan (HeartPulse)',
                        'MapPin' => 'Titik Lokasi (MapPin)',
                    ])
                    ->default('Sparkles')
                    ->helperText('Pilih ikon Lucide representatif untuk fasilitas ini.'),
                TextInput::make('location_note')
                    ->label('Catatan Lokasi')
                    ->placeholder('Contoh: Lantai 1 & Lantai 2 Sayap Barat'),
                TextInput::make('order_index')
                    ->label('Urutan Tampilan')
                    ->required()
                    ->numeric()
                    ->default(1),
                Textarea::make('description')
                    ->label('Deskripsi Fasilitas (Opsional)')
                    ->nullable()
                    ->placeholder('Rincian fasilitas, jam operasional jika ada, dll.')
                    ->columnSpanFull(),
                Toggle::make('is_active')
                    ->label('Status Aktif')
                    ->default(true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Nama Fasilitas')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('icon_name')
                    ->label('Ikon')
                    ->badge()
                    ->searchable(),
                TextColumn::make('location_note')
                    ->label('Lokasi')
                    ->searchable(),
                TextColumn::make('order_index')
                    ->label('Urutan')
                    ->numeric()
                    ->sortable(),
                IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListFacilities::route('/'),
            'create' => CreateFacility::route('/create'),
            'edit' => EditFacility::route('/{record}/edit'),
        ];
    }
}
