export interface WeatherData {
  name: string; // City name
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number; // Add this line
  };
  visibility: number; // Visibility in meters
}

export interface ForecastData {
  dt: number;
  main: {
    temp_min: number;
    temp_max: number;
  };
  weather: { icon: string; description: string }[];
}
