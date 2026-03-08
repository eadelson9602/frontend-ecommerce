import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const pedidoId = searchParams.get("external_reference") || searchParams.get("payment_id") || "";

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="font-display text-2xl font-bold mb-2">¡Compra confirmada!</h1>
          <p className="text-muted-foreground mb-6">
            Tu pago fue procesado correctamente.
            {pedidoId && (
              <span className="block mt-2 text-sm">
                Nº de pedido: <strong>{pedidoId}</strong>
              </span>
            )}
          </p>
          <Link to="/mis-pedidos">
            <Button className="w-full">Ver mis pedidos</Button>
          </Link>
          <Link to="/catalog" className="block mt-3">
            <Button variant="outline" className="w-full">
              Seguir comprando
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
