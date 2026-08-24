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

function conditionText(city: CurrentWeather): string {
  return store.cityTrends[city.name] ?? city.weather[0].description;
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
        :subtitle="city.name === myLocationName ? '' : formatLocalTime(city.dt, city.timezone)"
        :temp="city.main.temp"
        :condition="conditionText(city)"
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
  gap: 0.75rem;
}

.city-list__link {
  text-decoration: none;
  color: inherit;
  display: block;
}
</style>