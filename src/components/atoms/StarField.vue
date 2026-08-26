<script setup lang="ts">
const stars = Array.from({ length: 40 }, () => ({
  top: `${Math.random() * 60}%`,
  left: `${Math.random() * 100}%`,
  size: `${1 + Math.random() * 2}px`,
  opacity: 0.3 + Math.random() * 0.5,
}));
</script>

<template>
  <div class="star-field">
    <span
      v-for="(star, i) in stars"
      :key="i"
      class="star"
      :style="{ top: star.top, left: star.left, width: star.size, height: star.size, opacity: star.opacity }"
    ></span>
  </div>
</template>

<style scoped>
.star-field {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
}
</style>