<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: number
  stock: number
  usuario: string
  fecha: string
}

const API_URL = import.meta.env.VITE_API_URL + '/inventory'
const productos = ref<Producto[]>([])

const cargarProductos = async () => {
  try {
    const response = await axios.get(API_URL)
    productos.value = response.data
  } catch (error) {
    console.error('Error al obtener productos para el dashboard', error)
  }
}

onMounted(cargarProductos)

const totalProductos = computed(() => productos.value.length)

const productosCriticos = computed(() =>
  productos.value.filter(producto => producto.stock < 10)
)

const totalDinero = computed(() =>
  productos.value.reduce((total, producto) => {
    return total + producto.precio * producto.stock
  }, 0)
)

const productoReciente = computed(() => {
  if (!productos.value.length) return null
  return [...productos.value].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())[0]
})

const fechaReciente = computed(() =>
  productoReciente.value ? new Date(productoReciente.value.fecha).toLocaleString() : 'Sin datos'
)
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard de Inventario</h1>

    <div class="dashboard-cards">
      <div class="card">
        <h3>Tipos de herramientas</h3>
        <p>{{ totalProductos }}</p>
      </div>

      <div class="card">
        <h3>Stock crítico (&lt; 10)</h3>
        <p>{{ productosCriticos.length }}</p>
        <ul>
          <li v-for="producto in productosCriticos" :key="producto.id">
            {{ producto.nombre }} (Stock: {{ producto.stock }})
          </li>
        </ul>
      </div>

      <div class="card">
        <h3>Total en inventario</h3>
        <p>Q{{ totalDinero.toFixed(2) }}</p>
      </div>

      <div class="card">
        <h3>Último producto agregado</h3>
        <p>{{ productoReciente?.nombre || 'Ninguno' }}</p>
        <small>Fecha: {{ fechaReciente }}</small>
      </div>
    </div>
  </div>
</template>


<style scoped>
.dashboard {
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.dashboard h1 {
  margin-bottom: 2rem;
  color: #0b1a2d;
}

.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.card {
  background-color: #f4f4f4;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.card h3 {
  margin-bottom: 0.5rem;
  color: #0b1a2d;
}

.card p {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.card ul {
  margin-top: 0.5rem;
  padding-left: 1.2rem;
}
</style>
