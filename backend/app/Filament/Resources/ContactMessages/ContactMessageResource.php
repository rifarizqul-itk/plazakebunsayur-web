<?php

namespace App\Filament\Resources\ContactMessages;

use App\Filament\Resources\ContactMessages\Pages\CreateContactMessage;
use App\Filament\Resources\ContactMessages\Pages\EditContactMessage;
use App\Filament\Resources\ContactMessages\Pages\ListContactMessages;
use App\Models\ContactMessage;
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
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ContactMessageResource extends Resource
{
    protected static ?string $model = ContactMessage::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedInboxArrowDown;

    protected static UnitEnum|string|null $navigationGroup = 'Layanan Pengunjung';

    protected static ?string $modelLabel = 'Pesan Masuk';

    protected static ?string $pluralModelLabel = 'Kotak Pesan Masuk';

    public static function canCreate(): bool
    {
        return false;
    }

    public static function getNavigationBadge(): ?string
    {
        $count = static::getModel()::where('status', 'unread')->count();
        return $count > 0 ? (string) $count : null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'danger';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('full_name')
                    ->label('Nama Pengirim')
                    ->disabled(),
                TextInput::make('email')
                    ->label('Alamat Email')
                    ->disabled(),
                TextInput::make('phone_number')
                    ->label('Nomor Telepon / WhatsApp')
                    ->disabled(),
                TextInput::make('subject')
                    ->label('Subjek / Topik')
                    ->disabled(),
                Select::make('status')
                    ->label('Status Tindak Lanjut')
                    ->options([
                        'unread' => 'Belum Dibaca',
                        'read' => 'Sudah Dibaca',
                        'replied' => 'Sudah Dibalas / Ditindaklanjuti',
                    ])
                    ->required(),
                Textarea::make('message')
                    ->label('Isi Pesan')
                    ->rows(6)
                    ->disabled()
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('created_at')
                    ->label('Waktu Masuk')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),
                TextColumn::make('full_name')
                    ->label('Pengirim')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('phone_number')
                    ->label('Telepon / WA')
                    ->searchable(),
                TextColumn::make('subject')
                    ->label('Subjek')
                    ->searchable()
                    ->limit(30),
                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'unread' => 'danger',
                        'read' => 'warning',
                        'replied' => 'success',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'unread' => 'Belum Dibaca',
                        'read' => 'Sudah Dibaca',
                        'replied' => 'Selesai / Dibalas',
                        default => $state,
                    }),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'unread' => 'Belum Dibaca',
                        'read' => 'Sudah Dibaca',
                        'replied' => 'Sudah Dibalas',
                    ]),
            ])
            ->recordActions([
                EditAction::make()->label('Tinjau & Balas'),
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
            'index' => ListContactMessages::route('/'),
            'edit' => EditContactMessage::route('/{record}/edit'),
        ];
    }
}
