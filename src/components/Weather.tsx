import { weatherImg } from "../helper";
import type { Weather } from "../types";

export default function Weather({ data }: Weather) {
  return (
    <div className="mt-8 sm:mt-12">
      <p className="font-bold text-lg sm:text-2xl">Now</p>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3 text-5xl sm:text-8xl">
          <p className="font-bold">{Math.floor(data.main.temp)}&deg;</p>
          <img
            src={"/icons/" + weatherImg(data.weather[0].icon)}
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
        <p className="text-sm sm:text-base text-gray-300">
          High: {data.main.temp_max}&deg; &middot; Low: {data.main.temp_min}
          &deg;
        </p>
      )}
      <p className="text-sm sm:text-base text-gray-300">
        Humidity: {data.main.humidity}%
      </p>
    </div>
  );
}
