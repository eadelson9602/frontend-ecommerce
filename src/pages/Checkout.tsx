import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { orderService } from "@/services/order.service";
import { cartService } from "@/services/cart.service";
import { useAuth } from "@/context/AuthContext";
import type { CarritoItem } from "@/domain/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCop } from "@/utils/format";

export default function Checkout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<CarritoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!user) return;
    cartService
      .getCarrito()
      .then((r) => setItems(r.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [user]);

  const totalFromCart = items.reduce(
    (sum, it) => sum + (it.producto?.precio ?? 0) * it.cantidad,
    0
  );

  const handlePagarConMercadoPago = async () => {
    setError("");
    setRedirecting(true);
    try {
      const { initPoint } = await orderService.createPreference();
      if (initPoint) {
        window.location.href = initPoint;
      } else {
        setError("No se obtuvo el enlace de pago.");
        setRedirecting(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar el pago");
      setRedirecting(false);
    }
  };

  if (!user) return null;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-muted-foreground">Cargando carrito...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Tu carrito está vacío.</p>
            <Button variant="outline" onClick={() => navigate("/catalog")}>
              Ir al catálogo
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid gap-8 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumen del pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {items.map((it) => (
                  <li
                    key={it.productoId}
                    className="flex justify-between text-sm border-b border-border pb-2"
                  >
                    <span>
                      {it.producto?.nombre ?? `Producto ${it.productoId}`} x
                      {it.cantidad}
                    </span>
                    <span className="font-medium">
                      {formatCop((it.producto?.precio ?? 0) * it.cantidad)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between font-display text-lg font-semibold pt-2">
                <span>Total</span>
                <span>{formatCop(totalFromCart)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pago con Mercado Pago</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Serás redirigido a Mercado Pago para completar el pago de forma
                segura (Checkout Pro).
              </p>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button
                onClick={handlePagarConMercadoPago}
                disabled={redirecting}
                className="w-full bg-[#009ee3] hover:bg-[#0088c4] text-white"
              >
                {redirecting ? "Redirigiendo..." : "Pagar con Mercado Pago"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
