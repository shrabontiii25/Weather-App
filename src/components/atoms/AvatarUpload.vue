<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  avatarUrl: string;
  editable?: boolean;
}>();

const emit = defineEmits<{
  'update:avatarUrl': [url: string];
}>();

const fileInput = ref<HTMLInputElement | null>(null);

function triggerPicker() {
  if (!props.editable) return;
  fileInput.value?.click();
}

function handleFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const objectUrl = URL.createObjectURL(file);
  emit('update:avatarUrl', objectUrl);
}
</script>

<template>
  <div class="avatar" :class="{ 'avatar--editable': editable }" @click="triggerPicker">
    <img :src="avatarUrl" alt="Profile photo" class="avatar__image" />
    <span v-if="editable" class="avatar__edit-badge" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 20h9" stroke-linecap="round" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
    <input
      v-if="editable"
      ref="fileInput"
      type="file"
      accept="image/*"
      class="avatar__file-input"
      aria-label="Upload profile photo"
      @change="handleFileChange"
    />
  </div>
</template>

<style scoped>
.avatar { position: relative; width: 88px; height: 88px; margin: 0 auto 1.25rem; }
.avatar--editable { cursor: pointer; }
.avatar__image { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 3px solid #dbe6f5; }
.avatar__edit-badge { position: absolute; bottom: 0; right: 0; width: 28px; height: 28px; border-radius: 50%; background: #4a6fa5; color: white; display: flex; align-items: center; justify-content: center; border: 2px solid white; }
.avatar__file-input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
</style>