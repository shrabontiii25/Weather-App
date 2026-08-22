<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useWeatherStore } from '../../stores/weatherStore';
import TempDisplay from '../atoms/TempDisplay.vue';
import WeatherIcon from '../atoms/WeatherIcon.vue';
import { getWeatherTheme } from '../../utils/weatherTheme';

const route = useRoute();
const store = useWeatherStore();

const cityName = route.params.cityName as string;

const theme = computed(() =>
  getWeatherTheme(store.selectedCityWeather?.weather[0]?.main)
);

function loadDetail() {
  store.loadCityDetail(cityName);
}

onMounted(loadDetail);

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

function formatFullDate(unixSeconds: number): string {
  const d = new Date(unixSeconds * 1000);
  const weekday = d.toLocaleDateString('en-GB', { weekday: 'long' });
  const day = d.getDate();
  const month = d.toLocaleDateString('en-GB', { month: 'long' });
  const year = d.getFullYear();
  return `${weekday}, ${day} ${month} ${year}`;
}

function formatTime(dtTxt: string): string {
  const d = new Date(dtTxt.replace(' ', 'T'));
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function formatWeekday(dtTxt: string): string {
  const d = new Date(dtTxt.replace(' ', 'T'));
  return d.toLocaleDateString('en-US', { weekday: 'long' });
}

function conditionLabel(main: string): string {
  const label = getWeatherTheme(main).label;
  return label.charAt(0).toUpperCase() + label.slice(1);
}

const lastUpdate = computed(() =>
  store.selectedCityWeather ? formatTime(new Date(store.selectedCityWeather.dt * 1000).toISOString().replace('T', ' ').slice(0, 19)) : ''
);
</script>

<template>
  <main class="detail-page" :style="{ background: theme.gradient }">
    <header class="detail-page__topbar">
      <router-link to="/" class="detail-page__icon-btn" aria-label="Back to city list">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </router-link>
      <h1 class="detail-page__city" v-if="store.selectedCityWeather">
        {{ store.selectedCityWeather.name }}, {{ store.selectedCityWeather.sys.country }}
      </h1>
      <button class="detail-page__icon-btn" aria-label="Save location" type="button">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 3h12v18l-6-4.5L6 21V3z" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </header>

    <p v-if="store.selectedCityWeather" class="detail-page__date">
      {{ formatFullDate(store.selectedCityWeather.dt) }}
    </p>

    <div v-if="store.isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Fetching weather...</p>
    </div>

    <p v-if="store.error" class="error-state">{{ store.error }}</p>

    <div v-if="store.selectedCityWeather" class="detail-page__current">
      <WeatherIcon
        size="medium"
        :iconCode="store.selectedCityWeather.weather[0].icon"
        :description="store.selectedCityWeather.weather[0].description"
      />
      <p class="detail-page__temp">
        <TempDisplay :temp="store.selectedCityWeather.main.temp" />C
      </p>
      <p class="detail-page__condition">{{ conditionLabel(store.selectedCityWeather.weather[0].main) }}</p>
      <button class="detail-page__refresh" type="button" @click="loadDetail">
        Last Update {{ lastUpdate }}
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12a9 9 0 11-3-6.7M21 4v5h-5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>

    <section v-if="hourlyForecast.length || dailyForecast.length" class="detail-page__sheet">
      <h2 v-if="hourlyForecast.length">Today's Forecast</h2>
      <div v-if="hourlyForecast.length" class="forecast-row">
        <div v-for="entry in hourlyForecast" :key="entry.dt" class="forecast-pill">
          <WeatherIcon size="small" :iconCode="entry.weather[0].icon" :description="entry.weather[0].description" />
          <span class="forecast-pill__temp">{{ Math.round(entry.main.temp) }}°</span>
          <span class="forecast-pill__time">{{ formatTime(entry.dt_txt) }}</span>
        </div>
      </div>

      <h2 v-if="dailyForecast.length">Weekly Forecast</h2>
      <div v-for="entry in dailyForecast" :key="entry.dt" class="forecast-day-row">
        <div class="forecast-day-row__icon-wrap" :style="{ background: getWeatherTheme(entry.weather[0].main).gradient }">
          <WeatherIcon size="small" :iconCode="entry.weather[0].icon" :description="entry.weather[0].description" />
        </div>
        <div class="forecast-day-row__info">
          <span class="forecast-day-row__day">{{ formatWeekday(entry.dt_txt) }}</span>
          <span class="forecast-day-row__condition">{{ conditionLabel(entry.weather[0].main) }}</span>
        </div>
        <span class="forecast-day-row__temp">{{ Math.round(entry.main.temp) }}°C</span>
        <svg class="forecast-day-row__chevron" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </section>
  </main>
</template>

<style scoped>
.detail-page {
  min-height: 100vh;
  padding: 1.5rem 1.5rem 0;
  max-width: 400px;
  margin: 0 auto;
  color: white;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
}

.detail-page__topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.detail-page__icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: none;
  text-decoration: none;
  cursor: pointer;
}

.detail-page__city {
  font-family: var(--display);
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin: 0;
}

.detail-page__date {
  text-align: center;
  font-size: 0.8rem;
  opacity: 0.85;
  margin: 0.5rem 0 0;
}

.detail-page__current {
  text-align: center;
  margin: 1rem 0 1.5rem;
}

.detail-page__temp {
  font-family: var(--display);
  font-size: 2.75rem;
  font-weight: 700;
  margin: 0.25rem 0 0;
}

.detail-page__condition {
  font-weight: 600;
  margin: 0.1rem 0 0.75rem;
}

.detail-page__refresh {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: transparent;
  border: none;
  color: white;
  opacity: 0.85;
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0;
}

.detail-page__sheet {
  background: white;
  color: #1c1c22;
  border-radius: 24px 24px 0 0;
  padding: 1.5rem 1.5rem 2rem;
  margin: 0 -1.5rem;
  flex: 1;
}

.detail-page__sheet h2 {
  font-size: 1rem;
  margin: 0 0 1rem;
  color: #1c1c22;
}

.forecast-row {
  display: flex;
  gap: 0.6rem;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.forecast-row::-webkit-scrollbar {
  display: none;
}

.forecast-pill {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  background: #f4f5f9;
  color: #1c1c22;
  border-radius: 16px;
  padding: 0.75rem 0.5rem;
  min-width: 68px;
}

.forecast-pill__temp {
  font-family: var(--display);
  font-weight: 700;
  font-size: 1.1rem;
}

.forecast-pill__time {
  font-size: 0.7rem;
  color: #8a8a94;
}

.forecast-day-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #f4f5fb;
  border-radius: 16px;
  padding: 0.6rem 0.75rem;
  margin-bottom: 0.6rem;
}

.forecast-day-row__icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.forecast-day-row__icon-wrap :deep(.weather-icon) {
  width: 28px;
  height: 28px;
}

.forecast-day-row__info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.forecast-day-row__day {
  font-weight: 600;
  font-size: 0.9rem;
}

.forecast-day-row__condition {
  font-size: 0.75rem;
  color: #8a8a94;
}

.forecast-day-row__temp {
  font-weight: 600;
  font-size: 0.9rem;
}

.forecast-day-row__chevron {
  color: #b8b8c2;
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
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-state {
  color: #ffd6d6;
  text-align: center;
  padding: 1rem;
}
</style>