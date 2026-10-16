import { ButonLink } from "@/components/Buton";
import { anasayfa } from "@/data/icerik";

/** Anasayfa hero'su: arka plan fotografi uzerinde koyu katman ve mesaj. */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy">
      {/* Mobilde kucultulmus gorsel yukleniyor (52KB), masaustunde tam cozunurluk */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/gorsel/hero-arkaplan-mobil.jpg')] bg-cover bg-center brightness-[1.1] contrast-[1.2] saturate-[1.35] md:bg-[url('/gorsel/hero-arkaplan.jpg')] md:brightness-100 md:contrast-[1.08] md:saturate-[1.1]"
      />
      {/* Mobilde yukaridan asagi aciliyor (metin ustte), masaustunde soldan saga */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(23,48,84,0.78)_0%,rgba(23,48,84,0.66)_55%,rgba(23,48,84,0.34)_100%)] md:bg-[linear-gradient(90deg,rgba(23,48,84,0.95)_0%,rgba(23,48,84,0.85)_45%,rgba(23,48,84,0.12)_100%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 md:px-8 md:pb-28 md:pt-24">
        <div className="text-center md:max-w-xl md:text-left">
          <h1 className="text-2xl font-extrabold leading-[1.22] tracking-tight text-white [text-shadow:0_2px_18px_rgba(6,16,32,0.68)] md:max-w-[520px] md:text-[33px] md:[text-shadow:none]">
            {anasayfa.hero.baslik}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white [text-shadow:0_1px_14px_rgba(6,16,32,0.72)] md:mx-0 md:text-base md:text-white/90 md:[text-shadow:none]">
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
      </div>
    </section>
  );
}
