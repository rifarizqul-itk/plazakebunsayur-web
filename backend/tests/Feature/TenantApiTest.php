<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TenantApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_can_fetch_categories_filtered_by_type(): void
    {
        $response = $this->getJson('/api/categories?type=retail');
        $response->assertStatus(200)
            ->assertJson(['success' => true]);

        $data = $response->json('data');
        $this->assertNotEmpty($data);
        foreach ($data as $cat) {
            $this->assertEquals('retail', $cat['type']);
        }
    }

    public function test_can_fetch_tenants_with_type_filter_and_pagination(): void
    {
        $response = $this->getJson('/api/tenants?type=retail&per_page=5');
        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data',
                'meta' => [
                    'current_page',
                    'last_page',
                    'per_page',
                    'total',
                ],
            ]);

        $this->assertEquals(5, $response->json('meta.per_page'));
    }

    public function test_can_fetch_single_tenant_by_slug(): void
    {
        $response = $this->getJson('/api/tenants/permata-borneo-gems');
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'slug' => 'permata-borneo-gems',
                    'name' => 'Permata Borneo Gems',
                ],
            ]);
    }

    public function test_can_fetch_categories_filtered_by_fashion_type(): void
    {
        $response = $this->getJson('/api/categories?type=fashion');
        $response->assertStatus(200)
            ->assertJson(['success' => true]);

        $data = $response->json('data');
        $this->assertNotEmpty($data);
        foreach ($data as $cat) {
            $this->assertEquals('fashion', $cat['type']);
        }
    }

    public function test_can_fetch_tenants_filtered_by_fashion_type(): void
    {
        $response = $this->getJson('/api/tenants?type=fashion&per_page=10');
        $response->assertStatus(200)
            ->assertJson(['success' => true]);

        $data = $response->json('data');
        $this->assertNotEmpty($data);
        foreach ($data as $tenant) {
            $this->assertEquals('fashion', $tenant['category']['type']);
        }
    }

    public function test_tenant_returns_image_urls_array_and_social_media(): void
    {
        $response = $this->getJson('/api/tenants/batik-ampiek-khas-balikpapan');
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'slug' => 'batik-ampiek-khas-balikpapan',
                    'tiktok' => '@batikampiek',
                    'website' => 'https://batikampiek.id',
                ],
            ]);

        $imageUrls = $response->json('data.image_urls');
        $this->assertIsArray($imageUrls);
        $this->assertGreaterThanOrEqual(2, count($imageUrls));
    }

    public function test_returns_404_for_unknown_tenant_slug(): void
    {
        $response = $this->getJson('/api/tenants/toko-tidak-ada-di-plaza');
        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
            ]);
    }
}
