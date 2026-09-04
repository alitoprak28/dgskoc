import { site } from "@/data/site";

// Telefon numarasi yalnizca site verisinden okunur, koda gomulmez.
export function whatsappLinki(mesaj?: string): string {
  const taban = `https://wa.me/${site.telefonWa}`;
  return mesaj ? `${taban}?text=${encodeURIComponent(mesaj)}` : taban;
}

// tel: linki icin bosluklari temizlenmis numara
export function telefonLinki(): string {
  return `tel:+${site.telefonWa}`;
}
