<?php

namespace App\Filament\Resources\ContactMessages;

use App\Filament\Resources\ContactMessages\Pages\EditContactMessage;
use App\Filament\Resources\ContactMessages\Pages\ListContactMessages;
use App\Models\ContactMessage;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use UnitEnum;

class ContactMessageResource extends Resource
{
    protected static ?string $model = ContactMessage::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedInboxArrowDown;

    protected static ?string $navigationLabel = '5. Halaman Kontak';

    protected static ?int $navigationSort = 5;

    protected static UnitEnum|string|null $navigationGroup = null;

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
                Action::make('whatsapp')
                    ->label('WhatsApp')
                    ->icon(Heroicon::OutlinedChatBubbleLeftEllipsis)
                    ->color('success')
                    ->visible(fn (ContactMessage $record): bool => filled($record->phone_number))
                    ->url(function (ContactMessage $record): ?string {
                        if (blank($record->phone_number)) {
                            return null;
                        }
                        $phone = preg_replace('/[^0-9]/', '', $record->phone_number);
                        if (str_starts_with($phone, '0')) {
                            $phone = '62'.substr($phone, 1);
                        } elseif (str_starts_with($phone, '8')) {
                            $phone = '62'.$phone;
                        }

                        return 'https://wa.me/'.$phone;
                    }, shouldOpenInNewTab: true),

                Action::make('email')
                    ->label('Email')
                    ->icon(Heroicon::OutlinedEnvelope)
                    ->color('info')
                    ->visible(fn (ContactMessage $record): bool => filled($record->email))
                    ->url(fn (ContactMessage $record): string => 'mailto:'.$record->email.'?subject='.rawurlencode('Re: '.($record->subject ?? 'Pesan dari Plaza Kebun Sayur')), shouldOpenInNewTab: true),

                Action::make('mark_resolved')
                    ->label('Tandai Selesai')
                    ->icon(Heroicon::OutlinedCheckCircle)
                    ->color('warning')
                    ->visible(fn (ContactMessage $record): bool => $record->status !== 'replied')
                    ->action(function (ContactMessage $record): void {
                        $record->update(['status' => 'replied']);
                        Notification::make()
                            ->title('Status pesan diperbarui menjadi Selesai')
                            ->success()
                            ->send();
                    }),

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
