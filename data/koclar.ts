export type Koc = {
  slug: string;
  ad: string;
  puanTuru: "Sayısal" | "Sözel" | "Eşit Ağırlık";
  puanTuruKisa: "SAY" | "SÖZ" | "EA";
  derece: number;
  universite: string;
  alan: string;
  foto: string; // /public/koclar/... — bos string ise yer tutucu avatar gosterilir
  biyografi: string; // PLACEHOLDER — musteriden gelecek
  uzmanlik?: string[];
  aylikUcret: number; // TL. KOCTAN KOCA FARKLI
};

// PLACEHOLDER kayitlar. Gercek fotograf, biyografi ve ucretler musteriden gelince guncellenecek.
export const koclar: Koc[] = [
  {
    slug: "busra-savur",
    ad: "Büşra Savur",
    puanTuru: "Eşit Ağırlık",
    puanTuruKisa: "EA",
    derece: 2158,
    universite: "Yeditepe Üniversitesi",
    alan: "İşletme",
    foto: "",
    biyografi:
      "PLACEHOLDER — koçun kendi DGS süreci, nasıl çalıştığı ve öğrencileriyle kurduğu çalışma düzeni bu alanda anlatılacak.\n\nPLACEHOLDER — ikinci paragraf: koçluk yaklaşımı ve öğrenciden beklentileri.",
    uzmanlik: ["Matematik", "Program takibi", "Deneme analizi"],
    aylikUcret: 3000,
  },
  {
    slug: "mert-kaya",
    ad: "Mert Kaya",
    puanTuru: "Sayısal",
    puanTuruKisa: "SAY",
    derece: 87,
    universite: "ODTÜ",
    alan: "Bilgisayar Mühendisliği",
    foto: "",
    biyografi:
      "PLACEHOLDER — koçun kendi DGS süreci, nasıl çalıştığı ve öğrencileriyle kurduğu çalışma düzeni bu alanda anlatılacak.\n\nPLACEHOLDER — ikinci paragraf: koçluk yaklaşımı ve öğrenciden beklentileri.",
    uzmanlik: ["Matematik", "Geometri", "Sayısal strateji"],
    aylikUcret: 3500,
  },
  {
    slug: "elif-demir",
    ad: "Elif Demir",
    puanTuru: "Sözel",
    puanTuruKisa: "SÖZ",
    derece: 156,
    universite: "Ankara Üniversitesi",
    alan: "Hukuk",
    foto: "",
    biyografi:
      "PLACEHOLDER — koçun kendi DGS süreci, nasıl çalıştığı ve öğrencileriyle kurduğu çalışma düzeni bu alanda anlatılacak.\n\nPLACEHOLDER — ikinci paragraf: koçluk yaklaşımı ve öğrenciden beklentileri.",
    uzmanlik: ["Türkçe", "Paragraf", "Sözel mantık"],
    aylikUcret: 3200,
  },
  {
    slug: "can-sahin",
    ad: "Can Şahin",
    puanTuru: "Eşit Ağırlık",
    puanTuruKisa: "EA",
    derece: 302,
    universite: "Boğaziçi Üniversitesi",
    alan: "Ekonomi",
    foto: "",
    biyografi:
      "PLACEHOLDER — koçun kendi DGS süreci, nasıl çalıştığı ve öğrencileriyle kurduğu çalışma düzeni bu alanda anlatılacak.\n\nPLACEHOLDER — ikinci paragraf: koçluk yaklaşımı ve öğrenciden beklentileri.",
    uzmanlik: ["Matematik", "Türkçe", "Süre yönetimi"],
    aylikUcret: 3800,
  },
  {
    slug: "zeynep-yildiz",
    ad: "Zeynep Yıldız",
    puanTuru: "Sayısal",
    puanTuruKisa: "SAY",
    derece: 421,
    universite: "İTÜ",
    alan: "Endüstri Mühendisliği",
    foto: "",
    biyografi:
      "PLACEHOLDER — koçun kendi DGS süreci, nasıl çalıştığı ve öğrencileriyle kurduğu çalışma düzeni bu alanda anlatılacak.\n\nPLACEHOLDER — ikinci paragraf: koçluk yaklaşımı ve öğrenciden beklentileri.",
    uzmanlik: ["Geometri", "Deneme analizi"],
    aylikUcret: 2800,
  },
  {
    slug: "emre-aydin",
    ad: "Emre Aydın",
    puanTuru: "Eşit Ağırlık",
    puanTuruKisa: "EA",
    derece: 634,
    universite: "Marmara Üniversitesi",
    alan: "İşletme",
    foto: "",
    biyografi:
      "PLACEHOLDER — koçun kendi DGS süreci, nasıl çalıştığı ve öğrencileriyle kurduğu çalışma düzeni bu alanda anlatılacak.\n\nPLACEHOLDER — ikinci paragraf: koçluk yaklaşımı ve öğrenciden beklentileri.",
    uzmanlik: ["Türkçe", "Program takibi"],
    aylikUcret: 2600,
  },
];

// Kart ve select basligi: "Büşra Savur (EA 2158.)"
export function kocBasligi(koc: Koc): string {
  return `${koc.ad} (${koc.puanTuruKisa} ${koc.derece}.)`;
}

// Basvuru formu select etiketi: "Büşra Savur — EA 2158."
export function kocSecenekEtiketi(koc: Koc): string {
  return `${koc.ad} — ${koc.puanTuruKisa} ${koc.derece}.`;
}

export function kocBul(slug: string): Koc | undefined {
  return koclar.find((koc) => koc.slug === slug);
}
