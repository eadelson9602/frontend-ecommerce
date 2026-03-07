import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Check } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold mb-2">Producto no encontrado</h1>
          <Link to="/catalog" className="text-accent hover:underline text-sm">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    if (!selectedSize || !selectedColor) return;
    addItem(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <Link to="/catalog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[3/4] rounded-lg overflow-hidden bg-muted"
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            <span className="font-display text-xs tracking-[0.2em] uppercase text-muted-foreground">
              {product.brand}
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">{product.name}</h1>

            <div className="flex items-center gap-3 mt-4">
              <span className="font-display text-2xl font-semibold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>

            <p className="font-body text-muted-foreground mt-6 leading-relaxed">{product.description}</p>

            {/* Color */}
            <div className="mt-8">
              <h3 className="font-display text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                Color {selectedColor && `— ${selectedColor}`}
              </h3>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-9 h-9 rounded-full border-2 transition-all ${
                      selectedColor === c.name ? "border-accent scale-110 shadow-gold" : "border-border hover:scale-105"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mt-6">
              <h3 className="font-display text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                Talla
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-[44px] px-4 py-2.5 text-sm font-display font-medium rounded-md border transition-all ${
                      selectedSize === s
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock */}
            <p className="text-xs text-muted-foreground mt-4">
              {product.stock > 5 ? "En stock" : product.stock > 0 ? `¡Solo ${product.stock} disponibles!` : "Agotado"}
            </p>

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              disabled={!selectedSize || !selectedColor || product.stock === 0}
              className={`mt-6 flex items-center justify-center gap-2 py-4 rounded-md font-display text-sm font-semibold tracking-wide transition-all duration-300 ${
                added
                  ? "bg-success text-primary-foreground"
                  : "bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              }`}
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" /> AGREGADO
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  {!selectedSize || !selectedColor ? "SELECCIONA TALLA Y COLOR" : "AGREGAR AL CARRITO"}
                </>
              )}
            </button>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20 mb-10">
            <h2 className="font-display text-2xl font-bold mb-8">También te puede gustar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
