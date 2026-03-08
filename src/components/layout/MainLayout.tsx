import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";

export function MainLayout() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
