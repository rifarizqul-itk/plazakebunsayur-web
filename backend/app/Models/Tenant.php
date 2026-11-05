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
            return $this->resolveStorageUrl($this->image_path);
        }

        $firstImage = is_array($this->images) ? ($this->images[0] ?? null) : null;
        if ($firstImage) {
            return $this->resolveStorageUrl($firstImage);
        }

        return $this->banner_url ?? null;
    }

    public function getImageUrlsAttribute(): array
    {
        $urls = [];

        if (is_array($this->images)) {
            foreach ($this->images as $path) {
                $url = $this->resolveStorageUrl($path);
                if ($url) {
                    $urls[] = $url;
                }
            }
        }

        if (empty($urls) && $this->image_url) {
            $urls[] = $this->image_url;
        }

        return $urls;
    }

    protected function resolveStorageUrl(?string $path): ?string
    {
        if (empty($path)) {
            return null;
        }

        if (str_starts_with($path, 'http')) {
            return $path;
        }

        return Storage::disk('public')->url($path);
    }
}
