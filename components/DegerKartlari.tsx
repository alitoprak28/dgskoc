import Link from "next/link";
import { Ikon, type IkonAdi } from "@/components/Ikon";
import { anasayfa } from "@/data/icerik";
import { cn } from "@/lib/utils";

type KartVerisi = (typeof anasayfa.degerler.kartlar)[number];

/** Basvuru karti: lacivert zemin, turuncu ikon, tamami forma gider. */
function BasvuruKarti({ kart, className }: { kart: KartVerisi & { href: string }; className?: string }) {
  return (
    <Link
      href={kart.href}
      className={cn(
        "group block rounded-2xl bg-navy p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(23,48,84,.25)] md:p-7",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange text-white">
          <Ikon ad={kart.ikon as IkonAdi} className="h-[22px] w-[22px]" />
        </span>
        <div className="min-w-0">
          <h3 className="text-[17px] font-bold leading-snug text-white">{kart.baslik}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-navy-soft">{kart.aciklama}</p>
        </div>
      </div>
      <span className="mt-5 inline-flex items-center gap-2 rounded-lg bg-orange px-5 py-3 text-sm font-semibold text-white">
        {kart.baglantiMetni}
        <Ikon ad="ok" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

/** Zaman cizelgesinde tek adim: numarali ikon dugumu, altinda bir sonrakine baglanan cizgi. */
function Adim({ kart, sira, son }: { kart: KartVerisi; sira: number; son: boolean }) {
  return (
    <li className={cn("group relative pl-[4.25rem] md:pl-20", !son && "pb-9 md:pb-10")}>
      {!son ? (
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-6 top-14 w-px bg-gradient-to-b from-navy/25 to-gray-border"
        />
      ) : null}
      {/* shrink etmeyen sabit dugum: mobilde de her ikon ayni boyutta */}
      <span className="absolute left-0 top-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-navy shadow-[0_4px_14px_rgba(23,48,84,.08)] ring-1 ring-gray-border transition duration-200 group-hover:bg-navy group-hover:text-white group-hover:ring-navy">
        <Ikon ad={kart.ikon as IkonAdi} className="h-[22px] w-[22px]" />
      </span>
      <div className="pt-0.5">
        <span className="text-xs font-bold tabular-nums tracking-wide text-orange">
          {String(sira).padStart(2, "0")}
        </span>
        <h3 className="mt-0.5 text-[17px] font-bold leading-snug text-navy md:text-lg">{kart.baslik}</h3>
        <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-gray-text md:text-[15px]">
          {kart.aciklama}
        </p>
      </div>
    </li>
  );
}

/**
 * "Sana ne sunuyoruz?" — surecin yol haritasi.
 * Masaustunde solda sabit duran baslik ve basvuru karti, sagda adim adim zaman cizelgesi.
 * Mobilde baslik, cizelge, en sonda basvuru karti.
 */
export function DegerKartlari() {
  const { baslik, aciklama, kartlar } = anasayfa.degerler;
  const adimlar = kartlar.filter((kart) => !kart.href);
  const basvuru = kartlar.find((kart) => kart.href);
  const basvuruKarti = basvuru?.href ? { ...basvuru, href: basvuru.href } : null;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-navy md:text-3xl">
          {baslik}
        </h2>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-gray-text md:text-base">{aciklama}</p>
        {basvuruKarti ? <BasvuruKarti kart={basvuruKarti} className="mt-8 hidden lg:block" /> : null}
      </div>

      <div>
        <ol>
          {adimlar.map((kart, i) => (
            <Adim key={kart.baslik} kart={kart} sira={i + 1} son={i === adimlar.length - 1} />
          ))}
        </ol>
        {basvuruKarti ? <BasvuruKarti kart={basvuruKarti} className="mt-10 lg:hidden" /> : null}
      </div>
    </div>
  );
}
