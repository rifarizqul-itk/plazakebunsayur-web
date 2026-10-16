<?php

namespace App\Filament\Resources\AccessRoutes\Pages;

use App\Filament\Resources\AccessRoutes\AccessRouteResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditAccessRoute extends EditRecord
{
    protected static string $resource = AccessRouteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
