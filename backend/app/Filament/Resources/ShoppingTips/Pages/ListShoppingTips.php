<?php

namespace App\Filament\Resources\ShoppingTips\Pages;

use App\Filament\Resources\ShoppingTips\ShoppingTipResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListShoppingTips extends ListRecords
{
    protected static string $resource = ShoppingTipResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
