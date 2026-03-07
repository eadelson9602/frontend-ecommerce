import { client } from "@/data/api/client";
import { api } from "@/data/api/endpoints";
import type { Producto, FiltrosProducto } from "@/domain/types";

export const productService = {
  getCatalogo(): Promise<Producto[]> {
    return client.get<Producto[]>(api.productos.list);
  },

  filtrar(filtros: FiltrosProducto): Promise<Producto[]> {
    const params = new URLSearchParams();
    if (filtros.nombre) params.set("nombre", filtros.nombre);
    if (filtros.talla) params.set("talla", filtros.talla);
    if (filtros.color) params.set("color", filtros.color);
    if (filtros.marca) params.set("marca", filtros.marca);
    if (filtros.minPrecio != null) params.set("minPrecio", String(filtros.minPrecio));
    if (filtros.maxPrecio != null) params.set("maxPrecio", String(filtros.maxPrecio));
    return client.get<Producto[]>(`${api.productos.filtrar}?${params}`);
  },

  getById(id: number): Promise<Producto> {
    return client.get<Producto>(api.productos.byId(id));
  },

  adminListar(): Promise<Producto[]> {
    return client.get<Producto[]>(api.productos.admin.listar);
  },

  adminCreate(body: { nombre: string; precio: number; talla?: string; color?: string; marca?: string; stock?: number; imagenUrl?: string | null }): Promise<Producto> {
    return client.post<Producto>(api.productos.admin.create, body);
  },

  adminUpdate(id: number, body: Partial<Producto>): Promise<Producto> {
    return client.put<Producto>(api.productos.admin.update(id), body);
  },

  adminDelete(id: number): Promise<void> {
    return client.delete<void>(api.productos.admin.delete(id));
  },

  adminUpdateInventario(id: number, cantidad: number): Promise<{ productoId: number; cantidad: number }> {
    return client.patch<{ productoId: number; cantidad: number }>(
      api.productos.admin.inventario(id),
      { cantidad }
    );
  },
};
