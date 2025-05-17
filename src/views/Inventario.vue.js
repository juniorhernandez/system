import { ref } from 'vue';
import Swal from 'sweetalert2';
import { useProductoStore } from '@/stores/productoStore';
const productoStore = useProductoStore();
const nuevoProducto = ref({
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0
});
const editandoId = ref(null);
const crearProducto = async () => {
    const producto = {
        id: Date.now(),
        nombre: nuevoProducto.value.nombre || '',
        descripcion: nuevoProducto.value.descripcion || '',
        precio: parseFloat((nuevoProducto.value.precio || 0).toFixed(2)),
        stock: nuevoProducto.value.stock || 0
    };
    productoStore.agregarProducto(producto);
    await Swal.fire('Producto agregado', 'El producto se agregó correctamente.', 'success');
    limpiarFormulario();
};
const actualizarProducto = async () => {
    if (!editandoId.value)
        return;
    const productoActualizado = {
        id: editandoId.value,
        nombre: nuevoProducto.value.nombre || '',
        descripcion: nuevoProducto.value.descripcion || '',
        precio: parseFloat((nuevoProducto.value.precio || 0).toFixed(2)),
        stock: nuevoProducto.value.stock || 0
    };
    productoStore.actualizarProducto(productoActualizado);
    await Swal.fire('Producto actualizado', 'Los cambios se guardaron correctamente.', 'success');
    limpiarFormulario();
};
const eliminarProducto = async (id) => {
    const result = await Swal.fire({
        title: '¿Eliminar este producto?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0b1a2d',
        cancelButtonColor: '#aaa',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });
    if (!result.isConfirmed)
        return;
    productoStore.eliminarProducto(id);
    if (editandoId.value === id) {
        limpiarFormulario();
    }
    await Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
};
const editar = (producto) => {
    editandoId.value = producto.id;
    nuevoProducto.value = { ...producto };
};
const limpiarFormulario = () => {
    nuevoProducto.value = {
        nombre: '',
        descripcion: '',
        precio: 0,
        stock: 0
    };
    editandoId.value = null;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['form']} */ ;
/** @type {__VLS_StyleScopedClasses['form']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['table']} */ ;
/** @type {__VLS_StyleScopedClasses['table']} */ ;
/** @type {__VLS_StyleScopedClasses['table']} */ ;
/** @type {__VLS_StyleScopedClasses['table']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (...[$event]) => {
            __VLS_ctx.editandoId ? __VLS_ctx.actualizarProducto() : __VLS_ctx.crearProducto();
        } },
    ...{ class: "form" },
});
if (__VLS_ctx.editandoId) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        value: (__VLS_ctx.editandoId),
        type: "number",
        placeholder: "ID",
        disabled: true,
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    value: (__VLS_ctx.nuevoProducto.nombre),
    type: "text",
    placeholder: "Nombre",
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    value: (__VLS_ctx.nuevoProducto.descripcion),
    type: "text",
    placeholder: "Descripción",
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "number",
    step: "0.01",
    min: "0",
    placeholder: "Precio",
    required: true,
});
(__VLS_ctx.nuevoProducto.precio);
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "number",
    min: "0",
    placeholder: "Stock",
    required: true,
});
(__VLS_ctx.nuevoProducto.stock);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-actions" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "btn primary" },
});
(__VLS_ctx.editandoId ? 'Actualizar' : 'Agregar');
if (__VLS_ctx.editandoId) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.limpiarFormulario) },
        type: "button",
        ...{ class: "btn secondary" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
    ...{ class: "table" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
for (const [producto] of __VLS_getVForSourceType((__VLS_ctx.productoStore.productos))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        key: (producto.id),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (producto.id);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (producto.nombre);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (producto.descripcion);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (producto.precio.toFixed(2));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (producto.stock);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.editar(producto);
            } },
        ...{ class: "btn edit" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.eliminarProducto(producto.id);
            } },
        ...{ class: "btn delete" },
    });
}
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['form']} */ ;
/** @type {__VLS_StyleScopedClasses['form-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['table']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['edit']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['delete']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            productoStore: productoStore,
            nuevoProducto: nuevoProducto,
            editandoId: editandoId,
            crearProducto: crearProducto,
            actualizarProducto: actualizarProducto,
            eliminarProducto: eliminarProducto,
            editar: editar,
            limpiarFormulario: limpiarFormulario,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
