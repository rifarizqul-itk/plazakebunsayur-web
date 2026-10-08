<?php

$sqliteFile = sys_get_temp_dir() . '/pkbs_test_' . getmypid() . '.sqlite';
touch($sqliteFile);

putenv('APP_ENV=testing');
putenv('DB_CONNECTION=sqlite');
putenv('DB_DATABASE=' . $sqliteFile);
putenv('CACHE_STORE=array');
putenv('SESSION_DRIVER=array');
putenv('QUEUE_CONNECTION=sync');

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

Artisan::call('migrate:fresh', ['--force' => true]);
Artisan::call('db:seed', ['--force' => true]);

register_shutdown_function(function () use ($sqliteFile) {
    if (file_exists($sqliteFile)) {
        @unlink($sqliteFile);
    }
});

function testAssert($condition, $name) {
    if ($condition) {
        echo "✅ PASS: $name\n";
    } else {
        echo "❌ FAIL: $name\n";
        exit(1);
    }
}

// 1. Test GET /api/categories?type=retail
$req1 = Request::create('/api/categories?type=retail', 'GET');
$res1 = $app->handle($req1);
$json1 = json_decode($res1->getContent(), true);
testAssert($res1->getStatusCode() === 200, "Categories returns 200");
testAssert($json1['success'] === true, "Categories response success");
testAssert(count($json1['data']) > 0, "Retail categories count > 0");
foreach ($json1['data'] as $cat) {
    testAssert($cat['type'] === 'retail', "Category {$cat['name']} is retail");
}

// 2. Test GET /api/categories?type=culinary
$req2 = Request::create('/api/categories?type=culinary', 'GET');
$res2 = $app->handle($req2);
$json2 = json_decode($res2->getContent(), true);
testAssert($res2->getStatusCode() === 200, "Culinary categories returns 200");
testAssert(count($json2['data']) > 0, "Culinary categories count > 0");
foreach ($json2['data'] as $cat) {
    testAssert($cat['type'] === 'culinary', "Category {$cat['name']} is culinary");
}

// 3. Test GET /api/tenants with pagination & type=retail
$req3 = Request::create('/api/tenants?type=retail&per_page=5', 'GET');
$res3 = $app->handle($req3);
$json3 = json_decode($res3->getContent(), true);
testAssert($res3->getStatusCode() === 200, "Tenants returns 200");
testAssert(isset($json3['meta']), "Tenants meta pagination present");
testAssert($json3['meta']['per_page'] === 5, "Tenants per_page is 5");
testAssert(count($json3['data']) === 5, "Tenants item count is 5");
foreach ($json3['data'] as $tenant) {
    testAssert($tenant['category']['type'] === 'retail', "Tenant {$tenant['name']} is in retail category");
}

// 4. Test GET /api/tenants with type=culinary
$req4 = Request::create('/api/tenants?type=culinary&per_page=5', 'GET');
$res4 = $app->handle($req4);
$json4 = json_decode($res4->getContent(), true);
testAssert($res4->getStatusCode() === 200, "Culinary tenants returns 200");
foreach ($json4['data'] as $tenant) {
    testAssert($tenant['category']['type'] === 'culinary', "Tenant {$tenant['name']} is culinary");
}

// 5. Test GET /api/tenants/{slug}
$req5 = Request::create('/api/tenants/permata-borneo-gems', 'GET');
$res5 = $app->handle($req5);
$json5 = json_decode($res5->getContent(), true);
testAssert($res5->getStatusCode() === 200, "Single tenant returns 200");
testAssert($json5['data']['name'] === 'Permata Borneo Gems', "Single tenant name matches");
testAssert(isset($json5['data']['opening_time']), "Opening time is present");
testAssert(isset($json5['data']['closing_time']), "Closing time is present");

// 6. Test GET unknown slug returns 404
$req6 = Request::create('/api/tenants/kios-fiktif-tidak-ada', 'GET');
$res6 = $app->handle($req6);
testAssert($res6->getStatusCode() === 404, "Unknown tenant returns 404");

// 7. Test POST /api/contact valid
$req7 = Request::create('/api/contact', 'POST', [
    'full_name' => 'Wisatawan Balikpapan',
    'phone_number' => '081234567890',
    'email' => 'tamu@example.com',
    'subject' => 'Tanya Toko Batu',
    'message' => 'Apakah kios permata buka hari minggu?',
]);
$req7->headers->set('Accept', 'application/json');
$res7 = $app->handle($req7);
$json7 = json_decode($res7->getContent(), true);
testAssert($res7->getStatusCode() === 201, "Contact submission returns 201");
testAssert($json7['success'] === true, "Contact submission success");

// 8. Test POST /api/contact honeypot silently discards
$req8 = Request::create('/api/contact', 'POST', [
    'full_name' => 'Spam Bot',
    'phone_number' => '000',
    'subject' => 'Promo Spammer',
    'message' => 'Spam link',
    'bot_check' => 'I am a robot',
]);
$req8->headers->set('Accept', 'application/json');
$res8 = $app->handle($req8);
// 9. Test ImageOptimizerService
$optimizer = new App\Services\ImageOptimizerService();
$dummyContent = "GIF89a\x01\x00\x01\x00\x80\x00\x00\xff\xff\xff\x00\x00\x00!\xf9\x04\x01\x00\x00\x00\x00,\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02D\x01\x00;";
$path = $optimizer->optimizeTenantPhoto($dummyContent, 'test-kios-unit');
testAssert(str_contains($path, 'tenants/test-kios-unit'), "ImageOptimizer stores in tenants directory");
testAssert(Illuminate\Support\Facades\Storage::disk('public')->exists($path), "Stored image file exists on public disk");

// 10. Test site:trigger-rebuild command
$exitCode = Illuminate\Support\Facades\Artisan::call('site:trigger-rebuild');
testAssert($exitCode === 0, "site:trigger-rebuild artisan command succeeds");

echo "\n🎉 ALL BACKEND API TESTS PASSED SUCCESSFULLY!\n";
