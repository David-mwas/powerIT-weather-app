<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Middleware\HandleCors;
use App\Http\Controllers\WeatherController;
use App\Http\Middleware\CustomCors;

// This route file is for defining web routes for the application.
// The routes are grouped under a middleware that handles CORS (Cross-Origin Resource Sharing).
// This allows the application to respond to requests from different origins, which is useful for APIs.
// The routes defined here are for the WeatherController, which handles requests related to weather data.
Route::middleware([CustomCors::class])->group(function () {

 // This route is for getting the geocode (latitude and longitude) of a city.
    Route::get('/api/weather/geocode', [WeatherController::class, 'geocodeCity']);

    // This route is for getting the current weather data for a specific city.
    Route::get('/api/weather/current', [WeatherController::class, 'getCurrentWeather']);

    // This route is for getting the forecast weather data for a specific city.
    Route::get('/api/weather/forecast', [WeatherController::class, 'getForecast']);

});



