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
  min-height: 100vh;
  padding: 1.5rem;
  max-width: 400px;
  margin: 0 auto;
  background: linear-gradient(160deg, #4a7fd4, #2a4d8f);
  color: white;
  border-radius: 24px;
}

.detail-page__back {
  display: inline-block;
  margin-bottom: 1rem;
  color: white;
  text-decoration: none;
  opacity: 0.9;
}

.detail-page__current {
  text-align: center;
  margin-bottom: 1.5rem;
}

.forecast-section {
  background: white;
  color: #333;
  border-radius: 20px;
  padding: 1.25rem;
  margin-bottom: 1rem;
}

.forecast-section h2 {
  font-size: 1rem;
  margin-top: 0;
  margin-bottom: 1rem;
}

.forecast-row {
  display: flex;
  gap: 0.6rem;
  overflow-x: auto;
}

.forecast-pill {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(160deg, #4a7fd4, #2a4d8f);
  color: white;
  border-radius: 16px;
  padding: 0.75rem 0.5rem;
  min-width: 65px;
}

.forecast-day-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0;
  border-bottom: 1px solid #eee;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem 0;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-state {
  color: #ffd6d6;
  text-align: center;
  padding: 1rem;
}
</style>