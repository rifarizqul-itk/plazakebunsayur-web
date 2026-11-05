<?php

namespace Tests\Feature;

use App\Filament\Resources\AccessRoutes\AccessRouteResource;
use App\Filament\Resources\NavItems\NavItemResource;
use App\Filament\Resources\NavItems\Pages\ListNavItems;
use App\Filament\Resources\ShoppingTips\ShoppingTipResource;
use App\Models\AccessRoute;
use App\Models\NavItem;
use App\Models\ShoppingTip;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Table;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NavigationAndGuidesTest extends TestCase
{
    use RefreshDatabase;

    public function test_access_route_and_shopping_tip_resources_register_navigation(): void
    {
        $this->assertTrue(
            AccessRouteResource::shouldRegisterNavigation(),
            'AccessRouteResource should register in Filament navigation'
        );

        $this->assertTrue(
            ShoppingTipResource::shouldRegisterNavigation(),
            'ShoppingTipResource should register in Filament navigation'
        );
    }

    public function test_nav_item_resource_table_has_is_cta_column(): void
    {
        $livewire = new ListNavItems();
        $table = NavItemResource::table(new Table($livewire));

        $col = $table->getColumn('is_cta');

        $this->assertNotNull($col, 'is_cta column should exist in NavItemResource table');
        $this->assertInstanceOf(IconColumn::class, $col, 'is_cta column should be an IconColumn');
        $this->assertEquals('Tombol CTA', $col->getLabel(), 'is_cta column label should be Tombol CTA');
        $this->assertTrue($col->isSortable(), 'is_cta column should be sortable');
    }

    public function test_api_nav_items_correctly_exposes_is_cta(): void
    {
        NavItem::create([
            'label' => 'HUBUNGI KAMI',
            'path' => '/kontak',
            'location' => 'header',
            'is_cta' => true,
            'is_external' => false,
            'order_index' => 1,
            'is_active' => true,
        ]);

        NavItem::create([
            'label' => 'PANDUAN',
            'path' => '/panduan-kunjungan',
            'location' => 'header',
            'is_cta' => false,
            'is_external' => false,
            'order_index' => 2,
            'is_active' => true,
        ]);

        $response = $this->getJson('/api/nav-items');

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.header.0.label', 'HUBUNGI KAMI')
            ->assertJsonPath('data.header.0.is_cta', true)
            ->assertJsonPath('data.header.1.label', 'PANDUAN')
            ->assertJsonPath('data.header.1.is_cta', false);
    }

    public function test_api_visit_guide_returns_routes_and_tips_ordered(): void
    {
        AccessRoute::create([
            'title' => 'Rute Dua',
            'distance' => '5 km',
            'description' => 'Rute nomor 2',
            'order_index' => 2,
            'is_active' => true,
        ]);

        AccessRoute::create([
            'title' => 'Rute Satu',
            'distance' => '2 km',
            'description' => 'Rute nomor 1',
            'order_index' => 1,
            'is_active' => true,
        ]);

        AccessRoute::create([
            'title' => 'Rute Tersembunyi',
            'distance' => '0 km',
            'description' => 'Rute tidak aktif',
            'order_index' => 3,
            'is_active' => false,
        ]);

        ShoppingTip::create([
            'title' => 'Tips Dua',
            'description' => 'Deskripsi tips 2',
            'order_index' => 2,
            'is_active' => true,
        ]);

        ShoppingTip::create([
            'title' => 'Tips Satu',
            'description' => 'Deskripsi tips 1',
            'order_index' => 1,
            'is_active' => true,
        ]);

        ShoppingTip::create([
            'title' => 'Tips Non-aktif',
            'description' => 'Tidak boleh tampil',
            'order_index' => 3,
            'is_active' => false,
        ]);

        $response = $this->getJson('/api/visit-guide');

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonCount(2, 'data.access_routes')
            ->assertJsonCount(2, 'data.shopping_tips')
            ->assertJsonPath('data.access_routes.0.title', 'Rute Satu')
            ->assertJsonPath('data.access_routes.1.title', 'Rute Dua')
            ->assertJsonPath('data.shopping_tips.0.title', 'Tips Satu')
            ->assertJsonPath('data.shopping_tips.1.title', 'Tips Dua');
    }
}
