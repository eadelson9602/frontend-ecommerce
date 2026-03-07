import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { cartService } from "@/services/cart.service";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalog" },
];

export function Header() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { setIsCartOpen } = useCart();

  useEffect(() => {
    if (!user) {
      setCartCount(0);
      return;
    }
    cartService
      .getCarrito()
      .then((r) => setCartCount((r.items ?? []).reduce((s, i) => s + i.cantidad, 0)))
      .catch(() => setCartCount(0));
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button
          className="lg:hidden p-2 -ml-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link to="/" className="font-display text-xl font-bold tracking-tight">
          LUXE<span className="text-primary">.</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="font-body text-sm font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/catalog" className="p-2 hover:text-primary transition-colors" aria-label="Buscar">
            <Search className="h-5 w-5" />
          </Link>
          {user ? (
            <>
              <button
                  type="button"
                  className="p-2 hover:text-primary transition-colors relative"
                  aria-label="Carrito"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingBag className="h-5 w-5" />
                  {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center leading-none"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
              <Link to="/mis-pedidos" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground">
                Mis pedidos
              </Link>
              {isAdmin && (
                <>
                  <Link to="/admin/productos" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground">
                    Productos
                  </Link>
                  <Link to="/admin/pedidos" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground">
                    Pedidos
                  </Link>
                </>
              )}
              <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Salir">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="p-2 hover:text-primary transition-colors" aria-label="Entrar">
                <User className="h-5 w-5" />
              </Link>
              <button
                type="button"
                className="p-2 hover:text-primary transition-colors relative"
                aria-label="Carrito"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
              </button>
              <Link to="/login">
                <Button variant="outline" size="sm">Entrar</Button>
              </Link>
              <Link to="/registro">
                <Button size="sm">Registrarse</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-body text-sm font-medium text-muted-foreground hover:text-foreground py-2 tracking-wide uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {user && (
                <>
                  <Link to="/cart" className="py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>Carrito</Link>
                  <Link to="/mis-pedidos" className="py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>Mis pedidos</Link>
                  {isAdmin && (
                    <>
                      <Link to="/admin/productos" className="py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>Admin Productos</Link>
                      <Link to="/admin/pedidos" className="py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>Admin Pedidos</Link>
                    </>
                  )}
                  <button className="text-left py-2 text-sm text-destructive" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>
                    Salir
                  </button>
                </>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
