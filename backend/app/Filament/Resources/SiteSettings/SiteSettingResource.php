<?php

namespace App\Filament\Resources\SiteSettings;

use App\Filament\Resources\SiteSettings\Pages\EditSiteSetting;
use App\Filament\Resources\SiteSettings\Pages\ListSiteSettings;
use App\Models\SiteSetting;
use BackedEnum;
use UnitEnum;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class SiteSettingResource extends Resource
{
    protected static ?string $model = SiteSetting::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCog6Tooth;

    protected static UnitEnum|string|null $navigationGroup = 'Pengaturan Mall';

    protected static ?string $modelLabel = 'Pengaturan Informasi Gedung';

    protected static ?string $pluralModelLabel = 'Pengaturan Informasi Gedung';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('key')
                    ->label('Kunci Identitas Pengaturan')
                    ->disabled()
                    ->dehydrated(false)
                    ->helperText('Kunci sistem yang dikonsumsi oleh website publik.')
                    ->columnSpanFull(),
                Textarea::make('value')
                    ->label('Nilai Pengaturan / Konten')
                    ->required()
                    ->rows(3)
                    ->helperText('Teks informasi operasional resmi yang tampil di website publik.')
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('key')
                    ->label('Jenis Pengaturan')
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'mall_opening_hours' => 'Jam Operasional Mall',
                        'management_whatsapp' => 'Nomor WhatsApp Pengelola',
                        'security_phone' => 'Telepon Pos Keamanan',
                        'office_address' => 'Alamat Kantor Pengelola',
                        'management_email' => 'Email Resmi Pengelola',
                        'maps_url' => 'Tautan Google Maps',
                        default => $state,
                    })
                    ->badge()
                    ->color('info')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('value')
                    ->label('Nilai Saat Ini')
                    ->limit(65)
                    ->searchable(),
                TextColumn::make('updated_at')
                    ->label('Terakhir Diperbarui')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([]);
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
            'index' => ListSiteSettings::route('/'),
            'edit' => EditSiteSetting::route('/{record}/edit'),
        ];
    }
}
