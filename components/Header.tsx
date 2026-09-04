"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButonLink } from "@/components/Buton";
import { Ikon } from "@/components/Ikon";
import { navigasyon } from "@/data/navigasyon";
import { site } from "@/data/site";
import { telefonLinki } from "@/lib/whatsapp";
import { aktifMi } from "@/lib/rota";
import { cn } from "@/lib/utils";

export function Header() {
  const yol = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-white">
      {/* Masaustu ust serit: slogan + telefon */}
      <div className="hidden bg-navy md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-[7px]">
          <span className="text-[11.5px] text-navy-soft">{site.slogan}</span>
          <a
            href={telefonLinki()}
            className="inline-flex items-center gap-1.5 text-[11.5px] text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            <Ikon ad="telefon" className="h-3.5 w-3.5" />
            {site.telefon}
          </a>
        </div>
      </div>

      {/* Ana menu katmani — logo lacivert oldugu icin zemin beyaz */}
      <div className="border-b border-gray-border bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8 md:py-[18px]">
          <Link
            href="/"
            className="shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            aria-label={`${site.ad} anasayfa`}
          >
            <Image
              src="/logo-yatay.png"
              alt={site.ad}
              width={675}
              height={188}
              priority
              className="h-[36px] w-auto md:h-[44px]"
            />
          </Link>

          {/* Masaustu menu baglantilari */}
          <nav aria-label="Ana menü" className="hidden md:block">
            <ul className="flex items-center gap-[26px]">
              {navigasyon.map((oge) => {
                const aktif = aktifMi(yol, oge.href);
                return (
                  <li key={oge.href} className="relative">
                    <Link
                      href={oge.href}
                      aria-current={aktif ? "page" : undefined}
                      className={cn(
                        "relative inline-block py-1 text-[13px] transition-colors duration-150",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2",
                        aktif ? "font-bold text-navy" : "text-nav-link hover:text-navy"
                      )}
                    >
                      {oge.etiket}
                      {aktif ? (
                        <span
                          aria-hidden="true"
                          className="absolute bottom-[-19px] left-0 right-0 h-[3px] rounded-full bg-orange"
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobilde telefon linki, masaustunde turuncu CTA */}
          <a
            href={telefonLinki()}
            className="inline-flex items-center gap-1.5 rounded text-[13px] font-semibold text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 md:hidden"
          >
            <Ikon ad="telefon" className="h-4 w-4" />
            {site.telefon}
          </a>
          <ButonLink
            href={telefonLinki()}
            className="hidden px-5 py-2.5 text-[13px] md:inline-flex"
          >
            Hemen ara
          </ButonLink>
        </div>
      </div>
    </header>
  );
}
