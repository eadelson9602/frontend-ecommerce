import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/data/api/endpoints";
import { client } from "@/data/api/client";

type DetallePago = {
  payment_id: string;
  status?: string;
  status_detail?: string;
  message: string;
};

export default function CheckoutFailure() {
  const [searchParams] = useSearchParams();
  const [detalle, setDetalle] = useState<DetallePago | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = searchParams.get("payment_id");
    if (!id?.trim()) {
      setLoading(false);
      return;
    }
    const url = `${api.pagos.detalle}?payment_id=${encodeURIComponent(id)}`;
    client
      .get<DetallePago>(url)
      .then(setDetalle)
      .catch(() => setDetalle(null))
      .finally(() => setLoading(false));
  }, [searchParams]);

  const mensajeDetalle = detalle?.message;
  const textoPrincipal =
    mensajeDetalle ??
    "El pago fue cancelado o no pudo procesarse. Puedes intentar de nuevo desde el carrito.";

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-4">
            <XCircle className="h-16 w-16 text-destructive" />
          </div>
          <h1 className="font-display text-2xl font-bold mb-2">
            Pago no completado
          </h1>
          {loading ? (
            <p className="text-muted-foreground mb-6">Cargando detalles…</p>
          ) : (
            <p className="text-muted-foreground mb-6">{textoPrincipal}</p>
          )}
          {detalle?.status_detail && (
            <p className="text-sm text-muted-foreground mb-4 font-mono">
              Código: {detalle.status_detail}
            </p>
          )}
          <Link to="/cart">
            <Button className="w-full">Volver al carrito</Button>
          </Link>
          <Link to="/catalog" className="block mt-3">
            <Button variant="outline" className="w-full">
              Ir al catálogo
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
