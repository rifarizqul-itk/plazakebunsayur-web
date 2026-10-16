<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AccessRoute;
use App\Models\BuildingRule;
use App\Models\ShoppingTip;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class VisitGuideController extends Controller
{
    /**
     * Return all visit guide components (access routes, shopping tips, building rules).
     */
    public function index(): JsonResponse
    {
        $data = Cache::remember('api_visit_guide', 60, function () {
            return [
                'access_routes' => AccessRoute::query()
                    ->where('is_active', true)
                    ->orderBy('order_index')
                    ->get(['id', 'title', 'distance', 'description']),
                'shopping_tips' => ShoppingTip::query()
                    ->where('is_active', true)
                    ->orderBy('order_index')
                    ->get(['id', 'title', 'description']),
                'building_rules' => BuildingRule::query()
                    ->where('is_active', true)
                    ->orderBy('order_index')
                    ->get(['id', 'title', 'description']),
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }
}
