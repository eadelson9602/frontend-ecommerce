import { useEffect, useState } from "react";
import { orderService } from "@/services/order.service";
import type { Pedido } from "@/domain/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCop } from "@/utils/format";

const ESTADOS_EN_CURSO = ["pendiente_pago", "confirmado", "enviado"];

export default function AdminOrders() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService.adminGetAll().then(setPedidos).finally(() => setLoading(false));
  }, []);

  const enCurso = pedidos.filter((p) => ESTADOS_EN_CURSO.includes(p.estado));
  const otros = pedidos.filter((p) => !ESTADOS_EN_CURSO.includes(p.estado));

  if (loading) return <p className="text-muted-foreground">Cargando pedidos...</p>;

  const renderList = (list: Pedido[], title: string) =>
    list.length === 0 ? null : (
      <div className="mb-8">
        <h2 className="font-display text-lg font-semibold mb-4">{title}</h2>
        <ul className="space-y-3">
          {list.map((p) => (
            <li key={p.id}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center justify-between gap-2">
                    Pedido #{p.id}
                    <Badge variant={ESTADOS_EN_CURSO.includes(p.estado) ? "default" : "secondary"}>
                      {p.estado}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Usuario ID: {p.usuarioId} — Total: {formatCop(p.total)}
                  {p.createdAt && (
                    <span className="block mt-1 text-xs">
                      {new Date(p.createdAt).toLocaleString("es-CO", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  )}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Pedidos en curso</h1>
      {pedidos.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No hay pedidos.
          </CardContent>
        </Card>
      ) : (
        <>
          {renderList(enCurso, "En curso")}
          {renderList(otros, "Completados / Otros")}
        </>
      )}
    </div>
  );
}
