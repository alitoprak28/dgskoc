import type { Metadata } from "next";
import { Bolum, BolumBasligi } from "@/components/Bolum";
import { IstatistikSeridi } from "@/components/IstatistikSeridi";
import { Ikon } from "@/components/Ikon";
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
        <BolumBasligi baslik={hakkimizdaSayfasi.nedenBizBasligi} />
        <ul className="grid gap-3 md:grid-cols-3 md:gap-5">
          {hakkimizda.nedenBiz.map((madde) => (
            <li
              key={madde}
              className="flex items-start gap-3 rounded-xl border border-gray-border bg-white p-4 md:p-5"
            >
              <Ikon ad="hedef" className="mt-0.5 h-5 w-5 text-navy" />
              <span className="text-sm leading-relaxed text-navy">{madde}</span>
            </li>
          ))}
        </ul>
      </Bolum>

      <Bolum>
        <BolumBasligi baslik={hakkimizdaSayfasi.metodBasligi} />
        <p className="max-w-2xl whitespace-pre-line text-sm leading-relaxed text-navy">
          {hakkimizda.metod}
        </p>
      </Bolum>

      <Bolum zemin="gri">
        <BolumBasligi baslik={hakkimizdaSayfasi.rakamlarBasligi} />
        <IstatistikSeridi />
      </Bolum>
    </>
  );
}
