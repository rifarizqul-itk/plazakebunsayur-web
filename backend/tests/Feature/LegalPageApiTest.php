<?php

namespace Tests\Feature;

use App\Models\LegalPage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LegalPageApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_fetch_legal_page_by_slug(): void
    {
        LegalPage::create([
            'slug' => 'kebijakan-privasi',
            'title' => 'Kebijakan Privasi',
            'intro' => 'Ringkasan privasi',
            'body' => '<h2>1. Pendahuluan</h2><p>Teks kebijakan</p>',
            'updated_label' => '11 Oktober 2026',
        ]);

        $response = $this->getJson('/api/legal-pages/kebijakan-privasi');

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.slug', 'kebijakan-privasi')
            ->assertJsonPath('data.title', 'Kebijakan Privasi')
            ->assertJsonPath('data.updated_label', '11 Oktober 2026')
            ->assertJsonPath('data.body', '<h2>1. Pendahuluan</h2><p>Teks kebijakan</p>');
    }

    public function test_returns_404_for_unknown_legal_page(): void
    {
        $response = $this->getJson('/api/legal-pages/halaman-tidak-ada');

        $response->assertStatus(404)
            ->assertJsonPath('success', false);
    }

    public function test_xss_is_purified_from_legal_page_body(): void
    {
        $maliciousHtml = '<p>Paragraf aman <script>alert("hacked")</script><img src="x" onerror="evil()" /> dan <a href="javascript:alert(1)">tautan bahaya</a>.</p>';

        $page = LegalPage::create([
            'slug' => 'syarat-ketentuan',
            'title' => 'Syarat & Ketentuan',
            'body' => $maliciousHtml,
            'updated_label' => '11 Oktober 2026',
        ]);

        $this->assertStringNotContainsString('<script>', $page->body);
        $this->assertStringNotContainsString('alert("hacked")', $page->body);
        $this->assertStringNotContainsString('onerror', $page->body);
        $this->assertStringNotContainsString('javascript:', $page->body);
        $this->assertStringContainsString('Paragraf aman', $page->body);

        $response = $this->getJson('/api/legal-pages/syarat-ketentuan');
        $response->assertStatus(200);
        $response->assertDontSee('<script>', false);
        $response->assertDontSee('onerror', false);
    }
}
