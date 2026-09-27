"use client";

import { useEffect, useRef, useState } from "react";

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

/** Degeri degistiginde eski rakam yukari cikar, yenisi asagidan akar. */
function AkanRakam({ deger }: { deger: string }) {
  const [cikan, setCikan] = useState<string | null>(null);
  // Onceki deger ref'te tutuluyor: efekt yalnizca deger degisince calissin,
  // aksi halde kendi setState'i efekti yeniden tetikleyip zamanlayiciyi iptal ediyor
  const oncekiRef = useRef(deger);

  useEffect(() => {
    if (oncekiRef.current === deger) return;
    setCikan(oncekiRef.current);
    oncekiRef.current = deger;
    const zamanlayici = setTimeout(() => setCikan(null), 420);
    return () => clearTimeout(zamanlayici);
  }, [deger]);

  return (
    <span className="relative block h-[1.1em] overflow-hidden">
      {/* key degisince animasyon bastan calisir */}
      <span key={deger} className="block animate-[rakamGir_.4s_cubic-bezier(.22,.8,.3,1)_forwards]">
        {deger}
      </span>
      {cikan !== null ? (
        <span
          key={`cikan-${cikan}`}
          className="absolute inset-0 block animate-[rakamCik_.4s_cubic-bezier(.22,.8,.3,1)_forwards]"
          aria-hidden="true"
        >
          {cikan}
        </span>
      ) : null}
    </span>
  );
}

type Props = {
  tarih: string;
  baslik: string;
  /** Okunabilir tarih metni, sunucuda bicimlendirilip veriliyor */
  tarihMetni: string;
  /** Tarih tahminiyse gosterilen rozet ve aciklama */
  rozet?: string;
  not?: string;
};

export function GeriSayim({ tarih, baslik, tarihMetni, rozet, not }: Props) {
  const hedef = new Date(tarih).getTime();
  const [kalan, setKalan] = useState<Kalan>(null);

  useEffect(() => {
    setKalan(kalaniHesapla(hedef));
    const zamanlayici = setInterval(() => setKalan(kalaniHesapla(hedef)), 1000);
    return () => clearInterval(zamanlayici);
  }, [hedef]);

  return (
    <div className="rounded-xl border border-gray-border bg-gray-bg p-4 md:p-5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h2 className="text-base font-bold text-navy md:text-lg">{baslik}</h2>
        {rozet ? (
          <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-gray-text">
            {rozet}
          </span>
        ) : null}
      </div>
      <p className="mt-1 text-sm font-semibold text-navy">{tarihMetni}</p>

      {/* Kutular gorsel; ekran okuyucu her saniye okumasin diye gizli, ozeti asagida */}
      <div className="mt-4 grid grid-cols-4 gap-2" aria-hidden="true">
        {BIRIMLER.map((birim) => (
          <div key={birim.anahtar} className="rounded-lg bg-white px-2 py-3.5 text-center">
            <div className="text-2xl font-extrabold leading-none tabular-nums text-navy md:text-[28px]">
              <AkanRakam
                deger={kalan ? String(kalan[birim.anahtar]).padStart(2, "0") : "--"}
              />
            </div>
            <div className="mt-2 text-[11px] text-gray-text">{birim.etiket}</div>
          </div>
        ))}
      </div>

      {/* Saniyede bir degismeyen, gun bazli erisilebilir ozet */}
      <p className="sr-only" aria-live="polite">
        {kalan ? `${baslik}: ${kalan.gun} gün` : baslik}
      </p>

      {not ? <p className="mt-3 max-w-2xl text-xs leading-relaxed text-gray-text">{not}</p> : null}
    </div>
  );
}
