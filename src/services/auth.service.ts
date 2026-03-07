import { client } from "@/data/api/client";
import { api } from "@/data/api/endpoints";
import type { Usuario, UsuarioAuth } from "@/domain/types";

export const authService = {
  async registro(nombre: string, email: string, password: string): Promise<UsuarioAuth> {
    const res = await client.post<{ token: string; usuario: Usuario }>(api.auth.registro, {
      nombre,
      email,
      password,
    });
    const out: UsuarioAuth = { ...res.usuario, token: res.token };
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.usuario));
    return out;
  },

  async login(email: string, password: string): Promise<UsuarioAuth> {
    const res = await client.post<{ token: string; usuario: Usuario }>(api.auth.login, {
      email,
      password,
    });
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.usuario));
    return { ...res.usuario, token: res.token };
  },

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getStoredUser(): Usuario | null {
    const raw = localStorage.getItem("user");
    return raw ? (JSON.parse(raw) as Usuario) : null;
  },

  getStoredToken(): string | null {
    return localStorage.getItem("token");
  },
};
