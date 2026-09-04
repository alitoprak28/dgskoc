"use client";

import { useState } from "react";
import { KvkkModal } from "@/components/KvkkModal";
import { kvkk } from "@/data/basvuru";

type Props = { isaretli: boolean; degisti: (isaretli: boolean) => void; hata?: string };

/** KVKK onay kutucugu ve metni acan modal. Ayri KVKK sayfasi yok. */
export function KvkkOnayi({ isaretli, degisti, hata }: Props) {
  const [modalAcik, setModalAcik] = useState(false);

  return (
    <div>
      <div className="flex items-start gap-2.5">
        <input
          id="kvkk"
          name="kvkk"
          type="checkbox"
          checked={isaretli}
          onChange={(olay) => degisti(olay.target.checked)}
          aria-invalid={hata ? true : undefined}
          aria-describedby={hata ? "kvkk-hata" : undefined}
          className="mt-0.5 h-4 w-4 shrink-0 accent-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
        />
        {/* Modal butonu label'in disinda: butona tiklaninca kutucuk isaretlenmesin */}
        <p className="text-sm leading-relaxed text-navy">
          <button
            type="button"
            onClick={() => setModalAcik(true)}
            className="rounded underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
          >
            {kvkk.baglantiMetni}
          </button>{" "}
          <label htmlFor="kvkk">{kvkk.onayMetniSonrasi}</label>
        </p>
      </div>
      {hata ? (
        <p id="kvkk-hata" className="mt-1.5 text-xs text-red-600">
          {hata}
        </p>
      ) : null}

      <KvkkModal acik={modalAcik} kapat={() => setModalAcik(false)} />
    </div>
  );
}
