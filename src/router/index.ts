import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import InventarioView from '@/views/Inventario.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/inventario',
    name: 'inventario',
    component: InventarioView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
