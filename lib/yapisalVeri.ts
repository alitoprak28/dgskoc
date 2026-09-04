import type { Koc } from "@/data/koclar";
import { site } from "@/data/site";

// Arama motorlari ve yapay zeka sistemleri icin schema.org verisi.
// Icerik /data dosyalarindan besleniyor, elle metin girilmiyor.

const sosyalAdresler = Object.values(site.sosyal).filter(Boolean);

export function kurumVerisi() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.ad,
    alternateName: "dgs.koc",
    slogan: site.slogan,
    url: site.alanAdi,
    logo: `${site.alanAdi}/logo-yatay.png`,
    image: `${site.alanAdi}/opengraph-image.png`,
    description:
      "DGS'ye hazırlanan öğrencilere kişiselleştirilmiş çalışma programı, düzenli deneme analizi ve bire bir takiple akademik koçluk.",
    telephone: `+${site.telefonWa}`,
    areaServed: { "@type": "Country", name: "Türkiye" },
    knowsLanguage: "tr",
    ...(sosyalAdresler.length ? { sameAs: sosyalAdresler } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${site.telefonWa}`,
      contactType: "customer service",
      availableLanguage: "Turkish",
    },
  };
}

export function siteVerisi() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${site.ad} — ${site.slogan}`,
    url: site.alanAdi,
    inLanguage: "tr-TR",
    publisher: { "@type": "EducationalOrganization", name: site.ad },
  };
}

export function kocVerisi(koc: Koc) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: koc.ad,
    jobTitle: "DGS Koçu",
    description: `${koc.puanTuru} alanında ${koc.derece}. sıra. ${koc.universite} ${koc.alan}.`,
    url: `${site.alanAdi}/koclarimiz/${koc.slug}/`,
    alumniOf: { "@type": "CollegeOrUniversity", name: koc.universite },
    worksFor: { "@type": "EducationalOrganization", name: site.ad, url: site.alanAdi },
    ...(koc.uzmanlik?.length ? { knowsAbout: koc.uzmanlik } : {}),
  };
}
