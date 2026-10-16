<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    use HasFactory;

    protected $table = 'site_settings';

    protected $guarded = [];

    /**
     * Get all settings as key-value array with default fallbacks
     */
    public static function getAllSettings(): array
    {
        $defaults = [
            'mall_opening_hours' => 'Setiap Hari 08.00 - 18.00 WITA',
            'management_whatsapp' => '080000000000',
            'security_phone' => '(0542) 734567',
            'office_address' => 'Lantai Dasar (Pintu Timur), Jl. Letjen Suprapto, Kebun Sayur, Balikpapan Barat 76131',
            'management_email' => 'pengelola@plazakebunsayur.com',
            'maps_url' => 'https://maps.google.com/?q=Plaza+Kebun+Sayur+Balikpapan',
        ];

        $saved = static::pluck('value', 'key')->toArray();

        return array_merge($defaults, $saved);
    }

    /**
     * Set a setting value
     */
    public static function set(string $key, ?string $value): self
    {
        return static::updateOrCreate(
            ['key' => $key],
            ['value' => $value]
        );
    }
}
