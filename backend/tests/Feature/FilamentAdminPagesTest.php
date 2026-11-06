<?php

namespace Tests\Feature;

use App\Filament\Resources\ContactMessages\Pages\ListContactMessages;
use App\Filament\Resources\Tenants\Pages\ListTenants;
use App\Filament\Resources\WhatsOns\Pages\ListWhatsOns;
use App\Models\User;
use Filament\Schemas\Schema;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FilamentAdminPagesTest extends TestCase
{
    use RefreshDatabase;

    protected User $adminUser;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
        $this->adminUser = User::factory()->create();
    }

    public function test_admin_dashboard_renders_successfully(): void
    {
        $response = $this->actingAs($this->adminUser)->get('/admin');
        $response->assertStatus(200);
    }

    public function test_all_six_public_aligned_admin_pages_render_successfully(): void
    {
        $routes = [
            '/admin/manage-home-page',
            '/admin/tenants',
            '/admin/whats-ons',
            '/admin/manage-panduan-page',
            '/admin/contact-messages',
            '/admin/manage-identity-legal-page',
        ];

        foreach ($routes as $route) {
            $response = $this->actingAs($this->adminUser)->get($route);
            $response->assertStatus(200, "Failed to load route: {$route}");
        }
    }

    public function test_contact_messages_header_action_schema_loads_without_errors(): void
    {
        $page = new ListContactMessages;
        $refMethod = new \ReflectionMethod($page, 'getHeaderActions');
        $refMethod->setAccessible(true);
        $actions = $refMethod->invoke($page);

        $this->assertNotEmpty($actions);
        $contactAction = $actions[0];
        $this->assertEquals('contactInfoAndSeo', $contactAction->getName());

        $schema = $contactAction->getSchema(Schema::make($page));
        $this->assertNotNull($schema, 'Modal schema should not be null');
    }

    public function test_tenants_header_action_schema_loads_without_errors(): void
    {
        $page = new ListTenants;
        $refMethod = new \ReflectionMethod($page, 'getHeaderActions');
        $refMethod->setAccessible(true);
        $actions = $refMethod->invoke($page);

        $this->assertNotEmpty($actions);
        $actionNames = array_map(fn ($a) => $a->getName(), $actions);
        $this->assertContains('headerAndSeo', $actionNames);
    }

    public function test_whats_ons_header_action_schema_loads_without_errors(): void
    {
        $page = new ListWhatsOns;
        $refMethod = new \ReflectionMethod($page, 'getHeaderActions');
        $refMethod->setAccessible(true);
        $actions = $refMethod->invoke($page);

        $this->assertNotEmpty($actions);
        $actionNames = array_map(fn ($a) => $a->getName(), $actions);
        $this->assertContains('headerCalloutSeo', $actionNames);
    }
}
