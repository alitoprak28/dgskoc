export type Basari = {
  ad: string;
  foto: string; // bos string ise yer tutucu avatar
  universite: string;
  bolum: string;
  puanTuruKisa: string;
  derece: number;
};

// PLACEHOLDER kayitlar — gercek ogrenci basarilari musteriden gelecek.
export const basarilar: Basari[] = [
  { ad: "Zeynep Arslan", foto: "", universite: "Boğaziçi Üniversitesi", bolum: "İşletme", puanTuruKisa: "EA", derece: 118 },
  { ad: "Kerem Yalçın", foto: "", universite: "ODTÜ", bolum: "Bilgisayar Mühendisliği", puanTuruKisa: "SAY", derece: 64 },
  { ad: "Selin Korkmaz", foto: "", universite: "Ankara Üniversitesi", bolum: "Hukuk", puanTuruKisa: "SÖZ", derece: 203 },
  { ad: "Ahmet Toprak", foto: "", universite: "İTÜ", bolum: "Endüstri Mühendisliği", puanTuruKisa: "SAY", derece: 340 },
  { ad: "Merve Şen", foto: "", universite: "Hacettepe Üniversitesi", bolum: "Psikoloji", puanTuruKisa: "EA", derece: 512 },
  { ad: "Burak Ateş", foto: "", universite: "Marmara Üniversitesi", bolum: "İktisat", puanTuruKisa: "EA", derece: 780 },
];
