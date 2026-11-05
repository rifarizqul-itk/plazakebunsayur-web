<?php

namespace Tests\Unit;

use App\Services\ImageOptimizerService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ImageOptimizerServiceTest extends TestCase
{
    public function test_optimize_general_image_creates_webp(): void
    {
        if (!extension_loaded('gd') && !extension_loaded('imagick')) {
            $this->markTestSkipped('GD or Imagick extension not installed.');
        }

        Storage::fake('public');

        $optimizer = new ImageOptimizerService();

        // Create a fake image 2400x1600 (exceeding maxWidth 1920)
        $file = UploadedFile::fake()->image('building_highres.jpg', 2400, 1600);

        $storedPath = $optimizer->optimizeGeneralImage($file, 'page-contents', 1920, 80);

        $this->assertStringEndsWith('.webp', $storedPath);
        Storage::disk('public')->assertExists($storedPath);
    }

    public function test_optimize_tenant_photo_creates_webp(): void
    {
        if (!extension_loaded('gd') && !extension_loaded('imagick')) {
            $this->markTestSkipped('GD or Imagick extension not installed.');
        }

        Storage::fake('public');

        $optimizer = new ImageOptimizerService();

        $file = UploadedFile::fake()->image('kiosk_photo.png', 1200, 900);

        $storedPath = $optimizer->optimizeTenantPhoto($file);

        $this->assertStringEndsWith('.webp', $storedPath);
        Storage::disk('public')->assertExists($storedPath);
    }
}
