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
  font-size: 2.1rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -.075em;
}
</style>
