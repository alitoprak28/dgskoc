import { GeriSayim } from "@/components/GeriSayim";
import { anasayfa } from "@/data/icerik";
import { site } from "@/data/site";

/**
 * Sinav tarihi acikladiginda /data/site.ts icindeki sinavTarihi doldurulur ve
 * bu alan otomatik olarak geri sayima doner. Su an tarih yok, bilgilendirme kutusu gorunur.
 */
export function SinavBilgi() {
  if (site.sinavTarihi) {
    return <GeriSayim tarih={site.sinavTarihi} baslik={anasayfa.sinavBilgi.baslik} />;
  }

  return (
    <div className="rounded-xl border border-dashed border-gray-border bg-white p-4 md:p-5">
      <span className="inline-block rounded-full bg-gray-bg px-2.5 py-1 text-[11px] font-semibold text-gray-text">
        {anasayfa.sinavBilgi.rozet}
      </span>
      <h2 className="mt-3 text-base font-bold leading-snug text-navy md:text-lg">
        {anasayfa.sinavBilgi.baslik}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-text">
        {anasayfa.sinavBilgi.aciklama}
      </p>
    </div>
  );
}
