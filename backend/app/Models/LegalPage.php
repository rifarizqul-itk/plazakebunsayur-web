<?php

namespace App\Models;

use HTMLPurifier;
use HTMLPurifier_Config;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class LegalPage extends Model
{
    use HasFactory;

    protected $table = 'legal_pages';

    protected $guarded = [];

    /**
     * Purify HTML to eliminate XSS vectors (scripts, bad attributes, malicious URLs).
     */
    public static function sanitizeHtml(?string $html): string
    {
        if (empty($html)) {
            return '';
        }

        $config = HTMLPurifier_Config::createDefault();
        $config->set('HTML.Allowed', 'h2,h3,h4,p,b,strong,i,em,u,a[href|target|rel],ul,ol,li,br,blockquote,span');
        $config->set('HTML.TargetBlank', true);
        $config->set('HTML.Nofollow', true);
        $config->set('URI.AllowedSchemes', ['http' => true, 'https' => true, 'mailto' => true, 'tel' => true]);
        $config->set('Cache.DefinitionImpl', null); // Disable serializer cache for reliability

        $purifier = new HTMLPurifier($config);

        return $purifier->purify($html);
    }

    /**
     * Mutator to sanitize body before saving to database.
     */
    public function setBodyAttribute(?string $value): void
    {
        $this->attributes['body'] = static::sanitizeHtml($value);
    }

    protected static function booted(): void
    {
        static::saved(function (LegalPage $page) {
            Cache::forget("legal_page_{$page->slug}");
            Cache::forget('api_legal_pages');
        });

        static::deleted(function (LegalPage $page) {
            Cache::forget("legal_page_{$page->slug}");
            Cache::forget('api_legal_pages');
        });
    }
}
