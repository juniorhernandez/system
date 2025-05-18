import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import Keycloak from 'keycloak-js'

const app = createApp(App)

// Desactivar Vue Devtools en producción
if (import.meta.env.PROD) {
  (window as any).__VUE_DEVTOOLS_GLOBAL_HOOK__ = undefined
}

app.use(createPinia())
app.use(router)

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID
})

;(window as any).$keycloak = keycloak

keycloak
  .init({ onLoad: 'login-required' })
  .then((authenticated) => {
    if (authenticated) {
      app.mount('#app')
    } else {
      console.warn('No se pudo autenticar')
      window.location.reload()
    }
  })
  .catch((err) => {
    console.error('Error de autenticación', err)
    window.location.reload()
  })
