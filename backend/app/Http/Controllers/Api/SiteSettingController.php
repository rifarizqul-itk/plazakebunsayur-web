<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;

class SiteSettingController extends Controller
{
    /**
     * Return all public site settings as key-value dictionary
     */
    public function index(): JsonResponse
    {
        $settings = SiteSetting::getAllSettings();

        return response()->json([
            'success' => true,
            'data' => $settings,
        ]);
    }
}
