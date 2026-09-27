// Site geneli sabitler. Musteriden gelen bilgiler burada guncellenecek.
export const site = {
  ad: "DGS Koç",
  slogan: "DGS'de Rehberin",
  telefon: "0531 834 42 10",
  telefonWa: "905318344210", // wa.me icin, basinda 90, bosluksuz
  // PLACEHOLDER — alan adi belli olunca guncellenecek. sitemap, robots ve
  // paylasim linklerinin mutlak adresi buradan uretiliyor.
  alanAdi: "https://dgs.koc",
  email: "", // su an yok
  sosyal: {
    instagram: "",
    youtube: "",
  },
  istatistikler: {
    ogrenciSayisi: "450+", // PLACEHOLDER — musteriden gelecek
    kocSayisi: "20+", // PLACEHOLDER
    deneyimYili: "4", // PLACEHOLDER
  },
  // TAHMINI tarih — OSYM resmi takvimi aciklamadi. Aciklaninca burasi guncellenecek.
  // null yapilirsa alan otomatik olarak "tarih aciklanmadi" bilgilendirme kutusuna doner.
  sinavTarihi: "2027-07-18T10:00:00+03:00" as string | null,
  sinavTarihiTahmini: true, // false yapilinca "tahmini" uyarisi kalkar
  oneCikanHikaye: {
    ad: "Zeynep Arslan",
    ozet: "PLACEHOLDER — öne çıkan başarı hikayesi metni buraya gelecek.",
    sonuc: "Boğaziçi Üniversitesi — İşletme",
  },
};

// Istatistik seridinde kullanilan etiketler
export const istatistikListesi = [
  { deger: site.istatistikler.ogrenciSayisi, etiket: "öğrenciyle çalıştık" },
  { deger: site.istatistikler.kocSayisi, etiket: "dereceli koç" },
  { deger: site.istatistikler.deneyimYili, etiket: "yıllık deneyim" },
];
