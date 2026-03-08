import { client } from "@/data/api/client";
import { api } from "@/data/api/endpoints";
import type { Usuario } from "@/domain/types";

export const userService = {
  /** Listar usuarios (solo admin) */
  getUsuarios(): Promise<Usuario[]> {
    return client.get<Usuario[]>(api.auth.usuarios);
  },
};
