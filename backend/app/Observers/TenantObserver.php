<?php

namespace App\Observers;

use App\Models\Tenant;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TenantObserver
{
    /**
     * Trigger deploy webhook on hosting provider (Netlify, Vercel, Cloudflare Pages).
     */
    protected function triggerDeployHook(string $action, Tenant $tenant): void
    {
        $hookUrl = env('BUILD_HOOK_URL') ?: config('services.deploy_hook.url');
        if (! $hookUrl) {
            Log::info("Tenant {$tenant->slug} {$action}. BUILD_HOOK_URL not configured, skipping webhook.");
            return;
        }

        try {
            Http::timeout(3)->post($hookUrl, [
                'event' => "tenant_{$action}",
                'tenant_slug' => $tenant->slug,
                'tenant_name' => $tenant->name,
                'timestamp' => now()->toIso8601String(),
            ]);
            Log::info("Deploy webhook triggered successfully for tenant {$tenant->slug} ({$action}).");
        } catch (\Throwable $e) {
            Log::warning("Failed to trigger deploy webhook: " . $e->getMessage());
        }
    }

    public function saved(Tenant $tenant): void
    {
        $this->triggerDeployHook('saved', $tenant);
    }

    public function deleted(Tenant $tenant): void
    {
        $this->triggerDeployHook('deleted', $tenant);
    }
}
