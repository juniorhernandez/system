<script setup lang="ts">

const logout = () => {
  (window as any).$keycloak.logout({
    redirectUri: `${window.location.origin}/sistema/`
  })
}
</script>

<template>
  <div class="layout">
    <aside class="sidebar">
      <div>System</div>

      <nav>
        <RouterLink to="/" class="link" active-class="active">Home</RouterLink>
        <RouterLink to="/inventario" class="link" active-class="active">Inventario</RouterLink>
      </nav>

      <hr class="divider" />

      <button class="logout-button" @click="logout">Cerrar sesión</button>
    </aside>

    <main class="content">
      <div class="content-wrapper">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.sidebar {
  width: 220px;
  background-color: #0b1a2d;
  color: #fff;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
}

nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.link {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background 0.3s;
}

.link:hover {
  background-color: #1a2d4d;
}

.active {
  background-color: #4fc3f7;
  color: #0b1a2d;
  font-weight: bold;
}

.divider {
  margin: 1.5rem 0;
  border: none;
  border-top: 1px solid #ffffff44;
}

.logout-button {
  padding: 0.5rem 1rem;
  background-color: #ff5252;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}
.logout-button:hover {
  background-color: #e53935;
}

.content {
  flex: 1;
  display: flex;
  padding: 2rem;
  background-color: #f4f6f8;
  height: 100vh;
  box-sizing: border-box;
}

.content-wrapper {
  flex: 1;
  max-width: 900px;
  margin: 0 auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  overflow-y: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
