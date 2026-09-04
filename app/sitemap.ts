import type { MetadataRoute } from "next";
import { koclar } from "@/data/koclar";
import { navigasyon } from "@/data/navigasyon";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const guncelleme = new Date();

  // Ana sayfalar navigasyondan, koc detaylari koc listesinden uretilir
  // trailingSlash: true oldugu icin adresler egik cizgiyle bitmeli
  const sayfalar = navigasyon.map((oge) => ({
    url: `${site.alanAdi}${oge.href === "/" ? "/" : `${oge.href}/`}`,
    lastModified: guncelleme,
    priority: oge.href === "/" ? 1 : 0.8,
  }));

  const kocSayfalari = koclar.map((koc) => ({
    url: `${site.alanAdi}/koclarimiz/${koc.slug}/`,
    lastModified: guncelleme,
    priority: 0.6,
  }));

  return [...sayfalar, ...kocSayfalari];
}
