<script setup lang="ts">
import { ref } from 'vue';
import SearchInput from '../atoms/SearchInput.vue';

const emit = defineEmits<{
  search: [city: string];
}>();

const query = ref('');
const validationError = ref('');

function handleSearch() {
  const trimmed = query.value.trim();
  if (!trimmed) {
    validationError.value = 'Please enter a city name';
    return;
  }
  validationError.value = '';
  emit('search', trimmed);
  query.value = '';
}
</script>

<template>
  <form class="search-bar" @submit.prevent="handleSearch">
    <SearchInput v-model="query" />
    <p v-if="validationError" class="search-bar__error">{{ validationError }}</p>
  </form>
</template>

<style scoped>
.search-bar {
  margin-bottom: 1rem;
}

.search-bar__error {
  color: #c0392b;
  font-size: 0.85rem;
  margin-top: 0.4rem;
}
</style>