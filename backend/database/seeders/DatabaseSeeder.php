<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
            FloorSeeder::class,
            CategorySeeder::class,
            TenantSeeder::class,
            FacilitySeeder::class,
            WhatsOnSeeder::class,
            SiteSettingSeeder::class,
            LegalPageSeeder::class,
            VisitGuideSeeder::class,
            PageContentSeeder::class,
            NavItemSeeder::class,
        ]);
    }
}
