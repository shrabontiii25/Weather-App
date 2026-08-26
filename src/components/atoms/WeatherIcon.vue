<script setup lang="ts">
import cloudy from '../../assets/weather-icons/Icon=Cloudy.svg';
import lightDrizzle from '../../assets/weather-icons/Icon=Light Drizzle.svg';
import night from '../../assets/weather-icons/Icon=Night.svg';
import partlyCloudy from '../../assets/weather-icons/Icon=Partly Cloudy.svg';
import rainyWithSun from '../../assets/weather-icons/Icon=Rainy with Sun.svg';
import rainy from '../../assets/weather-icons/Icon=Rainy.svg';
import snow from '../../assets/weather-icons/Icon=Snow.svg';
import snowfall from '../../assets/weather-icons/Icon=Snowfall.svg';
import sunny from '../../assets/weather-icons/Icon=Sunny.svg';
import thunderstorm from '../../assets/weather-icons/Icon=Thunderstorm.svg';

const props = withDefaults(defineProps<{
  iconCode: string;
  description: string;
  size?: 'small' | 'medium' | 'large';
}>(), {
  size: 'medium',
});

const iconMap: Record<string, string> = {
  '01d': sunny, '01n': night,
  '02d': partlyCloudy, '02n': partlyCloudy,
  '03d': cloudy, '03n': cloudy,
  '04d': cloudy, '04n': cloudy,
  '09d': lightDrizzle, '09n': lightDrizzle,
  '10d': rainyWithSun, '10n': rainy,
  '11d': thunderstorm, '11n': thunderstorm,
  '13d': snow, '13n': snowfall,
  '50d': cloudy, '50n': cloudy,
};

const iconSrc = iconMap[props.iconCode] ?? sunny;

const isNightCloudy = props.iconCode.endsWith('n') &&
  ['02', '03', '04'].some((code) => props.iconCode.startsWith(code));
</script>

<template>
  <div class="weather-icon" :class="`weather-icon--${size}`">
    <img v-if="isNightCloudy" :src="night" class="weather-icon__moon" alt="" />
    <img :src="iconSrc" :alt="description" class="weather-icon__main" />
  </div>
</template>

<style scoped>
.weather-icon {
  position: relative;
  display: inline-block;
}

.weather-icon--small {
  width: 32px;
  height: 32px;
}

.weather-icon--medium {
  width: 90px;
  height: 90px;
}

.weather-icon--large {
  width: 160px;
  height: 160px;
}

.weather-icon__main {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
}

.weather-icon__moon {
  position: absolute;
  width: 35%;
  height: 35%;
  top: 8%;
  right: 8%;
  z-index: 1;
}
</style>
