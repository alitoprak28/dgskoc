// Turkce binlik ayracli fiyat formati: 9.000₺
export function fiyatFormatla(tutar: number): string {
  return `${new Intl.NumberFormat("tr-TR").format(tutar)}₺`;
}
