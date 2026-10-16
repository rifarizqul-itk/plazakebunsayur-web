<?php

namespace App\Filament\Resources\BuildingRules;

use App\Filament\Resources\BuildingRules\Pages\CreateBuildingRule;
use App\Filament\Resources\BuildingRules\Pages\EditBuildingRule;
use App\Filament\Resources\BuildingRules\Pages\ListBuildingRules;
use App\Models\BuildingRule;
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

class BuildingRuleResource extends Resource
{
    protected static ?string $model = BuildingRule::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedShieldCheck;

    protected static UnitEnum|string|null $navigationGroup = 'Konten Website';

    protected static ?string $modelLabel = 'Tata Tertib Gedung';

    protected static ?string $pluralModelLabel = 'Tata Tertib Gedung';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Judul Tata Tertib')
                    ->placeholder('Contoh: Kawasan Tertib Merokok, Kebersihan Bersama')
                    ->required()
                    ->maxLength(255),
                TextInput::make('order_index')
                    ->label('Urutan')
                    ->numeric()
                    ->default(1)
                    ->required(),
                Toggle::make('is_active')
                    ->label('Status Aktif')
                    ->default(true),
                Textarea::make('description')
                    ->label('Penjelasan Tata Tertib')
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
                    ->label('Tata Tertib')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('description')
                    ->label('Penjelasan')
                    ->limit(60)
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
            'index' => ListBuildingRules::route('/'),
            'create' => CreateBuildingRule::route('/create'),
            'edit' => EditBuildingRule::route('/{record}/edit'),
        ];
    }
}
