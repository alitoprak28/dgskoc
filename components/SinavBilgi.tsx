import { GeriSayim } from "@/components/GeriSayim";
import { anasayfa } from "@/data/icerik";
import { site } from "@/data/site";

// Tarih sunucuda bicimlendiriliyor; istemcide tekrar uretilmedigi icin hydration uyusmazligi olmuyor
const tarihBicimi = new Intl.DateTimeFormat("tr-TR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Istanbul",
});

/**
 * /data/site.ts icindeki sinavTarihi doluysa geri sayim, bossa bilgilendirme kutusu gosterilir.
 * sinavTarihiTahmini true iken tarihin tahmini oldugu acikca belirtilir.
 */
export function SinavBilgi() {
  if (site.sinavTarihi) {
    const tahmini = site.sinavTarihiTahmini;
    return (
      <GeriSayim
        tarih={site.sinavTarihi}
        baslik={anasayfa.sinavBilgi.geriSayimBasligi}
        tarihMetni={tarihBicimi.format(new Date(site.sinavTarihi))}
        rozet={tahmini ? anasayfa.sinavBilgi.tahminRozeti : undefined}
        not={tahmini ? anasayfa.sinavBilgi.tahminNotu : undefined}
      />
    );
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
