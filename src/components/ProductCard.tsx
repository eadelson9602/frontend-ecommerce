import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative overflow-hidden rounded-lg bg-muted aspect-[3/4]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                Nuevo
              </span>
            )}
            {discount > 0 && (
              <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-1 rounded-sm">
                -{discount}%
              </span>
            )}
          </div>

          {/* Quick view on hover */}
          <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-background/90 backdrop-blur-sm rounded-md py-2 text-center text-xs font-display font-medium tracking-wide">
              VER PRODUCTO
            </div>
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{product.brand}</p>
          <h3 className="font-display text-sm font-medium leading-snug">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-semibold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>

          {/* Color dots */}
          <div className="flex gap-1 pt-1">
            {product.colors.map((c) => (
              <span
                key={c.name}
                className="w-3 h-3 rounded-full border border-border"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
