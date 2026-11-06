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

    public function test_serves_all_milestone_1_cms_keys(): void
    {
        $response = $this->getJson('/api/page-contents');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ]);

        $data = $response->json('data');

        // Brand
        $this->assertEquals('PLAZA KEBUN SAYUR', $data['brand.name']);
        $this->assertEquals('Balikpapan Barat', $data['brand.sub_location']);

        // Hero Building Tag & CTA
        $this->assertEquals('Fasad Utama Gedung', $data['home.hero.building_tag']);
        $this->assertEquals('Pelajari Panduan Kunjungan', $data['home.hero.building_cta']);

        // Hero Slides
        $this->assertEquals('Sentra Batu Mulia Borneo', $data['home.hero.slide.batu_mulia.tag']);
        $this->assertEquals('Koleksi Akik, Permata & Cangkang Perak', $data['home.hero.slide.batu_mulia.title']);
        $this->assertEquals('Cinderamata & Etnik Dayak', $data['home.hero.slide.cinderamata.tag']);
        $this->assertEquals('Sentra Fashion & Busana Kaltim', $data['home.hero.slide.fashion.tag']);
        $this->assertEquals('Suasana Kios Plaza Kebun Sayur', $data['home.hero.slide.suasana.tag']);

        // Quick Access & Action Cards
        $this->assertEquals('Apa Yang Ada Di Plaza Kebun Sayur?', $data['home.quick_access.title']);
        $this->assertEquals('KIOS BELANJA', $data['home.action.belanja.category']);
        $this->assertEquals('Batu Mulia, Perhiasan & Cinderamata', $data['home.action.belanja.title']);
        $this->assertEquals('SENTRA FASHION', $data['home.action.fashion.category']);
        $this->assertEquals('INFORMASI GEDUNG', $data['home.action.panduan.category']);

        // Promos & Oleh-Oleh
        $this->assertEquals('Promo Saat Ini', $data['home.promos.title']);
        $this->assertEquals('Penawaran Spesial Kios & Gedung', $data['home.promos.eyebrow']);
        $this->assertEquals('Lihat semua promo & informasi', $data['home.promos.cta_label']);
        $this->assertEquals('Kios Belanja Pilihan', $data['home.oleh_oleh.title']);
        $this->assertEquals('Batik, Busana Adat & Kerajinan Khas', $data['home.oleh_oleh.eyebrow']);
        $this->assertEquals('Lihat semua kios belanja & oleh-oleh', $data['home.oleh_oleh.cta_label']);

        // Events / Informasi Beranda
        $this->assertEquals('Events', $data['home.events.title']);

        // History
        $this->assertEquals('Aktivitas perdagangan langsung dengan para pengrajin dan pedagang lokal menjadikan kawasan ini tujuan belanja cinderamata di Balikpapan.', $data['home.history.p3']);
        $this->assertEquals('Pelajari Panduan Kunjungan Gedung', $data['home.history.cta_label']);

        // Panduan
        $this->assertEquals('Waktu Operasional & Lokasi Mall', $data['panduan.hours_title']);
        $this->assertEquals('Alamat & Titik Temu', $data['panduan.location_title']);
        $this->assertEquals('Fasilitas Gedung Plaza', $data['panduan.facilities_title']);
        $this->assertEquals('Akses Transportasi Menuju Lokasi', $data['panduan.routes_title']);
        $this->assertEquals('Tips Berbelanja Cerdas', $data['panduan.tips_title']);
        $this->assertEquals('Tata Tertib & Keamanan', $data['panduan.rules_title']);

        // Event Callout
        $this->assertEquals('Ingin Menggelar Event di Bunsay?', $data['event.callout.title']);
        $this->assertEquals('Hubungi Manajemen Pengelola →', $data['event.callout.cta_label']);

        // Contact
        $this->assertEquals('Kantor Pengelola', $data['contact.office_eyebrow']);
        $this->assertEquals('Informasi Kontak Resmi', $data['contact.office_title']);
        $this->assertEquals('Kirim Pesan atau Pertanyaan', $data['contact.form_title']);

        // System 404
        $this->assertEquals('Halaman Tidak Ditemukan', $data['not_found.title']);
        $this->assertEquals('Kembali ke Beranda', $data['not_found.cta_home']);
        $this->assertEquals('Direktori Belanja', $data['not_found.cta_directory']);
    }

    public function test_updates_to_new_keys_reflect_in_api(): void
    {
        $brandItem = PageContent::where('key', 'brand.name')->first();
        $brandItem->update(['value' => 'PLAZA KEBUN SAYUR NEW']);

        $tipItem = PageContent::where('key', 'panduan.hours_tip')->first();
        $tipItem->update(['value' => 'Datanglah sebelum pukul 15.00 WITA.']);

        $calloutItem = PageContent::where('key', 'event.callout.title')->first();
        $calloutItem->update(['value' => 'Ingin Pameran di Atrium?']);

        $response = $this->getJson('/api/page-contents');

        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertEquals('PLAZA KEBUN SAYUR NEW', $data['brand.name']);
        $this->assertEquals('Datanglah sebelum pukul 15.00 WITA.', $data['panduan.hours_tip']);
        $this->assertEquals('Ingin Pameran di Atrium?', $data['event.callout.title']);
    }
}
