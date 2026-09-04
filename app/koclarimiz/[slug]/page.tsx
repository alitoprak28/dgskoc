import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/Avatar";
import { Bolum } from "@/components/Bolum";
import { ButonLink } from "@/components/Buton";
import { YapisalVeri } from "@/components/YapisalVeri";
import { koclarimizSayfasi } from "@/data/icerik";
import { koclar, kocBul } from "@/data/koclar";
import { fiyatFormatla } from "@/lib/format";
import { kocVerisi } from "@/lib/yapisalVeri";

type Props = { params: Promise<{ slug: string }> };

// Tum koc sayfalari build sirasinda uretilir
export function generateStaticParams() {
  return koclar.map((koc) => ({ slug: koc.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const koc = kocBul(slug);
  if (!koc) return { title: koclarimizSayfasi.baslik };

  const aciklama = `${koc.universite} ${koc.alan} — ${koc.puanTuru} ${koc.derece}. DGS koçu.`;
  return {
    title: `${koc.ad} (${koc.puanTuruKisa} ${koc.derece}.)`,
    description: aciklama,
    openGraph: { title: koc.ad, description: aciklama },
  };
}

export default async function KocDetaySayfasi({ params }: Props) {
  const { slug } = await params;
  const koc = kocBul(slug);
  if (!koc) notFound();

  return (
    <Bolum>
      <YapisalVeri veri={kocVerisi(koc)} />
      <div className="grid gap-6 md:grid-cols-[minmax(0,320px)_1fr] md:gap-10">
        <Avatar
          foto={koc.foto}
          ad={koc.ad}
          className="aspect-[4/3] w-full md:aspect-square"
          ikonClassName="h-14 w-14"
        />

        <div>
          <h1 className="text-2xl font-extrabold leading-tight text-navy md:text-3xl">{koc.ad}</h1>
          <p className="mt-2 text-sm font-semibold text-navy">
            {koc.puanTuru} · {koc.derece}. sıra
          </p>
          <p className="mt-1 text-sm text-gray-text">{koc.universite}</p>
          <p className="text-sm text-gray-text">{koc.alan}</p>

          <p className="mt-6 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-navy">
            {koc.biyografi}
          </p>

          {koc.uzmanlik?.length ? (
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-navy">
                {koclarimizSayfasi.uzmanlikBasligi}
              </h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {koc.uzmanlik.map((konu) => (
                  <li
                    key={konu}
                    className="rounded-lg border border-gray-border bg-gray-bg px-3 py-1.5 text-xs text-navy"
                  >
                    {konu}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-8 flex flex-col items-start gap-4 rounded-xl border border-gray-border bg-gray-bg p-4 sm:flex-row sm:items-center sm:justify-between md:p-5">
            <div>
              <p className="text-xs text-gray-text">{koclarimizSayfasi.ucretEtiketi}</p>
              <p className="text-xl font-extrabold text-navy">{fiyatFormatla(koc.aylikUcret)}</p>
            </div>
            <ButonLink href={`/basvuru?koc=${koc.slug}`} className="w-full sm:w-auto">
              {koclarimizSayfasi.detayCta}
            </ButonLink>
          </div>
        </div>
      </div>
    </Bolum>
  );
}
