import { client } from "@/data/api/client";
import { api } from "@/data/api/endpoints";
import type { Pedido } from "@/domain/types";

export const orderService = {
  checkout(metodoPago?: string): Promise<{ message: string; pedido: { id: number; total: number; estado: string } }> {
    return client.post(api.pedidos.checkout, { metodoPago: metodoPago ?? "tarjeta" });
  },

  /** Checkout Pro: crea preferencia y devuelve init_point para redirigir a Mercado Pago. */
  createPreference(): Promise<{ pedidoId: number; initPoint: string }> {
    return client.post(api.pedidos.createPreference, {});
  },

  getMisPedidos(): Promise<Pedido[]> {
    return client.get<Pedido[]>(api.pedidos.misPedidos);
  },

  getById(id: number): Promise<Pedido> {
    return client.get<Pedido>(api.pedidos.byId(id));
  },

  adminGetAll(): Promise<Pedido[]> {
    return client.get<Pedido[]>(api.pedidos.admin);
  },
};
