<?php

namespace App\Filament\Resources\BuildingRules\Pages;

use App\Filament\Resources\BuildingRules\BuildingRuleResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditBuildingRule extends EditRecord
{
    protected static string $resource = BuildingRuleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
