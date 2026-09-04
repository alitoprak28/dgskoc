// Basvuru sayfasinin tum metinleri. Musteri istegiyle degisecek alanlar burada.
export const basvuruSayfasi = {
  baslik: "Bilgi & Başvuru",
  aciklama: "Formu doldur, WhatsApp üzerinden ulaşalım",
  surecBasligi: "Nasıl başlarız?",
  surecAdimlari: [
    { baslik: "Formu doldur", aciklama: "Hedefini ve mevcut durumunu kısaca anlat" },
    { baslik: "Sana ulaşalım", aciklama: "WhatsApp üzerinden en kısa sürede dönüş yapalım" },
    { baslik: "Ön görüşmede tanışalım", aciklama: "Süreci birlikte planlayalım" },
  ],
  formBasligi: "Başvuru formu",
  gonderButonu: "WhatsApp'tan Gönder",
};

export const formAlanlari = {
  ad: { etiket: "Adınız Soyadınız" },
  telefon: { etiket: "İletişim Numaranız" },
  koclukAldiMi: { etiket: "Daha Önce Koçluk Aldınız mı?", secenekler: ["Evet", "Hayır"] },
  durum: {
    etiket: "Bulunduğunuz Durum",
    yerTutucu: "Seçiniz",
    secenekler: ["Ön Lisans 1. Sınıf", "Ön Lisans Son Sınıf", "Mezun"],
  },
  hedefBolum: { etiket: "Hedefiniz Hangi Bölüm?" },
  hedefSiralama: { etiket: "Hedef Sıralamanız Nedir?" },
  net: { etiket: "Şuanki Ortalama Netiniz Nedir?" },
  alan: {
    etiket: "Hangi Alanda Hazırlanacaksınız?",
    secenekler: ["Sayısal", "Sözel", "Eşit Ağırlık"],
  },
  koc: { etiket: "Koçlarımızdan Kiminle Çalışmak İstersiniz?", yerTutucu: "Seçiniz" },
  aySayisi: { etiket: "Kaç Ay Çalışmak İstiyorsunuz?" },
};

export const hataMesajlari = {
  ad: "Adınızı ve soyadınızı yazın.",
  telefonBos: "Telefon numaranızı yazın.",
  telefonGecersiz: "Geçerli bir telefon numarası yazın.",
  secenek: "Bir seçenek işaretleyin.",
  koc: "Bir koç seçin.",
  aySayisi: "Kaç ay çalışmak istediğinizi yazın.",
  kvkk: "Devam etmek için KVKK metnini onaylayın.",
  metin: "Bu alanı doldurun.",
};

export const fiyatOzeti = {
  secilenEtiketi: "Seçilen:",
  paketEtiketi: (ay: number) => `${ay} Aylık Paket:`,
};

export const kvkk = {
  onayMetniOncesi: "",
  baglantiMetni: "KVKK metnini",
  onayMetniSonrasi: "okudum, onaylıyorum.",
  modalBasligi: "KVKK Aydınlatma Metni",
  modalKapat: "Kapat",
  modalIcerik:
    "Bu formu göndererek, paylaştığınız kişisel verilerin DGS Koç tarafından başvuru sürecinizin değerlendirilmesi ve sizinle iletişime geçilmesi amacıyla 6698 sayılı KVKK kapsamında işlenmesine onay vermiş olursunuz.",
};

// WhatsApp mesaj sablonu
export const whatsappMesaji = {
  baslik: "Yeni DGS Koç Başvurusu",
  satirlar: {
    ad: "Ad Soyad",
    telefon: "Telefon",
    koclukAldiMi: "Daha önce koçluk",
    durum: "Durum",
    hedefBolum: "Hedef bölüm",
    hedefSiralama: "Hedef sıralama",
    net: "Ortalama net",
    alan: "Alan",
    koc: "Seçilen koç",
    sure: "Süre",
    toplam: "Toplam",
  },
};
