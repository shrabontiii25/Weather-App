import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/pages/HomePage.vue';
import DetailPage from '../components/pages/DetailPage.vue';

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/city/:cityName', name: 'detail', component: DetailPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;