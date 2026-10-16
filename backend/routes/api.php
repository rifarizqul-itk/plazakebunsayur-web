<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\FacilityController;
use App\Http\Controllers\Api\LegalPageController;
use App\Http\Controllers\Api\NavItemController;
use App\Http\Controllers\Api\PageContentController;
use App\Http\Controllers\Api\SiteSettingController;
use App\Http\Controllers\Api\TenantController;
use App\Http\Controllers\Api\VisitGuideController;
use App\Http\Controllers\Api\WhatsOnController;
use App\Models\Floor;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public API Routes for Plaza Kebun Sayur Web
|--------------------------------------------------------------------------
*/

// 1. Categories (supports ?type=retail|culinary)
Route::get('/categories', [CategoryController::class, 'index']);

// 2. Floors
Route::get('/floors', function () {
    $floors = Floor::withCount(['tenants' => function ($q) {
        $q->where('is_active', true);
    }])
    ->orderBy('order_index')
    ->get();

    return response()->json([
        'success' => true,
        'data' => $floors,
    ]);
});

// 3. Tenants (supports ?type=, ?category_id=, ?floor_id=, ?q=, pagination ?page=&per_page=12)
Route::get('/tenants', [TenantController::class, 'index']);

// 4. Single Tenant Detail by Slug
Route::get('/tenants/{slug}', [TenantController::class, 'show']);

// 5. Facilities
Route::get('/facilities', [FacilityController::class, 'index']);

// 6. Whats On (Events & Promos)
Route::get('/whats-on', [WhatsOnController::class, 'index']);
Route::get('/whats-on/{slug}', [WhatsOnController::class, 'show']);

// 7. Public Contact Message Submission (Rate limit 5 requests per 10 minutes per IP)
Route::post('/contact', [ContactController::class, 'store'])
    ->middleware('throttle:5,10');

// 8. Site Settings (Operational metadata)
Route::get('/site-settings', [SiteSettingController::class, 'index']);

// 9. Page Contents (All CMS text & imagery)
Route::get('/page-contents', [PageContentController::class, 'index']);

// 10. Visit Guide (Access routes, shopping tips, building rules)
Route::get('/visit-guide', [VisitGuideController::class, 'index']);

// 11. Navigation Items (Header & Footer)
Route::get('/nav-items', [NavItemController::class, 'index']);

// 12. Legal Pages (Rich Text Legal Documents: kebijakan-privasi, syarat-ketentuan)
Route::get('/legal-pages/{slug}', [LegalPageController::class, 'show']);


