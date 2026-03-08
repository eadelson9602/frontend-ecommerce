/**
 * Formatea un monto en pesos colombianos (COP).
 * Usa es-CO con 0 decimales para que valores como 129990 se muestren como "129.990"
 * y no como "1.299,9" (evita separador decimal y agrupación incorrecta).
 */
export function formatCop(n: number): string {
  const value = Number(n);
  if (!Number.isFinite(value)) return "$0 COP";
  return new Intl.NumberFormat().format(value);
}
