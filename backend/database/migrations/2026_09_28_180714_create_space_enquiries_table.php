<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('space_enquiries', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('company_name')->nullable();
            $table->string('phone_number');
            $table->string('email')->nullable();
            $table->enum('enquiry_type', ['leasing_kios', 'exhibition', 'open_counter', 'other'])->default('leasing_kios');
            $table->string('preferred_floor')->nullable();
            $table->text('business_description')->nullable();
            $table->text('notes')->nullable();
            $table->enum('status', ['pending', 'contacted', 'closed'])->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('space_enquiries');
    }
};
