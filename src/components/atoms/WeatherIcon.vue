<script setup lang="ts">
defineProps<{
  iconCode: string;
  description: string;
}>();
</script>

<template>
  <img
    :src="`https://openweathermap.org/img/wn/${iconCode}@2x.png`"
    :alt="description"
    class="weather-icon"
  />
</template>

<style scoped>
.weather-icon {
  width: 60px;
  height: 60px;
}
</style>