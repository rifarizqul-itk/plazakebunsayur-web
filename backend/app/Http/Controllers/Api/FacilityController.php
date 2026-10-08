<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use Illuminate\Http\JsonResponse;

class FacilityController extends Controller
{
    public function index(): JsonResponse
    {
        $facilities = Facility::where('is_active', true)
            ->orderBy('order_index')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $facilities,
        ]);
    }
}
