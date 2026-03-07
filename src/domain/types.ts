export type Rol = "usuario" | "admin";

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: Rol;
}

export interface UsuarioAuth extends Usuario {
  token: string;
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  talla: string;
  color: string;
  marca: string;
  stock: number;
  cantidad?: number;
  imagenUrl?: string | null;
}

export interface FiltrosProducto {
  nombre?: string;
  talla?: string;
  color?: string;
  marca?: string;
  minPrecio?: number;
  maxPrecio?: number;
}

export interface CarritoItem {
  productoId: number;
  cantidad: number;
  producto?: Producto;
}

export interface Carrito {
  id: number;
  usuarioId: number;
}

export interface Pedido {
  id: number;
  usuarioId: number;
  total: number;
  estado: string;
  items?: { productoId: number; cantidad: number; precio: number }[];
}
