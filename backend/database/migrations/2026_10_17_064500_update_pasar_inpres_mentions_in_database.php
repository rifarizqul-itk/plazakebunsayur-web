<?php

use App\Models\LegalPage;
use App\Models\NavItem;
use App\Models\PageContent;
use App\Models\ShoppingTip;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Update page_contents from PageContent::defaults()
        $defaults = PageContent::defaults();
        foreach ($defaults as $key => $meta) {
            $record = PageContent::where('key', $key)->first();
            if ($record) {
                // If value still contains old mention of Pasar Inpres or Pasar
                if (
                    str_contains($record->value, 'Pasar Inpres') ||
                    str_contains($record->value, 'pedagang pasar') ||
                    str_contains($record->value, 'Promo Pasar')
                ) {
                    $record->value = $meta['default'];
                }
                $record->label = $meta['label'];
                $record->help = $meta['help'] ?? null;
                $record->save();
            }
        }

        // 2. Update legal_pages
        $privacyPage = LegalPage::where('slug', 'kebijakan-privasi')->first();
        if ($privacyPage) {
            $privacyPage->body = str_replace(
                'Pengelola Plaza Kebun Sayur (Pasar Inpres Kebun Sayur Balikpapan)',
                'Pengelola Plaza Kebun Sayur Balikpapan',
                $privacyPage->body
            );
            $privacyPage->save();
        }

        $termsPage = LegalPage::where('slug', 'syarat-ketentuan')->first();
        if ($termsPage) {
            $termsPage->body = str_replace(
                'Plaza Kebun Sayur (Pasar Inpres Kebun Sayur, Balikpapan Barat)',
                'Plaza Kebun Sayur, Balikpapan Barat',
                $termsPage->body
            );
            $termsPage->save();
        }

        // 3. Update shopping_tips
        $tip = ShoppingTip::where('title', 'Tawar-Menawar dengan Santun')->first();
        if ($tip) {
            $tip->description = 'Tradisi berniaga di Plaza Kebun Sayur mengedepankan keramahan dan kekeluargaan. Silakan berdiskusi dan menawar harga cinderamata secara wajar dengan para pedagang kios.';
            $tip->save();
        }

        // 4. Update nav_items
        $navItem = NavItem::where('path', '/agenda')->where('location', 'footer')->first();
        if ($navItem) {
            $navItem->label = 'Agenda & Promo Plaza';
            $navItem->save();
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No down migration needed for copy text sanitization
    }
};
