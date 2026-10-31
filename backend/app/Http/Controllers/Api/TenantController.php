<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TenantController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Tenant::with(['category', 'floor'])
            ->where('is_active', true);

        // Filter by Category Type (retail vs culinary)
        if ($request->filled('type')) {
            $type = $request->query('type');
            $query->whereHas('category', function ($q) use ($type) {
                $q->where('type', $type);
            });
        }

        // Filter by Category ID
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->query('category_id'));
        }

        // Filter by Category Slug
        if ($request->filled('category_slug')) {
            $slug = $request->query('category_slug');
            $query->whereHas('category', function ($q) use ($slug) {
                $q->where('slug', $slug);
            });
        }

        // Filter by Floor ID
        if ($request->filled('floor_id')) {
            $query->where('floor_id', $request->query('floor_id'));
        }

        // Search query
        if ($request->filled('q')) {
            $search = $request->query('q');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('unit_number', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Featured flag
        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        // Sorting options
        $sort = $request->query('sort', 'name_asc');

        if ($sort === 'name_desc') {
            $query->orderBy('name', 'desc');
        } elseif ($sort === 'floor') {
            $query->orderBy(
                \App\Models\Floor::select('order_index')
                    ->whereColumn('floors.id', 'tenants.floor_id')
            )->orderBy('name', 'asc');
        } else {
            // Default: name_asc (tetap prioritaskan featured jika diminta)
            $query->orderBy('name', 'asc');
        }

        $perPage = min((int) $request->query('per_page', 12), 500);

        $paginated = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $paginated->items(),
            'meta' => [
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
            ],
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $tenant = Tenant::with(['category', 'floor'])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->first();

        if (! $tenant) {
            return response()->json([
                'success' => false,
                'message' => 'Tenant tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $tenant,
        ]);
    }
}
