<script setup lang="ts">
import { onMounted } from 'vue';
import { useWeatherStore } from '../../stores/weatherStore';
import CityList from '../organisms/CityList.vue';
import SearchBar from '../molecules/SearchBar.vue';

const store = useWeatherStore();

onMounted(() => {
  store.loadMyLocation();
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
      <router-link to="/profile" class="home-page__profile-link" aria-label="Edit profile">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke-linecap="round" />
        </svg>
      </router-link>
    </header>

    <SearchBar @search="handleSearch" />

    <div v-if="store.isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Fetching weather...</p>
    </div>

    <p v-if="store.error" class="error-state">{{ store.error }}</p>

    <CityList :cities="store.cities" :myLocationName="store.myLocationName ?? undefined" />
  </main>
</template>

<style scoped>
.home-page {
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  margin: 2rem 0;
  background: white;
  border-radius: 24px;
  min-height: calc(100vh - 4rem);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
}

.home-page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.home-page__profile-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #333;
  text-decoration: none;
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
  to {
    transform: rotate(360deg);
  }
}

.error-state {
  color: #c0392b;
  text-align: center;
  padding: 1rem;
}
</style>