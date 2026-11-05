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
                $updates = [
                    'type' => $meta['type'],
                    'group' => $meta['group'],
                    'label' => $meta['label'],
                    'help' => $meta['help'] ?? null,
                    'order_index' => $order,
                ];

                // If value was untouched default containing old terminology, refresh to new default
                $existingStr = is_string($existing->value)
                    ? $existing->value
                    : (is_array($existing->value) ? json_encode($existing->value) : (string) $existing->value);

                if (
                    str_contains($existingStr, 'Sentra Kuliner') ||
                    str_contains($existingStr, 'kuliner tradisional') ||
                    str_contains($existingStr, 'Agenda Kegiatan') ||
                    str_contains($existingStr, 'Agenda & Pengumuman') ||
                    str_contains($existingStr, 'Agenda & Kegiatan') ||
                    str_contains($existingStr, 'stan kuliner khas') ||
                    $existingStr === 'Akses Cepat Direktori'
                ) {
                    $updates['value'] = $meta['default'];
                }

                $existing->update($updates);
            }
        }
    }
}
