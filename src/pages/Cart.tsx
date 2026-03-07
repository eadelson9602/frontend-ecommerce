import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { cartService } from "@/services/cart.service";
import type { CarritoItem } from "@/domain/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function Cart() {
  const { user } = useAuth();
  const [items, setItems] = useState<CarritoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    cartService
      .getCarrito()
      .then((r) => setItems(r.items ?? []))
      .finally(() => setLoading(false));
  }, [user]);

  const updateQty = async (productoId: number, cantidad: number) => {
    try {
      const res = await cartService.actualizarCantidad(productoId, cantidad);
      setItems(res.items ?? []);
    } catch {
      const r = await cartService.getCarrito();
      setItems(r.items ?? []);
    }
  };

  const remove = (productoId: number) => updateQty(productoId, 0);

  if (!user) return null; // PrivateRoute redirige

  if (loading) return <p className="container mx-auto px-4 py-8 text-muted-foreground">Cargando carrito...</p>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-bold mb-8">Carrito</h1>
      {items.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Tu carrito está vacío.</p>
            <Link to="/catalog">
              <Button variant="outline">Seguir comprando</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((it) => (
              <li key={it.productoId} className="flex flex-wrap items-center gap-4 py-4 border-b border-border">
                <div className="w-20 h-20 rounded-md bg-muted flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{it.producto?.nombre ?? `Producto ${it.productoId}`}</p>
                  <p className="text-sm text-muted-foreground">
                    {it.producto?.marca} · {it.producto?.color} · {it.producto?.talla}
                  </p>
                </div>
                <Input
                  type="number"
                  min={0}
                  value={it.cantidad}
                  onChange={(e) => updateQty(it.productoId, Number(e.target.value))}
                  className="w-20"
                />
                <p className="font-semibold w-28 text-right">
                  ${Number((it.producto?.precio ?? 0) * it.cantidad).toLocaleString("es-CO")} COP
                </p>
                <Button variant="ghost" size="sm" onClick={() => remove(it.productoId)}>
                  Eliminar
                </Button>
              </li>
            ))}
          </ul>
          <div className="flex justify-end mt-8">
            <Link to="/checkout">
              <Button>Ir al checkout</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
