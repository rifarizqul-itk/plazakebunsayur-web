<?php

namespace App\Filament\Resources\Floors;

use App\Filament\Resources\Floors\Pages\CreateFloor;
use App\Filament\Resources\Floors\Pages\EditFloor;
use App\Filament\Resources\Floors\Pages\ListFloors;
use App\Models\Floor;
use BackedEnum;
use UnitEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class FloorResource extends Resource
{
    protected static ?string $model = Floor::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBuildingOffice2;

    protected static UnitEnum|string|null $navigationGroup = 'Direktori & Konten';

    protected static ?string $modelLabel = 'Lantai Gedung';

    protected static ?string $pluralModelLabel = 'Daftar Lantai';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nama Lantai')
                    ->placeholder('Contoh: Lantai Dasar (Ground Floor)')
                    ->required(),
                TextInput::make('code')
                    ->label('Kode Singkat')
                    ->placeholder('Contoh: GF, L1, L2')
                    ->required(),
                TextInput::make('order_index')
                    ->label('Urutan Tampilan')
                    ->required()
                    ->numeric()
                    ->default(1),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Nama Lantai')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('code')
                    ->label('Kode')
                    ->badge()
                    ->searchable(),
                TextColumn::make('order_index')
                    ->label('Urutan')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('tenants_count')
                    ->counts('tenants')
                    ->label('Jumlah Kios'),
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
            'index' => ListFloors::route('/'),
            'create' => CreateFloor::route('/create'),
            'edit' => EditFloor::route('/{record}/edit'),
        ];
    }
}
