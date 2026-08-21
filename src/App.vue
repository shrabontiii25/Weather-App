<script setup lang="ts">
import { onMounted } from 'vue';
import { useWeatherStore } from './stores/weatherStore';
import CityCard from './components/molecules/CityCard.vue';

const store = useWeatherStore();

onMounted(() => {
  store.loadCity('London');
  store.loadCity('Milan');
});
</script>

<template>
  <main>
    <h1>Weather App</h1>
    <p v-if="store.isLoading">Loading...</p>
    <p v-if="store.error">{{ store.error }}</p>
    <CityCard
      v-for="city in store.cities"
      :key="city.name"
      :cityName="city.name"
      :subtitle="city.sys.country"
      :temp="city.main.temp"
      :condition="city.weather[0].description"
      :high="city.main.temp_max"
      :low="city.main.temp_min"
    />
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
  max-width: 400px;
  margin: 0 auto;
}
</style>