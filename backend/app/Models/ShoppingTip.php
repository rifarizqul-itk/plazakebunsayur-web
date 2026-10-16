<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class ShoppingTip extends Model
{
    use HasFactory;

    protected $table = 'shopping_tips';

    protected $guarded = [];

    protected $casts = [
        'is_active' => 'boolean',
        'order_index' => 'integer',
    ];

    protected static function booted(): void
    {
        static::saved(fn () => Cache::forget('api_visit_guide'));
        static::deleted(fn () => Cache::forget('api_visit_guide'));
    }
}
