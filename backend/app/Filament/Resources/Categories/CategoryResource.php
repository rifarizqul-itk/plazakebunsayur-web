<?php

namespace App\Filament\Resources\Categories;

use App\Filament\Resources\Categories\Pages\CreateCategory;
use App\Filament\Resources\Categories\Pages\EditCategory;
use App\Filament\Resources\Categories\Pages\ListCategories;
use App\Models\Category;
use BackedEnum;
use UnitEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class CategoryResource extends Resource
{
    protected static ?string $model = Category::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static UnitEnum|string|null $navigationGroup = 'Direktori & Konten';

    protected static ?string $modelLabel = 'Kategori';

    protected static ?string $pluralModelLabel = 'Daftar Kategori';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nama Kategori')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),
                TextInput::make('slug')
                    ->label('Slug URL')
                    ->required()
                    ->unique(ignoreRecord: true),
                Select::make('type')
                    ->label('Tipe Zona')
                    ->options([
                        'retail' => 'Belanja (Retail / Kerajinan / Permata)',
                        'fashion' => 'Fashion (Busana, Batik & Pakaian Adat)',
                        'culinary' => 'Kuliner (Legacy / Arsip)',
                    ])
                    ->required()
                    ->default('retail'),
                Select::make('icon_name')
                    ->label('Ikon Kategori (Lucide)')
                    ->searchable()
                    ->options([
                        'Gem' => 'Batu Permata & Akik (Gem)',
                        'Sparkles' => 'Aksesoris & Kilau (Sparkles)',
                        'ShoppingBag' => 'Belanja Umum (ShoppingBag)',
                        'PackageOpen' => 'Cinderamata / Oleh-Oleh (PackageOpen)',
                        'Package' => 'Kerajinan Tangan (Package)',
                        'Shirt' => 'Busana / Fashion (Shirt)',
                        'Crown' => 'Perhiasan & Emas (Crown)',
                        'Scissors' => 'Penjahit & Tekstil (Scissors)',
                        'Watch' => 'Jam & Aksesoris (Watch)',
                        'Gift' => 'Souvenir & Hadiah (Gift)',
                        'Palette' => 'Seni & Kerajinan (Palette)',
                        'Store' => 'Kios & Toko (Store)',
                        'UtensilsCrossed' => 'Kuliner Tradisional (UtensilsCrossed)',
                    ])
                    ->helperText('Pilih ikon Lucide representatif untuk kategori ini (opsional).'),
                TextInput::make('order_index')
                    ->label('Urutan Tampilan')
                    ->required()
                    ->numeric()
                    ->default(0),
                Textarea::make('description')
                    ->label('Deskripsi Kategori')
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Nama')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('slug')
                    ->label('Slug')
                    ->searchable(),
                TextColumn::make('type')
                    ->label('Tipe')
                    ->badge()
                    ->color(fn (?string $state): string => match ($state) {
                        'retail' => 'info',
                        'fashion' => 'success',
                        'culinary' => 'warning',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (?string $state): string => match ($state) {
                        'retail' => 'Belanja (Retail)',
                        'fashion' => 'Fashion (Busana & Batik)',
                        'culinary' => 'Kuliner (F&B)',
                        default => $state ?? '-',
                    }),
                TextColumn::make('icon_name')
                    ->label('Ikon')
                    ->searchable(),
                TextColumn::make('order_index')
                    ->label('Urutan')
                    ->numeric()
                    ->sortable(),
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
            'index' => ListCategories::route('/'),
            'create' => CreateCategory::route('/create'),
            'edit' => EditCategory::route('/{record}/edit'),
        ];
    }
}
