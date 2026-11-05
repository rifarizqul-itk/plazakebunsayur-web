<?php

namespace App\Models;

use App\Support\PageContentDefaults;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class PageContent extends Model
{
    use HasFactory;

    protected $table = 'page_contents';

    protected $guarded = [];

    public function setValueAttribute($value): void
    {
        $this->attributes['value'] = is_array($value)
            ? json_encode(array_values($value))
            : $value;
    }

    public function getValueAttribute($value)
    {
        if ($this->type === 'images' && is_string($value)) {
            $decoded = json_decode($value, true);
            if (is_array($decoded)) {
                return $decoded;
            }
        }

        return $value;
    }

    protected static function booted(): void
    {
        static::saved(function () {
            Cache::forget('api_page_contents');
        });

        static::deleted(function () {
            Cache::forget('api_page_contents');
        });
    }

    /**
     * Complete list of all supported CMS keys with metadata & hardcoded defaults.
     */
    public static function defaults(): array
    {
        return PageContentDefaults::all();
    }

    /**
     * Get all page contents resolved with defaults and asset URLs.
     */
    public static function getResolvedContents(): array
    {
        return Cache::remember('api_page_contents', 60, function () {
            $defaults = static::defaults();
            $records = static::all()->keyBy('key');

            $result = [];
            foreach ($defaults as $key => $meta) {
                $record = $records->get($key);
                $raw = ($record && !is_null($record->value) && $record->value !== '')
                    ? $record->value
                    : $meta['default'];

                $result[$key] = static::resolveContentValue($raw, $meta['type']);
            }

            return $result;
        });
    }

    protected static function resolveContentValue(mixed $value, string $type): mixed
    {
        if ($type === 'image') {
            return static::resolveImageUrl($value);
        }

        if ($type === 'images') {
            return static::resolveImagesUrl($value);
        }

        return $value;
    }

    protected static function resolveImageUrl(mixed $value): mixed
    {
        if (!is_string($value)) {
            return $value;
        }

        if ($value === '') {
            return $value;
        }

        if (static::isDirectUrl($value)) {
            return $value;
        }

        return Storage::disk('public')->url($value);
    }

    protected static function isDirectUrl(string $path): bool
    {
        if (str_starts_with($path, 'http')) {
            return true;
        }

        return str_starts_with($path, '/assets');
    }

    protected static function resolveImagesUrl(mixed $value): mixed
    {
        if (empty($value)) {
            return $value;
        }

        $decoded = is_array($value) ? $value : json_decode((string) $value, true);
        if (!is_array($decoded)) {
            return $value;
        }

        return array_values(array_map(
            fn ($img) => static::resolveImageUrl($img),
            $decoded
        ));
    }
}
