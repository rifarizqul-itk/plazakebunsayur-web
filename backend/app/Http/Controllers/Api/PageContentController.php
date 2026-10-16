<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PageContent;
use Illuminate\Http\JsonResponse;

class PageContentController extends Controller
{
    /**
     * Return all public page contents resolved with defaults and asset URLs
     */
    public function index(): JsonResponse
    {
        $contents = PageContent::getResolvedContents();

        return response()->json([
            'success' => true,
            'data' => $contents,
        ]);
    }
}
