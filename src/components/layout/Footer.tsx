import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="font-display text-lg font-bold tracking-tight mb-4">
              LUXE<span className="text-gold">.</span>
            </h3>
            <p className="text-sm opacity-70 leading-relaxed">
              Moda contemporánea curada para el espíritu moderno. Calidad, estilo y sofisticación.
            </p>
          </div>

          <div>
            <h4 className="font-display text-xs font-semibold tracking-widest uppercase mb-4">Tienda</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/catalog" className="hover:opacity-100 transition-opacity">Catálogo</Link></li>
              <li><Link to="/catalog?filter=new" className="hover:opacity-100 transition-opacity">Novedades</Link></li>
              <li><Link to="/catalog" className="hover:opacity-100 transition-opacity">Ofertas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-semibold tracking-widest uppercase mb-4">Ayuda</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><span className="hover:opacity-100 transition-opacity cursor-pointer">Envíos</span></li>
              <li><span className="hover:opacity-100 transition-opacity cursor-pointer">Devoluciones</span></li>
              <li><span className="hover:opacity-100 transition-opacity cursor-pointer">Contacto</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-semibold tracking-widest uppercase mb-4">Síguenos</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><span className="hover:opacity-100 transition-opacity cursor-pointer">Instagram</span></li>
              <li><span className="hover:opacity-100 transition-opacity cursor-pointer">Pinterest</span></li>
              <li><span className="hover:opacity-100 transition-opacity cursor-pointer">Twitter</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-xs opacity-50">
          © 2026 LUXE. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
