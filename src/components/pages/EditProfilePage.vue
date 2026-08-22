<script setup lang="ts">
import ProfileForm from '../organisms/ProfileForm.vue';
</script>

<template>
  <main class="edit-profile-page">
    <header class="edit-profile-page__header">
      <router-link to="/" class="icon-btn" aria-label="Back">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </router-link>
      <h1>Edit Profile</h1>
      <span class="icon-btn icon-btn--spacer" aria-hidden="true"></span>
    </header>

    <ProfileForm />
  </main>
</template>

<style scoped>
.edit-profile-page { min-height: 100vh; padding: 1.5rem 1.25rem 2rem; max-width: 400px; margin: 0 auto; }
.edit-profile-page__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; }
.edit-profile-page__header h1 { font-size: 1.1rem; font-weight: 700; margin: 0; }
.icon-btn { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; color: #333; text-decoration: none; }
.icon-btn--spacer { visibility: hidden; }
</style>