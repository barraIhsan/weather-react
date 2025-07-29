export interface City {
  latitude: number;
  longitude: number;
  name: string;
  countryCode: string;
  type: string;
}

export interface Option {
  value: string;
  label?: string;
}

export interface SearchBarProps {
  onSearchChange: (selected: Option | null) => void;
  currentCity: string;
}

export interface Weather {
  data: {
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: {
      main: string;
      icon: string;
    }[];
  };
}
