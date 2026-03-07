import { useEffect, useState } from "react";
import { orderService } from "@/services/order.service";
import type { Pedido } from "@/domain/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminOrders() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService.adminGetAll().then(setPedidos).finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="container mx-auto px-4 py-8 text-muted-foreground">Cargando pedidos...</p>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-bold mb-8">Pedidos</h1>
      {pedidos.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No hay pedidos.
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-4">
          {pedidos.map((p) => (
            <li key={p.id}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Pedido #{p.id}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Usuario: {p.usuarioId} — Total: {p.total} € — Estado: {p.estado}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
