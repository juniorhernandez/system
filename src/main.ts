import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

if (import.meta.env.PROD) {
  (window as any).__VUE_DEVTOOLS_GLOBAL_HOOK__ = undefined;
}

app.use(createPinia());
app.use(router);
app.mount('#app');