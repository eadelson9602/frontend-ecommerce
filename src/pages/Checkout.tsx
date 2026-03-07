import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
          <h1 className="font-display text-3xl font-bold mb-2">¡Pedido confirmado!</h1>
          <p className="text-muted-foreground font-body mb-6">
            Recibirás un correo con los detalles de tu compra.
          </p>
          <Link
            to="/"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-md font-display text-sm font-semibold"
          >
            VOLVER AL INICIO
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold mb-2">Tu carrito está vacío</h1>
          <Link to="/catalog" className="text-accent hover:underline text-sm">
            Ir al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-display text-3xl font-bold mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-8">
            <section>
              <h2 className="font-display text-lg font-semibold mb-4">Información de contacto</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  required
                  placeholder="Nombre"
                  className="w-full border border-border rounded-md px-4 py-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <input
                  required
                  placeholder="Apellido"
                  className="w-full border border-border rounded-md px-4 py-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="md:col-span-2 w-full border border-border rounded-md px-4 py-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </section>

            <section>
              <h2 className="font-display text-lg font-semibold mb-4">Dirección de envío</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  required
                  placeholder="Dirección"
                  className="md:col-span-2 w-full border border-border rounded-md px-4 py-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <input
                  required
                  placeholder="Ciudad"
                  className="w-full border border-border rounded-md px-4 py-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <input
                  required
                  placeholder="Código postal"
                  className="w-full border border-border rounded-md px-4 py-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </section>

            <section>
              <h2 className="font-display text-lg font-semibold mb-4">Pago (simulado)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  required
                  placeholder="Número de tarjeta"
                  className="md:col-span-2 w-full border border-border rounded-md px-4 py-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <input
                  required
                  placeholder="MM/AA"
                  className="w-full border border-border rounded-md px-4 py-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <input
                  required
                  placeholder="CVV"
                  className="w-full border border-border rounded-md px-4 py-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </section>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-4 rounded-md font-display text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity"
            >
              CONFIRMAR PEDIDO — ${totalPrice.toFixed(2)}
            </button>
          </form>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="bg-muted/50 rounded-lg p-6 sticky top-24">
              <h2 className="font-display text-lg font-semibold mb-6">Resumen</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-18 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.selectedSize} · {item.selectedColor} · x{item.quantity}
                      </p>
                    </div>
                    <span className="font-display text-sm font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm font-body">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-body">
                  <span className="text-muted-foreground">Envío</span>
                  <span className="text-success">Gratis</span>
                </div>
                <div className="flex justify-between font-display font-semibold text-lg pt-2 border-t border-border">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
