<?php

namespace App\Filament\Resources\ShoppingTips;

use App\Filament\Resources\ShoppingTips\Pages\CreateShoppingTip;
use App\Filament\Resources\ShoppingTips\Pages\EditShoppingTip;
use App\Filament\Resources\ShoppingTips\Pages\ListShoppingTips;
use App\Models\ShoppingTip;
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

class ShoppingTipResource extends Resource
{
    protected static ?string $model = ShoppingTip::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedLightBulb;

    protected static UnitEnum|string|null $navigationGroup = 'Konten Website';

    protected static ?string $modelLabel = 'Tips Belanja';

    protected static ?string $pluralModelLabel = 'Tips Belanja Cerdas';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Judul Tips Belanja')
                    ->placeholder('Contoh: Tawar-Menawar dengan Santun')
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
                    ->label('Uraian Tips Belanja')
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
                    ->label('Judul Tips')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('description')
                    ->label('Uraian')
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
            'index' => ListShoppingTips::route('/'),
            'create' => CreateShoppingTip::route('/create'),
            'edit' => EditShoppingTip::route('/{record}/edit'),
        ];
    }
}
