<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NavItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class NavItemController extends Controller
{
    /**
     * Return public navigation items grouped by header and footer.
     */
    public function index(): JsonResponse
    {
        $data = Cache::remember('api_nav_items', 60, function () {
            $items = NavItem::query()
                ->where('is_active', true)
                ->orderBy('order_index')
                ->get(['id', 'label', 'path', 'location', 'is_external', 'is_cta', 'order_index']);

            return [
                'header' => $items->where('location', 'header')->values(),
                'footer' => $items->where('location', 'footer')->values(),
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }
}
