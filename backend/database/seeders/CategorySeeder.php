<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $filePath = __DIR__ . '/data/categories.json';
        if (!file_exists($filePath)) {
            return;
        }

        $items = json_decode((string) file_get_contents($filePath), true);
        if (!is_array($items)) {
            return;
        }

        foreach ($items as $cat) {
            Category::create($cat);
        }
    }
}
