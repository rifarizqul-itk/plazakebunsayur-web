<?php

use App\Models\Category;
use App\Models\Facility;
use App\Models\Floor;
use App\Models\SpaceEnquiry;
use App\Models\Tenant;
use App\Models\WhatsOn;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public API Routes for Plaza Kebun Sayur
|--------------------------------------------------------------------------
*/

// 1. Categories
Route::get('/categories', function () {
    $categories = Category::withCount('tenants')
        ->orderBy('order_index')
        ->get();

    return response()->json([
        'success' => true,
        'data' => $categories,
    ]);
});

// 2. Floors
Route::get('/floors', function () {
    $floors = Floor::withCount('tenants')
        ->orderBy('order_index')
        ->get();

    return response()->json([
        'success' => true,
        'data' => $floors,
    ]);
});

// 3. Tenants (with search & filters)
Route::get('/tenants', function (Request $request) {
    $query = Tenant::with(['category', 'floor'])
        ->where('is_active', true);

    if ($request->filled('category_id')) {
        $query->where('category_id', $request->category_id);
    }

    if ($request->filled('category_slug')) {
        $query->whereHas('category', function ($q) use ($request) {
            $q->where('slug', $request->category_slug);
        });
    }

    if ($request->filled('floor_id')) {
        $query->where('floor_id', $request->floor_id);
    }

    if ($request->filled('q')) {
        $search = $request->q;
        $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('unit_number', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%");
        });
    }

    if ($request->boolean('featured')) {
        $query->where('is_featured', true);
    }

    $tenants = $query->orderBy('is_featured', 'desc')
        ->orderBy('name', 'asc')
        ->get();

    return response()->json([
        'success' => true,
        'count' => $tenants->count(),
        'data' => $tenants,
    ]);
});

// 4. Single Tenant Detail
Route::get('/tenants/{slug}', function ($slug) {
    $tenant = Tenant::with(['category', 'floor'])
        ->where('slug', $slug)
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
});

// 5. Facilities
Route::get('/facilities', function () {
    $facilities = Facility::where('is_active', true)
        ->orderBy('order_index')
        ->get();

    return response()->json([
        'success' => true,
        'data' => $facilities,
    ]);
});

// 6. Whats On (Events & Promos)
Route::get('/whats-on', function () {
    $whatsOn = WhatsOn::where('is_active', true)
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json([
        'success' => true,
        'data' => $whatsOn,
    ]);
});

// 7. Space Enquiry Submission (Public Form)
Route::post('/space-enquiry', function (Request $request) {
    $validated = $request->validate([
        'full_name' => 'required|string|max:255',
        'company_name' => 'nullable|string|max:255',
        'phone_number' => 'required|string|max:30',
        'email' => 'nullable|email|max:255',
        'enquiry_type' => 'required|in:leasing_kios,exhibition,open_counter,other',
        'preferred_floor' => 'nullable|string|max:50',
        'business_description' => 'nullable|string',
        'notes' => 'nullable|string',
    ]);

    $enquiry = SpaceEnquiry::create($validated);

    return response()->json([
        'success' => true,
        'message' => 'Permohonan sewa berhasil diajukan! Tim pengelola akan segera menghubungi Anda.',
        'data' => $enquiry,
    ], 201);
});
