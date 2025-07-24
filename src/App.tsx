import { useEffect, useState } from "react";
import { weatherApiKey, weatherApiUrl } from "./api";
import SearchBar from "./components/SearchBar";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import type { Option } from "./types";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const handleOnSearchChange = async (searchData: Option | null) => {
    if (!searchData) return;
    setCurrentCity(searchData.label);

    const [lat, lon] = searchData.value.split(" ");
    const weatherFetch = fetch(
      `${weatherApiUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`,
    );
    const forecastFetch = fetch(
      `${weatherApiUrl}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`,
    );

    try {
      const [weatherRes, forecastRes] = await Promise.all([
        weatherFetch,
        forecastFetch,
      ]);

      const weather = await weatherRes.json();
      const forecast = await forecastRes.json();

      setWeather(weather);
      setForecast(forecast);
    } catch (err) {
      console.log(err);
    }
  };
  };

  return (
    <main className="container max-w-5xl mx-auto mt-12 md:mt-24 px-5 sm:px-12 font-display">
      <SearchBar onSearchChange={handleOnSearchChange} />
      {weather && <Weather data={weather} />}
      {forecast && <Forecast data={forecast} />}
    </main>
  );
}
