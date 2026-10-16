<?php

namespace App\Filament\Resources\LegalPages;

use App\Filament\Resources\LegalPages\Pages\EditLegalPage;
use App\Filament\Resources\LegalPages\Pages\ListLegalPages;
use App\Models\LegalPage;
use BackedEnum;
use Filament\Actions\EditAction;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;
use UnitEnum;

class LegalPageResource extends Resource
{
    protected static ?string $model = LegalPage::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static UnitEnum|string|null $navigationGroup = 'Konten Website';

    protected static ?string $modelLabel = 'Dokumen Hukum';

    protected static ?string $pluralModelLabel = 'Halaman Hukum & Privasi';

    public static function canCreate(): bool
    {
        return false;
    }

    public static function canDelete(Model $record): bool
    {
        return false;
    }

    public static function canDeleteAny(): bool
    {
        return false;
    }

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Judul Dokumen')
                    ->required()
                    ->maxLength(255),
                TextInput::make('slug')
                    ->label('Rute Sistem (Slug)')
                    ->disabled()
                    ->dehydrated(false)
                    ->helperText('Rute internal sistem tidak dapat diubah.'),
                TextInput::make('updated_label')
                    ->label('Label Tanggal Pembaruan')
                    ->placeholder('Contoh: 11 Oktober 2026')
                    ->required()
                    ->maxLength(100),
                Textarea::make('intro')
                    ->label('Paragraf Pengantar Singkat')
                    ->rows(3)
                    ->columnSpanFull()
                    ->maxLength(500),
                RichEditor::make('body')
                    ->label('Isi Lengkap Dokumen Hukum')
                    ->toolbarButtons([
                        'h2',
                        'h3',
                        'bold',
                        'italic',
                        'underline',
                        'bulletList',
                        'orderedList',
                        'link',
                        'undo',
                        'redo',
                    ])
                    ->columnSpanFull()
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->label('Nama Dokumen')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('slug')
                    ->label('Rute URL')
                    ->badge()
                    ->color('gray'),
                TextColumn::make('updated_label')
                    ->label('Label Pembaruan'),
                TextColumn::make('updated_at')
                    ->label('Waktu Terakhir Disimpan')
                    ->dateTime('d M Y H:i')
                    ->sortable(),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                // No bulk actions allowed on critical legal documents
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListLegalPages::route('/'),
            'edit' => EditLegalPage::route('/{record}/edit'),
        ];
    }
}
