<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    protected $apiKey;
    protected $baseUrl = 'https://api.openweathermap.org/data/2.5';
    protected $geoBaseUrl = 'http://api.openweathermap.org/geo/1.0';

    public function __construct()
    {
        $this->apiKey = env('OPENWEATHERMAP_API_KEY');
    }

    public function geocodeCity(Request $request)
    {
        $city = $request->query('city');
        $limit = $request->query('limit', 1); // Default to 1 result

        if (!$city) {
            return response()->json(['error' => 'City parameter is required.'], 400);
        }

        try {
            $response = Http::get("{$this->geoBaseUrl}/direct", [
                'q' => $city,
                'limit' => $limit,
                'appid' => $this->apiKey,
            ]);

            if ($response->successful()) {
                $data = $response->json();
                if (!empty($data)) {
                    return response()->json($data);
                } else {
                    return response()->json(['error' => 'No coordinates found for the given city.'], 404);
                }
            } else {
                return response()->json(['error' => 'Failed to geocode the city.'], $response->status());
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error geocoding city: ' . $e->getMessage()], 500);
        }
    }

    public function getCurrentWeather(Request $request)
    {
        $city = $request->query('city');
        $lat = $request->query('lat');
        $lon = $request->query('lon');
        $units = $request->query('units', 'metric');

        if ((!$city && !$lat && !$lon) || (!$city && (!$lat || !$lon))) {
            return response()->json(['error' => 'City name or latitude and longitude are required.'], 400);
        }

        $params = [
            'appid' => $this->apiKey,
            'units' => $units,
        ];

        if ($city) {
            $params['q'] = $city;
        } else {
            $params['lat'] = $lat;
            $params['lon'] = $lon;
        }

        try {
            $response = Http::get("{$this->baseUrl}/weather", $params);

            if ($response->successful()) {
                return $response->json();
            } else {
                return response()->json(['error' => 'Failed to fetch current weather data.'], $response->status());
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching current weather data: ' . $e->getMessage()], 500);
        }
    }

    public function getForecast(Request $request)
    {
        $city = $request->query('city');
        $lat = $request->query('lat');
        $lon = $request->query('lon');
        $units = $request->query('units', 'metric');

        if ((!$city && !$lat && !$lon) || (!$city && (!$lat || !$lon))) {
            return response()->json(['error' => 'City name or latitude and longitude are required.'], 400);
        }

        $params = [
            'appid' => $this->apiKey,
            'units' => $units,
        ];

        if ($city) {
            $params['q'] = $city;
        } else {
            $params['lat'] = $lat;
            $params['lon'] = $lon;
        }

        try {
            $response = Http::get("{$this->baseUrl}/forecast", $params);

            if ($response->successful()) {
                return $response->json();
            } else {
                return response()->json(['error' => 'Failed to fetch forecast data.'], $response->status());
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching forecast data: ' . $e->getMessage()], 500);
        }
    }
}