<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Floor extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function tenants(): HasMany
    {
        return $this->hasMany(Tenant::class)->where('is_active', true);
    }
}
