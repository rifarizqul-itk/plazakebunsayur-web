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

        $this->applyFilters($query, $request);
        $this->applySorting($query, $request->query('sort', 'name_asc'));

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

    private function applyFilters($query, Request $request): void
    {
        if ($request->filled('type')) {
            $type = $request->query('type');
            $query->whereHas('category', fn ($q) => $q->where('type', $type));
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->query('category_id'));
        }

        if ($request->filled('category_slug')) {
            $slug = $request->query('category_slug');
            $query->whereHas('category', fn ($q) => $q->where('slug', $slug));
        }

        if ($request->filled('floor_id')) {
            $query->where('floor_id', $request->query('floor_id'));
        }

        if ($request->filled('q')) {
            $search = $request->query('q');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('unit_number', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }
    }

    private function applySorting($query, ?string $sort): void
    {
        switch ($sort) {
            case 'name_desc':
                $query->orderBy('name', 'desc');
                break;
            case 'floor':
                $query->orderBy(
                    \App\Models\Floor::select('order_index')
                        ->whereColumn('floors.id', 'tenants.floor_id')
                )->orderBy('name', 'asc');
                break;
            default:
                $query->orderBy('name', 'asc');
                break;
        }
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
