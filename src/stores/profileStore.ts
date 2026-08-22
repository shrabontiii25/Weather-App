import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ProfileData } from '../types/profile.types';

const defaultAvatar =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="#b8c6e0"/>
      <circle cx="50" cy="40" r="18" fill="#ffffff"/>
      <path d="M18 90c0-20 14-34 32-34s32 14 32 34" fill="#ffffff"/>
    </svg>`
  );

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<ProfileData>({
    fullName: 'Jane Doe',
    email: 'jane@gmail.com',
    phone: '+1 234 567 89',
    avatarUrl: defaultAvatar,
  });

  function updateProfile(data: ProfileData) {
    profile.value = { ...data };
  }

  return { profile, updateProfile };
});