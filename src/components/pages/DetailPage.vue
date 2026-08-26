<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useWeatherStore } from '../../stores/weatherStore';
import WeatherIcon from '../atoms/WeatherIcon.vue';
import { getWeatherTheme } from '../../utils/weatherTheme';

const route = useRoute();
const store = useWeatherStore();

const cityName = route.params.cityName as string;

onMounted(() => {
  store.loadCityDetail(cityName);
});

const weather = computed(() => store.selectedCityWeather);

const isNight = computed(() => {
  const iconCode = weather.value?.weather[0]?.icon ?? '';
  return iconCode.endsWith('n');
});

const conditionMain = computed(() => {
  return weather.value?.weather[0]?.main ?? 'Clouds';
});

const theme = computed(() => {
  return getWeatherTheme(conditionMain.value, isNight.value);
});

const themeColors = computed(() => {
  const colors: Record<string, { accent: string; soft: string; row: string }> = {
    Clear: {
      accent: '#ff641d',
      soft: '#fff0df',
      row: '#ffe2c3',
    },
    Clouds: {
      accent: '#3974e8',
      soft: '#eaf1ff',
      row: '#d9e7ff',
    },
    Rain: {
      accent: '#245ca8',
      soft: '#e8f1fb',
      row: '#d4e3f4',
    },
    Drizzle: {
      accent: '#3479ae',
      soft: '#e8f4fb',
      row: '#d3e8f5',
    },
    Thunderstorm: {
      accent: '#4a338c',
      soft: '#f0ecff',
      row: '#e0d8f8',
    },
    Snow: {
      accent: '#4388b6',
      soft: '#ecf8ff',
      row: '#d7edfa',
    },
    Mist: {
      accent: '#667a88',
      soft: '#eef2f4',
      row: '#dfe7eb',
    },
    Fog: {
      accent: '#667a88',
      soft: '#eef2f4',
      row: '#dfe7eb',
    },
    Haze: {
      accent: '#847260',
      soft: '#f5f1eb',
      row: '#e8dfd4',
    },
  };

  return colors[conditionMain.value] ?? colors.Clouds;
});

const pageStyle = computed(() => ({
  background: theme.value.gradient,
  '--forecast-accent': themeColors.value.accent,
  '--forecast-soft': themeColors.value.soft,
  '--forecast-row': themeColors.value.row,
}));

const heroDate = computed(() => {
  const timezoneOffset = weather.value?.timezone ?? 0;
  const cityTime = new Date(Date.now() + timezoneOffset * 1000);

  return cityTime.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
});

const conditionLabel = computed(() => {
  const label = weather.value?.weather[0]?.description ?? conditionMain.value;
  return label.charAt(0).toUpperCase() + label.slice(1);
});

const hourlyForecast = computed(() => {
  return store.selectedCityForecast?.list.slice(0, 6) ?? [];
});

const weeklyForecast = computed(() => {
  const seen = new Set<string>();

  return (store.selectedCityForecast?.list ?? [])
    .filter((item) => {
      const date = item.dt_txt.split(' ')[0];

      if (seen.has(date)) return false;

      seen.add(date);
      return true;
    })
    .slice(0, 5);
});

function formatTime(dateText: string) {
  return new Date(dateText.replace(' ', 'T')).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

function dayLabel(dateText: string) {
  return new Date(dateText.replace(' ', 'T')).toLocaleDateString('en-US', {
    weekday: 'long',
  });
}
</script>

<template>
  <main class="detail-page" :style="pageStyle">
    <template v-if="weather">
      <header class="detail-page__topbar">
        <router-link
          to="/"
          class="detail-page__icon-btn"
          aria-label="Back to weather list"
        >
          <svg
            viewBox="0 0 24 24"
            width="21"
            height="21"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path
              d="M15 18l-6-6 6-6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </router-link>

        <p class="detail-page__city">{{ cityName }}</p>

        <button
          type="button"
          class="detail-page__icon-btn"
          aria-label="More weather options"
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <circle cx="5" cy="12" r="1.2" fill="currentColor" />
            <circle cx="12" cy="12" r="1.2" fill="currentColor" />
            <circle cx="19" cy="12" r="1.2" fill="currentColor" />
          </svg>
        </button>
      </header>

      <section class="detail-page__hero">
        <p class="detail-page__date">{{ heroDate }}</p>

        <WeatherIcon
          class="detail-page__weather-icon"
          size="large"
          :iconCode="weather.weather[0].icon"
          :description="weather.weather[0].description"
        />

        <p class="detail-page__temperature">
          {{ Math.round(weather.main.temp) }}°
        </p>

        <p class="detail-page__condition">
          {{ conditionLabel }}
        </p>

        <p class="detail-page__range">
          H: {{ Math.round(weather.main.temp_max) }}°
          <span>·</span>
          L: {{ Math.round(weather.main.temp_min) }}°
        </p>
      </section>

      <section class="detail-page__sheet">
        <div class="detail-page__sheet-handle"></div>

        <div class="detail-page__sheet-scroll">
          <div class="detail-page__stats">
            <span>Humidity <b>{{ weather.main.humidity }}%</b></span>
            <span>
              Wind
              <b>{{ Math.round(weather.wind.speed * 3.6) }} km/h</b>
            </span>
          </div>

          <h2 class="detail-page__section-title">Today</h2>

          <div class="forecast-row">
            <article
              v-for="(forecast, index) in hourlyForecast"
              :key="forecast.dt"
              class="forecast-pill"
              :class="{ 'forecast-pill--now': index === 0 }"
            >
              <span class="forecast-pill__time">
                {{ index === 0 ? 'Now' : formatTime(forecast.dt_txt) }}
              </span>

              <WeatherIcon
                size="small"
                :iconCode="forecast.weather[0].icon"
                :description="forecast.weather[0].description"
              />

              <strong class="forecast-pill__temp">
                {{ Math.round(forecast.main.temp) }}°
              </strong>
            </article>
          </div>

          <h2 class="detail-page__section-title detail-page__section-title--weekly">
            5-day forecast
          </h2>

          <div class="weekly-list">
            <article
              v-for="forecast in weeklyForecast"
              :key="forecast.dt"
              class="weekly-row"
            >
              <WeatherIcon
                size="small"
                :iconCode="forecast.weather[0].icon"
                :description="forecast.weather[0].description"
              />

              <div class="weekly-row__details">
                <strong>{{ dayLabel(forecast.dt_txt) }}</strong>
                <span>{{ forecast.weather[0].description }}</span>
              </div>

              <b>{{ Math.round(forecast.main.temp) }}°</b>

              <svg
                class="weekly-row__arrow"
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  d="M9 18l6-6-6-6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </article>
          </div>
        </div>
      </section>
    </template>

    <div v-else-if="store.isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading weather...</p>
    </div>

    <p v-else-if="store.error" class="error-state">
      {{ store.error }}
    </p>
  </main>
</template>

<style scoped>
.detail-page {
  width: 375px;
  height: 667px;
  max-width: 100vw;
  max-height: 100dvh;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  color: #ffffff;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
}

.detail-page__topbar {
  flex: 0 0 auto;
  display: grid;
  grid-template-columns: 38px 1fr 38px;
  align-items: center;
  padding: 17px 18px 0;
  position: relative;
  z-index: 2;
}

.detail-page__city {
  margin: 0;
  text-align: center;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.detail-page__icon-btn {
  display: inline-grid;
  place-items: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.18);
  text-decoration: none;
  cursor: pointer;
}

.detail-page__hero {
  flex: 0 0 294px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 14px;
  position: relative;
  z-index: 1;
}

.detail-page__date {
  margin: 0;
  color: rgba(255, 255, 255, 0.84);
  font-size: 12px;
}

.detail-page__weather-icon {
  height: 132px;
  margin: 2px 0 -6px;
  filter: drop-shadow(0 12px 14px rgba(22, 42, 100, 0.18));
}

.detail-page__temperature {
  margin: 0;
  font-size: 60px;
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.075em;
}

.detail-page__condition {
  margin: 8px 0 0;
  font-size: 17px;
  font-weight: 600;
  text-transform: capitalize;
}

.detail-page__range {
  margin: 8px 0 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
}

.detail-page__range span {
  margin: 0 5px;
  opacity: 0.7;
}

.detail-page__sheet {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  border-radius: 25px 25px 0 0;
  background: #ffffff;
  color: #242534;
}

.detail-page__sheet-handle {
  width: 38px;
  height: 4px;
  margin: 10px auto 0;
  border-radius: 100px;
  background: #d9dceb;
}

.detail-page__sheet-scroll {
  height: calc(100% - 14px);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 14px 16px 28px;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.detail-page__sheet-scroll::-webkit-scrollbar {
  display: none;
}

.detail-page__stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
  margin-bottom: 17px;
}

.detail-page__stats span {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 10px 11px;
  border-radius: 12px;
  background: var(--forecast-soft);
  color: #687087;
  font-size: 11px;
}

.detail-page__stats b {
  color: #272938;
  font-size: 13px;
}

.detail-page__section-title {
  margin: 0 0 10px;
  color: #1c1c28;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.04em;
}

.detail-page__section-title--weekly {
  margin-top: 20px;
}

.forecast-row {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 1px 0 3px;
  scrollbar-width: none;
}

.forecast-row::-webkit-scrollbar {
  display: none;
}

.forecast-pill {
  min-width: 51px;
  height: 84px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 8px 5px;
  border-radius: 11px;
  background: var(--forecast-soft);
  color: #282938;
}

.forecast-pill--now {
  background: var(--forecast-accent);
  color: #ffffff;
}

.forecast-pill__time {
  font-size: 10px;
  white-space: nowrap;
}

.forecast-pill__temp {
  font-size: 13px;
  line-height: 1;
}

.weekly-list {
  display: grid;
  gap: 8px;
}

.weekly-row {
  min-height: 55px;
  display: grid;
  grid-template-columns: 39px 1fr auto 16px;
  align-items: center;
  column-gap: 7px;
  padding: 6px 10px;
  border-radius: 12px;
  box-sizing: border-box;
  background: var(--forecast-row);
  color: #282938;
}

.weekly-row__details {
  display: grid;
  gap: 3px;
  min-width: 0;
}

.weekly-row__details strong {
  font-size: 12px;
  line-height: 1;
}

.weekly-row__details span {
  overflow: hidden;
  color: #626b7d;
  font-size: 10px;
  line-height: 1.1;
  text-overflow: ellipsis;
  text-transform: capitalize;
  white-space: nowrap;
}

.weekly-row b {
  font-size: 13px;
}

.weekly-row__arrow {
  color: #36415d;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 11px;
  padding-top: 190px;
  color: #ffffff;
  font-size: 13px;
}

.loading-state p,
.error-state {
  margin: 0;
}

.spinner {
  width: 28px;
  height: 28px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.error-state {
  padding: 70px 24px 0;
  color: #ffffff;
  text-align: center;
  font-size: 13px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (min-width: 376px) {
  .detail-page {
    border-radius: 24px;
    box-shadow: 0 18px 50px rgba(41, 48, 86, 0.2);
  }
}
</style>
