import { Avatar } from "@/components/Avatar";
import { ButonLink } from "@/components/Buton";
import { anasayfa } from "@/data/icerik";
import { koclar } from "@/data/koclar";

const ONIZLEME_ADEDI = 3;

/** Anasayfa hero'su: lacivert zemin, solda mesaj, sagda koc onizleme kartlari. */
export function Hero() {
  const onizleme = koclar.slice(0, ONIZLEME_ADEDI);
  const kalan = koclar.length - onizleme.length;

  return (
    <section className="bg-navy">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-10 md:grid-cols-[1.15fr_0.85fr] md:items-center md:px-8 md:pb-24 md:pt-16">
        <div className="text-center md:text-left">
          {/* max-w: masaustunde baslik iki satira bolunsun (onaylanmis tasarim) */}
          <h1 className="text-2xl font-extrabold leading-[1.22] tracking-tight text-white md:max-w-[520px] md:text-[33px]">
            {anasayfa.hero.baslik}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-navy-soft md:mx-0 md:text-[14.5px]">
            {anasayfa.hero.altBaslik}
          </p>
          <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center md:justify-start">
            <ButonLink href={anasayfa.hero.birincilCta.href}>
              {anasayfa.hero.birincilCta.etiket}
            </ButonLink>
            {/* Ikincil CTA yalnizca masaustunde; mobilde tek aksiyon birakiliyor */}
            <ButonLink
              href={anasayfa.hero.ikincilCta.href}
              gorunum="koyu-ikincil"
              className="hidden md:inline-flex"
            >
              {anasayfa.hero.ikincilCta.etiket}
            </ButonLink>
          </div>
        </div>

        {/* Koc onizleme kartlari mobilde gizli */}
        <div className="hidden md:block">
          <ul className="space-y-2.5">
            {onizleme.map((koc) => (
              <li
                key={koc.slug}
                className="flex items-center gap-3 rounded-xl border border-white/[.14] bg-white/[.07] px-[13px] py-[11px]"
              >
                <Avatar
                  foto={koc.foto}
                  ad={koc.ad}
                  className="h-10 w-10 shrink-0 rounded-[10px] bg-white/[.14]"
                  ikonClassName="h-5 w-5 text-white/70"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-white">
                    {koc.ad} ({koc.puanTuruKisa} {koc.derece}.)
                  </p>
                  <p className="truncate text-[11px] text-navy-soft">
                    {koc.universite} · {koc.alan}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          {kalan > 0 ? (
            <p className="mt-3 text-center text-[11.5px] text-navy-soft">ve {kalan} koç daha</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
