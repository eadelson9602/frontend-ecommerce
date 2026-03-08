import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { cartService } from "@/services/cart.service";
import type { CarritoItem } from "@/domain/types";
import { formatCop } from "@/utils/format";

export function CartDrawer() {
  const { user } = useAuth();
  const { isCartOpen, setIsCartOpen } = useCart();
  const [items, setItems] = useState<CarritoItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isCartOpen || !user) return;
    setLoading(true);
    cartService
      .getCarrito()
      .then((r) => setItems(r.items ?? []))
      .finally(() => setLoading(false));
  }, [isCartOpen, user]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display text-lg font-semibold">Carrito</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-1 hover:text-primary transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {!user ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">Inicia sesión para ver tu carrito</p>
                  <Link to="/login" onClick={() => setIsCartOpen(false)}>
                    <span className="inline-block mt-4 text-sm font-medium text-primary hover:underline">
                      Iniciar sesión →
                    </span>
                  </Link>
                </div>
              ) : loading ? (
                <p className="text-muted-foreground text-center py-8">Cargando...</p>
              ) : items.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">Tu carrito está vacío</p>
                  <Link to="/catalog" onClick={() => setIsCartOpen(false)}>
                    <span className="inline-block mt-4 text-sm font-medium text-primary hover:underline">
                      Explorar catálogo →
                    </span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((it) => (
                    <div key={it.productoId} className="flex gap-3">
                      <div className="w-16 h-20 rounded-md bg-muted flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{it.producto?.nombre ?? `Producto ${it.productoId}`}</p>
                        <p className="text-xs text-muted-foreground">
                          {it.producto?.marca} · x{it.cantidad}
                        </p>
                        <p className="text-sm font-semibold">
                          {formatCop((it.producto?.precio ?? 0) * it.cantidad)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Link to="/cart" onClick={() => setIsCartOpen(false)} className="block mt-6">
                    <span className="text-sm font-medium text-primary hover:underline">Ver carrito completo →</span>
                  </Link>
                  <Link to="/checkout" onClick={() => setIsCartOpen(false)} className="block w-full bg-primary text-primary-foreground text-center py-3.5 rounded-md font-display text-sm font-semibold mt-4">
                    FINALIZAR COMPRA
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
