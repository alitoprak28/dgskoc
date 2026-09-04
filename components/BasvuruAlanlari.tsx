"use client";

import { FiyatOzeti } from "@/components/FiyatOzeti";
import { MetinAlani, RadyoGrubu, SecimAlani } from "@/components/FormAlanlari";
import { formAlanlari } from "@/data/basvuru";
import { koclar, kocBul, kocSecenekEtiketi } from "@/data/koclar";
import { telefonuTemizle, type AlanGuncelle, type BasvuruDegerleri, type Hatalar } from "@/lib/basvuru";

type Props = { degerler: BasvuruDegerleri; hatalar: Hatalar; guncelle: AlanGuncelle };

/** Formun alan duzeni. Durum yonetimi ve dogrulama BasvuruForm icinde. */
export function BasvuruAlanlari({ degerler, hatalar, guncelle }: Props) {
  const secilenKoc = kocBul(degerler.kocSlug);
  const ay = Number(degerler.aySayisi);
  const fiyatGorunsun = Boolean(secilenKoc) && Number.isFinite(ay) && ay >= 1;

  return (
    <>
      <MetinAlani
        ad="ad"
        etiket={formAlanlari.ad.etiket}
        deger={degerler.ad}
        degisti={(deger) => guncelle("ad", deger)}
        hata={hatalar.ad}
        autoComplete="name"
      />
      <MetinAlani
        ad="telefon"
        etiket={formAlanlari.telefon.etiket}
        deger={degerler.telefon}
        degisti={(deger) => guncelle("telefon", telefonuTemizle(deger))}
        hata={hatalar.telefon}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
      />
      <RadyoGrubu
        ad="koclukAldiMi"
        etiket={formAlanlari.koclukAldiMi.etiket}
        secenekler={formAlanlari.koclukAldiMi.secenekler}
        deger={degerler.koclukAldiMi}
        degisti={(deger) => guncelle("koclukAldiMi", deger)}
        hata={hatalar.koclukAldiMi}
      />
      <SecimAlani
        ad="durum"
        etiket={formAlanlari.durum.etiket}
        yerTutucu={formAlanlari.durum.yerTutucu}
        secenekler={formAlanlari.durum.secenekler.map((s) => ({ deger: s, etiket: s }))}
        deger={degerler.durum}
        degisti={(deger) => guncelle("durum", deger)}
        hata={hatalar.durum}
      />
      <MetinAlani
        ad="hedefBolum"
        etiket={formAlanlari.hedefBolum.etiket}
        deger={degerler.hedefBolum}
        degisti={(deger) => guncelle("hedefBolum", deger)}
        hata={hatalar.hedefBolum}
      />
      <MetinAlani
        ad="hedefSiralama"
        etiket={formAlanlari.hedefSiralama.etiket}
        deger={degerler.hedefSiralama}
        degisti={(deger) => guncelle("hedefSiralama", deger)}
        hata={hatalar.hedefSiralama}
      />
      <MetinAlani
        ad="net"
        etiket={formAlanlari.net.etiket}
        deger={degerler.net}
        degisti={(deger) => guncelle("net", deger)}
        hata={hatalar.net}
      />
      <RadyoGrubu
        ad="alan"
        etiket={formAlanlari.alan.etiket}
        secenekler={formAlanlari.alan.secenekler}
        deger={degerler.alan}
        degisti={(deger) => guncelle("alan", deger)}
        hata={hatalar.alan}
      />
      <SecimAlani
        ad="kocSlug"
        etiket={formAlanlari.koc.etiket}
        yerTutucu={formAlanlari.koc.yerTutucu}
        secenekler={koclar.map((koc) => ({ deger: koc.slug, etiket: kocSecenekEtiketi(koc) }))}
        deger={degerler.kocSlug}
        degisti={(deger) => guncelle("kocSlug", deger)}
        hata={hatalar.kocSlug}
      />
      <MetinAlani
        ad="aySayisi"
        etiket={formAlanlari.aySayisi.etiket}
        deger={degerler.aySayisi}
        degisti={(deger) => guncelle("aySayisi", deger.replace(/\D/g, ""))}
        hata={hatalar.aySayisi}
        type="number"
        inputMode="numeric"
        min={1}
      />

      {/* Koc ve ay secilince fiyat ozeti belirir */}
      {fiyatGorunsun && secilenKoc ? (
        <FiyatOzeti kocAdi={secilenKoc.ad} aySayisi={ay} aylikUcret={secilenKoc.aylikUcret} />
      ) : null}
    </>
  );
}
