import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { CurrentWeather, ForecastResponse } from '../types/weather.types';
import { fetchCurrentWeather, fetchForecast } from '../services/weatherApi';

export const useWeatherStore = defineStore('weather', () => {
  const cities = ref<CurrentWeather[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const selectedCityWeather = ref<CurrentWeather | null>(null);
  const selectedCityForecast = ref<ForecastResponse | null>(null);

  async function loadCity(cityName: string) {
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

  return {
    cities,
    isLoading,
    error,
    loadCity,
    selectedCityWeather,
    selectedCityForecast,
    loadCityDetail,
  };
});