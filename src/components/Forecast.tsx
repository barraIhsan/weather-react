import { weatherImg } from "../helper";
import type { Forecast } from "../types";

export default function Forecast({ data }: Forecast) {
  console.log(data.list[0].dt_txt.split(" ")[1]);

  const uniquePerDay = data.list.reduce(
    (acc, item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!acc.some((i) => i.dt_txt.startsWith(date))) {
        acc.push(item); // will only push to array if it's the first item with that date
      }
      return acc;
    },
    [] as typeof data.list,
  );

  return (
    <div className="mt-12">
      <p className="font-bold text-lg sm:text-2xl">Weekly Forecast</p>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:grid-cols-5 justify-center gap-2.5 mt-4 text-left md:text-center">
        {uniquePerDay.slice(1).map((item) => (
          <li className="grid [grid-template-areas:'w_w''i_t''i_f'] grid-cols-[auto_1fr] md:[grid-template-areas:'w''i''t''f'] md:grid-cols-1 gap-2 p-2.5 bg-gray-800/50 w-full">
            <p className="text-xl [grid-area:w]">
              {new Date(item.dt_txt).toLocaleDateString("en-GB", {
                weekday: "long",
              })}
            </p>
            <img
              src={"/icons/" + weatherImg(item.weather[0].icon)}
              alt={item.weather[0].main}
              className="size-12 mx-auto mt-1 md:mt-0 [grid-area:i]"
            />
            <p className="text-3xl font-bold [grid-area:t]">
              {Math.round(item.main.temp)}&deg;
            </p>
            <p className="text-sm -mt-2 [grid-area:f]">
              Feels like: {Math.round(item.main.feels_like)}&deg;
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
