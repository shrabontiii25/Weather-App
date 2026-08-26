<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <input
    type="text"
    class="search-input"
    placeholder="Search for a city or airport"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<style scoped>
.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 15px;
  border: 1px solid #e1e8f8;
  background: #f4f7fd;
  color: #17233f;
  font-size: .9rem;
  box-sizing: border-box;
  outline: none;
  transition: border-color .2s, box-shadow .2s;
}
.search-input:focus { border-color: #6f91f5; box-shadow: 0 0 0 4px rgba(57,104,239,.12); }
</style>
