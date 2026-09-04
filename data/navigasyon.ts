// Tum navigasyon katmanlari (masaustu menu + mobil alt cubuk) bu listeden beslenir.
export type NavOgesi = {
  href: string;
  etiket: string; // masaustu menu etiketi
  kisaEtiket: string; // mobil alt cubuk etiketi
  ikon: "anasayfa" | "hakkimizda" | "koclar" | "basarilar" | "basvuru";
};

export const navigasyon: NavOgesi[] = [
  { href: "/", etiket: "Anasayfa", kisaEtiket: "Anasayfa", ikon: "anasayfa" },
  { href: "/hakkimizda", etiket: "Hakkımızda", kisaEtiket: "Hakkımızda", ikon: "hakkimizda" },
  { href: "/koclarimiz", etiket: "Koçlarımız", kisaEtiket: "Koçlar", ikon: "koclar" },
  { href: "/basarilarimiz", etiket: "Başarılarımız", kisaEtiket: "Başarılar", ikon: "basarilar" },
  { href: "/basvuru", etiket: "Bilgi & Başvuru", kisaEtiket: "Başvuru", ikon: "basvuru" },
];
