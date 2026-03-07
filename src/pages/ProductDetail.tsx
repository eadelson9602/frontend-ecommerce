import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { productService } from "@/services/product.service";
import { cartService } from "@/services/cart.service";
import { useAuth } from "@/context/AuthContext";
import type { Producto } from "@/domain/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Check } from "lucide-react";
import { ProductImage } from "@/components/ProductImage";

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [cantidad, setCantidad] = useState(1);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    productService
      .getById(Number(id))
      .then(setProducto)
      .catch(() => setProducto(null));
  }, [id]);

  const handleAdd = async () => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: `/product/${id}` } } });
      return;
    }
    if (!producto) return;
    setError("");
    try {
      await cartService.agregar(producto.id, cantidad);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    }
  };

  if (!producto && id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold mb-2">Producto no encontrado</h1>
          <Link to="/catalog" className="text-primary hover:underline text-sm">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  if (!producto) return <p className="container mx-auto px-4 py-8 text-muted-foreground">Cargando...</p>;

  const stock = producto.stock ?? 0;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <Link
          to="/catalog"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[3/4] rounded-lg overflow-hidden bg-muted flex items-center justify-center"
          >
            <ProductImage
              src={producto.imagenUrl}
              alt={producto.nombre}
              placeholder={<span className="text-8xl text-muted-foreground">👟</span>}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            <span className="font-display text-xs tracking-[0.2em] uppercase text-muted-foreground">
              {producto.marca}
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">{producto.nombre}</h1>
            <p className="text-muted-foreground mt-2">
              Color: {producto.color} · Talla: {producto.talla}
            </p>
            <div className="flex items-center gap-3 mt-4">
              <span className="font-display text-2xl font-semibold">
                ${Number(producto.precio).toLocaleString("es-CO")} COP
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              {stock > 5 ? "En stock" : stock > 0 ? `¡Solo ${stock} disponibles!` : "Agotado"}
            </p>

            <div className="mt-8 space-y-4">
              <div className="space-y-2">
                <Label>Cantidad</Label>
                <Input
                  type="number"
                  min={1}
                  max={stock}
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                  className="w-24"
                />
              </div>
              <Button
                onClick={handleAdd}
                disabled={stock === 0}
                className="w-full flex items-center justify-center gap-2"
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" /> AGREGADO
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    AGREGAR AL CARRITO
                  </>
                )}
              </Button>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
