<?php

namespace App\Filament\Resources\AccessRoutes\Pages;

use App\Filament\Resources\AccessRoutes\AccessRouteResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAccessRoutes extends ListRecords
{
    protected static string $resource = AccessRouteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
