<?php

namespace Tests\Feature;

use App\Models\PageContent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PageContentApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_can_fetch_page_contents(): void
    {
        $response = $this->getJson('/api/page-contents');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ]);

        $data = $response->json('data');
        $this->assertEquals('Pusat Cinderamata & Pesona Budaya Borneo', $data['home.hero.title']);
        $this->assertEquals('Kantor Pengelola', $data['footer.management_title']);
    }

    public function test_page_content_update_reflects_in_api(): void
    {
        $item = PageContent::where('key', 'home.hero.title')->first();
        $item->update(['value' => 'Pusat Kebudayaan Modern Borneo']);

        $response = $this->getJson('/api/page-contents');

        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertEquals('Pusat Kebudayaan Modern Borneo', $data['home.hero.title']);
    }

    public function test_image_path_resolves_to_storage_url(): void
    {
        $item = PageContent::where('key', 'brand.logo')->first();
        $item->update(['value' => 'page-contents/custom-logo.png']);

        $response = $this->getJson('/api/page-contents');

        $response->assertStatus(200);
        $data = $response->json('data');
        $url = $data['brand.logo'];
        $this->assertNotNull($url);
        $this->assertStringContainsString('/storage/page-contents/custom-logo.png', $url);
    }
}
