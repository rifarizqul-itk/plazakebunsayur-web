<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Tenant extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'images' => 'array',
    ];

    protected $appends = [
        'image_url',
        'image_urls',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function floor(): BelongsTo
    {
        return $this->belongsTo(Floor::class);
    }

    public function getImageUrlAttribute(): ?string
    {
        if ($this->image_path) {
            return str_starts_with($this->image_path, 'http')
                ? $this->image_path
                : Storage::disk('public')->url($this->image_path);
        }

        if (!empty($this->images) && is_array($this->images) && count($this->images) > 0) {
            $first = $this->images[0];
            if ($first) {
                return str_starts_with($first, 'http')
                    ? $first
                    : Storage::disk('public')->url($first);
            }
        }

        return $this->banner_url ?? null;
    }

    public function getImageUrlsAttribute(): array
    {
        $urls = [];

        if (!empty($this->images) && is_array($this->images)) {
            foreach ($this->images as $path) {
                if ($path) {
                    $urls[] = str_starts_with($path, 'http')
                        ? $path
                        : Storage::disk('public')->url($path);
                }
            }
        }

        if (empty($urls) && $this->image_url) {
            $urls[] = $this->image_url;
        }

        return $urls;
    }
}
