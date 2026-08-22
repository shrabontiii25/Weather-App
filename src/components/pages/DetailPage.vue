<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useWeatherStore } from '../../stores/weatherStore';
import TempDisplay from '../atoms/TempDisplay.vue';
import WeatherIcon from '../atoms/WeatherIcon.vue';

const route = useRoute();
const store = useWeatherStore();

const cityName = route.params.cityName as string;

onMounted(() => {
  store.loadCityDetail(cityName);
});

const hourlyForecast = computed(() => {
  return store.selectedCityForecast?.list.slice(0, 4) ?? [];
});

const dailyForecast = computed(() => {
  if (!store.selectedCityForecast) return [];
  const seen = new Set<string>();
  const daily = [];
  for (const entry of store.selectedCityForecast.list) {
    const day = entry.dt_txt.split(' ')[0];
    if (!seen.has(day)) {
      seen.add(day);
      daily.push(entry);
    }
  }
  return daily.slice(0, 5);
});
</script>

<template>
  <main class="detail-page">
    <router-link to="/" class="detail-page__back">&larr; Back</router-link>

    <div v-if="store.isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Fetching weather...</p>
    </div>

    <p v-if="store.error" class="error-state">{{ store.error }}</p>

    <div v-if="store.selectedCityWeather" class="detail-page__current">
      <h1>{{ store.selectedCityWeather.name }}</h1>
      <WeatherIcon
        :iconCode="store.selectedCityWeather.weather[0].icon"
        :description="store.selectedCityWeather.weather[0].description"
      />
      <TempDisplay :temp="store.selectedCityWeather.main.temp" />
      <p>{{ store.selectedCityWeather.weather[0].description }}</p>
    </div>

    <section v-if="hourlyForecast.length" class="forecast-section">
      <h2>Hourly Forecast</h2>
      <div class="forecast-row">
        <div v-for="entry in hourlyForecast" :key="entry.dt" class="forecast-pill">
          <span>{{ entry.dt_txt.split(' ')[1].slice(0, 5) }}</span>
          <WeatherIcon :iconCode="entry.weather[0].icon" :description="entry.weather[0].description" />
          <TempDisplay :temp="entry.main.temp" />
        </div>
      </div>
    </section>

    <section v-if="dailyForecast.length" class="forecast-section">
      <h2>Weekly Forecast</h2>
      <div v-for="entry in dailyForecast" :key="entry.dt" class="forecast-day-row">
        <span>{{ entry.dt_txt.split(' ')[0] }}</span>
        <WeatherIcon :iconCode="entry.weather[0].icon" :description="entry.weather[0].description" />
        <TempDisplay :temp="entry.main.temp" />
      </div>
    </section>
  </main>
</template>

<style scoped>
.detail-page {
  padding: 2rem;
  max-width: 400px;
  margin: 0 auto;
}

.detail-page__back {
  display: inline-block;
  margin-bottom: 1rem;
  color: #4a6fa5;
  text-decoration: none;
}

.detail-page__current {
  text-align: center;
  margin-bottom: 2rem;
}

.forecast-section {
  margin-bottom: 1.5rem;
}

.forecast-row {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
}

.forecast-pill {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f0f4f8;
  border-radius: 12px;
  padding: 0.75rem;
  min-width: 70px;
}

.forecast-day-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
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