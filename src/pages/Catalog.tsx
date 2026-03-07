import { useState, useEffect } from "react";
import { productService } from "@/services/product.service";
import type { Producto, FiltrosProducto } from "@/domain/types";
import { ApiProductCard } from "@/components/ApiProductCard";
import { SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Rangos en COP (productos vienen de la base de datos del backend)
const priceRanges = [
  { label: "Hasta $150.000", min: 0, max: 150000 },
  { label: "$150.000 - $400.000", min: 150000, max: 400000 },
  { label: "$400.000 - $600.000", min: 400000, max: 600000 },
  { label: "Más de $600.000", min: 600000, max: Infinity },
];

export default function Catalog() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState<FiltrosProducto>({});
  const [sortBy, setSortBy] = useState("nombre");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [marcas, setMarcas] = useState<string[]>([]);
  const [tallas, setTallas] = useState<string[]>([]);
  const [colores, setColores] = useState<string[]>([]);

  // Productos desde la base de datos (API backend: GET /api/productos o /api/productos/filtrar)
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const hasFiltros = Object.keys(filtros).some(
      (k) => filtros[k as keyof FiltrosProducto] != null && filtros[k as keyof FiltrosProducto] !== ""
    );
    (hasFiltros ? productService.filtrar(filtros) : productService.getCatalogo())
      .then((data) => {
        if (!cancelled) {
          setProductos(data);
          setMarcas([...new Set(data.map((p) => p.marca).filter(Boolean))].sort());
          setTallas([...new Set(data.map((p) => p.talla).filter(Boolean))].sort());
          setColores([...new Set(data.map((p) => p.color).filter(Boolean))].sort());
        }
      })
      .catch(() => {
        if (!cancelled) setProductos([]);
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [filtros]);

  const filtered = [...productos].sort((a, b) => {
    if (sortBy === "precio-asc") return a.precio - b.precio;
    if (sortBy === "precio-desc") return b.precio - a.precio;
    return a.nombre.localeCompare(b.nombre);
  });

  const activeFilterCount = [
    filtros.marca,
    filtros.talla,
    filtros.color,
    filtros.minPrecio != null,
    filtros.maxPrecio != null,
  ].filter(Boolean).length;

  const clearAll = () => setFiltros({});

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-6">
      <h3 className="font-display text-xs font-semibold tracking-widest uppercase mb-3 text-muted-foreground">
        {title}
      </h3>
      {children}
    </div>
  );

  const filterContent = (
    <>
      <FilterSection title="Marca">
        <div className="space-y-2">
          {marcas.map((b) => (
            <label key={b} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="marca"
                checked={filtros.marca === b}
                onChange={() => setFiltros((f) => ({ ...f, marca: f.marca === b ? undefined : b }))}
                className="rounded border-border accent-accent"
              />
              <span className="text-sm">{b}</span>
            </label>
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Talla">
        <div className="flex flex-wrap gap-2">
          {tallas.map((s) => (
            <button
              key={s}
              onClick={() => setFiltros((f) => ({ ...f, talla: f.talla === s ? undefined : s }))}
              className={`px-3 py-1.5 text-xs font-medium rounded-md border ${
                filtros.talla === s
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Color">
        <div className="flex flex-wrap gap-2">
          {colores.map((c) => (
            <button
              key={c}
              onClick={() => setFiltros((f) => ({ ...f, color: f.color === c ? undefined : c }))}
              className={`px-3 py-1.5 text-xs font-medium rounded-md border ${
                filtros.color === c
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Precio">
        <div className="space-y-2">
          {priceRanges.map((r, i) => (
            <label key={r.label} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={filtros.minPrecio === r.min && filtros.maxPrecio === (r.max === Infinity ? undefined : r.max)}
                onChange={() =>
                  setFiltros((f) => ({
                    ...f,
                    minPrecio: r.min,
                    maxPrecio: r.max === Infinity ? undefined : r.max,
                  }))
                }
                className="accent-accent"
              />
              <span className="text-sm text-muted-foreground">{r.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>
      {activeFilterCount > 0 && (
        <button onClick={clearAll} className="text-sm text-primary hover:underline font-medium">
          Limpiar filtros ({activeFilterCount})
        </button>
      )}
    </>
  );

  return (
    <div className="min-h-screen">
      <div className="bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl font-bold">Catálogo</h1>
          <p className="text-muted-foreground mt-2">
            {loading ? "Cargando desde el servidor..." : `${filtered.length} producto${filtered.length !== 1 ? "s" : ""} (base de datos)`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            className="lg:hidden flex items-center gap-2 text-sm font-medium border border-border px-4 py-2 rounded-md"
            onClick={() => setFiltersOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
            {activeFilterCount > 0 && (
              <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                {activeFilterCount}
              </span>
            )}
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm bg-background border border-border rounded-md px-3 py-2 ml-auto"
          >
            <option value="nombre">Nombre</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
          </select>
        </div>

        <div className="flex gap-10">
          <aside className="hidden lg:block w-60 flex-shrink-0">{filterContent}</aside>
          <div className="flex-1">
            {loading ? (
              <p className="text-muted-foreground py-20 text-center">Cargando...</p>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No se encontraron productos</p>
                <button onClick={clearAll} className="text-primary hover:underline mt-2 text-sm font-medium">
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
                {filtered.map((product, i) => (
                  <ApiProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 h-full w-80 bg-background z-50 shadow-xl p-6 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-lg font-semibold">Filtros</h2>
                <button onClick={() => setFiltersOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              {filterContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
