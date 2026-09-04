import type { Metadata } from "next";
import { Suspense } from "react";
import { Bolum, BolumBasligi } from "@/components/Bolum";
import { basvuruSayfasi } from "@/data/basvuru";
import { BasvuruForm } from "./BasvuruForm";

export const metadata: Metadata = {
  title: basvuruSayfasi.baslik,
  description:
    "DGS Koç başvuru formu. Formu doldur, WhatsApp üzerinden seninle iletişime geçelim.",
};

export default function BasvuruSayfasi() {
  return (
    <>
      <Bolum>
        <BolumBasligi
          seviye={1}
          baslik={basvuruSayfasi.baslik}
          aciklama={basvuruSayfasi.aciklama}
        />
        <h2 className="text-sm font-semibold text-navy">{basvuruSayfasi.surecBasligi}</h2>
        <ol className="mt-3 grid gap-3 md:grid-cols-3 md:gap-5">
          {basvuruSayfasi.surecAdimlari.map((adim, sira) => (
            <li
              key={adim.baslik}
              className="rounded-xl border border-gray-border bg-gray-bg p-4 md:p-5"
            >
              <span className="text-[11px] font-bold text-orange">
                {String(sira + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 font-semibold text-navy">{adim.baslik}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-text">{adim.aciklama}</p>
            </li>
          ))}
        </ol>
      </Bolum>

      <Bolum zemin="gri">
        <h2 className="mb-6 text-xl font-extrabold text-navy md:text-2xl">
          {basvuruSayfasi.formBasligi}
        </h2>
        {/* useSearchParams client tarafinda calisiyor, statik export icin Suspense sart */}
        <Suspense fallback={null}>
          <BasvuruForm />
        </Suspense>
      </Bolum>
    </>
  );
}
