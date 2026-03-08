import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CheckoutPending() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-4">
            <Clock className="h-16 w-16 text-amber-600" />
          </div>
          <h1 className="font-display text-2xl font-bold mb-2">Pago pendiente</h1>
          <p className="text-muted-foreground mb-6">
            Tu pago está siendo procesado. Te notificaremos cuando se confirme.
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
