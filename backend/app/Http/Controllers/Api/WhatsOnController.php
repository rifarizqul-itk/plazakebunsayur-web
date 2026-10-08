<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WhatsOn;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WhatsOnController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = WhatsOn::where('is_active', true);

        if ($request->filled('type')) {
            $query->where('type', $request->query('type'));
        }

        $whatsOn = $query->orderBy('start_date', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $whatsOn,
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $item = WhatsOn::where('slug', $slug)
            ->where('is_active', true)
            ->first();

        if (! $item) {
            return response()->json([
                'success' => false,
                'message' => 'Agenda tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $item,
        ]);
    }
}
