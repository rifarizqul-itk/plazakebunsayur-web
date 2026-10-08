<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Category::query();

        if ($request->filled('type')) {
            $query->where('type', $request->query('type'));
        }

        $categories = $query->withCount(['tenants' => function ($q) {
            $q->where('is_active', true);
        }])
        ->orderBy('order_index')
        ->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }
}
