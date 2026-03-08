/** Endpoints del backend (universidad/backend-ecommerce) */
const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const api = {
  base: BASE,
  auth: {
    registro: `${BASE}/api/auth/registro`,
    login: `${BASE}/api/auth/login`,
    usuarios: `${BASE}/api/auth/usuarios`,
  },
  productos: {
    list: `${BASE}/api/productos`,
    filtrar: `${BASE}/api/productos/filtrar`,
    byId: (id: number) => `${BASE}/api/productos/${id}`,
    admin: {
      listar: `${BASE}/api/productos/admin/listar`,
      create: `${BASE}/api/productos/admin`,
      update: (id: number) => `${BASE}/api/productos/admin/${id}`,
      delete: (id: number) => `${BASE}/api/productos/admin/${id}`,
      inventario: (id: number) => `${BASE}/api/productos/admin/${id}/inventario`,
    },
  },
  carrito: {
    list: `${BASE}/api/carrito`,
    agregar: `${BASE}/api/carrito/agregar`,
    item: (productoId: number) => `${BASE}/api/carrito/item/${productoId}`,
  },
  pedidos: {
    checkout: `${BASE}/api/pedidos/checkout`,
    createPreference: `${BASE}/api/pedidos/create-preference`,
    misPedidos: `${BASE}/api/pedidos/mis-pedidos`,
    byId: (id: number) => `${BASE}/api/pedidos/${id}`,
    admin: `${BASE}/api/pedidos/admin`,
  },
  pagos: {
    /** Detalle de un pago (motivo de rechazo). Query: ?payment_id=xxx */
    detalle: `${BASE}/api/pagos/detalle`,
  },
} as const;
