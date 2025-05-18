import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import Keycloak from "keycloak-js";

const app = createApp(App);

// Desactivar Vue Devtools en producción
if (import.meta.env.PROD) {
  (window as any).__VUE_DEVTOOLS_GLOBAL_HOOK__ = undefined;
}

// Instancias y plugins
app.use(createPinia());
app.use(router);

// Instancia de Keycloak
const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});


(window as any).$keycloak = keycloak;

keycloak
  .init({
    onLoad: "login-required",
    checkLoginIframe: false,
    flow: "standard",
    pkceMethod: "S256",
    scope: "openid",
  })
  .then((authenticated) => {
    if (authenticated) {
      app.mount("#app");

      if (
        window.location.hash.includes("state") ||
        window.location.href.includes("code=")
      ) {
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }
    } else {
      console.warn("No se pudo autenticar");
      window.location.reload();
    }
  })
  .catch((err) => {
    console.error("Error de autenticación", err);
    window.location.reload();
  });
