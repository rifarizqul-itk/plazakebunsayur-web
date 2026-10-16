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
}
