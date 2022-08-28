<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        'tracks',
        'track',
        'tracks/*',
        'track/*',
        'tracks/*/*',
        'albums/',
        'albums/*',
        'album/',
        'album/*',
        'comment',
        'comment/*',
        'auth/',
        'auth/*',
        'registration/',
        'profile',
        'profile/*',
        'listen/*',
        'audio/*'
    ];
}
