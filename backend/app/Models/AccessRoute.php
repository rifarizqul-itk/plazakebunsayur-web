<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class AccessRoute extends Model
{
    use HasFactory;

    protected $table = 'access_routes';

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
