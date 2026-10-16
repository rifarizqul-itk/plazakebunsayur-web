<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('whats_on', function (Blueprint $table) {
            $table->string('time')->nullable()->after('end_date');
            $table->string('location')->nullable()->after('time');
            $table->string('admission')->nullable()->after('location');
            $table->json('highlights')->nullable()->after('content');
        });
    }

    public function down(): void
    {
        Schema::table('whats_on', function (Blueprint $table) {
            $table->dropColumn(['time', 'location', 'admission', 'highlights']);
        });
    }
};
