<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactApiTest extends TestCase
{
    use RefreshDatabase;
    public function test_can_submit_valid_contact_message(): void
    {
        $payload = [
            'full_name' => 'Budi Santoso',
            'phone_number' => '081234567890',
            'email' => 'budi@example.com',
            'subject' => 'Informasi Jam Operasional',
            'message' => 'Apakah toko buka saat tanggal merah libur nasional?',
        ];

        $response = $this->postJson('/api/contact', $payload);
        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);
    }

    public function test_rejects_missing_required_fields(): void
    {
        $payload = [
            'email' => 'budi@example.com',
        ];

        $response = $this->postJson('/api/contact', $payload);
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['full_name', 'phone_number', 'subject', 'message']);
    }

    public function test_honeypot_silently_discards_spam_bot(): void
    {
        $payload = [
            'full_name' => 'Spam Bot',
            'phone_number' => '000000',
            'subject' => 'Buy Crypto Now',
            'message' => 'Visit my spam site',
            'bot_check' => 'I am a robot',
        ];

        $response = $this->postJson('/api/contact', $payload);
        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);

        $this->assertDatabaseMissing('contact_messages', [
            'subject' => 'Buy Crypto Now',
        ]);
    }
}
