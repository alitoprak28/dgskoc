import { fiyatOzeti } from "@/data/basvuru";
import { fiyatFormatla } from "@/lib/format";

type Props = { kocAdi: string; aySayisi: number; aylikUcret: number };

/** Koc ve ay sayisi secilince gorunur. Formul degil, yalnizca sonuc gosterilir. */
export function FiyatOzeti({ kocAdi, aySayisi, aylikUcret }: Props) {
  return (
    <div className="rounded-lg border border-orange bg-orange-soft p-3">
      <p className="text-sm text-navy">
        {fiyatOzeti.secilenEtiketi} <span className="font-semibold">{kocAdi}</span>
      </p>
      <p className="mt-1 text-sm text-navy">
        {fiyatOzeti.paketEtiketi(aySayisi)}{" "}
        <span className="font-bold text-orange">{fiyatFormatla(aylikUcret * aySayisi)}</span>
      </p>
    </div>
  );
}
