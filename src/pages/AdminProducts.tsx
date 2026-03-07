import { useEffect, useState } from "react";
import { productService } from "@/services/product.service";
import type { Producto } from "@/domain/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { ProductImage } from "@/components/ProductImage";

function formatCop(n: number) {
  return `$${Number(n).toLocaleString("es-CO")} COP`;
}

export default function AdminProducts() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [invId, setInvId] = useState<number | null>(null);
  const [form, setForm] = useState({
    nombre: "",
    precio: 0,
    talla: "",
    color: "",
    marca: "",
    stock: 0,
    imagenUrl: "",
  });
  const [invCantidad, setInvCantidad] = useState(0);

  const load = () => productService.adminListar().then(setProductos).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar producto?")) return;
    try {
      await productService.adminDelete(id);
      setProductos((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Error");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await productService.adminCreate({
        ...form,
        imagenUrl: form.imagenUrl.trim() || undefined,
      });
      setOpen(false);
      setForm({ nombre: "", precio: 0, talla: "", color: "", marca: "", stock: 0, imagenUrl: "" });
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId == null) return;
    try {
      await productService.adminUpdate(editId, {
        ...form,
        imagenUrl: form.imagenUrl.trim() || null,
      });
      setEditId(null);
      setOpen(false);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error");
    }
  };

  const handleUpdateInventario = async (e: React.FormEvent) => {
    e.preventDefault();
    if (invId == null) return;
    try {
      await productService.adminUpdateInventario(invId, invCantidad);
      setInvId(null);
      setOpen(false);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error");
    }
  };

  const openEdit = (p: Producto) => {
    setEditId(p.id);
    setForm({
      nombre: p.nombre,
      precio: p.precio,
      talla: p.talla ?? "",
      color: p.color ?? "",
      marca: p.marca ?? "",
      stock: p.stock ?? 0,
      imagenUrl: p.imagenUrl ?? "",
    });
    setOpen(true);
  };

  const openInventario = (p: Producto) => {
    setInvId(p.id);
    setInvCantidad(p.stock ?? 0);
    setOpen(true);
  };

  const resetForm = () => {
    setEditId(null);
    setInvId(null);
    setForm({ nombre: "", precio: 0, talla: "", color: "", marca: "", stock: 0, imagenUrl: "" });
  };

  if (loading) return <p className="container mx-auto px-4 py-8 text-muted-foreground">Cargando productos desde la base de datos...</p>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-bold mb-8">Gestionar productos</h1>
      <p className="text-muted-foreground text-sm mb-6">Productos y stock cargados desde la base de datos. Precios en COP.</p>

      <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) resetForm(); }}>
        <DialogTrigger asChild>
          <Button onClick={resetForm}>Agregar producto</Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          {invId != null ? (
            <>
              <DialogHeader>
                <DialogTitle>Gestión de inventario</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUpdateInventario} className="space-y-4">
                <div className="space-y-2">
                  <Label>Cantidad en stock disponible</Label>
                  <Input
                    type="number"
                    min={0}
                    value={invCantidad}
                    onChange={(e) => setInvCantidad(Number(e.target.value))}
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                  <Button type="submit">Actualizar inventario</Button>
                </DialogFooter>
              </form>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>{editId != null ? "Editar producto" : "Agregar producto"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={editId != null ? handleUpdate : handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <Label>Nombre</Label>
                  <Input
                    value={form.nombre}
                    onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Precio (COP)</Label>
                  <Input
                    type="number"
                    min={0}
                    value={form.precio || ""}
                    onChange={(e) => setForm((f) => ({ ...f, precio: Number(e.target.value) }))}
                    placeholder="Ej: 150000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>URL de imagen</Label>
                  <Input
                    value={form.imagenUrl}
                    onChange={(e) => setForm((f) => ({ ...f, imagenUrl: e.target.value }))}
                    placeholder="https://..."
                  />
                  {form.imagenUrl.trim() && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-border bg-muted aspect-square max-w-[120px]">
                      <ProductImage
                        src={form.imagenUrl.trim()}
                        alt="Vista previa"
                        placeholder={<span className="text-xs text-muted-foreground">Sin imagen</span>}
                        placeholderClassName="flex items-center justify-center bg-muted text-muted-foreground text-xs"
                      />
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Talla</Label>
                    <Input value={form.talla} onChange={(e) => setForm((f) => ({ ...f, talla: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Color</Label>
                    <Input value={form.color} onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Marca</Label>
                  <Input value={form.marca} onChange={(e) => setForm((f) => ({ ...f, marca: e.target.value }))} />
                </div>
                {editId != null && (
                  <div className="space-y-2">
                    <Label>Stock</Label>
                    <Input
                      type="number"
                      min={0}
                      value={form.stock}
                      onChange={(e) => setForm((f) => ({ ...f, stock: Number(e.target.value) }))}
                    />
                  </div>
                )}
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                  <Button type="submit">{editId != null ? "Guardar" : "Crear"}</Button>
                </DialogFooter>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>

      <ul className="mt-6 space-y-2">
        {productos.map((p) => (
          <li key={p.id}>
            <Card>
              <CardContent className="py-4 flex flex-wrap items-center gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-muted border border-border">
                  <ProductImage
                    src={p.imagenUrl}
                    alt={p.nombre}
                    placeholder={<span className="text-xs text-muted-foreground">Sin imagen</span>}
                    placeholderClassName="flex items-center justify-center bg-muted text-muted-foreground text-xs"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium">{p.nombre}</span>
                  <span className="text-muted-foreground text-sm block">
                    {formatCop(p.precio)} · {p.marca || "—"} · Stock: {p.stock ?? 0}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEdit(p)}>Editar</Button>
                  <Button variant="outline" size="sm" onClick={() => openInventario(p)}>Inventario</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(p.id)}>Eliminar</Button>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
