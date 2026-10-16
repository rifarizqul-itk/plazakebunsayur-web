<?php

namespace App\Filament\Resources\PageContents;

use App\Filament\Resources\PageContents\Pages\EditPageContent;
use App\Filament\Resources\PageContents\Pages\ListPageContents;
use App\Models\PageContent;
use BackedEnum;
use UnitEnum;
use Filament\Actions\EditAction;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Grouping\Group;
use Filament\Tables\Table;

class PageContentResource extends Resource
{
    protected static ?string $model = PageContent::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static UnitEnum|string|null $navigationGroup = 'Konten Website';

    protected static ?string $modelLabel = 'Konten & Teks Halaman';

    protected static ?string $pluralModelLabel = 'Konten & Teks Halaman';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('label')
                    ->label('Nama Pengaturan Konten')
                    ->disabled()
                    ->dehydrated(false)
                    ->columnSpanFull(),
                TextInput::make('key')
                    ->label('Kata Kunci Sistem (Read Only)')
                    ->disabled()
                    ->dehydrated(false)
                    ->helperText('Digunakan oleh sistem antarmuka web publik.')
                    ->columnSpanFull(),
                FileUpload::make('value')
                    ->label('Unggah Berkas Gambar / Foto')
                    ->disk('public')
                    ->directory('page-contents')
                    ->image()
                    ->maxSize(5120)
                    ->helperText('Format JPG, PNG, atau WebP maksimal 5 MB.')
                    ->visible(fn (?PageContent $record): bool => $record?->type === 'image')
                    ->columnSpanFull(),
                Textarea::make('value')
                    ->label('Isi Konten Paragraf')
                    ->rows(5)
                    ->helperText(fn (?PageContent $record): ?string => $record?->help)
                    ->visible(fn (?PageContent $record): bool => $record?->type === 'textarea')
                    ->columnSpanFull(),
                TextInput::make('value')
                    ->label('Isi Teks')
                    ->helperText(fn (?PageContent $record): ?string => $record?->help)
                    ->visible(fn (?PageContent $record): bool => in_array($record?->type, ['text', 'url', null]))
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultGroup(
                Group::make('group')
                    ->label('Bagian Halaman')
                    ->getTitleFromRecordUsing(fn (PageContent $record): string => match ($record->group) {
                        'home' => '1. Halaman Beranda',
                        'header' => '2. Header Tiap Halaman',
                        'footer' => '3. Footer Gedung',
                        'brand' => '4. Identitas & Logo Brand',
                        'seo' => '5. SEO & Metadata Meta Tags',
                        default => ucfirst($record->group),
                    })
            )
            ->columns([
                TextColumn::make('label')
                    ->label('Pengaturan Konten')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                TextColumn::make('type')
                    ->label('Tipe')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'image' => 'warning',
                        'textarea' => 'info',
                        'text' => 'success',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'image' => 'Foto / Gambar',
                        'textarea' => 'Paragraf Panjang',
                        'text' => 'Teks Singkat',
                        default => $state,
                    }),
                ImageColumn::make('value')
                    ->label('Pratinjau Foto')
                    ->disk('public')
                    ->visible(fn (): bool => true),
                TextColumn::make('value')
                    ->label('Nilai Saat Ini')
                    ->limit(60)
                    ->searchable(),
                TextColumn::make('updated_at')
                    ->label('Terakhir Diperbarui')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('group')
                    ->label('Pilih Bagian Halaman')
                    ->options([
                        'home' => 'Halaman Beranda',
                        'header' => 'Header Tiap Halaman',
                        'footer' => 'Footer',
                        'brand' => 'Identitas Brand & Logo',
                        'seo' => 'SEO & Metadata',
                    ]),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListPageContents::route('/'),
            'edit' => EditPageContent::route('/{record}/edit'),
        ];
    }
}
