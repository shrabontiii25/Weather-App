<script setup lang="ts">
import { computed } from 'vue';
import TempDisplay from '../atoms/TempDisplay.vue';
import WeatherIcon from '../atoms/WeatherIcon.vue';
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

const theme = computed(() =>
  getWeatherTheme(props.conditionMain, props.isNight),
);

const iconCode = computed(() => {
  const prefix =
    props.conditionMain === 'Clear'
      ? '01'
      : props.conditionMain === 'Clouds'
        ? '03'
        : props.conditionMain === 'Thunderstorm'
          ? '11'
          : props.conditionMain === 'Rain'
            ? '10'
            : props.conditionMain === 'Drizzle'
              ? '09'
              : props.conditionMain === 'Snow'
                ? '13'
                : '02';

  return `${prefix}${props.isNight ? 'n' : 'd'}`;
});

const summary = computed(() => {
  if (props.isCurrentLocation) {
    return 'Your local weather is ready for today.';
  }

  if (props.conditionMain === 'Clear') {
    return `Sunny conditions, with a high of ${Math.round(props.high)}°`;
  }

  if (props.conditionMain === 'Rain' || props.conditionMain === 'Drizzle') {
    return `Showers possible, with a high of ${Math.round(props.high)}°`;
  }

  if (props.conditionMain === 'Thunderstorm') {
    return `Storms possible, with a high of ${Math.round(props.high)}°`;
  }

  return `Not as warm tomorrow, with a high of ${Math.round(props.high)}°`;
});
</script>

<template>
  <article class="city-card" :style="{ background: theme.gradient }">
    <div class="city-card__glow" aria-hidden="true"></div>

    <div class="city-card__top">
      <div>
        <h3 class="city-card__name">{{ cityName }}</h3>
        <p v-if="subtitle" class="city-card__subtitle">{{ subtitle }}</p>
      </div>

      <span
        v-if="isCurrentLocation"
        class="city-card__pin"
        aria-label="Current location"
      >
        ●
      </span>
    </div>

    <div class="city-card__forecast">
      <WeatherIcon
        class="city-card__weather-icon"
        size="medium"
        :iconCode="iconCode"
        :description="condition"
      />

      <div class="city-card__reading">
        <p class="city-card__condition">{{ condition }}</p>
        <TempDisplay :temp="temp" />
        <p class="city-card__stats">
          H: {{ Math.round(high) }}° &nbsp; L: {{ Math.round(low) }}°
        </p>
      </div>
    </div>

    <p class="city-card__bottom">
      {{ summary }}
    </p>
  </article>
</template>

<style scoped>
.city-card {
  color: white;
  border-radius: 18px;
  padding: 0.85rem 0.95rem 0.75rem;
  overflow: hidden;
  position: relative;
  min-height: 132px;
  box-shadow: 0 10px 18px rgba(40, 66, 120, 0.2);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.city-card::before {
  content: '';
  position: absolute;
  width: 170px;
  height: 170px;
  right: -85px;
  top: -105px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
}

.city-card::after {
  content: '';
  position: absolute;
  width: 150px;
  height: 150px;
  left: -80px;
  bottom: -100px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
}

.city-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 28px rgba(40, 66, 120, 0.28);
}

.city-card__glow {
  position: absolute;
  width: 110px;
  height: 90px;
  left: 25px;
  bottom: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  filter: blur(22px);
  pointer-events: none;
}

.city-card__top,
.city-card__forecast,
.city-card__bottom {
  position: relative;
  z-index: 1;
}

.city-card__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.city-card__name {
  font-family: var(--display);
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
}

.city-card__subtitle {
  font-size: 0.68rem;
  opacity: 0.85;
  margin: 0.2rem 0 0;
}

.city-card__pin {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  margin: 0.1rem 0.15rem 0 0;
}

.city-card__forecast {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -0.45rem;
}

.city-card__weather-icon {
  margin: -1rem 0 -1.3rem -0.55rem;
  transform: scale(1.02);
  transform-origin: center;
}

.city-card__reading {
  text-align: right;
  min-width: 115px;
}

.city-card__condition {
  font-size: 0.78rem;
  margin: 0 0 -0.3rem;
  opacity: 0.95;
  text-transform: capitalize;
}

.city-card__stats {
  font-size: 0.64rem;
  margin: -0.2rem 0 0;
  opacity: 0.9;
}

.city-card__bottom {
  font-size: 0.62rem;
  line-height: 1.3;
  margin: -0.15rem 0 0;
  opacity: 0.92;
}
</style>
