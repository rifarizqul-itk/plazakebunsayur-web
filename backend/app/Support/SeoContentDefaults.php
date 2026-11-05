<?php

namespace App\Support;

class SeoContentDefaults
{
    /**
     * @return array<string, array<string, mixed>>
     */
    public static function all(): array
    {
        $filePath = __DIR__ . '/data/seo_content.json';
        if (!file_exists($filePath)) {
            return [];
        }

        $content = file_get_contents($filePath);
        if ($content === false) {
            return [];
        }

        $decoded = json_decode($content, true);
        return is_array($decoded) ? $decoded : [];
    }
}
