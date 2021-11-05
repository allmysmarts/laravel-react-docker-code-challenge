<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ImageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/**
 * route "/register"
 * @method "POST"
 */
Route::post('/register', [AuthController::class, 'register'])->name('register');

/**
 * route "/login"
 * @method "POST"
 */
Route::post('/login', [AuthController::class, 'login'])->name('login');

/**
 * route "/login"
 * @method "POST"
 */
Route::post('/generate', [ImageController::class, 'generate'])->name('generate');