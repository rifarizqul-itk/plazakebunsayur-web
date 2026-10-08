<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tenants', function (Blueprint $table) {
            $table->time('opening_time')->nullable()->default('09:00:00')->after('opening_hours');
            $table->time('closing_time')->nullable()->default('20:00:00')->after('opening_time');
            $table->string('days_open', 100)->default('Setiap Hari (Senin - Minggu)')->after('closing_time');
            $table->string('image_path')->nullable()->after('days_open');
            $table->string('logo_path')->nullable()->after('image_path');
        });
    }

    public function down(): void
    {
        Schema::table('tenants', function (Blueprint $table) {
            $table->dropColumn([
                'opening_time',
                'closing_time',
                'days_open',
                'image_path',
                'logo_path',
            ]);
        });
    }
};
