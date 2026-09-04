import { BolumBasligi } from "@/components/Bolum";
import { anasayfa } from "@/data/icerik";

/** "Nasil calisiyoruz" — sirali akis oldugu icin numaralandirma burada anlamli. */
export function SurecAdimlari() {
  return (
    <>
      <BolumBasligi baslik={anasayfa.surec.baslik} />
      <ol className="grid gap-6 md:grid-cols-4 md:gap-5">
        {anasayfa.surec.adimlar.map((adim, sira) => (
          <li key={adim.baslik} className="border-t-2 border-navy pt-3">
            <span className="text-[11px] font-bold text-orange">
              {String(sira + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-1 font-bold text-navy">{adim.baslik}</h3>
            <p className="mt-1 text-sm leading-relaxed text-gray-text">{adim.aciklama}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
