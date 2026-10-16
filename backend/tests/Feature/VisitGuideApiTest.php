<?php

namespace Tests\Feature;

use App\Models\AccessRoute;
use App\Models\BuildingRule;
use App\Models\ShoppingTip;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VisitGuideApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_fetch_visit_guide_data(): void
    {
        AccessRoute::create([
            'title' => 'Rute A',
            'distance' => '10 km',
            'description' => 'Deskripsi rute',
            'order_index' => 1,
            'is_active' => true,
        ]);

        ShoppingTip::create([
            'title' => 'Tips Belanja 1',
            'description' => 'Deskripsi tips',
            'order_index' => 1,
            'is_active' => true,
        ]);

        BuildingRule::create([
            'title' => 'Aturan 1',
            'description' => 'Deskripsi aturan',
            'order_index' => 1,
            'is_active' => true,
        ]);

        // Inactive items should not be returned
        BuildingRule::create([
            'title' => 'Aturan Non-aktif',
            'description' => 'Tidak boleh tampil',
            'order_index' => 2,
            'is_active' => false,
        ]);

        $response = $this->getJson('/api/visit-guide');

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonCount(1, 'data.access_routes')
            ->assertJsonCount(1, 'data.shopping_tips')
            ->assertJsonCount(1, 'data.building_rules')
            ->assertJsonPath('data.access_routes.0.title', 'Rute A')
            ->assertJsonPath('data.shopping_tips.0.title', 'Tips Belanja 1')
            ->assertJsonPath('data.building_rules.0.title', 'Aturan 1');
    }
}
