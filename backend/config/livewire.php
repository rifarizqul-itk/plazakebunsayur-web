<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Temporary File Uploads
    |--------------------------------------------------------------------------
    |
    | Livewire handles file uploads by storing them in a temporary directory
    | before the form is submitted. The rules array dictates the max size.
    | Default is 12MB (12288 KB). We increase this to 100MB (102400 KB)
    | so administrators can upload high-resolution camera photos without error.
    |
    */

    'temporary_file_upload' => [
        'disk' => null,        // Uses default disk
        'rules' => ['required', 'file', 'max:102400'], // 100 MB max (102400 KB)
        'directory' => null,   // Uses livewire-tmp
        'middleware' => null,  // Uses default middleware
        'preview_mimes' => [   // Supported mimes for previewing
            'png', 'gif', 'bmp', 'svg', 'wav', 'mp4',
            'mov', 'avi', 'wmv', 'mp3', 'm4a',
            'jpeg', 'mpga', 'webp', 'wma',
        ],
        'max_upload_time' => 10, // 10 minutes
        'cleanup' => true,
    ],

];
