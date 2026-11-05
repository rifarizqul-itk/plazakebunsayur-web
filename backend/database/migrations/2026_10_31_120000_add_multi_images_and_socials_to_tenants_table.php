<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('tenants', function (Blueprint $table) {
            $table->json('images')->nullable()->after('image_path');
            $table->string('tiktok')->nullable()->after('instagram');
            $table->string('facebook')->nullable()->after('tiktok');
            $table->string('website')->nullable()->after('facebook');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tenants', function (Blueprint $table) {
            $table->dropColumn(['images', 'tiktok', 'facebook', 'website']);
        });
    }
};
