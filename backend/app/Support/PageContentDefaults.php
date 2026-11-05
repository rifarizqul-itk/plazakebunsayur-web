<?php

namespace App\Support;

class PageContentDefaults
{
    public static function all(): array
    {
        return array_merge(
            HomeContentDefaults::all(),
            PageSectionDefaults::all(),
            SeoContentDefaults::all(),
        );
    }
}
