<?php

namespace App\Filament\Resources\AccessRoutes;

use App\Filament\Resources\AccessRoutes\Pages\CreateAccessRoute;
use App\Filament\Resources\AccessRoutes\Pages\EditAccessRoute;
use App\Filament\Resources\AccessRoutes\Pages\ListAccessRoutes;
use App\Models\AccessRoute;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
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

class AccessRouteResource extends Resource
{
    protected static ?string $model = AccessRoute::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedMapPin;

    protected static UnitEnum|string|null $navigationGroup = 'Konten Website';

    protected static ?string $modelLabel = 'Rute Akses Kunjungan';

    protected static ?string $pluralModelLabel = 'Rute Akses Kunjungan';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Judul Rute / Asal')
                    ->placeholder('Contoh: Dari Bandara Sepinggan, Dari Pelabuhan Semayang')
                    ->required()
                    ->maxLength(255),
                TextInput::make('distance')
                    ->label('Jarak / Estimasi Waktu')
                    ->placeholder('Contoh: ± 15 km (25–35 menit perjalanan)')
                    ->maxLength(100),
                TextInput::make('order_index')
                    ->label('Urutan')
                    ->numeric()
                    ->default(1)
                    ->required(),
                Toggle::make('is_active')
                    ->label('Status Aktif')
                    ->default(true),
                Textarea::make('description')
                    ->label('Petunjuk Jalan & Rekomendasi Moda')
                    ->rows(4)
                    ->columnSpanFull()
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->reorderable('order_index')
            ->defaultSort('order_index')
            ->columns([
                TextColumn::make('order_index')
                    ->label('Urutan')
                    ->sortable(),
                TextColumn::make('title')
                    ->label('Judul Rute')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('distance')
                    ->label('Jarak / Waktu')
                    ->searchable(),
                IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean(),
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

    public static function getPages(): array
    {
        return [
            'index' => ListAccessRoutes::route('/'),
            'create' => CreateAccessRoute::route('/create'),
            'edit' => EditAccessRoute::route('/{record}/edit'),
        ];
    }
}
