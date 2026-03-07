import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const featuredProducts = products.filter((p) => p.featured);
const newProducts = products.filter((p) => p.isNew);

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80"
            alt="Fashion hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <span className="inline-block font-display text-xs tracking-[0.3em] uppercase text-gold-light mb-4">
              Colección Primavera 2026
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground leading-[0.95] mb-6">
              Define tu
              <br />
              estilo
            </h1>
            <p className="font-body text-primary-foreground/70 text-lg mb-8 max-w-md">
              Descubre piezas contemporáneas diseñadas para el espíritu moderno. Calidad sin compromisos.
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-md font-display text-sm font-semibold tracking-wide hover:shadow-gold transition-all duration-300"
            >
              EXPLORAR COLECCIÓN
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="font-display text-xs tracking-[0.2em] uppercase text-muted-foreground">Selección</span>
            <h2 className="font-display text-3xl font-bold mt-1">Destacados</h2>
          </div>
          <Link
            to="/catalog"
            className="font-display text-sm font-medium text-accent hover:underline underline-offset-4 flex items-center gap-1"
          >
            Ver todo <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <span className="font-display text-xs tracking-[0.2em] uppercase text-gold">Compromiso</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
              Hecho para durar
            </h2>
            <p className="font-body text-primary-foreground/60 max-w-md leading-relaxed">
              Cada prenda es creada con materiales premium y técnicas artesanales. Moda consciente que trasciende temporadas.
            </p>
          </div>
          <div className="flex gap-10 text-center">
            {[
              { value: "100%", label: "Materiales premium" },
              { value: "50+", label: "Artesanos" },
              { value: "0", label: "Desperdicio" },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="font-display text-3xl font-bold text-gold">{stat.value}</span>
                <p className="text-xs text-primary-foreground/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New arrivals */}
      {newProducts.length > 0 && (
        <section className="container mx-auto px-4 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="font-display text-xs tracking-[0.2em] uppercase text-muted-foreground">Recién llegados</span>
              <h2 className="font-display text-3xl font-bold mt-1">Novedades</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
            {newProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
