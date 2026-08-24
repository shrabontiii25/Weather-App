<script setup lang="ts">
import cloudy from '../../assets/weather-icons/Icon=Cloudy.svg';
import lightDrizzle from '../../assets/weather-icons/Icon=Light Drizzle.svg';
import lightning from '../../assets/weather-icons/Icon=Lightning.svg';
import night from '../../assets/weather-icons/Icon=Night.svg';
import partlyCloudy from '../../assets/weather-icons/Icon=Partly Cloudy.svg';
import rainyWithSun from '../../assets/weather-icons/Icon=Rainy with Sun.svg';
import rainy from '../../assets/weather-icons/Icon=Rainy.svg';
import sleet from '../../assets/weather-icons/Icon=Sleet.svg';
import snow from '../../assets/weather-icons/Icon=Snow.svg';
import snowfall from '../../assets/weather-icons/Icon=Snowfall.svg';
import sunny from '../../assets/weather-icons/Icon=Sunny.svg';
import thunderstorm from '../../assets/weather-icons/Icon=Thunderstorm.svg';

const props = defineProps<{
  iconCode: string;
  description: string;
}>();

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
</script>

<template>
  <img :src="iconSrc" :alt="description" class="weather-icon" />
</template>

<style scoped>
.weather-icon {
  width: 70px;
  height: 70px;
}
</style>