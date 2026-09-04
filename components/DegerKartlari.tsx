import { BolumBasligi } from "@/components/Bolum";
import { IkonRozet } from "@/components/IkonRozet";
import { Kart } from "@/components/Kart";
import { anasayfa } from "@/data/icerik";

/** "Sana ne sunuyoruz" — mobilde yatay kart, masaustunde dikey kart. */
export function DegerKartlari() {
  return (
    <>
      <BolumBasligi baslik={anasayfa.degerler.baslik} />
      <div className="grid gap-3 md:grid-cols-3 md:gap-5">
        {anasayfa.degerler.kartlar.map((kart) => (
          <Kart key={kart.baslik} className="flex items-start gap-3 md:block">
            <IkonRozet ad={kart.ikon} vurgulu={kart.vurgulu} className="md:mb-4" />
            <div>
              <h3 className="font-semibold text-navy">{kart.baslik}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-text">{kart.aciklama}</p>
            </div>
          </Kart>
        ))}
      </div>
    </>
  );
}
