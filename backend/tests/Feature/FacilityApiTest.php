<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FacilityApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_can_fetch_active_facilities_without_food_court(): void
    {
        $response = $this->getJson('/api/facilities');

        $response->assertStatus(200)
            ->assertJson(['success' => true]);

        $data = $response->json('data');
        $this->assertCount(5, $data);

        $names = collect($data)->pluck('name')->all();
        $this->assertContains('Musala', $names);
        $this->assertContains('Toilet', $names);
        $this->assertContains('ATM Center', $names);
        $this->assertContains('Area Parkir', $names);
        $this->assertContains('Pos Keamanan', $names);

        $this->assertNotContains('Food Court Kuliner Kaltim', $names);
    }
}
