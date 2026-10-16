<?php

namespace Tests\Feature;

use App\Models\NavItem;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NavItemApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_fetch_nav_items_grouped_and_ordered(): void
    {
        NavItem::create([
            'label' => 'BELANJA',
            'path' => '/belanja',
            'location' => 'header',
            'order_index' => 2,
            'is_active' => true,
        ]);

        NavItem::create([
            'label' => 'BERANDA',
            'path' => '/',
            'location' => 'header',
            'order_index' => 1,
            'is_active' => true,
        ]);

        NavItem::create([
            'label' => 'LINK NONAKTIF',
            'path' => '/hide',
            'location' => 'header',
            'order_index' => 3,
            'is_active' => false,
        ]);

        NavItem::create([
            'label' => 'Direktori Kios Belanja',
            'path' => '/belanja',
            'location' => 'footer',
            'order_index' => 1,
            'is_active' => true,
        ]);

        $response = $this->getJson('/api/nav-items');

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonCount(2, 'data.header')
            ->assertJsonCount(1, 'data.footer')
            ->assertJsonPath('data.header.0.label', 'BERANDA')
            ->assertJsonPath('data.header.1.label', 'BELANJA')
            ->assertJsonPath('data.footer.0.label', 'Direktori Kios Belanja');
    }
}
