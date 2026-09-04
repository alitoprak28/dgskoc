"use client";

import { useEffect, useRef } from "react";
import { kvkk } from "@/data/basvuru";

const ODAKLANABILIR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** Erisilebilir KVKK modali: ESC ile kapanir, odak iceride kalir, kapaninca tetikleyiciye doner. */
export function KvkkModal({ acik, kapat }: { acik: boolean; kapat: () => void }) {
  const kutuRef = useRef<HTMLDivElement>(null);
  const oncekiOdakRef = useRef<HTMLElement | null>(null);
  // kapat her renderda yeni referans; efektin yeniden kurulmamasi icin ref uzerinden okunuyor
  const kapatRef = useRef(kapat);
  kapatRef.current = kapat;

  useEffect(() => {
    if (!acik) return;

    oncekiOdakRef.current = document.activeElement as HTMLElement | null;
    kutuRef.current?.querySelector<HTMLElement>(ODAKLANABILIR)?.focus();

    const tusaBasildi = (olay: KeyboardEvent) => {
      if (olay.key === "Escape") {
        olay.preventDefault();
        kapatRef.current();
        return;
      }
      if (olay.key !== "Tab" || !kutuRef.current) return;

      const ogeler = Array.from(kutuRef.current.querySelectorAll<HTMLElement>(ODAKLANABILIR));
      if (ogeler.length === 0) return;
      const ilk = ogeler[0];
      const son = ogeler[ogeler.length - 1];

      if (olay.shiftKey && document.activeElement === ilk) {
        olay.preventDefault();
        son.focus();
      } else if (!olay.shiftKey && document.activeElement === son) {
        olay.preventDefault();
        ilk.focus();
      }
    };

    document.addEventListener("keydown", tusaBasildi);
    return () => {
      document.removeEventListener("keydown", tusaBasildi);
      oncekiOdakRef.current?.focus();
    };
  }, [acik]);

  if (!acik) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-navy/50 p-4 sm:items-center">
      <div
        ref={kutuRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="kvkk-baslik"
        className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-5 md:p-6"
      >
        <h2 id="kvkk-baslik" className="text-lg font-extrabold text-navy">
          {kvkk.modalBasligi}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-text">{kvkk.modalIcerik}</p>
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={kapat}
            className="rounded-lg border-[1.5px] border-navy px-5 py-2.5 text-sm font-semibold text-navy transition-colors duration-150 hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
          >
            {kvkk.modalKapat}
          </button>
        </div>
      </div>
    </div>
  );
}
