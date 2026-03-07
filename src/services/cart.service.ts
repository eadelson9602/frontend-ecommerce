import { client } from "@/data/api/client";
import { api } from "@/data/api/endpoints";
import type { CarritoItem } from "@/domain/types";

interface CarritoResponse {
  carrito: { id: number; usuarioId: number };
  items: CarritoItem[];
}

export const cartService = {
  getCarrito(): Promise<CarritoResponse> {
    return client.get<CarritoResponse>(api.carrito.list);
  },

  agregar(productoId: number, cantidad: number = 1): Promise<{ carritoId: number; items: CarritoItem[] }> {
    return client.post<{ carritoId: number; items: CarritoItem[] }>(api.carrito.agregar, {
      productoId,
      cantidad,
    });
  },

  actualizarCantidad(productoId: number, cantidad: number): Promise<{ items: CarritoItem[] }> {
    return client.patch<{ items: CarritoItem[] }>(api.carrito.item(productoId), { cantidad });
  },
};
