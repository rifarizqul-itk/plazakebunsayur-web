<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LegalPage;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class LegalPageController extends Controller
{
    /**
     * Return single legal page by slug (e.g. kebijakan-privasi, syarat-ketentuan).
     */
    public function show(string $slug): JsonResponse
    {
        $page = Cache::remember("legal_page_{$slug}", 60, function () use ($slug) {
            return LegalPage::query()
                ->where('slug', $slug)
                ->first(['id', 'slug', 'title', 'intro', 'body', 'updated_label', 'updated_at']);
        });

        if (! $page) {
            return response()->json([
                'success' => false,
                'message' => 'Halaman hukum tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $page,
        ]);
    }
}
