// Koc bilgileri koclardan parca parca geliyor. Ad ve slug zorunlu; digerleri
// geldikce doldurulur. Bos birakilan alan sitede hic gorunmez, uydurma veri girilmez.
export type Koc = {
  slug: string;
  ad: string;
  foto: string; // /public/koclar/... — bos string ise yer tutucu avatar gosterilir
  puanTuru?: "Sayısal" | "Sözel" | "Eşit Ağırlık";
  puanTuruKisa?: "SAY" | "SÖZ" | "EA";
  derece?: number;
  universite?: string;
  alan?: string;
  biyografi?: string; // tek paragraf: kendi DGS sureci, nasil calistigi, ogrencileriyle duzeni
  uzmanlik?: string[];
  aylikUcret?: number; // TL, koctan koca farkli olabilir
};

export const koclar: Koc[] = [
  { slug: "saban-arici", ad: "Şaban Arıcı", foto: "/koclar/saban-arici.jpg" },
  { slug: "kevser-kara", ad: "Kevser Kara", foto: "/koclar/kevser-kara.jpg" },
  { slug: "seyda-inan", ad: "Şeyda İnan", foto: "" },
  { slug: "cihan-ondas", ad: "Cihan Öndaş", foto: "/koclar/cihan-ondas.jpg" },
  { slug: "halit-orak", ad: "Halit Orak", foto: "/koclar/halit-orak.jpg" },
  { slug: "feyza-nur-dogan", ad: "Feyza Nur Doğan", foto: "/koclar/feyza-nur-dogan.jpg" },
  { slug: "ayse-gurses", ad: "Ayşe Gürses", foto: "/koclar/ayse-gurses.jpg" },
  { slug: "melek-yildiz", ad: "Melek Yıldız", foto: "/koclar/melek-yildiz.jpg" },
];

/** "EA 2158." — puan turu ve derece ikisi de varsa, yoksa bos */
export function dereceEtiketi(koc: Koc): string {
  return koc.puanTuruKisa && koc.derece ? `${koc.puanTuruKisa} ${koc.derece}.` : "";
}

// Kart basligi: "Büşra Savur (EA 2158.)" — derece yoksa yalnizca ad
export function kocBasligi(koc: Koc): string {
  const derece = dereceEtiketi(koc);
  return derece ? `${koc.ad} (${derece})` : koc.ad;
}

// Basvuru formu select etiketi: "Büşra Savur — EA 2158." — derece yoksa yalnizca ad
export function kocSecenekEtiketi(koc: Koc): string {
  const derece = dereceEtiketi(koc);
  return derece ? `${koc.ad} — ${derece}` : koc.ad;
}

export function kocBul(slug: string): Koc | undefined {
  return koclar.find((koc) => koc.slug === slug);
}
