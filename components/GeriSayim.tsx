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

// Her halka, birimin kendi dongusunde kalan orani gosterir
const BIRIMLER: { anahtar: keyof NonNullable<Kalan>; etiket: string; dongu: number }[] = [
  { anahtar: "gun", etiket: "gün", dongu: 365 },
  { anahtar: "saat", etiket: "saat", dongu: 24 },
  { anahtar: "dakika", etiket: "dakika", dongu: 60 },
  { anahtar: "saniye", etiket: "saniye", dongu: 60 },
];

const YARICAP = 34;
const CEVRE = 2 * Math.PI * YARICAP;

/** Degeri degistiginde eski rakam yukari cikar, yenisi asagidan akar. */
function AkanRakam({ deger }: { deger: string }) {
  const [cikan, setCikan] = useState<string | null>(null);
  // Onceki deger ref'te: state olsaydi efekt kendi zamanlayicisini iptal ederdi
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

/** Kalan orani gosteren halka. Deger sifira sarinca gecis kapatilir, geri sarma gorunmez. */
function Halka({ oran, hizli }: { oran: number; hizli: boolean }) {
  const oncekiOranRef = useRef(oran);
  const gecisVar = oran <= oncekiOranRef.current;
  oncekiOranRef.current = oran;

  return (
    <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
      <circle cx="40" cy="40" r={YARICAP} fill="none" stroke="rgba(255,255,255,.13)" strokeWidth="4" />
      <circle
        cx="40"
        cy="40"
        r={YARICAP}
        fill="none"
        stroke="#fff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={CEVRE}
        strokeDashoffset={CEVRE * (1 - oran)}
        style={{
          transition: gecisVar
            ? `stroke-dashoffset ${hizli ? ".9s linear" : ".7s cubic-bezier(.22,.8,.3,1)"}`
            : "none",
        }}
      />
    </svg>
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
    <div className="rounded-2xl bg-navy px-5 py-6 md:px-8 md:py-9 lg:px-10 lg:py-11">
      {/* Masaustunde iki sutun; mobilde sira baslik -> halkalar -> not */}
      <div className="md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-10 lg:gap-14">
        <div className="md:col-start-1 md:row-start-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h2 className="text-lg font-extrabold text-white md:text-xl">{baslik}</h2>
            {rozet ? (
              <span className="rounded-full bg-white/[.12] px-2.5 py-1 text-[11px] font-semibold text-navy-soft">
                {rozet}
              </span>
            ) : null}
          </div>
          <p className="mt-1.5 text-base font-semibold text-white md:text-lg">{tarihMetni}</p>
        </div>

        {/* Halkalar gorsel; ekran okuyucu her saniye okumasin diye gizli, ozeti asagida */}
        <div
          className="mt-6 grid shrink-0 grid-cols-4 gap-3 sm:gap-5 md:mt-0 md:col-start-2 md:row-span-2 md:row-start-1 md:gap-5 lg:gap-7"
          aria-hidden="true"
        >
          {BIRIMLER.map((birim) => {
            const deger = kalan ? kalan[birim.anahtar] : 0;
            const oran = kalan ? Math.min(deger / birim.dongu, 1) : 0;
            return (
              <div key={birim.anahtar} className="flex flex-col items-center">
                <div className="relative aspect-square w-full max-w-[92px] md:w-[110px] md:max-w-none lg:w-[128px]">
                  <Halka oran={oran} hizli={birim.anahtar === "saniye"} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-extrabold tabular-nums leading-none text-white md:text-[26px] lg:text-[32px]">
                      <AkanRakam deger={kalan ? String(deger).padStart(2, "0") : "--"} />
                    </span>
                  </div>
                </div>
                <span className="mt-2.5 text-[11px] text-navy-soft lg:mt-3 lg:text-xs">{birim.etiket}</span>
              </div>
            );
          })}
        </div>

        {not ? (
          <p className="mt-6 text-xs leading-relaxed text-navy-soft/80 md:col-start-1 md:row-start-2 md:mt-4 md:max-w-md">
            {not}
          </p>
        ) : null}
      </div>

      {/* Saniyede bir degismeyen, gun bazli erisilebilir ozet */}
      <p className="sr-only" aria-live="polite">
        {kalan ? `${baslik}: ${kalan.gun} gün` : baslik}
      </p>
    </div>
  );
}
