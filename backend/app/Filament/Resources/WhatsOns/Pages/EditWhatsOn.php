<?php

namespace App\Filament\Resources\WhatsOns\Pages;

use App\Filament\Resources\WhatsOns\WhatsOnResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditWhatsOn extends EditRecord
{
    protected static string $resource = WhatsOnResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
