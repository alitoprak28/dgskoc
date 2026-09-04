import { Avatar } from "@/components/Avatar";
import { Kart } from "@/components/Kart";
import type { Basari } from "@/data/basarilar";

export function BasariKarti({ basari }: { basari: Basari }) {
  return (
    <Kart className="bg-white">
      <Avatar foto={basari.foto} ad={basari.ad} className="aspect-[4/3] w-full" />
      <h3 className="mt-3 text-sm font-bold leading-snug text-navy">
        {basari.ad} ({basari.puanTuruKisa} {basari.derece}.)
      </h3>
      <p className="mt-1 text-xs leading-relaxed text-gray-text">{basari.universite}</p>
      <p className="text-xs leading-relaxed text-gray-text">{basari.bolum}</p>
    </Kart>
  );
}
