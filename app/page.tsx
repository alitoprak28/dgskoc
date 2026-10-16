import Link from "next/link";
import { Bolum, BolumBasligi } from "@/components/Bolum";
import { DegerKartlari } from "@/components/DegerKartlari";
import { Hero } from "@/components/Hero";
import { IstatistikSeridi } from "@/components/IstatistikSeridi";
import { KapanisCta } from "@/components/KapanisCta";
import { KocKarti } from "@/components/KocKarti";
import { SinavBilgi } from "@/components/SinavBilgi";
import { YorumKarti } from "@/components/YorumKarti";
import { anasayfa } from "@/data/icerik";
import { koclar } from "@/data/koclar";
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

      <Bolum>
        <BolumBasligi baslik={anasayfa.yorumlarOnizleme.baslik} />
        <div className="grid gap-3 md:grid-cols-3 md:gap-5">
          {yorumlar.slice(0, 3).map((yorum) => (
            <YorumKarti key={yorum.ad} yorum={yorum} />
          ))}
        </div>
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
