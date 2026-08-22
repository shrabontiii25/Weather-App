<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  maxlength?: number;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();

const inputId = `field-${props.label.toLowerCase().replace(/\s+/g, '-')}`;
</script>

<template>
  <div class="form-input">
    <label :for="inputId" class="form-input__label">{{ label }}</label>
    <input
      :id="inputId"
      class="form-input__control"
      :class="{ 'form-input__control--error': !!error }"
      :type="type ?? 'text'"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :maxlength="maxlength"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${inputId}-error` : undefined"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p v-if="error" :id="`${inputId}-error`" class="form-input__error" role="alert">
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
.form-input { margin-bottom: 1.1rem; text-align: left; }
.form-input__label { display: block; font-size: 0.8rem; font-weight: 600; color: #666; margin-bottom: 0.3rem; }
.form-input__control { width: 100%; padding: 0.7rem 0.85rem; border-radius: 10px; border: 1px solid #ddd; font-size: 0.95rem; background: #fff; color: #222; }
.form-input__control:disabled { background: #f5f5f5; color: #888; }
.form-input__control:focus { outline: none; border-color: #4a6fa5; box-shadow: 0 0 0 2px rgba(74, 111, 165, 0.15); }
.form-input__control--error { border-color: #c0392b; }
.form-input__control--error:focus { box-shadow: 0 0 0 2px rgba(192, 57, 43, 0.15); }
.form-input__error { color: #c0392b; font-size: 0.78rem; margin-top: 0.3rem; }
</style>