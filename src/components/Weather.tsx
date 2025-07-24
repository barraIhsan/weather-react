export default function Weather({ data }) {
  const mapIcon = {
    "01": "sunny.svg",
    "02": "partly_cloudy.svg",
    "03": "cloudy.svg",
    "04": "cloudy.svg",
    "09": "rainy.svg",
    "10": "rainy.svg",
    "11": "thunder.svg",
    "13": "snowy.svg",
    "50": "foggy.svg",
  };

  return (
    <div className="mt-8 sm:mt-12">
      <p className="font-bold text-lg sm:text-2xl">Now</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 text-5xl sm:text-8xl">
          <p className="font-bold">{Math.floor(data.main.temp)}&deg;</p>
          <img
            src={
              "/icons/" +
              mapIcon[data.weather[0].icon.slice(0, -1) as keyof typeof mapIcon]
            }
            alt={data.weather[0].main}
            className="size-[.8em]"
          />
        </div>
        <div className="text-right">
          <p className="text-lg sm:text-2xl font-semibold">
            {data.weather[0].main}
          </p>
          <p className="sm:text-xl">
            Feels like {Math.floor(data.main.feels_like)}&deg;
          </p>
        </div>
      </div>
      {data.main.temp_max != data.main.temp_min && (
        <p className="text-sm sm:text-base mt-2 text-gray-700">
          High: {data.main.temp_max}&deg; &middot; Low: {data.main.temp_min}
          &deg;
        </p>
      )}
    </div>
  );
}
