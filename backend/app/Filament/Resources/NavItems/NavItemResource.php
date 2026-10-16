<?php

namespace App\Filament\Resources\NavItems;

use App\Filament\Resources\NavItems\Pages\CreateNavItem;
use App\Filament\Resources\NavItems\Pages\EditNavItem;
use App\Filament\Resources\NavItems\Pages\ListNavItems;
use App\Models\NavItem;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Grouping\Group;
use Filament\Tables\Table;
use UnitEnum;

class NavItemResource extends Resource
{
    protected static ?string $model = NavItem::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBars3;

    protected static UnitEnum|string|null $navigationGroup = 'Konten Website';

    protected static ?string $modelLabel = 'Menu Navigasi';

    protected static ?string $pluralModelLabel = 'Menu Navigasi';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('label')
                    ->label('Label Menu')
                    ->placeholder('Contoh: BELANJA, Direktori Kios')
                    ->required()
                    ->maxLength(100),
                Select::make('location')
                    ->label('Posisi Navigasi')
                    ->options([
                        'header' => 'Header (Navbar Atas)',
                        'footer' => 'Footer (Navigasi Bawah)',
                    ])
                    ->required()
                    ->default('header'),
                TextInput::make('path')
                    ->label('Rute / URL Tujuan')
                    ->placeholder('Contoh: /belanja atau https://...')
                    ->helperText('Peringatan: Rute internal harus diawali dengan / (halaman yang tersedia: /, /belanja, /kuliner, /agenda, /panduan-kunjungan, /kontak, /kebijakan-privasi, /syarat-ketentuan). Link eksternal diawali https://. Menu ini tidak bisa menambah rute/halaman baru tanpa koding developer.')
                    ->required()
                    ->maxLength(255),
                TextInput::make('order_index')
                    ->label('Urutan')
                    ->numeric()
                    ->default(1)
                    ->required(),
                Toggle::make('is_external')
                    ->label('Tautan Luar (Buka di Tab Baru)')
                    ->helperText('Aktifkan jika link mengarah ke website eksternal.')
                    ->default(false),
                Toggle::make('is_cta')
                    ->label('Gaya Tombol Aksi (CTA)')
                    ->helperText('Tampilkan sebagai tombol sorotan khusus di navbar.')
                    ->default(false),
                Toggle::make('is_active')
                    ->label('Status Aktif')
                    ->default(true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->reorderable('order_index')
            ->defaultSort('order_index')
            ->groups([
                Group::make('location')
                    ->label('Posisi Menu'),
            ])
            ->defaultGroup('location')
            ->columns([
                TextColumn::make('order_index')
                    ->label('Urutan')
                    ->sortable(),
                TextColumn::make('label')
                    ->label('Label')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('path')
                    ->label('Rute Tujuan')
                    ->searchable(),
                TextColumn::make('location')
                    ->label('Posisi')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'header' => 'primary',
                        'footer' => 'gray',
                        default => 'secondary',
                    }),
                IconColumn::make('is_external')
                    ->label('Tab Baru')
                    ->boolean(),
                IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean(),
            ])
            ->filters([
                SelectFilter::make('location')
                    ->label('Filter Posisi')
                    ->options([
                        'header' => 'Header',
                        'footer' => 'Footer',
                    ]),
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
            'index' => ListNavItems::route('/'),
            'create' => CreateNavItem::route('/create'),
            'edit' => EditNavItem::route('/{record}/edit'),
        ];
    }
}
