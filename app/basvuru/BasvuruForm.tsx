"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Buton } from "@/components/Buton";
import { BasvuruAlanlari } from "@/components/BasvuruAlanlari";
import { Ikon } from "@/components/Ikon";
import { KvkkOnayi } from "@/components/KvkkOnayi";
import { basvuruSayfasi } from "@/data/basvuru";
import { kocBul } from "@/data/koclar";
import {
  ALAN_SIRASI,
  BOS_BASVURU,
  dogrula,
  mesajOlustur,
  type AlanGuncelle,
  type BasvuruDegerleri,
  type Hatalar,
} from "@/lib/basvuru";
import { whatsappLinki } from "@/lib/whatsapp";

export function BasvuruForm() {
  // URL'den gelen koc (orn. /basvuru?koc=busra-savur) formda secili baslar
  const urldenKoc = useSearchParams().get("koc");
  const [degerler, setDegerler] = useState<BasvuruDegerleri>({
    ...BOS_BASVURU,
    kocSlug: urldenKoc && kocBul(urldenKoc) ? urldenKoc : "",
  });
  const [hatalar, setHatalar] = useState<Hatalar>({});

  const guncelle: AlanGuncelle = (alan, deger) => {
    setDegerler((oncekiler) => ({ ...oncekiler, [alan]: deger }));
    setHatalar((oncekiler) => ({ ...oncekiler, [alan]: undefined }));
  };

  const secilenKoc = kocBul(degerler.kocSlug);

  // Dogrulama yalnizca gonderime basilinca calisir
  const gonder = (olay: React.FormEvent<HTMLFormElement>) => {
    olay.preventDefault();
    const yeniHatalar = dogrula(degerler);
    setHatalar(yeniHatalar);

    const ilkHatali = ALAN_SIRASI.find((alan) => yeniHatalar[alan]);
    if (ilkHatali) {
      const oge = document.getElementById(ilkHatali);
      oge?.scrollIntoView({ behavior: "smooth", block: "center" });
      const odaklanacak =
        oge instanceof HTMLFieldSetElement ? oge.querySelector("input") : (oge as HTMLElement);
      odaklanacak?.focus({ preventScroll: true });
      return;
    }

    if (!secilenKoc) return;
    window.open(whatsappLinki(mesajOlustur(degerler, secilenKoc)), "_blank");
  };

  return (
    <form onSubmit={gonder} noValidate className="max-w-xl space-y-5">
      <BasvuruAlanlari degerler={degerler} hatalar={hatalar} guncelle={guncelle} />

      <KvkkOnayi
        isaretli={degerler.kvkk}
        degisti={(isaretli) => guncelle("kvkk", isaretli)}
        hata={hatalar.kvkk}
      />

      <Buton type="submit" className="w-full sm:w-auto">
        <Ikon ad="whatsapp" className="h-4 w-4" />
        {basvuruSayfasi.gonderButonu}
      </Buton>
    </form>
  );
}
