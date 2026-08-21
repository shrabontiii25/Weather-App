import { fetchCurrentWeather } from './services/weatherApi';
fetchCurrentWeather('London').then(data => console.log(data));

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
