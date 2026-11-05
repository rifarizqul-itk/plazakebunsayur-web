<?php

namespace Tests\Feature;

use App\Filament\Resources\Categories\CategoryResource;
use App\Filament\Resources\Facilities\FacilityResource;
use App\Models\Category;
use App\Models\Facility;
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CuratedIconResourcesTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_facility_resource_form_has_curated_searchable_icon_select(): void
    {
        $schema = FacilityResource::form(new Schema());
        $components = $schema->getComponents();

        /** @var Select|null $iconField */
        $iconField = collect($components)->first(fn ($c) => $c->getName() === 'icon_name');

        $this->assertNotNull($iconField, 'icon_name field should exist in FacilityResource form');
        $this->assertInstanceOf(Select::class, $iconField, 'icon_name should be a Select component');
        $this->assertTrue($iconField->isSearchable(), 'icon_name Select should be searchable');

        $options = $iconField->getOptions();
        $expectedIcons = [
            'Moon',
            'Users',
            'CreditCard',
            'Car',
            'ShieldCheck',
            'Building2',
            'Wifi',
            'Accessibility',
            'Baby',
            'Utensils',
            'ShoppingBag',
            'Sparkles',
            'Info',
            'HeartPulse',
            'MapPin',
        ];

        foreach ($expectedIcons as $icon) {
            $this->assertArrayHasKey($icon, $options, "Facility icon options should contain {$icon}");
            $this->assertNotEmpty($options[$icon], "Facility icon {$icon} should have a descriptive label");
        }
    }

    public function test_category_resource_form_has_curated_searchable_icon_select(): void
    {
        $schema = CategoryResource::form(new Schema());
        $components = $schema->getComponents();

        /** @var Select|null $iconField */
        $iconField = collect($components)->first(fn ($c) => $c->getName() === 'icon_name');

        $this->assertNotNull($iconField, 'icon_name field should exist in CategoryResource form');
        $this->assertInstanceOf(Select::class, $iconField, 'icon_name should be a Select component');
        $this->assertTrue($iconField->isSearchable(), 'icon_name Select should be searchable');

        $options = $iconField->getOptions();
        $expectedIcons = [
            'Gem',
            'Sparkles',
            'ShoppingBag',
            'PackageOpen',
            'Package',
            'Shirt',
            'Crown',
            'Scissors',
            'Watch',
            'Gift',
            'Palette',
            'Store',
            'UtensilsCrossed',
        ];

        foreach ($expectedIcons as $icon) {
            $this->assertArrayHasKey($icon, $options, "Category icon options should contain {$icon}");
            $this->assertNotEmpty($options[$icon], "Category icon {$icon} should have a descriptive label");
        }
    }

    public function test_api_facilities_returns_curated_icon_names(): void
    {
        $response = $this->getJson('/api/facilities');

        $response->assertStatus(200)
            ->assertJson(['success' => true]);

        $data = $response->json('data');
        $this->assertNotEmpty($data);

        foreach ($data as $facility) {
            $this->assertArrayHasKey('icon_name', $facility);
            $this->assertNotNull($facility['icon_name']);
        }

        $icons = collect($data)->pluck('icon_name')->all();
        $this->assertContains('Moon', $icons);
        $this->assertContains('Users', $icons);
        $this->assertContains('CreditCard', $icons);
        $this->assertContains('Car', $icons);
        $this->assertContains('ShieldCheck', $icons);
    }

    public function test_api_categories_returns_icon_names(): void
    {
        $response = $this->getJson('/api/categories?type=retail');

        $response->assertStatus(200)
            ->assertJson(['success' => true]);

        $data = $response->json('data');
        $this->assertNotEmpty($data);

        $icons = collect($data)->pluck('icon_name')->filter()->values()->all();
        $this->assertNotEmpty($icons);
        $this->assertContains('Sparkles', $icons);
        $this->assertContains('ShoppingBag', $icons);
    }

    public function test_can_save_curated_icons_on_facility_and_category(): void
    {
        $facility = Facility::create([
            'name' => 'Pusat Informasi & Bantuan',
            'icon_name' => 'Info',
            'location_note' => 'Lantai Dasar Lobby Utama',
            'description' => 'Layanan informasi pengunjung mall.',
            'order_index' => 10,
            'is_active' => true,
        ]);

        $this->assertEquals('Info', $facility->fresh()->icon_name);

        $category = Category::create([
            'name' => 'Galeri Seni & Lukisan',
            'slug' => 'galeri-seni-dan-lukisan',
            'type' => 'retail',
            'icon_name' => 'Palette',
            'order_index' => 20,
        ]);

        $this->assertEquals('Palette', $category->fresh()->icon_name);
    }
}
