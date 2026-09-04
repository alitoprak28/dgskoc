import Image from "next/image";
import Link from "next/link";
import { Ikon } from "@/components/Ikon";
import { navigasyon } from "@/data/navigasyon";
import { footer } from "@/data/icerik";
import { site } from "@/data/site";
import { telefonLinki, whatsappLinki } from "@/lib/whatsapp";

const sosyalBaglantilar = [
  { ad: "Instagram", href: site.sosyal.instagram },
  { ad: "YouTube", href: site.sosyal.youtube },
].filter((baglanti) => baglanti.href !== "");

export function Footer() {
  return (
    <footer className="border-t border-gray-border bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-8 md:py-14">
        <div>
          {/* JPG zemini 254,254,254 — hafif parlaklik ile saf beyaza cekilip footer icinde kayboluyor */}
          <Image
            src="/logo-dikey.jpg"
            alt={site.ad}
            width={1024}
            height={1024}
            className="h-24 w-24 object-contain brightness-[1.02]"
          />
          <p className="mt-3 text-sm text-gray-text">{site.slogan}</p>
        </div>

        <nav aria-label="Alt bilgi menüsü">
          <h2 className="text-sm font-semibold text-navy">{footer.sayfalarBasligi}</h2>
          <ul className="mt-3 space-y-2">
            {navigasyon.map((oge) => (
              <li key={oge.href}>
                <Link
                  href={oge.href}
                  className="rounded text-sm text-gray-text hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                >
                  {oge.etiket}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-navy">{footer.iletisimBasligi}</h2>
          <ul className="mt-3 space-y-2">
            <li>
              <a
                href={telefonLinki()}
                className="inline-flex items-center gap-2 rounded text-sm text-gray-text hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
              >
                <Ikon ad="telefon" className="h-4 w-4" />
                {site.telefon}
              </a>
            </li>
            <li>
              <a
                href={whatsappLinki()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded text-sm text-gray-text hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
              >
                <Ikon ad="whatsapp" className="h-4 w-4" />
                {footer.whatsappEtiketi}
              </a>
            </li>
            {sosyalBaglantilar.map((baglanti) => (
              <li key={baglanti.ad}>
                <a
                  href={baglanti.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded text-sm text-gray-text hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                >
                  {baglanti.ad}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-border">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-gray-text md:px-8">
          © {new Date().getFullYear()} {site.ad}. {footer.telifNotu}
        </p>
      </div>
    </footer>
  );
}
