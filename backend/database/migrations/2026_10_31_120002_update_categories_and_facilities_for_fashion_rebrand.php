<?php

use App\Models\Category;
use App\Models\Facility;
use App\Models\NavItem;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Update culinary categories to fashion
        Category::where('type', 'culinary')->update([
            'type' => 'fashion',
        ]);

        // 2. Remove Food Court facility if present
        Facility::where('name', 'like', '%Food Court%')->delete();
        Facility::where('name', 'Food Court Kuliner Kaltim')->delete();

        // 3. Update legacy nav items
        NavItem::where('path', '/kuliner')->where('location', 'header')->update([
            'label' => 'FASHION',
            'path' => '/fashion',
        ]);

        NavItem::where('path', '/kuliner')->where('location', 'footer')->update([
            'label' => 'Sentra Fashion & Batik',
            'path' => '/fashion',
        ]);

        NavItem::where('path', '/agenda')->where('location', 'header')->update([
            'label' => 'INFORMASI',
            'path' => '/informasi',
        ]);

        NavItem::where('path', '/agenda')->where('location', 'footer')->update([
            'label' => 'Informasi & Promo Plaza',
            'path' => '/informasi',
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No down operation needed
    }
};
