<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TrackController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;
use \App\Http\Middleware\Authorization;
use  \App\Http\Controllers\TrackListensController;
use  \App\Http\Controllers\RegistrationController;

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

// Auth
Route::post('/auth', [AuthController::class, 'loginUser']);
Route::get('/auth/{id}', [AuthController::class, 'getUser']);
Route::post('/auth/registration', [RegistrationController::class, 'registerUser']);
Route::get('/auth/registration/confirm/{id}/{hash}', [RegistrationController::class, 'registrationConfirm']);


Route::middleware([Authorization::class])->group(function () {
    Route::post('/tracks/', [TrackController::class, 'index']);
    Route::post('/tracks/{id}', [TrackController::class, 'show']);
    Route::post('/track/create', [TrackController::class, 'store']);
    Route::put('/tracks/{id}', [TrackController::class, 'update']);
    Route::delete('/tracks/{id}', [TrackController::class, 'destroy']);

    Route::put('/listen/{track}', [TrackListensController::class, 'update']);

    Route::post('/albums/', [AlbumController::class, 'index']);
    Route::post('/albums/{id}', [AlbumController::class, 'show']);
    Route::post('/album/create', [AlbumController::class, 'store']);
    Route::put('/albums/{id}', [AlbumController::class, 'update']);
    Route::delete('/albums/{id}', [AlbumController::class, 'destroy']);

    Route::apiResource('/comment', CommentController::class);

});
Route::get('/audio/{track}', [TrackController::class, 'streamResponse']);
