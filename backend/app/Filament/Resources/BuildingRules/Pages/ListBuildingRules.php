<?php

namespace App\Filament\Resources\BuildingRules\Pages;

use App\Filament\Resources\BuildingRules\BuildingRuleResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListBuildingRules extends ListRecords
{
    protected static string $resource = BuildingRuleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
