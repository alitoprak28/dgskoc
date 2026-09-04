import { hataMesajlari, whatsappMesaji } from "@/data/basvuru";
import type { Koc } from "@/data/koclar";
import { fiyatFormatla } from "@/lib/format";

export type BasvuruDegerleri = {
  ad: string;
  telefon: string;
  koclukAldiMi: string;
  durum: string;
  hedefBolum: string;
  hedefSiralama: string;
  net: string;
  alan: string;
  kocSlug: string;
  aySayisi: string;
  kvkk: boolean;
};

export type Hatalar = Partial<Record<keyof BasvuruDegerleri, string>>;

/** Tek alan guncelleyici; alan adiyla degerin tipi eslesir */
export type AlanGuncelle = <A extends keyof BasvuruDegerleri>(
  alan: A,
  deger: BasvuruDegerleri[A]
) => void;

export const BOS_BASVURU: BasvuruDegerleri = {
  ad: "",
  telefon: "",
  koclukAldiMi: "",
  durum: "",
  hedefBolum: "",
  hedefSiralama: "",
  net: "",
  alan: "",
  kocSlug: "",
  aySayisi: "",
  kvkk: false,
};

// Hata bulunca ilk hatali alana kaydirmak icin form sirasi
export const ALAN_SIRASI: (keyof BasvuruDegerleri)[] = [
  "ad",
  "telefon",
  "koclukAldiMi",
  "durum",
  "hedefBolum",
  "hedefSiralama",
  "net",
  "alan",
  "kocSlug",
  "aySayisi",
  "kvkk",
];

/** Telefon alanina yalnizca rakam, bosluk, parantez, tire ve + kabul edilir */
export function telefonuTemizle(deger: string): string {
  return deger.replace(/[^\d\s()+-]/g, "");
}

export function dogrula(degerler: BasvuruDegerleri): Hatalar {
  const hatalar: Hatalar = {};
  const rakamlar = degerler.telefon.replace(/\D/g, "");
  const ay = Number(degerler.aySayisi);

  if (!degerler.ad.trim()) hatalar.ad = hataMesajlari.ad;
  if (!degerler.telefon.trim()) hatalar.telefon = hataMesajlari.telefonBos;
  else if (rakamlar.length < 10 || rakamlar.length > 13)
    hatalar.telefon = hataMesajlari.telefonGecersiz;
  if (!degerler.koclukAldiMi) hatalar.koclukAldiMi = hataMesajlari.secenek;
  if (!degerler.durum) hatalar.durum = hataMesajlari.secenek;
  if (!degerler.hedefBolum.trim()) hatalar.hedefBolum = hataMesajlari.metin;
  if (!degerler.hedefSiralama.trim()) hatalar.hedefSiralama = hataMesajlari.metin;
  if (!degerler.net.trim()) hatalar.net = hataMesajlari.metin;
  if (!degerler.alan) hatalar.alan = hataMesajlari.secenek;
  if (!degerler.kocSlug) hatalar.kocSlug = hataMesajlari.koc;
  if (!degerler.aySayisi.trim() || !Number.isFinite(ay) || ay < 1)
    hatalar.aySayisi = hataMesajlari.aySayisi;
  if (!degerler.kvkk) hatalar.kvkk = hataMesajlari.kvkk;

  return hatalar;
}

/** Form degerlerini okunabilir bir WhatsApp mesajina cevirir */
export function mesajOlustur(degerler: BasvuruDegerleri, koc: Koc): string {
  const ay = Number(degerler.aySayisi);
  const s = whatsappMesaji.satirlar;

  return [
    whatsappMesaji.baslik,
    "",
    `${s.ad}: ${degerler.ad}`,
    `${s.telefon}: ${degerler.telefon}`,
    `${s.koclukAldiMi}: ${degerler.koclukAldiMi}`,
    `${s.durum}: ${degerler.durum}`,
    `${s.hedefBolum}: ${degerler.hedefBolum}`,
    `${s.hedefSiralama}: ${degerler.hedefSiralama}`,
    `${s.net}: ${degerler.net}`,
    `${s.alan}: ${degerler.alan}`,
    `${s.koc}: ${koc.ad}`,
    `${s.sure}: ${ay} ay`,
    `${s.toplam}: ${fiyatFormatla(koc.aylikUcret * ay)}`,
  ].join("\n");
}
