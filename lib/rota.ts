// trailingSlash: true oldugu icin yol sonundaki egik cizgi normalize edilir
export function yoluNormalize(yol: string | null): string {
  if (!yol) return "/";
  const temiz = yol.replace(/\/+$/, "");
  return temiz === "" ? "/" : temiz;
}

/** Aktif sayfa tespiti: anasayfa tam eslesme, digerleri alt sayfalari da kapsar */
export function aktifMi(yol: string | null, href: string): boolean {
  const suanki = yoluNormalize(yol);
  const hedef = yoluNormalize(href);
  if (hedef === "/") return suanki === "/";
  return suanki === hedef || suanki.startsWith(`${hedef}/`);
}
