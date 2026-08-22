<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <main class="detail-page">
    <h1>Detail for: {{ route.params.cityName }}</h1>
  </main>
</template>

<style scoped>
.detail-page {
  padding: 2rem;
  max-width: 400px;
  margin: 0 auto;
}
</style>