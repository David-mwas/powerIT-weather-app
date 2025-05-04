// pages/index.tsx
"use client";

import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";

import Forecast from "./components/Forecast";
import WeatherStats from "./components/WeatherStats";

export default function Home() {
  const [city, setCity] = useState("Nairobi");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [location, setLocation] = useState({ lat: 0, lon: 0 });
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);

  // fetchWeather function to get the weather data
  const fetchWeather = async () => {
    try {
      const geoRes = await fetch(
        `http://localhost:8000/api/weather/geocode?city=${city}`
      );
      const geoData = await geoRes.json();

      if (
        !Array.isArray(geoData) ||
        geoData.length === 0 ||
        !geoData[0].lat ||
        !geoData[0].lon
      ) {
        console.error("Invalid geocode response:", geoData);
        return;
      }

      const { lat, lon } = geoData[0];
      setLocation({ lat, lon });

      // Fetch current and forecast weather data
      const [currentRes, forecastRes] = await Promise.all([
        fetch(
          `http://localhost:8000/api/weather/current?lat=${lat}&lon=${lon}&unit=${unit}`
        ),
        fetch(
          `http://localhost:8000/api/weather/forecast?lat=${lat}&lon=${lon}&unit=${unit}`
        ),
      ]);

      const currentData = await currentRes.json();
      console.log("Current weather data:", currentData.main); // Add this
      if (!currentData || !currentData.main) {
        console.error("Invalid current weather response:", currentData);
        return;
      }
      const forecastData = await forecastRes.json();

      console.log("Forecast data:", forecastData); // Add this

      setCurrent(currentData);
      setForecast(forecastData);
    } catch (err) {
      console.error("Failed to fetch weather:", err);
    }
  };

  useEffect(() => {
    // useEffect to fetch weather data when the component mounts or when city or unit changes
    fetchWeather();
  }, [city, unit]);

  return (
    <main className="p-4 max-w-4xl mx-auto space-y-6 h-[70vh]">
      <SearchBar city={city} setCity={setCity} unit={unit} setUnit={setUnit} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        {current && <CurrentWeather data={current} city={city} />}
        <div className="h-full flex flex-col items-center justify-center">
          {forecast && <Forecast data={forecast} />}
          {current && <WeatherStats data={current} />}
        </div>
      </div>
    </main>
  );
}
