export type Yorum = {
  ad: string;
  foto: string; // bos string ise yer tutucu avatar
  universite: string;
  bolum?: string;
  metin: string;
};

// PLACEHOLDER kayitlar — gercek ogrenci yorumlari musteriden gelecek.
export const yorumlar: Yorum[] = [
  {
    ad: "Zeynep Arslan",
    foto: "",
    universite: "Boğaziçi Üniversitesi",
    bolum: "İşletme",
    metin: "PLACEHOLDER — öğrenci yorumu metni buraya gelecek.",
  },
  {
    ad: "Kerem Yalçın",
    foto: "",
    universite: "ODTÜ",
    bolum: "Bilgisayar Mühendisliği",
    metin: "PLACEHOLDER — öğrenci yorumu metni buraya gelecek.",
  },
  {
    ad: "Selin Korkmaz",
    foto: "",
    universite: "Ankara Üniversitesi",
    bolum: "Hukuk",
    metin: "PLACEHOLDER — öğrenci yorumu metni buraya gelecek.",
  },
];
