<?php

namespace App\Filament\Resources\ShoppingTips\Pages;

use App\Filament\Resources\ShoppingTips\ShoppingTipResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditShoppingTip extends EditRecord
{
    protected static string $resource = ShoppingTipResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
