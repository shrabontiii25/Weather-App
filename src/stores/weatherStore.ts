import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { CurrentWeather, ForecastResponse } from '../types/weather.types';
import {
  fetchCurrentWeather,
  fetchForecast,
  fetchForecastByCoords,
  fetchWeatherByCoords,
} from '../services/weatherApi';

function computeTrendText(current: CurrentWeather, forecast: ForecastResponse): string {
  const todayDate = new Date(current.dt * 1000).toISOString().split('T')[0];
  const futureEntries = forecast.list.filter((e) => e.dt_txt.split(' ')[0] !== todayDate);

  if (!futureEntries.length) {
    return current.weather[0].description;
  }

  const tomorrowDate = futureEntries[0].dt_txt.split(' ')[0];
  const tomorrowEntries = futureEntries.filter((e) => e.dt_txt.startsWith(tomorrowDate));
  const tomorrowHigh = Math.round(Math.max(...tomorrowEntries.map((e) => e.main.temp_max)));
  const todayHigh = Math.round(current.main.temp_max);
  const diff = tomorrowHigh - todayHigh;

  if (diff <= -2) return `Not as warm tomorrow, with a high of ${tomorrowHigh}°`;
  if (diff < 0) return `Not as cold tomorrow, with a high of ${tomorrowHigh}°`;
  if (diff >= 2) return `Warmer tomorrow, with a high of ${tomorrowHigh}°`;
  return `Similar tomorrow, with a high of ${tomorrowHigh}°`;
}

export const useWeatherStore = defineStore('weather', () => {
  const cities = ref<CurrentWeather[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const selectedCityWeather = ref<CurrentWeather | null>(null);
  const selectedCityForecast = ref<ForecastResponse | null>(null);
  const myLocationName = ref<string | null>(null);
  const cityTrends = ref<Record<string, string>>({});

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

      try {
        const forecast = await fetchForecast(cityName);
        cityTrends.value[data.name] = computeTrendText(data, forecast);
      } catch {
        // Trend text is a nice-to-have; fall back silently to the plain description.
      }
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
        const { latitude, longitude } = position.coords;
        const data = await fetchWeatherByCoords(latitude, longitude);

        const alreadyExists = cities.value.some(
          (c) => c.name.toLowerCase() === data.name.toLowerCase()
        );
        if (!alreadyExists) {
          cities.value.unshift(data);
        }
        myLocationName.value = data.name;

        try {
          const forecast = await fetchForecastByCoords(latitude, longitude);
          cityTrends.value[data.name] = computeTrendText(data, forecast);
        } catch {
          // Trend text is a nice-to-have; fall back silently to the plain description.
        }
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
    myLocationName,
    cityTrends,
  };
});