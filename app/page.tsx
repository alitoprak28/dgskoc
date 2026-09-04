import Link from "next/link";
import { Bolum, BolumBasligi } from "@/components/Bolum";
import { DegerKartlari } from "@/components/DegerKartlari";
import { Hero } from "@/components/Hero";
import { IstatistikSeridi } from "@/components/IstatistikSeridi";
import { KapanisCta } from "@/components/KapanisCta";
import { KocKarti } from "@/components/KocKarti";
import { SinavBilgi } from "@/components/SinavBilgi";
import { SurecAdimlari } from "@/components/SurecAdimlari";
import { YorumKarti } from "@/components/YorumKarti";
import { anasayfa } from "@/data/icerik";
import { koclar } from "@/data/koclar";
import { site } from "@/data/site";
import { yorumlar } from "@/data/yorumlar";

export default function Anasayfa() {
  return (
    <>
      <Hero />

      {/* Guven seridi: masaustunde hero'nun uzerine biner */}
      <div className="bg-white">
        <div className="relative mx-auto max-w-6xl px-4 md:-mt-[26px] md:px-8">
          <IstatistikSeridi />
        </div>
      </div>

      <Bolum>
        <DegerKartlari />
      </Bolum>

      <Bolum zemin="gri">
        <SurecAdimlari />
      </Bolum>

      <Bolum>
        <BolumBasligi
          baslik={anasayfa.koclarOnizleme.baslik}
          yan={
            <Link
              href="/koclarimiz"
              className="rounded text-sm font-semibold text-navy hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            >
              {anasayfa.koclarOnizleme.tumunuGor}
            </Link>
          }
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {koclar.slice(0, 4).map((koc) => (
            <KocKarti key={koc.slug} koc={koc} />
          ))}
        </div>
      </Bolum>

      <Bolum zemin="gri">
        <BolumBasligi baslik={anasayfa.yorumlarOnizleme.baslik} />
        <div className="grid gap-3 md:grid-cols-3 md:gap-5">
          {yorumlar.slice(0, 3).map((yorum) => (
            <YorumKarti key={yorum.ad} yorum={yorum} />
          ))}
        </div>
      </Bolum>

      {/* Sayfadaki ikinci koyu bolum — ritim icin */}
      <Bolum zemin="lacivert">
        <p className="text-sm font-semibold text-navy-soft">{anasayfa.oneCikanHikaye.baslik}</p>
        <blockquote className="mt-4 max-w-3xl text-lg font-semibold leading-relaxed text-white md:text-xl">
          {site.oneCikanHikaye.ozet}
        </blockquote>
        <p className="mt-5 text-sm font-bold text-white">{site.oneCikanHikaye.ad}</p>
        <p className="text-sm text-navy-soft">{site.oneCikanHikaye.sonuc}</p>
      </Bolum>

      <Bolum>
        <SinavBilgi />
      </Bolum>

      <Bolum zemin="beyaz" className="pt-0">
        <KapanisCta />
      </Bolum>
    </>
  );
}
