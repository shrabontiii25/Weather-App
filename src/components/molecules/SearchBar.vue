<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue';
import SearchInput from '../atoms/SearchInput.vue';
import {
  fetchCitySuggestions,
  type CitySuggestion,
} from '../../services/weatherApi';

const emit = defineEmits<{
  search: [city: string];
}>();

const query = ref('');
const validationError = ref('');
const suggestions = ref<CitySuggestion[]>([]);

let debounceTimer: ReturnType<typeof setTimeout>;
let requestVersion = 0;

function closeSuggestions() {
  clearTimeout(debounceTimer);
  requestVersion += 1;
  suggestions.value = [];
}

watch(query, (newValue) => {
  clearTimeout(debounceTimer);

  const trimmedQuery = newValue.trim();

  if (trimmedQuery.length < 3) {
    suggestions.value = [];
    return;
  }

  const currentRequest = ++requestVersion;

  debounceTimer = setTimeout(async () => {
    try {
      const results = await fetchCitySuggestions(trimmedQuery);

      /*
       * Ignore results if the user selected a city, cleared the input,
       * or typed a different search while this request was loading.
       */
      if (currentRequest !== requestVersion) {
        return;
      }

      suggestions.value = results.filter((city) =>
        city.name.toLowerCase().startsWith(trimmedQuery.toLowerCase()),
      );
    } catch {
      if (currentRequest === requestVersion) {
        suggestions.value = [];
      }
    }
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

  closeSuggestions();
  query.value = '';
}

function selectSuggestion(city: CitySuggestion) {
  emit('search', city.name);

  closeSuggestions();
  query.value = '';
}

onBeforeUnmount(() => {
  clearTimeout(debounceTimer);
});
</script>

<template>
  <form class="search-bar" @submit.prevent="handleSearch">
    <SearchInput v-model="query" />

    <p v-if="validationError" class="search-bar__error">
      {{ validationError }}
    </p>

    <ul v-if="suggestions.length" class="search-bar__suggestions">
      <li
        v-for="city in suggestions"
        :key="`${city.name}-${city.lat}-${city.lon}`"
      >
        <button
          type="button"
          class="search-bar__suggestion-button"
          @click="selectSuggestion(city)"
        >
          {{ city.name }}, {{ city.state ? `${city.state}, ` : '' }}{{
            city.country
          }}
        </button>
      </li>
    </ul>
  </form>
</template>

<style scoped>
.search-bar {
  position: relative;
  z-index: 20;
  flex: 0 0 auto;
  margin-bottom: 0.65rem;
}

.search-bar__error {
  margin: 0.4rem 0 0;
  color: #c0392b;
  font-size: 0.72rem;
}

.search-bar__suggestions {
  position: absolute;
  z-index: 30;
  top: calc(100% + 0.32rem);
  right: 0;
  left: 0;
  max-height: 242px;
  margin: 0;
  padding: 0.25rem 0;
  overflow-y: auto;
  list-style: none;
  border: 1px solid #e3e9f7;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 12px 28px rgba(43, 67, 128, 0.14);
}

.search-bar__suggestion-button {
  display: block;
  width: 100%;
  padding: 0.72rem 1rem;
  border: 0;
  background: transparent;
  color: #31313b;
  cursor: pointer;
  font: inherit;
  font-size: 0.82rem;
  line-height: 1.35;
  text-align: left;
}

.search-bar__suggestion-button:hover,
.search-bar__suggestion-button:focus-visible {
  outline: none;
  background: #f0f4ff;
}
</style>
