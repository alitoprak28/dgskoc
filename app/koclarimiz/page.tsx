import type { Metadata } from "next";
import { Bolum, BolumBasligi } from "@/components/Bolum";
import { KocKarti } from "@/components/KocKarti";
import { koclarimizSayfasi } from "@/data/icerik";
import { koclar } from "@/data/koclar";

export const metadata: Metadata = {
  title: koclarimizSayfasi.baslik,
  description: koclarimizSayfasi.aciklama,
};

export default function KoclarimizSayfasi() {
  return (
    <Bolum>
      <BolumBasligi
        seviye={1}
        baslik={koclarimizSayfasi.baslik}
        aciklama={koclarimizSayfasi.aciklama}
      />
      {/* Filtre veya arama yok, tum koclar tek listede */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
        {koclar.map((koc) => (
          <KocKarti key={koc.slug} koc={koc} />
        ))}
      </div>
    </Bolum>
  );
}
