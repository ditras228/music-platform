<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TrackController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;
use \App\Http\Middleware\Authorization;
use  \App\Http\Controllers\TrackListensController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::resource('/auth', AuthController::class);

Route::middleware([Authorization::class])->group(function () {
    Route::resource('/track', TrackController::class);
    Route::put('/listen/{track}', [TrackListensController::class, 'update']);
    Route::resource('/album', AlbumController::class);
    Route::resource('/comment', CommentController::class);

});
Route::get('/audio/{track}', [TrackController::class, 'streamResponse']);
