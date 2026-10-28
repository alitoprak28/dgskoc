// Sayfalarda gecen sabit metinler. Bilesenlerin icine metin gomulmuyor.
export const anasayfa = {
  hero: {
    baslik: "DGS'de doğru stratejiyle hedefine ulaş",
    altBaslik:
      "Sınav sürecinde zamanını verimli kullanmak, eksiklerini belirlemek ve hedeflerine uygun bir çalışma planıyla ilerlemek istiyorsan kendi yol haritanı birlikte oluşturabiliriz.",
    birincilCta: { etiket: "Hemen başvur", href: "/basvuru" },
    ikincilCta: { etiket: "Koçlarımızı incele", href: "/koclarimiz" },
  },
  degerler: {
    baslik: "Sana ne sunuyoruz?",
    aciklama: "Seviyeni ölçmekle başlıyor, sınav gününe kadar her hafta yanında oluyoruz.",
    kartlar: [
      {
        baslik: "Seviye tespit analizi",
        aciklama: "İlk olarak deneme sınavıyla seviyeni tespit ediyor, sonraki adımları buna göre planlıyoruz",
        ikon: "seviye" as const,
        vurgulu: false,
      },
      {
        baslik: "Kişiye özel kaynak ve YouTube kanalı seçimi",
        aciklama: "Seviyene uygun kaynakları belirliyoruz. Süreç YouTube tabanlı ilerlediği için sana hitap eden kanalları birlikte seçiyoruz",
        ikon: "oynat" as const,
        vurgulu: false,
      },
      {
        baslik: "Kişiye özel haftalık çalışma programı",
        aciklama: "Sana özel, hedeflerine uygun haftalık program hazırlıyoruz",
        ikon: "hedef" as const,
        vurgulu: false,
      },
      {
        baslik: "Günlük ve haftalık çalışma süresi takibi",
        aciklama: "Focus adlı masa saati uygulamasıyla günlük ve haftalık çalışma süreni takip ediyor, çalışma düzenine anında müdahale ediyoruz",
        ikon: "kronometre" as const,
        vurgulu: false,
      },
      {
        baslik: "Haftalık program görüşmesi",
        aciklama: "Haftada bir program görüşmesi yapıyoruz. Acil durumlarda WhatsApp üzerinden ulaşabiliyorsun; iletişim sıklığı koça göre değişebilir",
        ikon: "takvim" as const,
        vurgulu: false,
      },
      {
        baslik: "Deneme analizi",
        aciklama: "Düzenli deneme takibiyle nerede olduğunu ve nereye gitmen gerektiğini netleştir",
        ikon: "grafik" as const,
        vurgulu: false,
      },
      {
        baslik: "Soru çözüm grubu",
        aciklama: "Tüm koçluk öğrencilerimizin yardımlaştığı, danışmanlarımızın kontrolündeki bir soru çözüm grubumuz var. Takıldığın sorulara en kısa sürede dönüş yapılıyor",
        ikon: "grup" as const,
        vurgulu: false,
      },
      {
        baslik: "Hızlı başvuru",
        aciklama: "Formu doldur, saniyeler içinde WhatsApp'tan bize ulaş",
        ikon: "whatsapp" as const,
        vurgulu: true,
        // Bu kart adim degil eylem: tiklaninca basvuru formuna gider
        href: "/basvuru",
        baglantiMetni: "Başvuru formuna git",
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
    // sinavTarihi bos oldugunda gosterilen bilgilendirme kutusu
    rozet: "Yakında",
    baslik: "2027-DGS tarihi açıklandığında burada olacak",
    aciklama:
      "ÖSYM tarafından 2027-DGS sınav tarihi henüz açıklanmadı. Duyurulur duyurulmaz bu alanı güncelleyeceğiz.",
    // sinavTarihi dolu oldugunda gosterilen geri sayim
    geriSayimBasligi: "2027-DGS'ye kalan süre",
    tahminRozeti: "Tahmini tarih",
    tahminNotu:
      "ÖSYM resmî sınav takvimini henüz açıklamadı. Buradaki tarih geçmiş yılların takvimine göre yapılan bir tahmindir; resmî tarih duyurulduğunda güncelleyeceğiz.",
  },
  kapanis: {
    baslik: "Hedefine giden yolda yalnız yürüme",
    aciklama: "Formu doldur, WhatsApp üzerinden seninle iletişime geçelim.",
    cta: "İletişime geç",
  },
};

export const koclarimizSayfasi = {
  baslik: "Koçlarımız",
  aciklama: "Alanında başarıya ulaşmış, süreci bizzat yaşamış mentörlerden oluşan ekibimiz",
  detayCta: "Bu koçla çalışmak istiyorum",
  ucretEtiketi: "Aylık ücret",
  ucretBilgisiYok: "Ücret ve program bilgisi için bizimle iletişime geç.",
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
