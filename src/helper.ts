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

export const weatherImg = (key: string) => {
  return mapIcon[key.slice(0, -1) as keyof typeof mapIcon];
};
