<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver as GdDriver;
use Intervention\Image\Drivers\Imagick\Driver as ImagickDriver;
use Intervention\Image\ImageManager;

class ImageOptimizerService
{
    protected ?ImageManager $manager = null;

    public function __construct()
    {
        if (extension_loaded('gd')) {
            $this->manager = new ImageManager(new GdDriver());
        } elseif (extension_loaded('imagick')) {
            $this->manager = new ImageManager(new ImagickDriver());
        }
    }

    /**
     * Optimize and crop tenant photo to 4:3 (800x600) WebP with 82% quality.
     */
    public function optimizeTenantPhoto(UploadedFile|string $file, ?string $customFilename = null): string
    {
        return $this->processAndStore(
            file: $file,
            directory: 'tenants',
            targetWidth: 800,
            targetHeight: 600,
            quality: 82,
            customFilename: $customFilename
        );
    }

    /**
     * Optimize and crop What's On banner to 16:9 (1600x900) WebP with 80% quality.
     */
    public function optimizeWhatsOnBanner(UploadedFile|string $file, ?string $customFilename = null): string
    {
        return $this->processAndStore(
            file: $file,
            directory: 'whats-on',
            targetWidth: 1600,
            targetHeight: 900,
            quality: 80,
            customFilename: $customFilename
        );
    }

    /**
     * Core processing method.
     */
    public function processAndStore(
        UploadedFile|string $file,
        string $directory,
        int $targetWidth,
        int $targetHeight,
        int $quality = 80,
        ?string $customFilename = null
    ): string {
        $name = $customFilename ?: Str::random(32);
        $relativePath = trim($directory, '/') . '/' . $name . '.webp';
        $disk = Storage::disk('public');

        // Ensure storage directory exists
        if (!$disk->exists($directory)) {
            $disk->makeDirectory($directory);
        }

        $sourceContent = $file instanceof UploadedFile
            ? file_get_contents($file->getRealPath())
            : (file_exists($file) ? file_get_contents($file) : $file);

        if ($this->manager !== null) {
            try {
                // Read image into intervention
                $image = $this->manager->read($sourceContent);

                // Center crop to aspect ratio and size
                $image->cover($targetWidth, $targetHeight);

                // Convert to WebP format, automatically stripping EXIF
                $encoded = $image->toWebp($quality);

                $disk->put($relativePath, (string) $encoded);

                return $relativePath;
            } catch (\Throwable $e) {
                Log::warning("ImageOptimizerService intervention processing failed: " . $e->getMessage() . ". Falling back to direct save.");
            }
        } else {
            Log::info("No GD or Imagick extension available. Storing file directly.");
        }

        // Fallback: store raw content directly
        $extension = $file instanceof UploadedFile ? ($file->getClientOriginalExtension() ?: 'jpg') : 'jpg';
        $fallbackPath = trim($directory, '/') . '/' . $name . '.' . $extension;
        $disk->put($fallbackPath, $sourceContent);

        return $fallbackPath;
    }
}
