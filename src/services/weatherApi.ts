import type { CurrentWeather, ForecastResponse } from '../types/weather.types';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchCurrentWeather(city: string): Promise<CurrentWeather> {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch weather for ${city}`);
  }

  const data: CurrentWeather = await response.json();
  return data;
}

export async function fetchForecast(city: string): Promise<ForecastResponse> {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch forecast for ${city}`);
  }

  const data: ForecastResponse = await response.json();
  return data;
}

export async function fetchWeatherByCoords(lat: number, lon: number): Promise<CurrentWeather> {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch weather for your location');
  }

  const data: CurrentWeather = await response.json();
  return data;
}

export async function fetchForecastByCoords(lat: number, lon: number): Promise<ForecastResponse> {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch forecast for your location');
  }

  const data: ForecastResponse = await response.json();
  return data;
}

export interface CitySuggestion {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export async function fetchCitySuggestions(query: string): Promise<CitySuggestion[]> {
  if (!query.trim()) return [];

  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
  );

  if (!response.ok) {
    return [];
  }

  const data: CitySuggestion[] = await response.json();
  return data;
}
