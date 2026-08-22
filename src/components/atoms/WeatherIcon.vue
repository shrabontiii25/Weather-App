<script setup lang="ts">
import heroIcon from '../../assets/hero.png';

const props = withDefaults(
  defineProps<{
    iconCode: string;
    description: string;
    size?: 'small' | 'medium' | 'large';
  }>(),
  { size: 'small' }
);

const iconMap: Record<string, string> = {
  '01d': 'clear-day', '01n': 'clear-night',
  '02d': 'partly-cloudy-day', '02n': 'partly-cloudy-night',
  '03d': 'cloudy', '03n': 'cloudy',
  '04d': 'overcast', '04n': 'overcast',
  '09d': 'drizzle', '09n': 'drizzle',
  '10d': 'rain', '10n': 'rain',
  '11d': 'thunderstorms-day-rain', '11n': 'thunderstorms-night-rain',
  '13d': 'snow', '13n': 'snow',
  '50d': 'fog-day', '50n': 'fog-night',
};

// hero.png (your hand-composited sun+cloud illustration) replaces the
// default partly-cloudy icon only in the large detail-page hero slot.
const usesHeroArt = props.size === 'large' && (props.iconCode === '02d' || props.iconCode === '02n');

const meteoconIcon = iconMap[props.iconCode] ?? 'not-available';
const iconUrl = usesHeroArt
  ? heroIcon
  : `https://cdn.meteocons.com/3.0.0-next.10/svg/fill/${meteoconIcon}.svg`;
</script>

<template>
  <img :src="iconUrl" :alt="description" class="weather-icon" :class="[`weather-icon--${size}`]" />
</template>

<style scoped>
.weather-icon--small { width: 70px; height: 70px; }
.weather-icon--medium { width: 92px; height: 92px; }
.weather-icon--large { width: 140px; height: 140px; }
</style>