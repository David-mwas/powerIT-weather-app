<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Middleware\HandleCors;
use App\Http\Controllers\WeatherController;
use App\Http\Middleware\CustomCors;

Route::middleware([CustomCors::class])->group(function () {
    Route::get('/api/weather/geocode', [WeatherController::class, 'geocodeCity']);
    Route::get('/api/weather/current', [WeatherController::class, 'getCurrentWeather']);
    Route::get('/api/weather/forecast', [WeatherController::class, 'getForecast']);
});



// http://localhost:8000/api/weather/current?city=Nairobi&units=metric