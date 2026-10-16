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
        // 1. Access Routes
        Schema::create('access_routes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('distance')->nullable();
            $table->text('description');
            $table->integer('order_index')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 2. Shopping Tips
        Schema::create('shopping_tips', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->integer('order_index')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 3. Building Rules
        Schema::create('building_rules', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->integer('order_index')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 4. Nav Items
        Schema::create('nav_items', function (Blueprint $table) {
            $table->id();
            $table->string('label');
            $table->string('path');
            $table->string('location')->default('header'); // header | footer
            $table->boolean('is_external')->default(false);
            $table->boolean('is_cta')->default(false);
            $table->integer('order_index')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nav_items');
        Schema::dropIfExists('building_rules');
        Schema::dropIfExists('shopping_tips');
        Schema::dropIfExists('access_routes');
    }
};
