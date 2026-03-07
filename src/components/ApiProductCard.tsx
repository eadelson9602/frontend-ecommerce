import { Link } from "react-router-dom";
import { ProductImage } from "@/components/ProductImage";
import type { Producto } from "@/domain/types";

interface ApiProductCardProps {
  product: Producto;
  index?: number;
}

export function ApiProductCard({ product }: ApiProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-muted aspect-[3/4] flex items-center justify-center">
        <ProductImage src={product.imagenUrl} alt={product.nombre} />
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{product.marca}</p>
        <h3 className="font-display text-sm font-medium leading-snug">{product.nombre}</h3>
        <p className="text-xs text-muted-foreground">
          {product.color} · {product.talla}
        </p>
        <p className="font-display text-sm font-semibold">
          ${Number(product.precio).toLocaleString("es-CO")} COP
        </p>
      </div>
    </Link>
  );
}
