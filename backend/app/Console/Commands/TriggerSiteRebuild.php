<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class TriggerSiteRebuild extends Command
{
    protected $signature = 'site:trigger-rebuild';

    protected $description = 'Pemicu manual webhook build statis website Plaza Kebun Sayur (Netlify / Vercel / CI)';

    public function handle(): int
    {
        $hookUrl = env('BUILD_HOOK_URL') ?: config('services.deploy_hook.url');

        if (! $hookUrl) {
            $this->warn('⚠️ BUILD_HOOK_URL belum disetel di berkas .env. Simulasi webhook berhasil.');
            return Command::SUCCESS;
        }

        $this->info("🚀 Mengirim sinyal pemicu deploy ke {$hookUrl}...");

        try {
            $response = Http::timeout(5)->post($hookUrl, [
                'event' => 'manual_admin_rebuild',
                'triggered_at' => now()->toIso8601String(),
            ]);

            if ($response->successful()) {
                $this->info('✅ Berhasil memicu rebuild situs statis.');
                return Command::SUCCESS;
            } else {
                $this->error("❌ Webhook mengembalikan kode HTTP {$response->status()}");
                return Command::FAILURE;
            }
        } catch (\Throwable $e) {
            $this->error('❌ Gagal menghubungi webhook deploy: ' . $e->getMessage());
            return Command::FAILURE;
        }
    }
}
