import { istatistikListesi } from "@/data/site";
import { cn } from "@/lib/utils";

/** Uc sutunlu rakam seridi. Anasayfa, Hakkimizda ve Basarilarimiz ayni veriden besleniyor. */
export function IstatistikSeridi({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-3 rounded-2xl border border-gray-border bg-white py-5",
        "shadow-[0_4px_18px_rgba(23,48,84,.06)]",
        className
      )}
    >
      {istatistikListesi.map((oge, sira) => (
        <div
          key={oge.etiket}
          className={cn(
            "px-2 text-center",
            sira < istatistikListesi.length - 1 && "border-r border-[#f0f0f0]"
          )}
        >
          <div className="text-xl font-extrabold leading-none text-navy md:text-[27px]">
            {oge.deger}
          </div>
          <div className="mt-1.5 text-[11.5px] leading-snug text-gray-text">{oge.etiket}</div>
        </div>
      ))}
    </div>
  );
}
