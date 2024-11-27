import axios from "axios";
import { WeatherData } from "@/types/WeatherTypes";

const API_KEY = "eb946ec4a56a5acb9eaef551fcdfd9e4";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeather = async (
  location: string
): Promise<WeatherData> => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: location.includes(",") ? undefined : location, // City name
      lat: location.includes(",") ? location.split(",")[0] : undefined, // Latitude
      lon: location.includes(",") ? location.split(",")[1] : undefined, // Longitude
      appid: API_KEY,
      units: "metric",
    },
  });
  return response.data;
};

export const getWeatherByCoordinates = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: "metric",
    },
  });
  return response.data;
};

// 5 day forcast service method
export const getFiveDayForecast = async (location: string) => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: location.includes(",") ? undefined : location, // If not coordinates, use `q`
      lat: location.includes(",") ? location.split(",")[0] : undefined, // Latitude
      lon: location.includes(",") ? location.split(",")[1] : undefined, // Longitude
      appid: API_KEY,
      units: "metric",
    },
  });
  return response.data;
};

export async function getNearbyCitiesWeather(lat: number, lon: number) {
  const apiKey = "eb946ec4a56a5acb9eaef551fcdfd9e4";
  const url = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=5&units=metric&appid=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch nearby cities weather data");
  }
  return await response.json();
}
