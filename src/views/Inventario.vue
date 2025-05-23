<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
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

const nuevoProducto = ref<Partial<Producto>>({
  nombre: '',
  descripcion: '',
  precio: 0,
  stock: 0
})

const editandoId = ref<number | null>(null)

const cargarProductos = async () => {
  try {
    const response = await axios.get(API_URL)

    if (response.status === 200 && Array.isArray(response.data)) {
      productos.value = response.data.map((item: any) => ({
        id: item.id,
        nombre: item.nombre,
        descripcion: item.descripcion,
        precio: item.precio,
        stock: item.stock,
        usuario: item.usuario,
        fecha: item.fecha
      }))
    } else {
      throw new Error('Respuesta inesperada del servidor')
    }
  } catch (error) {
    console.error('Error al cargar productos:', error)
    Swal.fire('Error', 'No se pudieron cargar los productos.', 'error')
  }
}

const crearProducto = async () => {
  try {
    const producto = {
      nombre: nuevoProducto.value.nombre || '',
      descripcion: nuevoProducto.value.descripcion || '',
      precio: parseFloat((nuevoProducto.value.precio || 0).toFixed(2)),
      stock: nuevoProducto.value.stock || 0,
      usuario: 'admin'
    }

    await axios.post(API_URL, producto)
    await Swal.fire('Producto agregado', 'El producto se agregó correctamente.', 'success')
    limpiarFormulario()
    await cargarProductos()
  } catch (error) {
    console.error('Error al crear producto:', error)
    Swal.fire('Error', 'No se pudo crear el producto.', 'error')
  }
}

const actualizarProducto = async () => {
  if (!editandoId.value) return

  try {
    const productoActualizado = {
      nombre: nuevoProducto.value.nombre || '',
      descripcion: nuevoProducto.value.descripcion || '',
      precio: parseFloat((nuevoProducto.value.precio || 0).toFixed(2)),
      stock: nuevoProducto.value.stock || 0,
      usuario: 'admin'
    }

    await axios.put(`${API_URL}/${editandoId.value}`, productoActualizado)
    await Swal.fire('Producto actualizado', 'Los cambios se guardaron correctamente.', 'success')
    limpiarFormulario()
    await cargarProductos()
  } catch (error) {
    console.error('Error al actualizar producto:', error)
    Swal.fire('Error', 'No se pudo actualizar el producto.', 'error')
  }
}

const eliminarProducto = async (id: number) => {
  const result = await Swal.fire({
    title: '¿Eliminar este producto?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#0b1a2d',
    cancelButtonColor: '#aaa',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  })

  if (!result.isConfirmed) return

  try {
    await axios.delete(`${API_URL}/${id}`)
    await Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success')
    await cargarProductos()
    if (editandoId.value === id) limpiarFormulario()
  } catch (error) {
    console.error('Error al eliminar producto:', error)
    Swal.fire('Error', 'No se pudo eliminar el producto.', 'error')
  }
}

const editar = (producto: Producto) => {
  editandoId.value = producto.id
  nuevoProducto.value = { ...producto }
}

const limpiarFormulario = () => {
  nuevoProducto.value = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0
  }
  editandoId.value = null
}

onMounted(cargarProductos)
</script>

<template>
  <div class="container">
    <h1 class="title">Inventario de Ferretería</h1>

    <form class="form" @submit.prevent="editandoId ? actualizarProducto() : crearProducto()">
      <input v-if="editandoId" :value="editandoId" type="number" placeholder="ID" disabled />
      <input v-model="nuevoProducto.nombre" type="text" placeholder="Nombre" required />
      <input v-model="nuevoProducto.descripcion" type="text" placeholder="Descripción" required />
      <input v-model.number="nuevoProducto.precio" type="number" step="0.01" min="0" placeholder="Precio" required />
      <input v-model.number="nuevoProducto.stock" type="number" min="0" placeholder="Stock" required />
      <div class="form-actions">
        <button type="submit" class="btn primary">{{ editandoId ? 'Actualizar' : 'Agregar' }}</button>
        <button v-if="editandoId" type="button" class="btn secondary" @click="limpiarFormulario">Cancelar</button>
      </div>
    </form>

    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productos" :key="producto.id">
          <td>{{ producto.id }}</td>
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.descripcion }}</td>
          <td>Q{{ producto.precio.toFixed(2) }}</td>
          <td>{{ producto.stock }}</td>
          <td>{{ new Date(producto.fecha).toLocaleString() }}</td>
          <td>
            <button @click="editar(producto)" class="btn edit">Editar</button>
            <button @click="eliminarProducto(producto.id)" class="btn delete">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>



<style scoped>
.container {
  max-width: 1000px;
  margin: auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  font-family: 'Segoe UI', sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.title {
  font-size: 2rem;
  color: #0b1a2d;
  margin-bottom: 1rem;
  border-bottom: 2px solid #0b1a2d;
  padding-bottom: 0.5rem;
}

.form {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.form input {
  padding: 0.6rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.95rem;
}

.form input:focus {
  border-color: #0b1a2d;
  outline: none;
}

.form-actions {
  grid-column: span 2;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.95rem;
}

.btn.primary {
  background-color: #0b1a2d;
  color: white;
}

.btn.secondary {
  background-color: #ccc;
  color: #000;
}

.btn.edit {
  background-color: #f4b400;
  color: white;
  margin-right: 0.5rem;
}

.btn.delete {
  background-color: #d32f2f;
  color: white;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
}

.table thead {
  background-color: #0b1a2d;
  color: white;
}

.table th,
.table td {
  text-align: left;
  padding: 0.9rem 1rem;
  border-bottom: 1px solid #eee;
  font-size: 0.95rem;
}

.table td {
  color: #0b1a2d;
}
</style>
