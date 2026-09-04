import type { Metadata } from "next";
import { Bolum, BolumBasligi } from "@/components/Bolum";
import { BasariKarti } from "@/components/BasariKarti";
import { IstatistikSeridi } from "@/components/IstatistikSeridi";
import { YorumKarti } from "@/components/YorumKarti";
import { basarilar } from "@/data/basarilar";
import { basarilarSayfasi } from "@/data/icerik";
import { yorumlar } from "@/data/yorumlar";

export const metadata: Metadata = {
  title: basarilarSayfasi.baslik,
  description: basarilarSayfasi.aciklama,
};

export default function BasarilarimizSayfasi() {
  return (
    <>
      <Bolum>
        <BolumBasligi
          seviye={1}
          baslik={basarilarSayfasi.baslik}
          aciklama={basarilarSayfasi.aciklama}
        />
        <IstatistikSeridi />
      </Bolum>

      <Bolum zemin="gri">
        <BolumBasligi baslik={basarilarSayfasi.basariBasligi} />
        {/* Yil filtresi yok, tum basarilar tek listede */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {basarilar.map((basari) => (
            <BasariKarti key={basari.ad} basari={basari} />
          ))}
        </div>
      </Bolum>

      <Bolum>
        <BolumBasligi baslik={basarilarSayfasi.yorumBasligi} />
        <div className="grid gap-3 md:grid-cols-3 md:gap-5">
          {yorumlar.map((yorum) => (
            <YorumKarti key={yorum.ad} yorum={yorum} />
          ))}
        </div>
      </Bolum>
    </>
  );
}
