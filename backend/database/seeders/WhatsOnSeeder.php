<?php

namespace Database\Seeders;

use App\Models\WhatsOn;
use Illuminate\Database\Seeder;

class WhatsOnSeeder extends Seeder
{
    public function run(): void
    {
        $filePath = __DIR__ . '/data/whats_ons.json';
        if (!file_exists($filePath)) {
            return;
        }

        $items = json_decode((string) file_get_contents($filePath), true);
        if (!is_array($items)) {
            return;
        }

        foreach ($items as $item) {
            WhatsOn::create($item);
        }
    }
}
