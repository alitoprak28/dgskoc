import { ButonLink } from "@/components/Buton";
import { anasayfa } from "@/data/icerik";

/** Sayfa sonu cagri seridi. */
export function KapanisCta() {
  return (
    <div className="flex flex-col items-start gap-5 rounded-2xl border border-gray-border bg-gray-bg p-6 md:flex-row md:items-center md:justify-between md:p-8">
      <div>
        <h2 className="text-xl font-extrabold leading-tight text-navy md:text-2xl">
          {anasayfa.kapanis.baslik}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-text">{anasayfa.kapanis.aciklama}</p>
      </div>
      <ButonLink href="/basvuru" className="shrink-0">
        {anasayfa.kapanis.cta}
      </ButonLink>
    </div>
  );
}
