// Sayfalarda gecen sabit metinler. Bilesenlerin icine metin gomulmuyor.
export const anasayfa = {
  hero: {
    baslik: "DGS'de doğru stratejiyle hedefine ulaş",
    altBaslik:
      "Kişiselleştirilmiş çalışma programı, düzenli deneme analizi ve bire bir takiple sınav sürecinde yanındayız.",
    birincilCta: { etiket: "Hemen başvur", href: "/basvuru" },
    ikincilCta: { etiket: "Koçlarımızı incele", href: "/koclarimiz" },
  },
  degerler: {
    baslik: "Sana ne sunuyoruz",
    kartlar: [
      {
        baslik: "Kişisel program",
        aciklama: "Seviyene ve hedefine uygun, sana özel hazırlanmış haftalık çalışma planı",
        ikon: "hedef" as const,
        vurgulu: false,
      },
      {
        baslik: "Deneme analizi",
        aciklama: "Düzenli deneme takibiyle nerede olduğunu ve nereye gitmen gerektiğini netleştir",
        ikon: "grafik" as const,
        vurgulu: false,
      },
      {
        baslik: "Hızlı başvuru",
        aciklama: "Formu doldur, saniyeler içinde WhatsApp'tan bize ulaş",
        ikon: "whatsapp" as const,
        vurgulu: true,
      },
    ],
  },
  surec: {
    baslik: "Nasıl çalışıyoruz",
    adimlar: [
      { baslik: "Ön görüşme", aciklama: "Hedeflerini ve mevcut durumunu birlikte netleştiriyoruz" },
      { baslik: "Program", aciklama: "Sana özel haftalık çalışma planı hazırlanıyor" },
      { baslik: "Takip", aciklama: "Haftalık raporlama ve düzenli iletişimle süreç takip ediliyor" },
      { baslik: "Deneme analizi", aciklama: "Gelişimin düzenli olarak ölçülüp plan güncelleniyor" },
    ],
  },
  koclarOnizleme: {
    baslik: "Koçlarımız",
    tumunuGor: "Tümünü gör",
  },
  yorumlarOnizleme: {
    baslik: "Öğrencilerimiz ne diyor",
  },
  oneCikanHikaye: {
    baslik: "Öne çıkan başarı hikayesi",
  },
  sinavBilgi: {
    rozet: "Yakında",
    baslik: "2027-DGS tarihi açıklandığında burada olacak",
    aciklama:
      "ÖSYM tarafından 2027-DGS sınav tarihi henüz açıklanmadı. Duyurulur duyurulmaz bu alanı güncelleyeceğiz.",
  },
  kapanis: {
    baslik: "Hedefine giden yolda yalnız yürüme",
    aciklama: "Formu doldur, WhatsApp üzerinden seninle iletişime geçelim.",
    cta: "İletişime geç",
  },
};

export const koclarimizSayfasi = {
  baslik: "Koçlarımız",
  aciklama: "Alanında dereceye girmiş, süreci bizzat yaşamış mentörlerden oluşan ekibimiz",
  detayCta: "Bu koçla çalışmak istiyorum",
  ucretEtiketi: "Aylık ücret",
  uzmanlikBasligi: "Uzmanlık alanları",
};

export const basarilarSayfasi = {
  baslik: "Başarılarımız",
  aciklama: "Bizimle çalışan öğrencilerin ulaştığı sonuçlar",
  basariBasligi: "Öğrenci başarıları",
  yorumBasligi: "Öğrenci yorumları",
};

export const hakkimizdaSayfasi = {
  baslik: "Hakkımızda",
  nedenBizBasligi: "Neden DGS Koç",
  metodBasligi: "Çalışma metodumuz",
  rakamlarBasligi: "Rakamlarla DGS Koç",
};

export const footer = {
  sayfalarBasligi: "Sayfalar",
  iletisimBasligi: "İletişim",
  whatsappEtiketi: "WhatsApp'tan yaz",
  telefonEtiketi: "Telefon",
  telifNotu: "Tüm hakları saklıdır.",
};

export const bulunamadi = {
  kod: "404",
  baslik: "Aradığın sayfayı bulamadık",
  aciklama:
    "Bağlantı taşınmış ya da adres yanlış yazılmış olabilir. Aşağıdan devam edebilirsin.",
  anasayfa: "Anasayfaya dön",
  koclar: "Koçlarımızı incele",
};
