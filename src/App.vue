<script setup lang="ts">
import TempDisplay from './components/atoms/TempDisplay.vue';
</script>

<template>
  <main>
    <h1>Weather App</h1>
    <TempDisplay :temp="24.7" />
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
  text-align: center;
}
</style>