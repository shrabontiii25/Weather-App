<script setup lang="ts">
import TempDisplay from '../atoms/TempDisplay.vue';
import { getWeatherTheme } from '../../utils/weatherTheme';

const props = defineProps<{
  cityName: string;
  subtitle: string;
  temp: number;
  condition: string;
  conditionMain: string;
  high: number;
  low: number;
  isCurrentLocation?: boolean;
  isNight?: boolean;
}>();

const theme = getWeatherTheme(props.conditionMain, props.isNight);
</script>

<template>
  <div class="city-card" :style="{ background: theme.gradient }">
    <div class="city-card__top">
      <div>
        <p v-if="isCurrentLocation" class="city-card__eyebrow">My Location</p>
        <h3 class="city-card__name">{{ cityName }}</h3>
        <p v-if="subtitle" class="city-card__subtitle">{{ subtitle }}</p>
      </div>
      <TempDisplay :temp="temp" />
    </div>
    <div class="city-card__bottom">
      <span>{{ condition }}</span>
      <span>H:{{ Math.round(high) }}° L:{{ Math.round(low) }}°</span>
    </div>
  </div>
</template>

<style scoped>
.city-card {
  color: white;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  margin-bottom: 0.75rem;
}

.city-card__eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.85;
  margin: 0 0 0.15rem;
}

.city-card__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.city-card__name {
  font-family: var(--display);
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
}

.city-card__subtitle {
  font-size: 0.85rem;
  opacity: 0.85;
  margin: 0.2rem 0 0;
}

.city-card__bottom {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  opacity: 0.9;
}
</style>