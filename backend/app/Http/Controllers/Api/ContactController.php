<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        // 1. Honeypot check for spam bots
        if ($request->filled('bot_check')) {
            // Silently acknowledge without saving
            return response()->json([
                'success' => true,
                'message' => 'Pesan Anda berhasil dikirim. Tim pengelola akan segera menghubungi Anda.',
            ], 201);
        }

        // 2. Validate input fields
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone_number' => 'required|string|max:50',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:3000',
        ]);

        $validated['status'] = 'unread';

        $message = ContactMessage::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Pesan Anda berhasil dikirim. Tim pengelola akan segera menghubungi Anda.',
            'data' => [
                'id' => $message->id,
            ],
        ], 201);
    }
}
