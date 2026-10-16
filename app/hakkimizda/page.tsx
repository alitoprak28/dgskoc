import type { Metadata } from "next";
import { Bolum, BolumBasligi } from "@/components/Bolum";
import { IstatistikSeridi } from "@/components/IstatistikSeridi";
import { hakkimizda } from "@/data/hakkimizda";
import { hakkimizdaSayfasi } from "@/data/icerik";

export const metadata: Metadata = {
  title: hakkimizdaSayfasi.baslik,
  description:
    "DGS Koç ekibi, çalışma metodumuz ve bugüne kadar öğrencilerle birlikte ulaştığımız sonuçlar.",
};

export default function HakkimizdaSayfasi() {
  return (
    <>
      <Bolum>
        <BolumBasligi seviye={1} baslik={hakkimizdaSayfasi.baslik} />
        <div className="max-w-2xl whitespace-pre-line text-sm leading-relaxed text-navy">
          {hakkimizda.hikaye}
        </div>
      </Bolum>

      <Bolum zemin="gri">
        <BolumBasligi baslik={hakkimizdaSayfasi.rakamlarBasligi} />
        <IstatistikSeridi />
      </Bolum>
    </>
  );
}
