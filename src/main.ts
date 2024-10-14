import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import router from './router';

import './axios';
import './style.css';
import App from './App.vue';

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.mount('#app');
