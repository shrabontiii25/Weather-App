<script setup lang="ts">
defineProps<{
  temp: number;
}>();
</script>

<template>
  <span class="temp-display">{{ Math.round(temp) }}°</span>
</template>

<style scoped>
.temp-display {
  font-size: 2.5rem;
  font-weight: 700;
}
</style>