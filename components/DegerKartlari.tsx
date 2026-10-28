import Link from "next/link";
import { BolumBasligi } from "@/components/Bolum";
import { Ikon, type IkonAdi } from "@/components/Ikon";
import { anasayfa } from "@/data/icerik";

type KartVerisi = (typeof anasayfa.degerler.kartlar)[number];

const ODAK =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2";

/** Surec adimi: gri kart, cerceveli ikon, kosede turuncu adim numarasi. */
function AdimKarti({ kart, adim }: { kart: KartVerisi; adim: number }) {
  return (
    <div className="group relative h-full rounded-2xl border border-gray-border bg-gray-bg p-5 transition duration-200 hover:-translate-y-0.5 hover:border-navy/15 hover:bg-white hover:shadow-[0_14px_34px_rgba(23,48,84,.08)] md:p-6">
      <span className="absolute right-5 top-5 text-xs font-bold tabular-nums text-orange md:right-6 md:top-6">
        {String(adim).padStart(2, "0")}
      </span>
      <div className="flex items-start gap-4 md:block">
        {/* shrink-0: mobilde uzun metin ikon kutusunu sikistirmasin */}
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-navy ring-1 ring-gray-border transition duration-200 group-hover:bg-navy group-hover:text-white group-hover:ring-navy md:mb-5">
          <Ikon ad={kart.ikon as IkonAdi} className="h-[22px] w-[22px]" />
        </span>
        <div className="min-w-0 pr-7 md:pr-0">
          <h3 className="font-bold leading-snug text-navy md:text-[17px]">{kart.baslik}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-gray-text">{kart.aciklama}</p>
        </div>
      </div>
    </div>
  );
}

/** Eylem karti: lacivert zemin, turuncu ikon, tamami basvuruya gider. */
function EylemKarti({ kart }: { kart: KartVerisi & { href: string } }) {
  return (
    <Link
      href={kart.href}
      className={`group relative flex h-full flex-col rounded-2xl bg-navy p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(23,48,84,.25)] md:p-6 ${ODAK}`}
    >
      <div className="flex items-start gap-4 md:block">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange text-white md:mb-5">
          <Ikon ad={kart.ikon as IkonAdi} className="h-[22px] w-[22px]" />
        </span>
        <div className="min-w-0">
          <h3 className="font-bold leading-snug text-white md:text-[17px]">{kart.baslik}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-navy-soft">{kart.aciklama}</p>
        </div>
      </div>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white md:mt-auto md:pt-5">
        {kart.baglantiMetni}
        <Ikon ad="ok" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

/**
 * "Sana ne sunuyoruz?" — siradaki adimlar numarali, son kart basvuruya giden eylem.
 * Masaustunde 3, tablette 2 sutun, mobilde alt alta (ikon solda).
 */
export function DegerKartlari() {
  let adim = 0;

  return (
    <>
      <BolumBasligi baslik={anasayfa.degerler.baslik} />
      <ul className="grid gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {anasayfa.degerler.kartlar.map((kart) => (
          <li key={kart.baslik}>
            {kart.href ? (
              <EylemKarti kart={{ ...kart, href: kart.href }} />
            ) : (
              <AdimKarti kart={kart} adim={++adim} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
