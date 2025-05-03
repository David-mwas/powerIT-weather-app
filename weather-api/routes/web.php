<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherController;

Route::get('/weather/geocode', [WeatherController::class, 'geocodeCity']);
Route::get('/weather/current', [WeatherController::class, 'getCurrentWeather']);
Route::get('/weather/forecast', [WeatherController::class, 'getForecast']);

// http://localhost:8000/api/weather/current?city=Nairobi&units=metric