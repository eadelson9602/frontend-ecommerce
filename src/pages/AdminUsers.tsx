import { useEffect, useState } from "react";
import { userService } from "@/services/user.service";
import type { Usuario } from "@/domain/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminUsers() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getUsuarios().then(setUsuarios).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p className="text-muted-foreground">Cargando usuarios...</p>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Usuarios</h1>
      {usuarios.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No hay usuarios registrados.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {usuarios.map((u) => (
            <Card key={u.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between gap-2">
                  {u.nombre}
                  <Badge variant={u.rol === "admin" ? "default" : "secondary"}>
                    {u.rol}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>ID: {u.id}</p>
                <p className="truncate" title={u.email}>{u.email}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
