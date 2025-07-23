import { MapPin, Search } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, geoApiUrl } from "../api";
import type { Option, City, SearchBarProps } from "../types.ts";

export default function SearchBar({ onSearchChange }: SearchBarProps) {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState<string>("Jakarta, ID");

  const changeCity = (searchData: Option | null) => {
    if (!searchData) return;
    onSearchChange(searchData);
    setCurrentCity(searchData.label);
    setSearchOpen(false);
  };

  const loadOptions = async (inputValue: string) => {
    try {
      const res = await fetch(
        `${geoApiUrl}?minPopulation=1000&namePrefix=${inputValue}`,
        geoApiOptions,
      );
      console.log(res);
      const cities: { data: City[] } = await res.json();
      console.log(cities);
      return {
        options: cities.data.map((city, _, arr) => {
          const count = arr.filter((c) => c.name == city.name).length;
          return {
            value: `${city.latitude} ${city.longitude}`,
            label:
              count > 1
                ? `${city.name} (${city.type}), ${city.countryCode}`
                : `${city.name}, ${city.countryCode}`,
          };
        }),
      };
    } catch (err) {
      console.log(err);
      return { options: [] };
    }
  };

  return (
    <div className="flex justify-between gap-12">
      <p
        className={twMerge(
          "inline-flex gap-5 items-center text-xl sm:text-4xl xl:text-5xl font-bold",
          searchOpen && "hidden lg:inline",
        )}
      >
        <MapPin className="size-[.9em]" />
        {currentCity}
      </p>
      <label
        className={twMerge(
          "flex gap-5 justify-between lg:justify-center items-center cursor-pointer",
          searchOpen && "w-full lg:w-auto",
        )}
        htmlFor="search"
      >
        <AsyncPaginate
          placeholder="Insert your city name"
          autoFocus
          className={twMerge(
            "outline-none w-full lg:w-80",
            !searchOpen && "hidden",
          )}
          onChange={changeCity}
          debounceTimeout={600}
          loadOptions={loadOptions}
        />
        <Search
          onClick={() => {
            setSearchOpen(!searchOpen);
          }}
        />
      </label>
    </div>
  );
}
