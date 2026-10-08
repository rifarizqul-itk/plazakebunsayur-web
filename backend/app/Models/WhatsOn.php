<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class WhatsOn extends Model
{
    use HasFactory;

    protected $table = 'whats_on';

    protected $guarded = [];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_active' => 'boolean',
    ];

    protected $appends = [
        'banner_url',
    ];

    public function getBannerUrlAttribute(): ?string
    {
        if ($this->banner_image_path) {
            return Storage::disk('public')->url($this->banner_image_path);
        }

        return $this->banner_image ?? null;
    }
}
