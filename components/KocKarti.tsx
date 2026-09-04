import { Avatar } from "@/components/Avatar";
import { Kart } from "@/components/Kart";
import { kocBasligi, type Koc } from "@/data/koclar";

/** Koc liste karti. Fiyat burada gosterilmez, yalnizca detay sayfasinda. */
export function KocKarti({ koc }: { koc: Koc }) {
  return (
    <Kart href={`/koclarimiz/${koc.slug}`} className="bg-white">
      <Avatar foto={koc.foto} ad={koc.ad} className="aspect-[4/3] w-full" />
      <h3 className="mt-3 text-sm font-bold leading-snug text-navy">{kocBasligi(koc)}</h3>
      <p className="mt-1 text-xs leading-relaxed text-gray-text">{koc.universite}</p>
      <p className="text-xs leading-relaxed text-gray-text">{koc.alan}</p>
    </Kart>
  );
}
