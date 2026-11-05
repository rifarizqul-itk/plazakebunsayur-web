<?php

namespace Tests\Feature;

use App\Models\SiteSetting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SiteSettingApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_can_fetch_site_settings(): void
    {
        $response = $this->getJson('/api/site-settings');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'mall_opening_hours' => 'Setiap Hari 08.00 - 18.00 WITA',
                    'management_whatsapp' => '080000000000',
                    'security_phone' => '(0542) 734567',
                    'management_email' => 'pengelola@plazakebunsayur.com',
                    'maps_embed_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8924495252077!2d116.82160367496476!3d-1.234368035571572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x55155145b04a009%3A0xd023fb431afb2027!2sPlaza%20Kebun%20Sayur!5e0!3m2!1sen!2sid!4v1791731211789!5m2!1sen!2sid',
                ],
            ]);
    }

    public function test_site_setting_update_reflects_in_api(): void
    {
        SiteSetting::set('mall_opening_hours', '09.00 – 21.00 WITA');

        $response = $this->getJson('/api/site-settings');

        $response->assertStatus(200)
            ->assertJsonPath('data.mall_opening_hours', '09.00 – 21.00 WITA');
    }

    public function test_maps_embed_url_update_reflects_in_api(): void
    {
        $customEmbedUrl = 'https://www.google.com/maps/embed?pb=!custom_test_embed_url';
        SiteSetting::set('maps_embed_url', $customEmbedUrl);

        $response = $this->getJson('/api/site-settings');

        $response->assertStatus(200)
            ->assertJsonPath('data.maps_embed_url', $customEmbedUrl);
    }
}
