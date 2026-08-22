<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    iconCode: string;
    description: string;
    size?: 'small' | 'medium' | 'large';
  }>(),
  { size: 'small' }
);

const fluentPathMap: Record<string, string> = {
  '01d': 'Sun/3D/sun_3d.png',
  '01n': 'Crescent moon/3D/crescent_moon_3d.png',
  '02d': 'Sun behind cloud/3D/sun_behind_cloud_3d.png',
  '02n': 'Cloud/3D/cloud_3d.png',
  '03d': 'Cloud/3D/cloud_3d.png',
  '03n': 'Cloud/3D/cloud_3d.png',
  '04d': 'Sun behind large cloud/3D/sun_behind_large_cloud_3d.png',
  '04n': 'Cloud/3D/cloud_3d.png',
  '09d': 'Cloud with rain/3D/cloud_with_rain_3d.png',
  '09n': 'Cloud with rain/3D/cloud_with_rain_3d.png',
  '10d': 'Cloud with rain/3D/cloud_with_rain_3d.png',
  '10n': 'Cloud with rain/3D/cloud_with_rain_3d.png',
  '11d': 'Cloud with lightning and rain/3D/cloud_with_lightning_and_rain_3d.png',
  '11n': 'Cloud with lightning and rain/3D/cloud_with_lightning_and_rain_3d.png',
  '13d': 'Snowflake/3D/snowflake_3d.png',
  '13n': 'Snowflake/3D/snowflake_3d.png',
  '50d': 'Fog/3D/fog_3d.png',
  '50n': 'Fog/3D/fog_3d.png',
};

const relPath = fluentPathMap[props.iconCode] ?? 'Cloud/3D/cloud_3d.png';
const iconUrl = `https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/${encodeURI(relPath)}`;
</script>

<template>
  <img
    :src="iconUrl"
    :alt="description"
    class="weather-icon"
    :class="[`weather-icon--${size}`]"
    :loading="size === 'small' ? 'lazy' : 'eager'"
  />
</template>

<style scoped>
.weather-icon--small { width: 56px; height: 56px; }
.weather-icon--medium { width: 80px; height: 80px; }
.weather-icon--large { width: 160px; height: 160px; }
</style>