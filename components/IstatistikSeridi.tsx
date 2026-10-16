"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { istatistikListesi } from "@/data/site";
import { cn } from "@/lib/utils";

// Sunucuda useLayoutEffect uyari veriyor; ortama gore secip ikisini de destekliyoruz
const useIzoEtki = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const SURE = 1100;

/** "320+" gibi degerleri sifirdan hedefe sayar. Gorunur olunca bir kez calisir. */
function Sayac({ deger }: { deger: string }) {
  const parcali = deger.match(/^(\D*)(\d+)(\D*)$/);
  const hedef = parcali ? Number(parcali[2]) : null;
  const [gosterilen, setGosterilen] = useState(deger);
  const ref = useRef<HTMLDivElement>(null);

  useIzoEtki(() => {
    const oge = ref.current;
    if (hedef === null || !parcali || !oge) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, onEk, , sonEk] = parcali;
    let kare = 0;

    // Animasyonun ilk karesi zaten 0 yaziyor; onceden sifirlamaya gerek yok
    const calistir = () => {
      const bas = performance.now();
      const adim = (simdi: number) => {
        const oran = Math.min((simdi - bas) / SURE, 1);
        const yumusak = 1 - Math.pow(1 - oran, 3);
        setGosterilen(`${onEk}${Math.round(hedef * yumusak)}${sonEk}`);
        if (oran < 1) kare = requestAnimationFrame(adim);
      };
      kare = requestAnimationFrame(adim);
    };

    // Serit acilista ekrandaysa hemen basla; degilse gorunur olmasini bekle
    const kutu = oge.getBoundingClientRect();
    if (kutu.top < window.innerHeight && kutu.bottom > 0) {
      calistir();
      return () => cancelAnimationFrame(kare);
    }

    const gozlemci = new IntersectionObserver(
      (girdiler) => {
        if (girdiler[0].isIntersecting) {
          gozlemci.disconnect();
          calistir();
        }
      },
      { threshold: 0.4 }
    );
    gozlemci.observe(oge);

    return () => {
      gozlemci.disconnect();
      cancelAnimationFrame(kare);
    };
  }, [deger, hedef]);

  return (
    <div
      ref={ref}
      className="text-[28px] font-extrabold leading-none tabular-nums tracking-tight text-navy md:text-[42px]"
    >
      {gosterilen}
    </div>
  );
}

/** Uc sutunlu rakam seridi. Anasayfa, Hakkimizda ve Basarilarimiz ayni veriden besleniyor. */
export function IstatistikSeridi({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-3 rounded-2xl border border-gray-border bg-white py-6 md:py-8",
        "shadow-[0_10px_30px_rgba(23,48,84,.08)]",
        className
      )}
    >
      {istatistikListesi.map((oge, sira) => (
        <div
          key={oge.etiket}
          className={cn(
            "px-2 text-center md:px-4",
            sira < istatistikListesi.length - 1 && "border-r border-[#f0f0f0]"
          )}
        >
          <Sayac deger={oge.deger} />
          {/* Rakami isaretleyen ince turuncu cizgi */}
          <div aria-hidden="true" className="mx-auto mt-2.5 h-[3px] w-6 rounded-full bg-orange/85" />
          <div className="mt-2.5 text-xs leading-snug text-gray-text md:text-[13px]">
            {oge.etiket}
          </div>
        </div>
      ))}
    </div>
  );
}
