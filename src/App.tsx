import { useEffect, useState } from "react";
import { weatherApiKey, weatherApiUrl } from "./api";
import SearchBar from "./components/SearchBar";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import type { Option } from "./types";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [currentCity, setCurrentCity] = useState<string>(
    "Getting current location...",
  );

  const handleOnSearchChange = async (searchData: Option | null) => {
    if (!searchData) return;

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

      if (searchData.label) {
        setCurrentCity(searchData.label);
      } else {
        setCurrentCity(`${weather.name}, ${weather.sys.country}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // get user location
  useEffect(() => {
    if (!weather && !forecast && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          console.log(pos.coords);

          handleOnSearchChange({
            value: `${latitude} ${longitude}`,
          });
        },
        (err) => {
          console.log("Failed fetching current user location:", err);
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: Infinity },
      );
    }
  }, [weather, forecast]);

  return (
    <main className="container max-w-5xl mx-auto mt-12 md:mt-24 px-5 sm:px-12 font-display">
      <SearchBar
        onSearchChange={handleOnSearchChange}
        currentCity={currentCity}
      />
      {weather && <Weather data={weather} />}
      {forecast && <Forecast data={forecast} />}
    </main>
  );
}
