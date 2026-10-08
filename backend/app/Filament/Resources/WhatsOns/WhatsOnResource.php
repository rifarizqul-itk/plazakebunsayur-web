<?php

namespace App\Filament\Resources\WhatsOns;

use App\Filament\Resources\WhatsOns\Pages\CreateWhatsOn;
use App\Filament\Resources\WhatsOns\Pages\EditWhatsOn;
use App\Filament\Resources\WhatsOns\Pages\ListWhatsOns;
use App\Models\WhatsOn;
use BackedEnum;
use UnitEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\DatePicker;
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
use Filament\Tables\Table;
use Illuminate\Support\Str;

class WhatsOnResource extends Resource
{
    protected static ?string $model = WhatsOn::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCalendarDays;

    protected static UnitEnum|string|null $navigationGroup = 'Informasi Pengunjung';

    protected static ?string $modelLabel = 'Agenda & Acara';

    protected static ?string $pluralModelLabel = 'Daftar Agenda & Acara';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Judul Acara / Promo')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),
                TextInput::make('slug')
                    ->label('Slug URL')
                    ->required()
                    ->unique(ignoreRecord: true),
                Select::make('type')
                    ->label('Kategori Informasi')
                    ->options([
                        'event' => 'Acara / Kegiatan Budaya',
                        'promo' => 'Promo & Penawaran Kios',
                        'announcement' => 'Pengumuman Manajemen',
                    ])
                    ->default('event')
                    ->required(),
                DatePicker::make('start_date')
                    ->label('Tanggal Mulai')
                    ->required(),
                DatePicker::make('end_date')
                    ->label('Tanggal Selesai'),
                FileUpload::make('banner_image_path')
                    ->label('Banner Kegiatan (Rasio 16:9)')
                    ->disk('public')
                    ->directory('whats-on')
                    ->image()
                    ->maxSize(10240)
                    ->helperText('Rekomendasi rasio 16:9 (1600x900 px). Berkas maksimal 10 MB.'),
                Textarea::make('summary')
                    ->label('Ringkasan Singkat')
                    ->placeholder('Ringkasan 1-2 kalimat untuk kartu depan...')
                    ->columnSpanFull(),
                Textarea::make('content')
                    ->label('Detail Lengkap & Jadwal')
                    ->placeholder('Deskripsi acara, pengisi acara, syarat ketentuan promo...')
                    ->rows(6)
                    ->columnSpanFull(),
                Toggle::make('is_active')
                    ->label('Status Publikasi Aktif')
                    ->default(true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('banner_image_path')
                    ->label('Banner')
                    ->disk('public'),
                TextColumn::make('title')
                    ->label('Judul Acara')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('type')
                    ->label('Tipe')
                    ->badge()
                    ->color(fn (?string $state): string => match ($state) {
                        'event' => 'info',
                        'promo' => 'success',
                        'announcement' => 'warning',
                        default => 'gray',
                    }),
                TextColumn::make('start_date')
                    ->label('Mulai')
                    ->date('d M Y')
                    ->sortable(),
                TextColumn::make('end_date')
                    ->label('Selesai')
                    ->date('d M Y')
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
            'index' => ListWhatsOns::route('/'),
            'create' => CreateWhatsOn::route('/create'),
            'edit' => EditWhatsOn::route('/{record}/edit'),
        ];
    }
}
