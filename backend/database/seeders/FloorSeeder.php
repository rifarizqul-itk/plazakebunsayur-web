<?php

namespace Database\Seeders;

use App\Models\Floor;
use Illuminate\Database\Seeder;

class FloorSeeder extends Seeder
{
    public function run(): void
    {
        Floor::create([
            'name' => 'Lantai Dasar (Ground Floor)',
            'code' => 'GF',
            'order_index' => 1,
        ]);

        Floor::create([
            'name' => 'Lantai 1',
            'code' => 'L1',
            'order_index' => 2,
        ]);

        Floor::create([
            'name' => 'Lantai 2',
            'code' => 'L2',
            'order_index' => 3,
        ]);
    }
}
