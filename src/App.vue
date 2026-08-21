<script setup lang="ts">
import CityCard from './components/molecules/CityCard.vue';
</script>

<template>
  <main>
    <h1>Weather App</h1>
    <CityCard
      cityName="My Location"
      subtitle="Bangsar South"
      :temp="24"
      condition="Moderate Rain"
      :high="30"
      :low="25"
    />
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
  max-width: 400px;
  margin: 0 auto;
}
</style>