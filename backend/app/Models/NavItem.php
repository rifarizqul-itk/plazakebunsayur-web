<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class NavItem extends Model
{
    use HasFactory;

    protected $table = 'nav_items';

    protected $guarded = [];

    protected $casts = [
        'is_external' => 'boolean',
        'is_cta' => 'boolean',
        'is_active' => 'boolean',
        'order_index' => 'integer',
    ];

    protected static function booted(): void
    {
        static::saved(fn () => Cache::forget('api_nav_items'));
        static::deleted(fn () => Cache::forget('api_nav_items'));
    }
}
