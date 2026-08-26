import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'home', component: () => import('../components/pages/HomePage.vue') },
  { path: '/city/:cityName', name: 'detail', component: () => import('../components/pages/DetailPage.vue') },
  { path: '/profile', name: 'profile', component: () => import('../components/pages/EditProfilePage.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
