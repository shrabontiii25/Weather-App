<script setup lang="ts">
import { onMounted } from 'vue';
import { useWeatherStore } from '../../stores/weatherStore';
import CityList from '../organisms/CityList.vue';
import SearchBar from '../molecules/SearchBar.vue';

const store = useWeatherStore();

onMounted(() => {
  store.loadCity('London');
  store.loadCity('Milan');
});

function handleSearch(city: string) {
  store.loadCity(city);
}
</script>

<template>
  <main class="home-page">
    <header class="home-page__header">
      <h1>Weather</h1>
    </header>

    <SearchBar @search="handleSearch" />

    <div v-if="store.isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Fetching weather...</p>
    </div>

    <p v-if="store.error" class="error-state">{{ store.error }}</p>

    <CityList :cities="store.cities" />
  </main>
</template>

<style scoped>
.home-page {
  padding: 2rem;
  max-width: 400px;
  margin: 0 auto;
}

.home-page__header {
  margin-bottom: 1rem;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem 0;
  color: #666;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #ddd;
  border-top-color: #4a6fa5;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-state {
  color: #c0392b;
  text-align: center;
  padding: 1rem;
}
</style>