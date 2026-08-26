<script setup lang="ts">
import CityCard from '../molecules/CityCard.vue';
import type { CurrentWeather } from '../../types/weather.types';
import { useWeatherStore } from '../../stores/weatherStore';
import { formatLocalTime } from '../../utils/time';

defineProps<{
  cities: CurrentWeather[];
  myLocationName?: string;
}>();

const store = useWeatherStore();

function isNight(city: CurrentWeather): boolean {
  return city.weather[0].icon.endsWith('n');
}

function conditionLabel(city: CurrentWeather): string {
  const description = city.weather[0]?.description ?? city.weather[0]?.main ?? '';
  return description.charAt(0).toUpperCase() + description.slice(1);
}

function forecastText(city: CurrentWeather, isCurrentLocation: boolean): string {
  if (isCurrentLocation) {
    return 'Your local weather is ready for today.';
  }

  return (
    store.cityTrends[city.name] ??
    `Not as warm tomorrow, with a high of ${Math.round(city.main.temp_max)}°`
  );
}
</script>

<template>
  <div class="city-list">
    <router-link
      v-for="city in cities"
      :key="city.name"
      :to="`/city/${city.name}`"
      class="city-list__link"
    >
      <CityCard
        :cityName="city.name"
        :subtitle="
          city.name === myLocationName
            ? ''
            : formatLocalTime(city.dt, city.timezone)
        "
        :temp="city.main.temp"
        :condition="conditionLabel(city)"
        :forecastText="forecastText(city, city.name === myLocationName)"
        :conditionMain="city.weather[0].main"
        :high="city.main.temp_max"
        :low="city.main.temp_min"
        :isCurrentLocation="city.name === myLocationName"
        :isNight="isNight(city)"
      />
    </router-link>
  </div>
</template>

<style scoped>
.city-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.65rem;
}

.city-list__link {
  display: block;
  color: inherit;
  text-decoration: none;
}
</style>
