<?php

namespace App\Filament\Widgets;

use App\Filament\Resources\ContactMessages\ContactMessageResource;
use App\Models\ContactMessage;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class RecentContactMessagesWidget extends BaseWidget
{
    protected static ?int $sort = 3;

    protected int|string|array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->heading('Aktivitas Terkini: Pesan Masuk Pengunjung')
            ->description('5 pesan masuk terbaru dari formulir kontak website')
            ->query(ContactMessage::query()->latest()->limit(5))
            ->columns([
                TextColumn::make('created_at')
                    ->label('Waktu Masuk')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),

                TextColumn::make('full_name')
                    ->label('Pengirim')
                    ->searchable(),

                TextColumn::make('phone_number')
                    ->label('Telepon / WA')
                    ->default('-'),

                TextColumn::make('subject')
                    ->label('Subjek')
                    ->limit(35),

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
            ->recordActions([
                Action::make('view')
                    ->label('Tinjau')
                    ->icon(Heroicon::OutlinedEye)
                    ->color('primary')
                    ->url(fn (ContactMessage $record): string => ContactMessageResource::getUrl('edit', ['record' => $record])),

                Action::make('mark_resolved')
                    ->label('Selesai')
                    ->icon(Heroicon::OutlinedCheckCircle)
                    ->color('success')
                    ->visible(fn (ContactMessage $record): bool => $record->status !== 'replied')
                    ->action(function (ContactMessage $record): void {
                        $record->update(['status' => 'replied']);
                        Notification::make()
                            ->title('Status pesan diperbarui menjadi Selesai')
                            ->success()
                            ->send();
                    }),
            ])
            ->paginated(false);
    }
}
