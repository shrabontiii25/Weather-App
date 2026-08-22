import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { CurrentWeather, ForecastResponse } from '../types/weather.types';
import { fetchCurrentWeather, fetchForecast, fetchWeatherByCoords } from '../services/weatherApi';

export const useWeatherStore = defineStore('weather', () => {
  const cities = ref<CurrentWeather[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const selectedCityWeather = ref<CurrentWeather | null>(null);
  const selectedCityForecast = ref<ForecastResponse | null>(null);

  async function loadCity(cityName: string) {
  const alreadyExists = cities.value.some(
    (c) => c.name.toLowerCase() === cityName.toLowerCase()
  );
  if (alreadyExists) return;

  isLoading.value = true;
  error.value = null;
  try {
    const data = await fetchCurrentWeather(cityName);
    cities.value.push(data);
  } catch (err) {
    error.value = `Could not find weather for ${cityName}`;
  } finally {
    isLoading.value = false;
  }
}

  async function loadCityDetail(cityName: string) {
    isLoading.value = true;
    error.value = null;
    try {
      const [weather, forecast] = await Promise.all([
        fetchCurrentWeather(cityName),
        fetchForecast(cityName),
      ]);
      selectedCityWeather.value = weather;
      selectedCityForecast.value = forecast;
    } catch (err) {
      error.value = `Could not find weather for ${cityName}`;
    } finally {
      isLoading.value = false;
    }
  }
  async function loadMyLocation() {
  isLoading.value = true;
  error.value = null;

  if (!navigator.geolocation) {
    error.value = 'Geolocation is not supported by your browser';
    isLoading.value = false;
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const data = await fetchWeatherByCoords(
          position.coords.latitude,
          position.coords.longitude
        );
        cities.value.unshift(data);
      } catch (err) {
        error.value = 'Could not fetch weather for your location';
      } finally {
        isLoading.value = false;
      }
    },
    () => {
      error.value = 'Location permission denied';
      isLoading.value = false;
    }
  );
}

  return {
    cities,
    isLoading,
    error,
    loadCity,
    selectedCityWeather,
    selectedCityForecast,
    loadCityDetail,
    loadMyLocation,
  };
});