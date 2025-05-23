import { defineStore } from 'pinia'

export interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: number
  stock: number
  usuario: string
  fecha: string
}

export const useProductoStore = defineStore('producto', {
  state: () => ({
    productos: [] as Producto[]
  }),

  actions: {
    setProductos(productos: Producto[]) {
      this.productos = productos
    },
    agregarProducto(producto: Producto) {
      this.productos.push(producto)
    },
    actualizarProducto(producto: Producto) {
      const index = this.productos.findIndex(p => p.id === producto.id)
      if (index !== -1) this.productos[index] = producto
    },
    eliminarProducto(id: number) {
      this.productos = this.productos.filter(p => p.id !== id)
    },
    obtenerTodos() {
      return this.productos
    }
  }
})
