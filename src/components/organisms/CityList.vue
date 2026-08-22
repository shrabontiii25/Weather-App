<script setup lang="ts">
import CityCard from '../molecules/CityCard.vue';
import type { CurrentWeather } from '../../types/weather.types';

defineProps<{
  cities: CurrentWeather[];
  myLocationName?: string;
}>();
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
        :subtitle="city.sys.country"
        :temp="city.main.temp"
        :condition="city.weather[0].description"
        :conditionMain="city.weather[0].main"
        :high="city.main.temp_max"
        :low="city.main.temp_min"
        :isCurrentLocation="city.name === myLocationName"
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