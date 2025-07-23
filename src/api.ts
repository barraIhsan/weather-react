export const geoApiUrl = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
export const geoApiOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_GEOAPI_KEY,
    "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
  },
};
