"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ikon } from "@/components/Ikon";
import { navigasyon } from "@/data/navigasyon";
import { aktifMi } from "@/lib/rota";
import { cn } from "@/lib/utils";

/** Mobil alt sabit navigasyon. Masaustunde gizlenir. */
export function AltNavigasyon() {
  const yol = usePathname();

  return (
    <nav
      aria-label="Alt menü"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-border bg-white pb-safe pt-2 md:hidden"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-1">
        {navigasyon.map((oge) => {
          const aktif = aktifMi(yol, oge.href);
          return (
            <li key={oge.href} className="flex-1">
              <Link
                href={oge.href}
                aria-current={aktif ? "page" : undefined}
                className={cn(
                  "flex min-h-[44px] flex-col items-center justify-center gap-1 rounded-lg px-1 py-1",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy",
                  aktif ? "font-bold text-navy" : "text-gray-text"
                )}
              >
                <Ikon ad={oge.ikon} className="h-5 w-5" cizgiKalinligi={aktif ? 2.1 : 1.8} />
                <span className="text-[9px] leading-none">{oge.kisaEtiket}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
