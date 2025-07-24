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
