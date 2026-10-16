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
        Schema::create('legal_pages', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique(); // kebijakan-privasi, syarat-ketentuan
            $table->string('title');
            $table->text('intro')->nullable();
            $table->longText('body');
            $table->string('updated_label')->default('11 Oktober 2026');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('legal_pages');
      }
};
