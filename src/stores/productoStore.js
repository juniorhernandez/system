import { defineStore } from 'pinia';
export const useProductoStore = defineStore('producto', {
    state: () => ({
        productos: [],
    }),
    actions: {
        agregarProducto(producto) {
            this.productos.push(producto);
        },
        actualizarProducto(producto) {
            const index = this.productos.findIndex(p => p.id === producto.id);
            if (index !== -1)
                this.productos[index] = producto;
        },
        eliminarProducto(id) {
            this.productos = this.productos.filter(p => p.id !== id);
        },
        obtenerTodos() {
            return this.productos;
        }
    }
});
