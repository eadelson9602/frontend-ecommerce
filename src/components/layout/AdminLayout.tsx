import { Outlet, Link, NavLink } from "react-router-dom";
import { LayoutDashboard, Package, Users, ShoppingCart, ArrowLeft } from "lucide-react";

const nav = [
  { to: "productos", label: "Productos", icon: Package },
  { to: "usuarios", label: "Usuarios", icon: Users },
  { to: "pedidos", label: "Pedidos en curso", icon: ShoppingCart },
];

export function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-muted/30">
      <aside className="w-56 border-r border-border bg-card flex flex-col shrink-0">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <span className="font-display font-bold text-lg">Panel Admin</span>
        </div>
        <nav className="p-2 flex flex-col gap-1">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={false}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto p-2 border-t border-border">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            Volver al sitio
          </Link>
        </div>
      </aside>
      <div className="flex-1 overflow-auto">
        <main className="p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
