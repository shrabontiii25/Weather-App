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
      <h1 class="home-page__title">Weather</h1>

      <div class="home-page__actions">
        <router-link
          to="/profile"
          class="home-page__profile-link"
          aria-label="Edit profile"
        >
          <svg
            viewBox="0 0 24 24"
            width="19"
            height="19"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="4" />
            <path
              d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8"
              stroke-linecap="round"
            />
          </svg>
        </router-link>

        <button
          type="button"
          class="home-page__bell"
          aria-label="Weather notifications"
        >
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            aria-hidden="true"
          >
            <path
              d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </header>

    <SearchBar @search="handleSearch" />

    <div
      v-if="store.isLoading && !store.cities.length"
      class="loading-state"
    >
      <div class="spinner"></div>
      <p>Fetching weather...</p>
    </div>

    <p v-if="store.error" class="error-state">
      {{ store.error }}
    </p>

    <div class="home-page__city-scroll">
      <CityList
        :cities="store.cities"
        :myLocationName="store.myLocationName ?? undefined"
      />
    </div>
  </main>
</template>

<style scoped>
.home-page {
  width: 375px;
  height: 667px;
  max-width: 100vw;
  max-height: 100dvh;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 20px 16px 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #ffffff;
  color: #171725;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
}

.home-page__header {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 13px;
}

.home-page__title {
  margin: 0;
  color: #1d1d28;
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.05em;
}

.home-page__actions {
  display: flex;
  align-items: center;
  gap: 7px;
}

.home-page__profile-link,
.home-page__bell {
  display: inline-grid;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 50%;
  color: #5d5bc7;
  background: #f0f1ff;
  text-decoration: none;
  cursor: pointer;
}

.home-page__profile-link {
  width: 29px;
  height: 29px;
  border: 1.5px solid #6461c8;
}

.home-page__bell {
  width: 27px;
  height: 27px;
}

.home-page__city-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  padding: 12px 3px 8px 0;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.home-page__city-scroll::-webkit-scrollbar {
  display: none;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 11px;
  padding: 32px 0;
  color: #697089;
  font-size: 13px;
}

.loading-state p {
  margin: 0;
}

.spinner {
  width: 28px;
  height: 28px;
  border: 3px solid #e3e6f1;
  border-top-color: #5f6ee3;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.error-state {
  margin: 12px 0 0;
  padding: 11px;
  border-radius: 12px;
  background: #fff0f0;
  color: #bd3131;
  text-align: center;
  font-size: 12px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (min-width: 376px) {
  .home-page {
    border-radius: 24px;
    box-shadow: 0 18px 50px rgba(55, 64, 140, 0.18);
  }
}
</style>
