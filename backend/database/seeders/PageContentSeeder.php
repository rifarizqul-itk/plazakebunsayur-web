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
            $this->syncPageContent($key, $meta, $order);
        }
    }

    protected function syncPageContent(string $key, array $meta, int $order): void
    {
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
            return;
        }

        $updates = [
            'type' => $meta['type'],
            'group' => $meta['group'],
            'label' => $meta['label'],
            'help' => $meta['help'] ?? null,
            'order_index' => $order,
        ];

        if ($this->isLegacyDefaultValue($existing->value)) {
            $updates['value'] = $meta['default'];
        }

        $existing->update($updates);
    }

    protected function isLegacyDefaultValue(mixed $value): bool
    {
        $str = is_array($value) ? json_encode($value) : (string) $value;

        $legacyExactMatches = [
            'Akses Cepat Direktori',
            'Promo Minggu Ini / Bulan Ini',
            'Oleh-Oleh Khas & Cenderamata',
            'Informasi & Promo Terkini',
            'Informasi & Kegiatan Mendatang',
        ];

        if (in_array($str, $legacyExactMatches, true)) {
            return true;
        }

        $legacyKeywords = [
            'Sentra Kuliner',
            'kuliner tradisional',
            'Agenda Kegiatan',
            'Agenda & Pengumuman',
            'Agenda & Kegiatan',
            'stan kuliner khas',
        ];

        foreach ($legacyKeywords as $keyword) {
            if (str_contains($str, $keyword)) {
                return true;
            }
        }

        return false;
    }
}
