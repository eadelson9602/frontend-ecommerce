import { createRoot } from "react-dom/client";
import { initMercadoPago } from "@mercadopago/sdk-react";
import App from "./App.tsx";
import "./index.css";

const publicKey = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;
if (publicKey) {
  initMercadoPago(publicKey);
}

createRoot(document.getElementById("root")!).render(<App />);
