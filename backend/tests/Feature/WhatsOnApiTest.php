<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WhatsOnApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_can_fetch_active_whats_on_list(): void
    {
        $response = $this->getJson('/api/whats-on');

        $response->assertStatus(200)
            ->assertJson(['success' => true]);

        $data = $response->json('data');
        $this->assertNotEmpty($data);
        $this->assertGreaterThanOrEqual(3, count($data));
    }

    public function test_whats_on_detail_includes_terms_and_contact_person(): void
    {
        $response = $this->getJson('/api/whats-on/festival-pesona-budaya-batu-mulia-2026');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'slug' => 'festival-pesona-budaya-batu-mulia-2026',
                    'contact_person' => 'Bpk. Syahril (Koordinator Acara)',
                    'contact_phone' => '081234567890',
                ],
            ]);

        $terms = $response->json('data.terms');
        $this->assertNotEmpty($terms);
        $this->assertStringContainsString('Terbuka untuk umum', $terms);
    }

    public function test_returns_404_for_unknown_whats_on_slug(): void
    {
        $response = $this->getJson('/api/whats-on/acara-tidak-ada-di-plaza');

        $response->assertStatus(404)
            ->assertJson(['success' => false]);
    }
}
