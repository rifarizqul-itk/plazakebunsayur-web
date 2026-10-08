<?php

namespace App\Filament\Resources\WhatsOns\Pages;

use App\Filament\Resources\WhatsOns\WhatsOnResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListWhatsOns extends ListRecords
{
    protected static string $resource = WhatsOnResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
