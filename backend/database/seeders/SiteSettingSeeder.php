<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            'mall_opening_hours' => 'Setiap Hari 08.00 - 18.00 WITA',
            'management_whatsapp' => '080000000000',
            'security_phone' => '(0542) 734567',
            'office_address' => 'Lantai Dasar (Pintu Timur), Jl. Letjen Suprapto, Kebun Sayur, Balikpapan Barat 76131',
            'management_email' => 'pengelola@plazakebunsayur.com',
            'maps_url' => 'https://maps.google.com/?q=Plaza+Kebun+Sayur+Balikpapan',
            'maps_embed_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8924495252077!2d116.82160367496476!3d-1.234368035571572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x55155145b04a009%3A0xd023fb431afb2027!2sPlaza%20Kebun%20Sayur!5e0!3m2!1sen!2sid!4v1791731211789!5m2!1sen!2sid',
        ];

        foreach ($settings as $key => $value) {
            SiteSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }
    }
}
