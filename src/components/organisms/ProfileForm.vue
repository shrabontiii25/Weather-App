<script setup lang="ts">
import { reactive, ref } from 'vue';
import AvatarUpload from '../atoms/AvatarUpload.vue';
import FormInput from '../atoms/FormInput.vue';
import { useProfileStore } from '../../stores/profileStore';

const store = useProfileStore();

const isEditing = ref(false);
const form = reactive({ ...store.profile });
const errors = reactive<Record<string, string>>({});

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[\d\s-]{7,20}$/;

function validate(): boolean {
  errors.fullName = '';
  errors.email = '';
  errors.phone = '';

  if (!form.fullName.trim()) {
    errors.fullName = 'Full name is required';
  } else if (form.fullName.trim().length > 50) {
    errors.fullName = 'Full name must be under 50 characters';
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!PHONE_PATTERN.test(form.phone.trim())) {
    errors.phone = 'Enter a valid phone number';
  }

  return !errors.fullName && !errors.email && !errors.phone;
}

function handleAvatarChange(url: string) {
  form.avatarUrl = url;
}

function startEditing() {
  isEditing.value = true;
}

function handleSubmit() {
  if (!validate()) return;
  store.updateProfile({ ...form });
  isEditing.value = false;
}
</script>

<template>
  <form class="profile-form" @submit.prevent="handleSubmit">
    <AvatarUpload :avatarUrl="form.avatarUrl" :editable="isEditing" @update:avatarUrl="handleAvatarChange" />

    <FormInput v-model="form.fullName" label="Full Name" :disabled="!isEditing" :error="errors.fullName" :maxlength="50" />
    <FormInput v-model="form.email" label="Email" type="email" :disabled="!isEditing" :error="errors.email" />
    <FormInput v-model="form.phone" label="Phone Number" type="tel" :disabled="!isEditing" :error="errors.phone" :maxlength="20" />

    <button v-if="!isEditing" type="button" class="profile-form__submit" @click="startEditing">Edit</button>
    <button v-else type="submit" class="profile-form__submit">Submit</button>
  </form>
</template>

<style scoped>
.profile-form { text-align: center; }
.profile-form__submit { width: 100%; margin-top: 0.5rem; padding: 0.85rem; border: none; border-radius: 10px; background: #1f2b47; color: white; font-size: 0.95rem; font-weight: 600; cursor: pointer; }
</style>