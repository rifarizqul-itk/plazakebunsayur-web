<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Floor;
use App\Models\Tenant;
use Illuminate\Database\Seeder;

class TenantSeeder extends Seeder
{
    public function run(): void
    {
        $filePath = __DIR__ . '/data/tenants.json';
        if (!file_exists($filePath)) {
            return;
        }

        $items = json_decode((string) file_get_contents($filePath), true);
        if (!is_array($items)) {
            return;
        }

        $floorMap = Floor::pluck('id', 'code')->toArray();
        $categoryMap = Category::pluck('id', 'slug')->toArray();

        foreach ($items as $data) {
            $floorCode = $data['floor_id'] ?? null;
            $catSlug = $data['category_id'] ?? null;

            $data['floor_id'] = $floorMap[$floorCode] ?? null;
            $data['category_id'] = $categoryMap[$catSlug] ?? null;

            Tenant::create($data);
        }
    }
}
