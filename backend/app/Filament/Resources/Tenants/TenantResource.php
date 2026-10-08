<?php

namespace App\Filament\Resources\Tenants;

use App\Filament\Resources\Tenants\Pages\CreateTenant;
use App\Filament\Resources\Tenants\Pages\EditTenant;
use App\Filament\Resources\Tenants\Pages\ListTenants;
use App\Models\Tenant;
use BackedEnum;
use UnitEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class TenantResource extends Resource
{
    protected static ?string $model = Tenant::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBuildingStorefront;

    protected static UnitEnum|string|null $navigationGroup = 'Direktori & Konten';

    protected static ?string $modelLabel = 'Kios / Stan';

    protected static ?string $pluralModelLabel = 'Daftar Kios & Stan';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('category_id')
                    ->label('Kategori Kios')
                    ->relationship('category', 'name')
                    ->required()
                    ->searchable()
                    ->preload(),
                Select::make('floor_id')
                    ->label('Lantai')
                    ->relationship('floor', 'name')
                    ->required()
                    ->searchable()
                    ->preload(),
                TextInput::make('name')
                    ->label('Nama Kios / Stan')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),
                TextInput::make('slug')
                    ->label('Slug URL')
                    ->required()
                    ->unique(ignoreRecord: true),
                TextInput::make('unit_number')
                    ->label('Nomor Unit / Blok')
                    ->placeholder('Contoh: Blok A No. 12-14')
                    ->required(),
                TextInput::make('phone_whatsapp')
                    ->label('Nomor WhatsApp')
                    ->helperText('Format: 08xxx atau 62xxx (langsung terhubung ke chat pengunjung)')
                    ->placeholder('081234567890'),
                TextInput::make('instagram')
                    ->label('Akun Instagram')
                    ->placeholder('@tokopermata'),
                TextInput::make('opening_time')
                    ->label('Jam Buka')
                    ->placeholder('09:00')
                    ->default('09:00'),
                TextInput::make('closing_time')
                    ->label('Jam Tutup')
                    ->placeholder('21:00')
                    ->default('21:00'),
                TextInput::make('days_open')
                    ->label('Hari Operasional')
                    ->default('Setiap Hari (Senin - Minggu)')
                    ->required(),
                FileUpload::make('image_path')
                    ->label('Foto Kios / Banner')
                    ->disk('public')
                    ->directory('tenants')
                    ->image()
                    ->maxSize(10240)
                    ->helperText('Rekomendasi rasio 4:3 (800x600 px). Berkas maksimal 10 MB.'),
                Textarea::make('description')
                    ->label('Profil & Deskripsi Lengkap')
                    ->placeholder('Ceritakan keunggulan kios, jenis produk/menu andalan, dan layanan spesifik...')
                    ->columnSpanFull(),
                Toggle::make('is_featured')
                    ->label('Tampilkan di Pilihan Populer Beranda')
                    ->default(false),
                Toggle::make('is_active')
                    ->label('Status Aktif')
                    ->default(true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image_path')
                    ->label('Foto')
                    ->disk('public')
                    ->defaultImageUrl('https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300&q=80'),
                TextColumn::make('name')
                    ->label('Nama Kios')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('category.name')
                    ->label('Kategori')
                    ->badge()
                    ->color(fn ($record) => $record?->category?->type === 'culinary' ? 'warning' : 'info')
                    ->searchable(),
                TextColumn::make('floor.code')
                    ->label('Lantai')
                    ->sortable(),
                TextColumn::make('unit_number')
                    ->label('Unit')
                    ->searchable(),
                TextColumn::make('phone_whatsapp')
                    ->label('WhatsApp')
                    ->searchable(),
                IconColumn::make('is_featured')
                    ->label('Unggulan')
                    ->boolean(),
                IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean(),
            ])
            ->filters([
                SelectFilter::make('category')
                    ->relationship('category', 'name')
                    ->label('Filter Kategori'),
                SelectFilter::make('floor')
                    ->relationship('floor', 'name')
                    ->label('Filter Lantai'),
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
            'index' => ListTenants::route('/'),
            'create' => CreateTenant::route('/create'),
            'edit' => EditTenant::route('/{record}/edit'),
        ];
    }
}
