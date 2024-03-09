<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherController;
use Illuminate\Auth\Middleware\Authenticate;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware(Authenticate::using('sanctum'));


Route::get('/weather', [WeatherController::class, 'getWeather']);
