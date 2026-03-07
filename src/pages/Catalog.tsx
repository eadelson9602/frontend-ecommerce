import { useState, useMemo } from "react";
import { products, brands, allColors, allSizes } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const priceRanges = [
  { label: "Hasta $100", min: 0, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "$200 - $300", min: 200, max: 300 },
  { label: "Más de $300", min: 300, max: Infinity },
];

export default function Catalog() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleFilter = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const activeFilterCount = selectedBrands.length + selectedSizes.length + selectedColors.length + (selectedPriceRange !== null ? 1 : 0);

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedBrands.length) result = result.filter((p) => selectedBrands.includes(p.brand));
    if (selectedSizes.length) result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    if (selectedColors.length) result = result.filter((p) => p.colors.some((c) => selectedColors.includes(c.name)));
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      result = result.filter((p) => p.price >= range.min && p.price < range.max);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [selectedBrands, selectedSizes, selectedColors, selectedPriceRange, sortBy]);

  const clearAll = () => {
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedPriceRange(null);
  };

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
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() => toggleFilter(selectedBrands, b, setSelectedBrands)}
                className="rounded border-border accent-accent"
              />
              <span className="text-sm font-body group-hover:text-foreground text-muted-foreground transition-colors">
                {b}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Talla">
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <button
              key={s}
              onClick={() => toggleFilter(selectedSizes, s, setSelectedSizes)}
              className={`px-3 py-1.5 text-xs font-display font-medium rounded-md border transition-colors ${
                selectedSizes.includes(s)
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
          {allColors.map((c) => (
            <button
              key={c.name}
              onClick={() => toggleFilter(selectedColors, c.name, setSelectedColors)}
              className={`w-7 h-7 rounded-full border-2 transition-all ${
                selectedColors.includes(c.name) ? "border-accent scale-110" : "border-border"
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Precio">
        <div className="space-y-2">
          {priceRanges.map((r, i) => (
            <label key={r.label} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="price"
                checked={selectedPriceRange === i}
                onChange={() => setSelectedPriceRange(selectedPriceRange === i ? null : i)}
                className="accent-accent"
              />
              <span className="text-sm font-body group-hover:text-foreground text-muted-foreground transition-colors">
                {r.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {activeFilterCount > 0 && (
        <button onClick={clearAll} className="text-sm text-accent hover:underline font-medium">
          Limpiar filtros ({activeFilterCount})
        </button>
      )}
    </>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl font-bold">Catálogo</h1>
          <p className="text-muted-foreground mt-2 font-body">
            {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <button
            className="lg:hidden flex items-center gap-2 text-sm font-display font-medium border border-border px-4 py-2 rounded-md"
            onClick={() => setFiltersOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
            {activeFilterCount > 0 && (
              <span className="bg-accent text-accent-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                {activeFilterCount}
              </span>
            )}
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm font-body bg-background border border-border rounded-md px-3 py-2 ml-auto"
          >
            <option value="featured">Destacados</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="name">Nombre</option>
          </select>
        </div>

        <div className="flex gap-10">
          {/* Desktop filters */}
          <aside className="hidden lg:block w-60 flex-shrink-0">{filterContent}</aside>

          {/* Products grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground font-body text-lg">No se encontraron productos</p>
                <button onClick={clearAll} className="text-accent hover:underline mt-2 text-sm font-medium">
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
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
              className="fixed left-0 top-0 h-full w-80 bg-background z-50 shadow-elegant-xl p-6 overflow-y-auto lg:hidden"
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
