"use client";

import { useEffect, useState } from "react";

type Kalan = { gun: number; saat: number; dakika: number; saniye: number } | null;

function kalaniHesapla(hedef: number): Kalan {
  const fark = hedef - Date.now();
  if (fark <= 0) return null;
  return {
    gun: Math.floor(fark / 86400000),
    saat: Math.floor(fark / 3600000) % 24,
    dakika: Math.floor(fark / 60000) % 60,
    saniye: Math.floor(fark / 1000) % 60,
  };
}

const BIRIMLER: { anahtar: keyof NonNullable<Kalan>; etiket: string }[] = [
  { anahtar: "gun", etiket: "gün" },
  { anahtar: "saat", etiket: "saat" },
  { anahtar: "dakika", etiket: "dakika" },
  { anahtar: "saniye", etiket: "saniye" },
];

/** site.sinavTarihi dolduruldugunda devreye giren geri sayim. */
export function GeriSayim({ tarih, baslik }: { tarih: string; baslik: string }) {
  const hedef = new Date(tarih).getTime();
  const [kalan, setKalan] = useState<Kalan>(null);

  useEffect(() => {
    setKalan(kalaniHesapla(hedef));
    const zamanlayici = setInterval(() => setKalan(kalaniHesapla(hedef)), 1000);
    return () => clearInterval(zamanlayici);
  }, [hedef]);

  return (
    <div className="rounded-xl border border-gray-border bg-gray-bg p-4 md:p-5">
      <h2 className="text-base font-bold text-navy md:text-lg">{baslik}</h2>
      {/* Sunucuda ve ilk boyamada bos; hydration uyusmazligi olmamasi icin */}
      <div className="mt-3 grid grid-cols-4 gap-2" aria-live="polite">
        {BIRIMLER.map((birim) => (
          <div key={birim.anahtar} className="rounded-lg bg-white px-2 py-3 text-center">
            <div className="text-xl font-extrabold text-navy md:text-2xl">
              {kalan ? String(kalan[birim.anahtar]).padStart(2, "0") : "--"}
            </div>
            <div className="mt-1 text-[11px] text-gray-text">{birim.etiket}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
