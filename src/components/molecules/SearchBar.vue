<script setup lang="ts">
import { ref, watch } from 'vue';
import SearchInput from '../atoms/SearchInput.vue';
import { fetchCitySuggestions, type CitySuggestion } from '../../services/weatherApi';

const emit = defineEmits<{
  search: [city: string];
}>();

const query = ref('');
const validationError = ref('');
const suggestions = ref<CitySuggestion[]>([]);
let debounceTimer: ReturnType<typeof setTimeout>;

watch(query, (newValue) => {
  clearTimeout(debounceTimer);
  if (newValue.trim().length < 3) {
    suggestions.value = [];
    return;
  }
  debounceTimer = setTimeout(async () => {
    const results = await fetchCitySuggestions(newValue);
    suggestions.value = results.filter((city) =>
      city.name.toLowerCase().startsWith(newValue.trim().toLowerCase())
    );
  }, 300);
});

function handleSearch() {
  const trimmed = query.value.trim();
  if (!trimmed) {
    validationError.value = 'Please enter a city name';
    return;
  }
  validationError.value = '';
  emit('search', trimmed);
  query.value = '';
  suggestions.value = [];
}

function selectSuggestion(city: CitySuggestion) {
  emit('search', city.name);
  query.value = '';
  suggestions.value = [];
}
</script>

<template>
  <form class="search-bar" @submit.prevent="handleSearch">
    <SearchInput v-model="query" />
    <p v-if="validationError" class="search-bar__error">{{ validationError }}</p>

    <ul v-if="suggestions.length" class="search-bar__suggestions">
      <li
        v-for="city in suggestions"
        :key="`${city.name}-${city.lat}-${city.lon}`"
        @click="selectSuggestion(city)"
      >
        {{ city.name }}, {{ city.state ? city.state + ', ' : '' }}{{ city.country }}
      </li>
    </ul>
  </form>
</template>

<style scoped>
.search-bar {
  margin-bottom: 1rem;
  position: relative;
}

.search-bar__error {
  color: #c0392b;
  font-size: 0.85rem;
  margin-top: 0.4rem;
}

.search-bar__suggestions {
  list-style: none;
  margin: 0.3rem 0 0;
  padding: 0;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  position: absolute;
  width: 100%;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.search-bar__suggestions li {
  padding: 0.6rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #333;
}

.search-bar__suggestions li:hover {
  background: #f0f4f8;
}
</style>