<?php

namespace Database\Seeders;

use App\Models\PageContent;
use Illuminate\Database\Seeder;

class PageContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaults = PageContent::defaults();
        $order = 0;

        foreach ($defaults as $key => $meta) {
            $order++;
            $existing = PageContent::where('key', $key)->first();

            if (!$existing) {
                PageContent::create([
                    'key' => $key,
                    'value' => $meta['default'],
                    'type' => $meta['type'],
                    'group' => $meta['group'],
                    'label' => $meta['label'],
                    'help' => $meta['help'] ?? null,
                    'order_index' => $order,
                ]);
            } else {
                // Ensure metadata matches without overwriting admin's custom value
                $existing->update([
                    'type' => $meta['type'],
                    'group' => $meta['group'],
                    'label' => $meta['label'],
                    'help' => $meta['help'] ?? null,
                    'order_index' => $order,
                ]);
            }
        }
    }
}
