import { Avatar } from "@/components/Avatar";
import { Kart } from "@/components/Kart";
import { kocBasligi, type Koc } from "@/data/koclar";
import { cn } from "@/lib/utils";

/**
 * Koc liste karti. Fotograf dikey (4:5) ve kenardan kenara: telefonla cekilen
 * portreler bu orana kendiliginden oturuyor. Fiyat burada gosterilmez.
 */
export function KocKarti({ koc }: { koc: Koc }) {
  const ayrinti = [koc.universite, koc.alan].filter(Boolean);

  return (
    <Kart
      href={`/koclarimiz/${koc.slug}`}
      className={cn(
        "overflow-hidden bg-white p-0 md:p-0",
        // Uzerine gelince fotograf hafifce yakinlasir
        "[&_img]:transition-transform [&_img]:duration-300 hover:[&_img]:scale-[1.03]"
      )}
    >
      <Avatar
        foto={koc.foto}
        ad={koc.ad}
        className="aspect-[4/5] w-full rounded-none"
        ikonClassName="h-10 w-10"
      />
      <div className="p-3.5 md:p-4">
        <h3 className="text-sm font-bold leading-snug text-navy md:text-[15px]">{kocBasligi(koc)}</h3>
        {ayrinti.map((satir) => (
          <p key={satir} className="mt-0.5 text-xs leading-relaxed text-gray-text">
            {satir}
          </p>
        ))}
      </div>
    </Kart>
  );
}
