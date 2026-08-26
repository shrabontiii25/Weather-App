<script setup lang="ts">
import ProfileForm from '../organisms/ProfileForm.vue';
</script>

<template>
  <main class="edit-profile-page">
    <header class="edit-profile-page__header">
      <router-link to="/" class="icon-btn" aria-label="Back">
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path
            d="M15 18l-6-6 6-6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </router-link>

      <h1>Edit Profile</h1>

      <span class="icon-btn icon-btn--spacer" aria-hidden="true"></span>
    </header>

    <section class="edit-profile-page__content">
      <ProfileForm />
    </section>
  </main>
</template>

<style scoped>
.edit-profile-page {
  width: 375px;
  height: 667px;
  max-width: 100vw;
  max-height: 100dvh;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  background: #f7f7fb;
  color: #20212a;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
    .edit-profile-page__content :deep(*) {
  box-sizing: border-box;
}

.edit-profile-page__content :deep(form) {
  width: 100%;
  max-width: 100%;
}

.edit-profile-page__content :deep(input),
.edit-profile-page__content :deep(button),
.edit-profile-page__content :deep(textarea),
.edit-profile-page__content :deep(select) {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

}

.edit-profile-page__header {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 16px;
  background: #f7f7fb;
}

.edit-profile-page__header h1 {
  margin: 0;
  font-size: 20px;
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.edit-profile-page__content {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 4px 20px 28px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.edit-profile-page__content::-webkit-scrollbar {
  display: none;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #292a33;
  background: rgba(255, 255, 255, 0.78);
  text-decoration: none;
  transition: background 0.2s ease, transform 0.2s ease;
}

.icon-btn:hover {
  background: #ffffff;
  transform: translateX(-1px);
}

.icon-btn--spacer {
  visibility: hidden;
}

@media (min-width: 376px) {
  .edit-profile-page {
    border-radius: 24px;
    box-shadow: 0 18px 50px rgba(41, 48, 86, 0.16);
  }
}
</style>
