export const geoApiUrl = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
export const geoApiOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_GEOAPI_KEY,
    "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
  },
};

export const weatherApiUrl = "https://api.openweathermap.org/data/2.5";
export const weatherApiKey = import.meta.env.VITE_OPENWEATHER_KEY;
