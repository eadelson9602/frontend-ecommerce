import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { orderService } from "@/services/order.service";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Checkout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await orderService.checkout("tarjeta");
      navigate("/mis-pedidos", { state: { message: "Pedido confirmado" } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al procesar el pedido");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-display text-3xl font-bold mb-10">Checkout</h1>

        <div className="max-w-md">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Simulación de pago: método tarjeta. Confirma para crear el pedido.
              </p>
              {error && <p className="text-sm text-destructive mb-4">{error}</p>}
              <form onSubmit={handleSubmit}>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Procesando..." : "Confirmar pedido (simulación de pago)"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
