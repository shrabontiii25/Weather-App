import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { CurrentWeather } from '../types/weather.types';
import { fetchCurrentWeather } from '../services/weatherApi';

export const useWeatherStore = defineStore('weather', () => {
  const cities = ref<CurrentWeather[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

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

  return { cities, isLoading, error, loadCity };
});