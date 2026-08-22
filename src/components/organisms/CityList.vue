<script setup lang="ts">
import CityCard from '../molecules/CityCard.vue';
import type { CurrentWeather } from '../../types/weather.types';

defineProps<{
  cities: CurrentWeather[];
}>();
</script>

<template>
  <div class="city-list">
    <CityCard
      v-for="city in cities"
      :key="city.name"
      :cityName="city.name"
      :subtitle="city.sys.country"
      :temp="city.main.temp"
      :condition="city.weather[0].description"
      :high="city.main.temp_max"
      :low="city.main.temp_min"
    />
  </div>
</template>

<style scoped>
.city-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>